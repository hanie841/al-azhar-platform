'use client';

import { useState, useRef, useEffect, type KeyboardEvent } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { isRtl, type Locale } from '@/i18n/config';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  sources?: Record<string, { title: string; url: string }[]>;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export function ChatWidget() {
  const locale = useLocale();
  const t = useTranslations('chat');
  const rtl = isRtl(locale as Locale);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const suggestedQuestions =
    locale === 'ar'
      ? [
          'ما هي كليات جامعة الأزهر؟',
          'كيف أتقدم للقبول؟',
          'ما هي البرامج الأكاديمية المتاحة؟',
          'أخبرني عن تاريخ الأزهر',
        ]
      : locale === 'ur'
        ? [
            'الازہر یونیورسٹی میں کون سی فیکلٹیز ہیں؟',
            'داخلے کے لیے درخواست کیسے دیں؟',
            'کون سے اکیڈمک پروگرامز دستیاب ہیں؟',
            'الازہر کی تاریخ بتائیں',
          ]
        : locale === 'fr'
          ? [
              'Quelles sont les facultés d\'Al-Azhar ?',
              'Comment postuler pour l\'admission ?',
              'Quels programmes académiques sont disponibles ?',
              'Parlez-moi de l\'histoire d\'Al-Azhar',
            ]
          : locale === 'es'
            ? [
                'Cuáles son las facultades de Al-Azhar?',
                'Cómo solicitar admisión?',
                'Qué programas académicos hay disponibles?',
                'Cuéntame sobre la historia de Al-Azhar',
              ]
            : locale === 'zh'
              ? [
                  '爱资哈尔大学有哪些学院？',
                  '如何申请入学？',
                  '有哪些学术项目？',
                  '介绍一下爱资哈尔的历史',
                ]
              : locale === 'ru'
                ? [
                    'Какие факультеты есть в Аль-Азхаре?',
                    'Как подать заявку на поступление?',
                    'Какие академические программы доступны?',
                    'Расскажите об истории Аль-Азхара',
                  ]
                : [
                    'What faculties does Al-Azhar have?',
                    'How do I apply for admission?',
                    'What academic programs are available?',
                    'Tell me about Al-Azhar history',
                  ];

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return;

    const userMsg: ChatMessage = { role: 'user', content: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Accept-Language': locale,
        },
        body: JSON.stringify({ message: text.trim() }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            data.reply ||
            (rtl
              ? 'عذراً، حدث خطأ.'
              : 'Sorry, an error occurred.'),
          sources: data.sources,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: rtl
            ? 'عذراً، لا يمكن الاتصال بالخادم حالياً.'
            : 'Sorry, unable to connect to the server.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  return (
    <>
      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className={`fixed bottom-24 z-50 flex flex-col w-[calc(100vw-2rem)] sm:w-[380px] max-h-[500px] rounded-2xl shadow-2xl border border-sand-200 dark:border-navy-700 overflow-hidden bg-white dark:bg-navy-800 ${
              rtl ? 'left-4 sm:left-6' : 'right-4 sm:right-6'
            }`}
            dir={rtl ? 'rtl' : 'ltr'}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 bg-primary-700 dark:bg-primary-800 text-white shrink-0">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20">
                <Bot className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-base flex-1">{t('title')}</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-white/20 transition-colors"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0 bg-sand-50 dark:bg-navy-900/50">
              {/* Welcome Message */}
              {messages.length === 0 && (
                <div className="space-y-4">
                  <div className="flex gap-2 items-start">
                    <div className="flex items-center justify-center w-7 h-7 rounded-full bg-primary-100 dark:bg-primary-900/40 shrink-0">
                      <Bot className="w-4 h-4 text-primary-700 dark:text-primary-300" />
                    </div>
                    <div className="bg-sand-100 dark:bg-navy-800 rounded-2xl rounded-tl-sm px-3 py-2 text-sm text-gray-800 dark:text-sand-200 max-w-[85%]">
                      {t('welcome')}
                    </div>
                  </div>

                  {/* Suggested Questions */}
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-gray-500 dark:text-sand-400 px-1">
                      {t('suggestedTitle')}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {suggestedQuestions.map((q, i) => (
                        <button
                          key={i}
                          onClick={() => sendMessage(q)}
                          className="text-xs px-3 py-1.5 rounded-full bg-white dark:bg-navy-700 border border-sand-200 dark:border-navy-600 text-gray-700 dark:text-sand-300 hover:bg-primary-50 dark:hover:bg-primary-900/30 hover:border-primary-300 dark:hover:border-primary-700 transition-colors text-start"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Chat Messages */}
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex gap-2 items-start ${
                    msg.role === 'user' ? 'flex-row-reverse' : ''
                  }`}
                >
                  <div
                    className={`flex items-center justify-center w-7 h-7 rounded-full shrink-0 ${
                      msg.role === 'user'
                        ? 'bg-accent-100 dark:bg-accent-900/40'
                        : 'bg-primary-100 dark:bg-primary-900/40'
                    }`}
                  >
                    {msg.role === 'user' ? (
                      <User className="w-4 h-4 text-accent-700 dark:text-accent-300" />
                    ) : (
                      <Bot className="w-4 h-4 text-primary-700 dark:text-primary-300" />
                    )}
                  </div>
                  <div
                    className={`rounded-2xl px-3 py-2 text-sm max-w-[85%] ${
                      msg.role === 'user'
                        ? 'bg-primary-100 dark:bg-primary-900/40 text-gray-800 dark:text-sand-200 rounded-tr-sm'
                        : 'bg-sand-100 dark:bg-navy-800 text-gray-800 dark:text-sand-200 rounded-tl-sm'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.content}</p>

                    {/* Sources */}
                    {msg.sources &&
                      Object.keys(msg.sources).length > 0 && (
                        <div className="mt-2 pt-2 border-t border-sand-200 dark:border-navy-600">
                          {Object.entries(msg.sources).map(
                            ([category, items]) => (
                              <div key={category} className="mt-1">
                                <p className="text-xs font-medium text-gray-500 dark:text-sand-400 mb-1">
                                  {category}
                                </p>
                                <div className="flex flex-wrap gap-1">
                                  {items.map((item, idx) => (
                                    <a
                                      key={idx}
                                      href={item.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-xs text-primary-600 dark:text-primary-400 hover:underline"
                                    >
                                      {item.title}
                                    </a>
                                  ))}
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      )}
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {loading && (
                <div className="flex gap-2 items-start">
                  <div className="flex items-center justify-center w-7 h-7 rounded-full bg-primary-100 dark:bg-primary-900/40 shrink-0">
                    <Bot className="w-4 h-4 text-primary-700 dark:text-primary-300" />
                  </div>
                  <div className="bg-sand-100 dark:bg-navy-800 rounded-2xl rounded-tl-sm px-3 py-2 text-sm text-gray-500 dark:text-sand-400 flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {t('thinking')}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="shrink-0 border-t border-sand-200 dark:border-navy-700 bg-white dark:bg-navy-800 p-3">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={t('placeholder')}
                  disabled={loading}
                  className="flex-1 rounded-xl border border-sand-200 dark:border-navy-600 bg-sand-50 dark:bg-navy-900 px-3 py-2 text-sm text-gray-900 dark:text-sand-100 placeholder-gray-400 dark:placeholder-sand-500 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 disabled:opacity-50 transition-colors"
                  dir="auto"
                />
                <button
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim() || loading}
                  className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary-700 dark:bg-primary-600 text-white hover:bg-primary-800 dark:hover:bg-primary-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0"
                  aria-label={t('send')}
                >
                  <Send className={`w-4 h-4 ${rtl ? 'rotate-180' : ''}`} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB Button */}
      <motion.button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`fixed bottom-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-primary-700 dark:bg-primary-600 text-white shadow-lg hover:bg-primary-800 dark:hover:bg-primary-500 transition-colors ${
          rtl ? 'left-4 sm:left-6' : 'right-4 sm:right-6'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={
          !isOpen
            ? {
                boxShadow: [
                  '0 0 0 0 rgba(0, 102, 68, 0.4)',
                  '0 0 0 12px rgba(0, 102, 68, 0)',
                  '0 0 0 0 rgba(0, 102, 68, 0)',
                ],
              }
            : {}
        }
        transition={
          !isOpen
            ? { boxShadow: { duration: 2, repeat: Infinity, repeatDelay: 1 } }
            : {}
        }
        aria-label={isOpen ? 'Close chat' : t('title')}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
