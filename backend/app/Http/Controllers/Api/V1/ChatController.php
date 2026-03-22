<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\AcademicProgram;
use App\Models\Event;
use App\Models\Faculty;
use App\Models\LibraryItem;
use App\Models\NewsArticle;
use App\Models\Person;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ChatController extends Controller
{
    public function ask(Request $request): JsonResponse
    {
        $request->validate([
            'message' => 'required|string|max:500',
        ]);

        $message = $request->input('message');
        $locale = app()->getLocale();

        // Search across all content
        $context = $this->searchContent($message, $locale);

        // Try AI response if configured
        if (config('services.openai.key')) {
            return $this->aiResponse($message, $context, $locale);
        }

        // Fallback: structured response from search results
        return $this->structuredResponse($message, $context, $locale);
    }

    private function searchContent(string $query, string $locale): array
    {
        $context = [];

        // Search faculties
        $faculties = Faculty::where('is_active', true)
            ->where(function ($q) use ($query, $locale) {
                $q->whereRaw("JSON_EXTRACT(name, '$.{$locale}') LIKE ?", ["%{$query}%"])
                    ->orWhereRaw("JSON_EXTRACT(description, '$.{$locale}') LIKE ?", ["%{$query}%"]);
            })
            ->limit(3)->get();

        if ($faculties->isNotEmpty()) {
            $context['faculties'] = $faculties->map(fn ($f) => [
                'name' => $f->getTranslation('name', $locale, false),
                'description' => $f->getTranslation('description', $locale, false),
                'slug' => $f->slug,
            ])->toArray();
        }

        // Search programs
        $programs = AcademicProgram::where('is_published', true)
            ->where(function ($q) use ($query, $locale) {
                $q->whereRaw("JSON_EXTRACT(name, '$.{$locale}') LIKE ?", ["%{$query}%"])
                    ->orWhereRaw("JSON_EXTRACT(description, '$.{$locale}') LIKE ?", ["%{$query}%"]);
            })
            ->limit(3)->get();

        if ($programs->isNotEmpty()) {
            $context['programs'] = $programs->map(fn ($p) => [
                'name' => $p->getTranslation('name', $locale, false),
                'description' => $p->getTranslation('description', $locale, false),
                'slug' => $p->slug,
                'degree_level' => $p->degree_level,
                'duration' => $p->duration,
            ])->toArray();
        }

        // Search news
        $news = NewsArticle::where('is_published', true)
            ->where(function ($q) use ($query, $locale) {
                $q->whereRaw("JSON_EXTRACT(title, '$.{$locale}') LIKE ?", ["%{$query}%"])
                    ->orWhereRaw("JSON_EXTRACT(excerpt, '$.{$locale}') LIKE ?", ["%{$query}%"]);
            })
            ->limit(3)->get();

        if ($news->isNotEmpty()) {
            $context['news'] = $news->map(fn ($n) => [
                'title' => $n->getTranslation('title', $locale, false),
                'excerpt' => $n->getTranslation('excerpt', $locale, false),
                'slug' => $n->slug,
            ])->toArray();
        }

        // Search people
        $people = Person::whereRaw("JSON_EXTRACT(name, '$.{$locale}') LIKE ?", ["%{$query}%"])
            ->orWhereRaw("JSON_EXTRACT(title, '$.{$locale}') LIKE ?", ["%{$query}%"])
            ->limit(3)->get();

        if ($people->isNotEmpty()) {
            $context['people'] = $people->map(fn ($p) => [
                'name' => $p->getTranslation('name', $locale, false),
                'title' => $p->getTranslation('title', $locale, false),
                'slug' => $p->slug,
            ])->toArray();
        }

        // Search events
        $events = Event::where('is_published', true)
            ->where(function ($q) use ($query, $locale) {
                $q->whereRaw("JSON_EXTRACT(title, '$.{$locale}') LIKE ?", ["%{$query}%"])
                    ->orWhereRaw("JSON_EXTRACT(description, '$.{$locale}') LIKE ?", ["%{$query}%"]);
            })
            ->limit(3)->get();

        if ($events->isNotEmpty()) {
            $context['events'] = $events->map(fn ($e) => [
                'title' => $e->getTranslation('title', $locale, false),
                'description' => $e->getTranslation('description', $locale, false),
                'slug' => $e->slug,
                'starts_at' => $e->starts_at?->toDateString(),
            ])->toArray();
        }

        // Search library
        $library = LibraryItem::where('is_published', true)
            ->where(function ($q) use ($query, $locale) {
                $q->whereRaw("JSON_EXTRACT(title, '$.{$locale}') LIKE ?", ["%{$query}%"])
                    ->orWhereRaw("JSON_EXTRACT(description, '$.{$locale}') LIKE ?", ["%{$query}%"]);
            })
            ->limit(3)->get();

        if ($library->isNotEmpty()) {
            $context['library'] = $library->map(fn ($l) => [
                'title' => $l->getTranslation('title', $locale, false),
                'type' => $l->type,
                'slug' => $l->slug,
            ])->toArray();
        }

        return $context;
    }

    private function aiResponse(string $message, array $context, string $locale): JsonResponse
    {
        $isAr = $locale === 'ar';
        $systemPrompt = $isAr
            ? 'أنت مساعد جامعة الأزهر الذكي. أجب عن الأسئلة المتعلقة بالجامعة باستخدام المعلومات المتاحة. كن مختصراً ومفيداً. أجب بالعربية.'
            : "You are Al-Azhar University's AI assistant. Answer questions about the university using the available information. Be concise and helpful. Answer in {$locale}.";

        $contextText = json_encode($context, JSON_UNESCAPED_UNICODE);

        try {
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . config('services.openai.key'),
                'Content-Type' => 'application/json',
            ])->timeout(30)->post('https://api.openai.com/v1/chat/completions', [
                'model' => 'gpt-4o-mini',
                'messages' => [
                    ['role' => 'system', 'content' => $systemPrompt],
                    ['role' => 'user', 'content' => "Context from university database:\n{$contextText}\n\nUser question: {$message}"],
                ],
                'max_tokens' => 500,
                'temperature' => 0.7,
            ]);

            if ($response->successful()) {
                $aiText = $response->json('choices.0.message.content', '');

                return response()->json([
                    'reply' => $aiText,
                    'sources' => $context,
                    'ai' => true,
                ]);
            }
        } catch (\Exception $e) {
            // Fall through to structured response
        }

        return $this->structuredResponse($message, $context, $locale);
    }

    private function structuredResponse(string $message, array $context, string $locale): JsonResponse
    {
        $isAr = $locale === 'ar';

        if (empty($context)) {
            $reply = $isAr
                ? 'عذراً، لم أجد معلومات محددة حول سؤالك. يمكنك تصفح أقسام الموقع المختلفة أو التواصل معنا عبر صفحة الاتصال.'
                : "I couldn't find specific information about your question. You can browse the different sections of our website or contact us through the contact page.";

            return response()->json([
                'reply' => $reply,
                'sources' => [],
                'ai' => false,
            ]);
        }

        // Build a helpful reply from search results
        $parts = [];

        if (! empty($context['faculties'])) {
            $header = $isAr ? 'الكليات والمعاهد:' : 'Faculties & Institutes:';
            $items = array_map(fn ($f) => '• ' . $f['name'] . ($f['description'] ? ' - ' . mb_substr($f['description'], 0, 100) : ''), $context['faculties']);
            $parts[] = $header . "\n" . implode("\n", $items);
        }

        if (! empty($context['programs'])) {
            $header = $isAr ? 'البرامج الأكاديمية:' : 'Academic Programs:';
            $items = array_map(fn ($p) => '• ' . $p['name'] . ($p['degree_level'] ? " ({$p['degree_level']})" : '') . ($p['duration'] ? " - {$p['duration']}" : ''), $context['programs']);
            $parts[] = $header . "\n" . implode("\n", $items);
        }

        if (! empty($context['news'])) {
            $header = $isAr ? 'أخبار ذات صلة:' : 'Related News:';
            $items = array_map(fn ($n) => '• ' . $n['title'], $context['news']);
            $parts[] = $header . "\n" . implode("\n", $items);
        }

        if (! empty($context['people'])) {
            $header = $isAr ? 'شخصيات:' : 'People:';
            $items = array_map(fn ($p) => '• ' . $p['name'] . ($p['title'] ? " - {$p['title']}" : ''), $context['people']);
            $parts[] = $header . "\n" . implode("\n", $items);
        }

        if (! empty($context['events'])) {
            $header = $isAr ? 'فعاليات:' : 'Events:';
            $items = array_map(fn ($e) => '• ' . $e['title'] . ($e['starts_at'] ? " ({$e['starts_at']})" : ''), $context['events']);
            $parts[] = $header . "\n" . implode("\n", $items);
        }

        if (! empty($context['library'])) {
            $header = $isAr ? 'من المكتبة الرقمية:' : 'From the Digital Library:';
            $items = array_map(fn ($l) => "• {$l['title']} ({$l['type']})", $context['library']);
            $parts[] = $header . "\n" . implode("\n", $items);
        }

        $intro = $isAr ? 'إليك ما وجدته:' : 'Here is what I found:';
        $reply = $intro . "\n\n" . implode("\n\n", $parts);

        return response()->json([
            'reply' => $reply,
            'sources' => $context,
            'ai' => false,
        ]);
    }
}
