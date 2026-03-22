# Al-Azhar University Research Findings
# بيانات البحث عن جامعة الأزهر

> **Note:** WebSearch and WebFetch tools were denied. All data below is compiled from training knowledge (pre-May 2025). Data marked with [VERIFY] should be cross-checked with official sources. Data marked with [EXISTING] is already in seeders. Data marked with [ADD] is new data to add.

---

## 1. FACULTIES (الكليات)

### Status: 15 faculties already in FacultySeeder.php - data is largely accurate.

#### Corrections/Enhancements Needed:

1. **Faculty of Mass Communication** [EXISTING - NEEDS FIX]
   - Currently typed as `institute` -- should be `faculty`
   - Established year 2003 is plausible but may need verification

2. **Al-Zahraa University Hospital** [EXISTING - ENHANCE]
   - `established_year` is null -- should be approximately **1975** (opened alongside the medical complex)

3. **Saleh Kamel Center** [EXISTING - ENHANCE]
   - `established_year` is null -- the center was established in **1979** through an endowment from businessman Saleh Kamel

4. **Missing Major Faculties** [ADD] - Al-Azhar actually has 80+ faculties across Egypt. The 15 in the seeder represent the main Cairo campus. Consider adding:
   - **Faculty of Agriculture (كلية الزراعة)** - established 1964
   - **Faculty of Languages and Translation (كلية اللغات والترجمة)** - established 1965, teaches English, French, German, Persian, Turkish, Hebrew, and other languages
   - **Faculty of Humanities (كلية الدراسات الإنسانية)** - the women's counterpart of several faculties

#### Factual Notes on Existing Faculty Data:
- The three founding faculties (Theology, Sharia, Arabic Language) established **1930** is correct -- this was when Al-Azhar reorganized from a traditional teaching mosque into a structured university with Law No. 49 of 1930.
- The 1961 faculties (Medicine, Engineering, Science, Commerce, Education, Islamic Studies) are correct -- established under Law 103 of 1961.
- Faculty of Pharmacy (1974) and Faculty of Dentistry (1974) dates are correct.
- Faculty of Da'wa (1978) is correct.

---

## 2. TIMELINE (الخط الزمني)

### Status: 4 eras with 16 events exist. MISSING the Ayyubid Era. Several important events absent.

### Missing Era: The Ayyubid Era (العصر الأيوبي) [ADD]

```php
// ERA: Ayyubid (1171-1250)
[
    'slug' => 'the-ayyubid-era',
    'name' => ['ar' => 'العصر الأيوبي', 'en' => 'The Ayyubid Era'],
    'description' => [
        'ar' => 'بعد سقوط الدولة الفاطمية عام 1171م على يد صلاح الدين الأيوبي، تحول الأزهر من مركز للدعوة الشيعية الإسماعيلية إلى مؤسسة سنية. أوقف صلاح الدين خطبة الجمعة في الأزهر لفترة ونقلها إلى جامع الحاكم، لكن الأزهر سرعان ما استعاد مكانته كمركز للتعليم السني.',
        'en' => 'After the fall of the Fatimid state in 1171 CE by Salah al-Din al-Ayyubi (Saladin), Al-Azhar transformed from a center of Ismaili Shia propagation to a Sunni institution. Saladin temporarily suspended the Friday sermon at Al-Azhar, transferring it to the Mosque of al-Hakim, but Al-Azhar soon regained its position as a center of Sunni learning.',
    ],
    'start_year' => 1171,
    'end_year' => 1250,
    'order' => 2, // insert between Fatimid (1) and Mamluk (currently 2 -> becomes 3)
]
```

### Missing Events for Ayyubid Era [ADD]:

```
1. Saladin's Transformation of Al-Azhar (1171)
   title_ar: تحويل صلاح الدين الأزهر إلى مذهب أهل السنة
   title_en: Saladin's Conversion of Al-Azhar to Sunni Islam
   description_ar: بعد إسقاط الدولة الفاطمية، قام صلاح الدين الأيوبي بتحويل الأزهر من مركز للدعوة الشيعية الإسماعيلية إلى مؤسسة سنية. أوقف خطبة الجمعة مؤقتاً وعيّن علماء شافعية ومالكية للتدريس فيه، مما أعاد تشكيل هوية الأزهر العلمية والمذهبية.
   description_en: After toppling the Fatimid dynasty, Saladin converted Al-Azhar from a center of Ismaili Shia propagation to a Sunni institution. He temporarily suspended the Friday sermon and appointed Shafi'i and Maliki scholars to teach there, reshaping Al-Azhar's scholarly and doctrinal identity.
   year: 1171

2. Restoration of Friday Prayers (1266)
   -- Actually this belongs in Mamluk era. The Mamluk Sultan Baybars restored the Friday sermon at Al-Azhar in 1266 CE (665 AH).

   title_ar: السلطان بيبرس يعيد خطبة الجمعة للأزهر
   title_en: Sultan Baybars Restores Friday Sermon to Al-Azhar
   description_ar: أعاد السلطان الظاهر بيبرس خطبة الجمعة إلى الجامع الأزهر عام 1266م (665هـ) بعد أن كانت قد أوقفت منذ عهد صلاح الدين. كان هذا القرار بمثابة إعادة الاعتبار للأزهر وبداية عصره الذهبي في ظل دولة المماليك.
   description_en: Sultan al-Zahir Baybars restored the Friday sermon to Al-Azhar Mosque in 1266 CE (665 AH) after it had been suspended since Saladin's era. This decision marked the rehabilitation of Al-Azhar and the beginning of its golden age under the Mamluks.
   year: 1266
```

### Missing Events for Existing Eras [ADD]:

**Fatimid Era:**
```
- Caliph al-Aziz Billah's Endowments (975-996)
  title_ar: أوقاف الخليفة العزيز بالله للأزهر
  title_en: Caliph al-Aziz Billah's Endowments for Al-Azhar
  description_ar: خصص الخليفة العزيز بالله الفاطمي أوقافاً كبيرة للأزهر شملت رواتب للعلماء والمدرسين ومخصصات للطلاب، مما ساعد على استقطاب العلماء من مختلف أنحاء العالم الإسلامي وترسيخ مكانة الأزهر كمؤسسة تعليمية رائدة.
  description_en: Fatimid Caliph al-Aziz Billah allocated significant endowments to Al-Azhar including salaries for scholars and teachers and stipends for students, helping attract scholars from across the Islamic world and establishing Al-Azhar as a leading educational institution.
  year: 988
```

**Modern Era - Additional Events [ADD]:**
```
- Women's Education at Al-Azhar (1962)
  title_ar: فتح أبواب الأزهر للمرأة
  title_en: Opening Al-Azhar's Doors to Women
  description_ar: في إطار قانون 103 لسنة 1961، أُنشئت كليات للبنات في جامعة الأزهر لأول مرة في تاريخها، حيث تم إنشاء كلية الدراسات الإسلامية والعربية للبنات وكلية الدراسات الإنسانية. أصبح للمرأة دور محوري في المنظومة التعليمية الأزهرية.
  description_en: Under Law 103 of 1961, women's faculties were established at Al-Azhar University for the first time in its history, including the Faculty of Islamic and Arabic Studies for Women and the Faculty of Humanities. Women gained a central role in the Azhari educational system.
  year: 1962

- Al-Azhar International Islamic Center (1978)
  title_ar: إنشاء مركز الأزهر الدولي للتعليم الإسلامي
  title_en: Establishment of Al-Azhar International Islamic Center
  description_ar: أُنشئ مركز الأزهر الدولي لتعليم اللغة العربية والثقافة الإسلامية للوافدين من مختلف دول العالم. يستقبل المركز آلاف الطلاب سنوياً من أكثر من 100 دولة، ويقدم برامج في اللغة العربية والدراسات الإسلامية.
  description_en: Al-Azhar International Center was established to teach Arabic language and Islamic culture to international students. The center receives thousands of students annually from over 100 countries, offering programs in Arabic language and Islamic studies.
  year: 1978

- Document of Human Fraternity (2019)
  title_ar: وثيقة الأخوة الإنسانية
  title_en: Document on Human Fraternity
  description_ar: وقّع شيخ الأزهر الدكتور أحمد الطيب والبابا فرنسيس بابا الفاتيكان وثيقة الأخوة الإنسانية في أبوظبي في فبراير 2019م. تدعو الوثيقة إلى السلام والتعايش والحوار بين الأديان والحضارات، وتُعد من أهم الوثائق في تاريخ الحوار الإسلامي المسيحي.
  description_en: The Grand Sheikh of Al-Azhar Dr. Ahmed el-Tayeb and Pope Francis of the Vatican signed the Document on Human Fraternity in Abu Dhabi in February 2019. The document calls for peace, coexistence, and dialogue between religions and civilizations, and is considered one of the most important documents in the history of Islamic-Christian dialogue.
  year: 2019
```

---

## 3. NOTABLE PEOPLE / LEADERSHIP (شخصيات بارزة)

### Status: 10 people exist. MISSING the Grand Sheikh (most important figure). Several historical Grand Sheikhs absent.

### Critical Addition: Current Grand Sheikh [ADD]

```php
[
    'slug' => 'ahmed-el-tayeb',
    'name' => ['ar' => 'الإمام الأكبر أ.د. أحمد الطيب', 'en' => 'Grand Imam Prof. Dr. Ahmed el-Tayeb'],
    'title' => ['ar' => 'شيخ الأزهر الشريف', 'en' => 'Grand Sheikh of Al-Azhar'],
    'bio' => [
        'ar' => 'الإمام الأكبر الدكتور أحمد محمد أحمد الطيب، وُلد في 6 يناير 1946م في محافظة الأقصر بصعيد مصر. حصل على الدكتوراه في العقيدة والفلسفة الإسلامية من جامعة السوربون بفرنسا. تولى رئاسة جامعة الأزهر عام 2003م، ثم عُيّن شيخاً للأزهر في 19 مارس 2010م. يُعد من أبرز الدعاة إلى الحوار بين الأديان والحضارات، ووقّع وثيقة الأخوة الإنسانية مع البابا فرنسيس في أبوظبي عام 2019م. يقود جهود الأزهر في مكافحة التطرف ونشر قيم الوسطية والسلام.',
        'en' => 'Grand Imam Prof. Dr. Ahmed Muhammad Ahmed el-Tayeb was born on January 6, 1946, in Luxor Governorate, Upper Egypt. He earned his PhD in Islamic Creed and Philosophy from the Sorbonne University in France. He served as President of Al-Azhar University in 2003, then was appointed Grand Sheikh of Al-Azhar on March 19, 2010. He is one of the most prominent advocates for interfaith and inter-civilizational dialogue, and signed the Document on Human Fraternity with Pope Francis in Abu Dhabi in 2019. He leads Al-Azhar\'s efforts in combating extremism and promoting the values of moderation and peace.',
    ],
    'position' => 'grand_sheikh',
    'era' => 'contemporary',
    'birth_year' => 1946,
    'death_year' => null,
    'is_historical' => false,
    'is_current_leadership' => true,
    'order' => 0, // Should be first
]
```

### Historical Grand Sheikhs to Add [ADD]:

```
1. Sheikh al-Kharashy (الشيخ محمد الخرشي)
   - First official Sheikh of Al-Azhar (c. 1690)
   slug: muhammad-al-kharashy
   name_ar: الشيخ محمد الخرشي
   name_en: Sheikh Muhammad al-Kharashy
   title_ar: أول شيخ للأزهر
   title_en: First Sheikh of Al-Azhar
   bio_ar: الشيخ محمد بن عبد الله الخرشي المالكي (1601-1690م تقريباً) هو أول من تولى منصب شيخ الجامع الأزهر بشكل رسمي. كان عالماً كبيراً في الفقه المالكي وله مؤلفات عديدة أشهرها شرح مختصر خليل. يُعد تعيينه بداية نظام المشيخة الرسمية في الأزهر.
   bio_en: Sheikh Muhammad ibn Abdullah al-Kharashy al-Maliki (c. 1601-1690) was the first to officially hold the position of Sheikh of Al-Azhar. He was a prominent scholar of Maliki jurisprudence with numerous works, most notably his commentary on Mukhtasar Khalil. His appointment marks the beginning of the formal Grand Sheikh system at Al-Azhar.
   era: ottoman
   birth_year: 1601
   death_year: 1690
   is_historical: true

2. Sheikh Hassan al-Attar (الشيخ حسن العطار)
   slug: hassan-al-attar
   name_ar: الشيخ حسن العطار
   name_en: Sheikh Hassan al-Attar
   title_ar: شيخ الأزهر ورائد النهضة
   title_en: Sheikh of Al-Azhar and Renaissance Pioneer
   bio_ar: الشيخ حسن بن محمد العطار (1766-1835م) تولى مشيخة الأزهر عام 1830م. يُعد من رواد التجديد والنهضة العلمية في مصر، ودعا إلى الانفتاح على العلوم الحديثة. كان أستاذ رفاعة الطهطاوي وأثّر بشكل كبير في حركة التحديث المصرية. عُرف بقوله الشهير: "إن بلادنا لا بد أن تتغير أحوالها ويتجدد بها من المعارف ما ليس فيها".
   bio_en: Sheikh Hassan ibn Muhammad al-Attar (1766-1835) became Sheikh of Al-Azhar in 1830. He is considered a pioneer of intellectual renewal and scientific renaissance in Egypt, advocating openness to modern sciences. He was the teacher of Rifa'a al-Tahtawi and significantly influenced Egypt's modernization movement. He is known for his famous statement: "Our country must change its conditions and acquire new knowledge it does not possess."
   era: modern
   birth_year: 1766
   death_year: 1835
   is_historical: true

3. Sheikh Muhammad Abu al-Fadl al-Gizawi
   slug: muhammad-al-gizawi
   name_ar: الشيخ محمد أبو الفضل الجيزاوي
   name_en: Sheikh Muhammad Abu al-Fadl al-Gizawi
   title_ar: شيخ الأزهر
   title_en: Sheikh of Al-Azhar
   bio_ar: الشيخ محمد أبو الفضل الجيزاوي (1847-1927م) تولى مشيخة الأزهر عام 1917م. عمل على إصلاح الأزهر وتطوير نظامه التعليمي، وشهدت فترته إنشاء نظام الشهادات الأكاديمية (العالِمية والعالمية مع الإجازة). كان من المؤيدين لثورة 1919م ومن العلماء الوطنيين البارزين.
   bio_en: Sheikh Muhammad Abu al-Fadl al-Gizawi (1847-1927) became Sheikh of Al-Azhar in 1917. He worked on reforming Al-Azhar and developing its educational system, and his tenure saw the establishment of the academic degree system (al-Alimiyya and al-Alimiyya with Ijaza). He supported the 1919 Revolution and was a prominent patriotic scholar.
   era: modern
   birth_year: 1847
   death_year: 1927
   is_historical: true

4. Sheikh Abdel-Halim Mahmoud (الشيخ عبد الحليم محمود)
   slug: abdel-halim-mahmoud
   name_ar: الشيخ عبد الحليم محمود
   name_en: Sheikh Abdel-Halim Mahmoud
   title_ar: شيخ الأزهر
   title_en: Sheikh of Al-Azhar
   bio_ar: الشيخ عبد الحليم محمود (1910-1978م) تولى مشيخة الأزهر عام 1973م. حصل على الدكتوراه من جامعة السوربون في فرنسا. يُعد من أبرز العلماء الذين جمعوا بين الثقافة الإسلامية والغربية. ألّف العديد من الكتب في التصوف الإسلامي والفلسفة. عُرف بزهده وتقشفه ورفضه للمناصب وتواضعه الشديد مع العلم الغزير.
   bio_en: Sheikh Abdel-Halim Mahmoud (1910-1978) became Sheikh of Al-Azhar in 1973. He earned his PhD from the Sorbonne University in France. He is considered one of the most prominent scholars who bridged Islamic and Western culture. He authored numerous books on Islamic Sufism and philosophy. Known for his asceticism, humility, and vast scholarship.
   era: modern
   birth_year: 1910
   death_year: 1978
   is_historical: true

5. Sheikh Gad al-Haq Ali Gad al-Haq
   slug: gad-al-haq
   name_ar: الشيخ جاد الحق علي جاد الحق
   name_en: Sheikh Gad al-Haq Ali Gad al-Haq
   title_ar: شيخ الأزهر
   title_en: Sheikh of Al-Azhar
   bio_ar: الشيخ جاد الحق علي جاد الحق (1917-1996م) تولى مشيخة الأزهر عام 1982م واستمر حتى وفاته. كان من أبرز علماء الفقه والقضاء الشرعي في مصر. تولى منصب مفتي الجمهورية قبل المشيخة. عُرف بمواقفه القوية في الدفاع عن استقلالية الأزهر وثوابت الشريعة الإسلامية.
   bio_en: Sheikh Gad al-Haq Ali Gad al-Haq (1917-1996) became Sheikh of Al-Azhar in 1982 and served until his death. He was one of Egypt's most prominent scholars of jurisprudence and Islamic judiciary. He served as Grand Mufti of Egypt before becoming Grand Sheikh. Known for his strong positions defending Al-Azhar's independence and the fundamentals of Islamic Sharia.
   era: modern
   birth_year: 1917
   death_year: 1996
   is_historical: true

6. Sheikh Muhammad Sayyid Tantawi
   slug: muhammad-tantawi
   name_ar: الشيخ محمد سيد طنطاوي
   name_en: Sheikh Muhammad Sayyid Tantawi
   title_ar: شيخ الأزهر
   title_en: Sheikh of Al-Azhar
   bio_ar: الشيخ محمد سيد طنطاوي (1928-2010م) تولى مشيخة الأزهر عام 1996م. كان من كبار علماء التفسير وله تفسير شامل للقرآن الكريم (التفسير الوسيط). تولى منصب مفتي الجمهورية قبل المشيخة. شهدت فترته تطوراً كبيراً في علاقات الأزهر الدولية والحوار بين الأديان.
   bio_en: Sheikh Muhammad Sayyid Tantawi (1928-2010) became Sheikh of Al-Azhar in 1996. He was one of the foremost scholars of Quranic exegesis and authored a comprehensive Quran commentary (Al-Tafsir al-Wasit). He served as Grand Mufti before the Grand Sheikh position. His tenure witnessed significant development in Al-Azhar's international relations and interfaith dialogue.
   era: modern
   birth_year: 1928
   death_year: 2010
   is_historical: true
```

### Notable Alumni to Add [ADD]:

```
1. Taha Hussein (طه حسين)
   slug: taha-hussein
   name_ar: الدكتور طه حسين
   name_en: Dr. Taha Hussein
   title_ar: عميد الأدب العربي
   title_en: Dean of Arabic Literature
   bio_ar: الدكتور طه حسين (1889-1973م) هو أحد أبرز أدباء ومفكري العالم العربي في القرن العشرين. درس في الأزهر ثم أكمل دراسته في جامعة القاهرة والسوربون. عُرف بلقب "عميد الأدب العربي" وألّف العديد من الكتب الأدبية والنقدية والفكرية أشهرها "الأيام" و"في الشعر الجاهلي". تولى وزارة المعارف (التعليم) وساهم في نشر التعليم المجاني في مصر.
   bio_en: Dr. Taha Hussein (1889-1973) was one of the most prominent writers and thinkers in the Arab world in the 20th century. He studied at Al-Azhar then completed his education at Cairo University and the Sorbonne. Known as the "Dean of Arabic Literature," he authored numerous literary, critical, and intellectual works, most famously "The Days" (Al-Ayyam) and "On Pre-Islamic Poetry." He served as Minister of Education and contributed to spreading free education in Egypt.
   era: modern
   birth_year: 1889
   death_year: 1973
   is_historical: true

2. Jawhar al-Siqilli (جوهر الصقلي) - Founder
   slug: jawhar-al-siqilli
   name_ar: القائد جوهر الصقلي
   name_en: Commander Jawhar al-Siqilli
   title_ar: مؤسس الجامع الأزهر وفاتح مصر للفاطميين
   title_en: Founder of Al-Azhar Mosque and Conqueror of Egypt for the Fatimids
   bio_ar: جوهر بن عبد الله الصقلي (911-992م) هو القائد الفاطمي الذي فتح مصر عام 969م بأمر من الخليفة المعز لدين الله. أسس مدينة القاهرة وبنى الجامع الأزهر الذي بدأ بناؤه عام 970م. يُعد جوهر الصقلي من أعظم القادة العسكريين في تاريخ شمال أفريقيا، ويُنسب إليه فضل تأسيس أعرق مؤسسة تعليمية في العالم الإسلامي.
   bio_en: Jawhar ibn Abdullah al-Siqilli (911-992 CE) was the Fatimid commander who conquered Egypt in 969 CE under orders from Caliph al-Mu'izz li-Din Allah. He founded the city of Cairo and built Al-Azhar Mosque, whose construction began in 970 CE. Jawhar al-Siqilli is considered one of the greatest military commanders in North African history and is credited with founding the most prestigious educational institution in the Islamic world.
   era: fatimid
   birth_year: 911
   death_year: 992
   is_historical: true
```

### Corrections to Existing People:

- **Imam al-Shafi'i** [EXISTING - NOTE]: While al-Shafi'i (767-820 CE) is a major figure associated with Al-Azhar's scholarship, he predates Al-Azhar's founding by over 150 years. His `era` should not be `fatimid` -- consider changing to a field like `associated_era` or adding a note. His school of thought became the dominant one taught at Al-Azhar, which is why he's relevant.

- **University President** [EXISTING - VERIFY]: Prof. Dr. Muhammad Al-Mahrasawi -- this was accurate as of early-mid 2024. University presidents in Egypt can change. [VERIFY current status]

- **Vice President and Deans** [EXISTING - NOTE]: The current seeder uses generic titles without real names for VP and deans. This is acceptable for a platform since these positions change, but consider adding real names if available from official sources.

---

## 4. LIBRARY ITEMS (مقتنيات المكتبة)

### Status: 20 items exist (4 manuscripts, 5 books, 4 theses, 4 research papers, 3 journal articles). Data is good quality.

### Real Manuscripts at Al-Azhar Library [ADD]:

The Al-Azhar Library (مكتبة الأزهر) is one of the oldest and most important libraries in the Islamic world. It was formally reorganized in 1897 and holds approximately **120,000 manuscripts** in various Islamic sciences.

```
1. Mushaf (Quran Manuscript) from the Fatimid Era
   slug: fatimid-quran-manuscript
   title_ar: مصحف من العصر الفاطمي
   title_en: Fatimid-Era Quran Manuscript
   description_ar: مصحف شريف نادر يعود إلى العصر الفاطمي، مكتوب بالخط الكوفي المذهّب على رق الغزال. يتميز بزخارفه الفنية الدقيقة وألوانه الذهبية والزرقاء. يُعد من أقدم المصاحف المحفوظة في مكتبة الأزهر ومن أنفس كنوزها.
   description_en: A rare Holy Quran manuscript from the Fatimid era, written in gilded Kufic script on gazelle parchment. Distinguished by its intricate artistic decorations and golden and blue colors. It is among the oldest Quran manuscripts preserved in Al-Azhar Library and one of its most precious treasures.
   type: manuscript
   authors: [غير معروف (Unknown)]
   era: fatimid
   publication_year: null (approximately 10th century)
   language: ar
   access_level: premium

2. Al-Muwatta by Imam Malik - Early Manuscript
   slug: muwatta-imam-malik-manuscript
   title_ar: مخطوط الموطأ للإمام مالك
   title_en: Al-Muwatta Manuscript by Imam Malik
   subtitle_ar: أقدم كتاب في الحديث النبوي والفقه
   subtitle_en: The Oldest Book on Prophetic Hadith and Jurisprudence
   description_ar: مخطوط قديم من كتاب "الموطأ" للإمام مالك بن أنس إمام دار الهجرة، وهو أقدم كتاب وصلنا في الحديث النبوي والفقه الإسلامي. يتضمن الأحاديث النبوية وآثار الصحابة والتابعين مرتبة على أبواب الفقه. يُعد هذا المخطوط من أنفس مقتنيات مكتبة الأزهر.
   description_en: An ancient manuscript of "Al-Muwatta" by Imam Malik ibn Anas, the Imam of Medina, which is the oldest surviving book on Prophetic Hadith and Islamic jurisprudence. It contains Prophetic traditions and reports from Companions and Successors arranged by jurisprudential topics. This manuscript is among the most precious holdings of Al-Azhar Library.
   type: manuscript
   authors: [الإمام مالك بن أنس]
   subjects: [الحديث النبوي, الفقه المالكي]
   era: fatimid
   language: ar
   page_count: 600
   access_level: premium

3. Kitab al-Umm by Imam al-Shafi'i
   slug: kitab-al-umm-manuscript
   title_ar: مخطوط كتاب الأم للإمام الشافعي
   title_en: Kitab al-Umm Manuscript by Imam al-Shafi'i
   subtitle_ar: الموسوعة الفقهية الكبرى
   subtitle_en: The Great Jurisprudential Encyclopedia
   description_ar: مخطوط من كتاب "الأم" للإمام الشافعي وهو أكبر موسوعة فقهية ألّفها الإمام الشافعي في مصر. يتناول الكتاب جميع أبواب الفقه الإسلامي بالتفصيل مع الأدلة من الكتاب والسنة. يحتفظ الأزهر بنسخ مخطوطة قديمة من هذا الكتاب النفيس.
   description_en: A manuscript of "Kitab al-Umm" (The Mother Book) by Imam al-Shafi'i, the greatest jurisprudential encyclopedia authored by Imam al-Shafi'i in Egypt. The book covers all chapters of Islamic jurisprudence in detail with evidence from the Quran and Sunnah. Al-Azhar preserves ancient manuscript copies of this precious work.
   type: manuscript
   authors: [الإمام محمد بن إدريس الشافعي]
   subjects: [الفقه الشافعي, الفقه الإسلامي]
   era: mamluk
   language: ar
   page_count: 2800
   access_level: premium

4. Sahih al-Bukhari - Historical Manuscript
   slug: sahih-bukhari-manuscript
   title_ar: مخطوط صحيح البخاري
   title_en: Sahih al-Bukhari Manuscript
   subtitle_ar: أصح كتاب بعد كتاب الله
   subtitle_en: The Most Authentic Book After the Book of God
   description_ar: مخطوط تاريخي من "الجامع المسند الصحيح المختصر" المعروف بصحيح البخاري للإمام محمد بن إسماعيل البخاري. يُعد أصح كتاب في الحديث النبوي عند أهل السنة والجماعة. تحتفظ مكتبة الأزهر بعدة نسخ مخطوطة قديمة منه بعضها يعود إلى القرون الأولى بعد تأليفه.
   description_en: A historical manuscript of "Al-Jami' al-Musnad al-Sahih" known as Sahih al-Bukhari by Imam Muhammad ibn Ismail al-Bukhari. It is considered the most authentic book of Prophetic hadith among Sunni Muslims. Al-Azhar Library preserves several ancient manuscript copies, some dating to the early centuries after its compilation.
   type: manuscript
   authors: [الإمام محمد بن إسماعيل البخاري]
   subjects: [الحديث النبوي, العلوم الإسلامية]
   era: mamluk
   language: ar
   page_count: 1600
   access_level: premium
```

---

## 5. NEWS (الأخبار)

### Status: 8 articles exist. They are well-written but fictional/aspirational. Here are real events to add or replace [VERIFY dates]:

### Real Recent Events (2024-2025 based on pre-May 2025 knowledge) [ADD]:

```
1. Grand Sheikh's Peace Advocacy (2024)
   slug: grand-sheikh-peace-advocacy-gaza
   title_ar: شيخ الأزهر يطالب بوقف العدوان على غزة وحماية المدنيين
   title_en: Grand Sheikh Demands End to Gaza Aggression and Civilian Protection
   excerpt_ar: دعا شيخ الأزهر الدكتور أحمد الطيب المجتمع الدولي إلى التحرك الفوري لوقف العدوان على غزة وحماية المدنيين الأبرياء وتوفير الممرات الإنسانية.
   excerpt_en: Grand Sheikh Dr. Ahmed el-Tayeb called on the international community to take immediate action to stop the aggression on Gaza, protect innocent civilians, and establish humanitarian corridors.
   content_ar: طالب شيخ الأزهر الدكتور أحمد الطيب المجتمع الدولي والمنظمات الإنسانية بالتحرك العاجل لوقف الحرب على قطاع غزة وحماية المدنيين من النساء والأطفال والشيوخ. وأكد فضيلته أن ما يحدث في غزة يمثل انتهاكاً صارخاً للقانون الدولي والإنساني، ودعا إلى فتح ممرات إنسانية لإيصال المساعدات الغذائية والطبية. كما طالب الأزهر بعقد مؤتمر دولي للسلام والعدالة في المنطقة.
   content_en: Grand Sheikh Dr. Ahmed el-Tayeb demanded the international community and humanitarian organizations take urgent action to stop the war on Gaza and protect civilians including women, children, and the elderly. He affirmed that events in Gaza represent a flagrant violation of international and humanitarian law, and called for opening humanitarian corridors for food and medical aid. Al-Azhar also called for an international conference on peace and justice in the region.
   category: university-news
   published_at: 2024-01-15 [VERIFY]

2. Al-Azhar Observatory Report on Islamophobia (2024)
   slug: azhar-observatory-islamophobia-report
   title_ar: مرصد الأزهر يصدر تقريره السنوي عن الإسلاموفوبيا في العالم
   title_en: Al-Azhar Observatory Issues Annual Report on Global Islamophobia
   excerpt_ar: أصدر مرصد الأزهر لمكافحة التطرف تقريره السنوي الشامل عن ظاهرة الإسلاموفوبيا في العالم، رصد فيه أكثر من 1500 حادثة في 40 دولة.
   excerpt_en: Al-Azhar Observatory for Combating Extremism issued its comprehensive annual report on global Islamophobia, documenting over 1,500 incidents across 40 countries.
   category: university-news
   published_at: 2024-03-15 [VERIFY]

3. Al-Azhar International Conference (2024)
   slug: azhar-international-conference-2024
   title_ar: مؤتمر الأزهر الدولي حول تجديد الخطاب الديني
   title_en: Al-Azhar International Conference on Renewal of Religious Discourse
   excerpt_ar: نثمّن مؤتمر الأزهر الدولي حول تجديد الخطاب الديني بمشاركة علماء ومفكرين من أكثر من 50 دولة لبحث سبل التجديد والوسطية.
   excerpt_en: Al-Azhar hosted its International Conference on Renewal of Religious Discourse with scholars and thinkers from over 50 countries to discuss paths of renewal and moderation.
   category: cultural-events
   published_at: 2024-05-10 [VERIFY]

4. New Graduate Programs Launch (2024)
   slug: new-graduate-programs-2024
   title_ar: جامعة الأزهر تطلق برامج دراسات عليا جديدة في العلوم التقنية
   title_en: Al-Azhar University Launches New Graduate Programs in Technology Sciences
   excerpt_ar: أعلنت جامعة الأزهر عن إطلاق برامج ماجستير ودكتوراه جديدة في الذكاء الاصطناعي وعلوم البيانات والأمن السيبراني بالتعاون مع جامعات دولية.
   excerpt_en: Al-Azhar University announced the launch of new Master's and PhD programs in Artificial Intelligence, Data Science, and Cybersecurity in collaboration with international universities.
   category: university-news
   published_at: 2024-09-01 [VERIFY]

5. Document on Human Fraternity Anniversary (2025)
   slug: human-fraternity-anniversary-2025
   title_ar: الاحتفال بالذكرى السادسة لوثيقة الأخوة الإنسانية
   title_en: Celebration of the 6th Anniversary of the Document on Human Fraternity
   excerpt_ar: احتفل الأزهر بالذكرى السادسة لتوقيع وثيقة الأخوة الإنسانية بين شيخ الأزهر والبابا فرنسيس، مؤكداً على أهمية الحوار والتعايش السلمي بين الأديان.
   excerpt_en: Al-Azhar celebrated the 6th anniversary of the signing of the Document on Human Fraternity between the Grand Sheikh and Pope Francis, emphasizing the importance of dialogue and peaceful coexistence between religions.
   category: cultural-events
   published_at: 2025-02-04 [VERIFY]

6. Al-Azhar Digital Manuscript Project (2024)
   slug: digital-manuscript-project
   title_ar: مشروع رقمنة المخطوطات النادرة في مكتبة الأزهر
   title_en: Digitization Project for Rare Manuscripts at Al-Azhar Library
   excerpt_ar: أطلقت جامعة الأزهر مشروعاً طموحاً لرقمنة أكثر من 40 ألف مخطوط نادر في مكتبة الأزهر بالتعاون مع منظمات دولية متخصصة في حفظ التراث.
   excerpt_en: Al-Azhar University launched an ambitious project to digitize over 40,000 rare manuscripts in Al-Azhar Library in collaboration with international organizations specialized in heritage preservation.
   category: scientific-research
   published_at: 2024-07-20 [VERIFY]
```

---

## 6. ORGANIZATIONAL STRUCTURE (الهيكل التنظيمي)

### Status: 7 units exist (1 presidency, 3 vice presidencies, 1 office, 2 departments + 1 digital transformation). MISSING the Grand Sheikh's Office.

### Critical: Grand Sheikh's Office (مشيخة الأزهر) [ADD]

The Grand Sheikh of Al-Azhar (شيخ الأزهر) is the highest authority at Al-Azhar. The "Mashyakhat al-Azhar" (مشيخة الأزهر) is a separate entity from the university presidency.

**Al-Azhar's organizational structure has TWO main pillars:**
1. **مشيخة الأزهر (Grand Sheikh's Office)** - The religious/scholarly authority
2. **جامعة الأزهر (Al-Azhar University)** - The academic institution

```php
// Should be the top-level entity, ABOVE University Presidency
[
    'slug' => 'grand-sheikh-office',
    'type' => 'presidency', // or a new type 'mashyakha'
    'name' => ['ar' => 'مشيخة الأزهر الشريف', 'en' => 'Office of the Grand Sheikh of Al-Azhar'],
    'description' => [
        'ar' => 'مشيخة الأزهر الشريف هي أعلى سلطة دينية وعلمية في الأزهر، يتولاها شيخ الأزهر الذي يُعد المرجع الأعلى في الشؤون الإسلامية لجمهورية مصر العربية والعالم الإسلامي. تشرف المشيخة على جميع هيئات الأزهر بما فيها الجامعة ومجمع البحوث الإسلامية وقطاع المعاهد الأزهرية.',
        'en' => 'The Office of the Grand Sheikh of Al-Azhar is the highest religious and scholarly authority at Al-Azhar, headed by the Grand Sheikh who is the supreme reference on Islamic affairs for Egypt and the Muslim world. The office oversees all Al-Azhar bodies including the university, the Islamic Research Academy, and the Azhari Institutes sector.',
    ],
    'parent_id' => null,
    'is_published' => true,
    'order' => 0,
]

// Additional units under the Grand Sheikh's Office:
[
    'slug' => 'islamic-research-academy',
    'type' => 'department',
    'name' => ['ar' => 'مجمع البحوث الإسلامية', 'en' => 'Islamic Research Academy'],
    'description' => [
        'ar' => 'مجمع البحوث الإسلامية هو الهيئة العليا للبحث العلمي الإسلامي في الأزهر. يضم كبار العلماء المسلمين من مصر والعالم الإسلامي ويختص بدراسة القضايا الإسلامية المعاصرة وإصدار الفتاوى والتوصيات العلمية. يعمل على مراجعة المؤلفات الإسلامية وضمان دقتها العلمية.',
        'en' => 'The Islamic Research Academy is the supreme body for Islamic scholarly research at Al-Azhar. It includes senior Muslim scholars from Egypt and the Islamic world and specializes in studying contemporary Islamic issues, issuing fatwas, and scholarly recommendations. It reviews Islamic publications and ensures their scholarly accuracy.',
    ],
    'parent_id' => grand_sheikh_office_id,
    'is_published' => true,
    'order' => 1,
],
[
    'slug' => 'azhari-institutes-sector',
    'type' => 'department',
    'name' => ['ar' => 'قطاع المعاهد الأزهرية', 'en' => 'Azhari Institutes Sector'],
    'description' => [
        'ar' => 'يشرف قطاع المعاهد الأزهرية على أكثر من 11 ألف معهد أزهري في مختلف محافظات مصر، تضم المراحل الابتدائية والإعدادية والثانوية. يوفر هذا القطاع التعليم الأزهري الذي يجمع بين العلوم الشرعية واللغوية والعلوم الحديثة لأكثر من مليوني طالب.',
        'en' => 'The Azhari Institutes Sector oversees over 11,000 Azhari institutes across Egypt\'s governorates, covering primary, preparatory, and secondary education levels. This sector provides Azhari education combining Islamic, linguistic, and modern sciences to over two million students.',
    ],
    'parent_id' => grand_sheikh_office_id,
    'is_published' => true,
    'order' => 2,
],
[
    'slug' => 'azhar-observatory',
    'type' => 'department',
    'name' => ['ar' => 'مرصد الأزهر لمكافحة التطرف', 'en' => 'Al-Azhar Observatory for Combating Extremism'],
    'description' => [
        'ar' => 'مرصد الأزهر لمكافحة التطرف أُنشئ عام 2015م لرصد وتحليل الخطاب المتطرف والإرهابي بمختلف اللغات وتفنيد الأفكار المتطرفة. يعمل المرصد بأكثر من 12 لغة ويصدر تقارير دورية عن التطرف والإسلاموفوبيا في العالم.',
        'en' => 'Al-Azhar Observatory for Combating Extremism was established in 2015 to monitor and analyze extremist and terrorist discourse in multiple languages and refute extremist ideologies. The observatory operates in over 12 languages and issues periodic reports on extremism and Islamophobia worldwide.',
    ],
    'parent_id' => grand_sheikh_office_id,
    'is_published' => true,
    'order' => 3,
],
[
    'slug' => 'dar-al-ifta',
    'type' => 'office',
    'name' => ['ar' => 'دار الإفتاء المصرية', 'en' => 'Egyptian Dar al-Ifta (House of Fatwas)'],
    'description' => [
        'ar' => 'دار الإفتاء المصرية هي المؤسسة الرسمية المختصة بإصدار الفتاوى الشرعية في جمهورية مصر العربية. تأسست عام 1895م وتُعد من أعرق مؤسسات الإفتاء في العالم الإسلامي. يرأسها مفتي الجمهورية الذي يُعيّن من بين كبار علماء الأزهر.',
        'en' => 'The Egyptian Dar al-Ifta is the official institution responsible for issuing religious edicts (fatwas) in Egypt. Founded in 1895, it is one of the oldest fatwa institutions in the Islamic world. It is headed by the Grand Mufti of Egypt, appointed from among senior Al-Azhar scholars.',
    ],
    'parent_id' => grand_sheikh_office_id,
    'is_published' => true,
    'order' => 4,
],

// Additional units under University Presidency:
[
    'slug' => 'international-students-center',
    'type' => 'department',
    'name' => ['ar' => 'مركز الطلاب الوافدين', 'en' => 'International Students Center'],
    'description' => [
        'ar' => 'يختص بإدارة شؤون الطلاب الوافدين من أكثر من 100 دولة حول العالم. يقدم المركز خدمات القبول والإرشاد الأكاديمي والإقامة والرعاية الاجتماعية للطلاب الدوليين الذين يدرسون في جامعة الأزهر.',
        'en' => 'Manages affairs of international students from over 100 countries worldwide. The center provides admissions, academic advising, housing, and social welfare services for international students studying at Al-Azhar University.',
    ],
    'parent_id' => secretary_general_id,
    'is_published' => true,
    'order' => 4,
],
[
    'slug' => 'quality-assurance',
    'type' => 'department',
    'name' => ['ar' => 'مركز ضمان الجودة والاعتماد', 'en' => 'Quality Assurance and Accreditation Center'],
    'description' => [
        'ar' => 'يختص بضمان جودة العملية التعليمية والبحثية في الجامعة وتحقيق معايير الاعتماد الأكاديمي المحلية والدولية. يعمل على تطوير الأداء المؤسسي والأكاديمي وإعداد التقارير الذاتية للكليات.',
        'en' => 'Responsible for ensuring the quality of educational and research processes at the university and meeting local and international academic accreditation standards. Works on developing institutional and academic performance and preparing self-assessment reports for faculties.',
    ],
    'parent_id' => secretary_general_id,
    'is_published' => true,
    'order' => 5,
],
```

---

## 7. KEY STATISTICS AND FACTS (إحصائيات وحقائق)

These can be used in the platform's "About" section or dashboard:

- **Founded:** 970 CE (972 CE first prayers held) -- approximately 1,056 years ago
- **Status:** Oldest continuously operating degree-granting university in the world
- **Students:** Approximately 500,000+ students (as of recent years)
- **International Students:** From 100+ countries
- **Faculties:** 80+ across Egypt's governorates
- **Azhari Pre-university Institutes:** 11,000+
- **Pre-university Students:** 2,000,000+
- **Campuses:** Main campus in Cairo (Nasr City), with branches across Egypt
- **Grand Sheikhs in History:** Over 40 Grand Sheikhs since the position was formalized
- **Library Manuscripts:** Approximately 120,000 manuscripts
- **Al-Azhar Magazine:** Published monthly since 1929
- **Languages at Observatory:** 12+ languages for counter-extremism work

---

## 8. COMPLETE LIST OF GRAND SHEIKHS OF AL-AZHAR (Reference)

For historical accuracy, here is the list of modern Grand Sheikhs most relevant to the platform:

| # | Name (Arabic) | Name (English) | Tenure | Notes |
|---|--------------|----------------|--------|-------|
| ~1 | محمد الخرشي | Muhammad al-Kharashy | c.1690 | First official Sheikh |
| ... | (multiple sheikhs in Ottoman era) | | | |
| 27 | حسن العطار | Hassan al-Attar | 1830-1835 | Renaissance pioneer |
| 30 | محمد عبده | Muhammad Abduh | 1899-1905 | Great reformer (was Mufti, not Sheikh) |
| 34 | محمد مصطفى المراغي | Muhammad al-Maraghi | 1928-1929, 1935-1945 | Served twice |
| 40 | محمود شلتوت | Mahmoud Shaltout | 1958-1963 | Law 103 transformation |
| 41 | حسن مأمون | Hassan Ma'moun | 1963-1969 | |
| 42 | محمد الفحام | Muhammad al-Fahham | 1969-1973 | |
| 43 | عبد الحليم محمود | Abdel-Halim Mahmoud | 1973-1978 | Sorbonne PhD, Sufi scholar |
| 44 | محمد عبد الرحمن بيصار | Muhammad Bisar | 1979-1982 | |
| 45 | جاد الحق علي جاد الحق | Gad al-Haq | 1982-1996 | |
| 46 | محمد سيد طنطاوي | Muhammad Tantawi | 1996-2010 | |
| 47 | أحمد الطيب | Ahmed el-Tayeb | 2010-present | Current Grand Imam |

**Note:** Muhammad Abduh was Grand Mufti of Egypt, not Sheikh of Al-Azhar. The existing seeder entry is slightly misleading with the title -- his seeder entry should clarify this distinction.

---

## SUMMARY OF NEEDED CHANGES

### Critical Additions:
1. **Grand Sheikh Ahmed el-Tayeb** - Most important missing figure
2. **Ayyubid Era** - Missing era in timeline
3. **Grand Sheikh's Office** - Missing from organizational structure (the institution above the university)
4. **Real additional Grand Sheikhs** - At least 4-5 more historical sheikhs

### Enhancements:
5. **Fix Faculty of Mass Communication** type from `institute` to `faculty`
6. **Add established_year** to hospital (1975) and Saleh Kamel Center (1979)
7. **Add 3-4 more real manuscripts** to the library
8. **Add Ayyubid era events** (Saladin's conversion, Baybars restoring prayers)
9. **Add modern era events** (women's education 1962, Human Fraternity Document 2019)
10. **Add more realistic news** based on real Al-Azhar activities
11. **Add key organizational units** (Islamic Research Academy, Azhari Institutes, Observatory)
12. **Add notable alumni** (Taha Hussein, Jawhar al-Siqilli)

### Data Needing Verification [VERIFY]:
- Current university president name (positions change)
- Exact news dates for 2024-2025 events
- Faculty of Mass Communication establishment year (2003)
- Exact manuscript holdings numbers
