<?php

namespace Database\Seeders;

use App\Models\LibraryCollection;
use App\Models\LibraryItem;
use Illuminate\Database\Seeder;

class LibraryCollectionSeeder extends Seeder
{
    public function run(): void
    {
        // Collection 1: Manuscript Treasures
        $manuscripts = LibraryCollection::create([
            'slug' => 'manuscript-treasures',
            'name' => ['ar' => 'كنوز المخطوطات', 'en' => 'Manuscript Treasures'],
            'description' => [
                'ar' => 'مجموعة نادرة من المخطوطات الإسلامية القديمة التي تحتفظ بها مكتبة جامعة الأزهر. تضم هذه المجموعة مخطوطات في التفسير والفقه والتاريخ والفلسفة تعود إلى قرون من الزمن وتمثل جزءاً مهماً من التراث الإسلامي.',
                'en' => 'A rare collection of ancient Islamic manuscripts preserved at Al-Azhar University Library. This collection includes manuscripts on exegesis, jurisprudence, history, and philosophy dating back centuries, representing an important part of Islamic heritage.',
            ],
            'is_published' => true,
        ]);

        // Collection 2: Pillars of Islamic Jurisprudence
        $fiqh = LibraryCollection::create([
            'slug' => 'pillars-of-islamic-jurisprudence',
            'name' => ['ar' => 'أعمدة الفقه الإسلامي', 'en' => 'Pillars of Islamic Jurisprudence'],
            'description' => [
                'ar' => 'مجموعة من أهم المراجع والمؤلفات في الفقه الإسلامي وأصوله، تشمل الموسوعات الفقهية والدراسات المقارنة بين المذاهب والبحوث المعاصرة في النوازل الفقهية.',
                'en' => 'A collection of the most important references and works in Islamic jurisprudence and its foundations, including jurisprudential encyclopedias, comparative studies across schools, and contemporary research on jurisprudential developments.',
            ],
            'is_published' => true,
        ]);

        // Collection 3: Contemporary Azhari Studies
        $contemporary = LibraryCollection::create([
            'slug' => 'contemporary-azhari-studies',
            'name' => ['ar' => 'دراسات أزهرية معاصرة', 'en' => 'Contemporary Azhari Studies'],
            'description' => [
                'ar' => 'مجموعة من الأبحاث والدراسات والرسائل العلمية الحديثة التي أنتجها باحثو وأساتذة جامعة الأزهر في مختلف التخصصات الشرعية واللغوية والعلمية.',
                'en' => 'A collection of recent research, studies, and theses produced by Al-Azhar University researchers and professors across various Islamic, linguistic, and scientific disciplines.',
            ],
            'is_published' => true,
        ]);

        // Collection 4: AI Research
        $ai = LibraryCollection::create([
            'slug' => 'ai-research',
            'name' => ['ar' => 'أبحاث الذكاء الاصطناعي', 'en' => 'AI Research'],
            'description' => [
                'ar' => 'مجموعة من الأبحاث والدراسات المتعلقة بتطبيقات الذكاء الاصطناعي في خدمة التعليم الإسلامي والبحث العلمي والتكنولوجيا الحديثة.',
                'en' => 'A collection of research and studies related to artificial intelligence applications in service of Islamic education, scientific research, and modern technology.',
            ],
            'is_published' => true,
        ]);

        // Attach items to collections
        $manuscriptItems = LibraryItem::where('type', 'manuscript')->get();
        foreach ($manuscriptItems as $index => $item) {
            $manuscripts->items()->attach($item->id, ['order' => $index + 1]);
        }

        // Pillars of Islamic Jurisprudence: fiqh-related books and theses
        $fiqhItems = LibraryItem::where(function ($q) {
            $q->where('subjects', 'like', '%الفقه%')
              ->orWhere('subjects', 'like', '%أصول الفقه%')
              ->orWhere('subjects', 'like', '%مقاصد الشريعة%');
        })->get();
        foreach ($fiqhItems as $index => $item) {
            $fiqh->items()->attach($item->id, ['order' => $index + 1]);
        }

        // Contemporary Azhari Studies: theses and journal articles
        $contemporaryItems = LibraryItem::whereIn('type', ['thesis', 'journal_article'])->get();
        foreach ($contemporaryItems as $index => $item) {
            $contemporary->items()->attach($item->id, ['order' => $index + 1]);
        }

        // AI Research
        $aiItems = LibraryItem::where(function ($q) {
            $q->where('subjects', 'like', '%الذكاء الاصطناعي%')
              ->orWhere('subjects', 'like', '%التكنولوجيا%');
        })->get();
        foreach ($aiItems as $index => $item) {
            $ai->items()->attach($item->id, ['order' => $index + 1]);
        }
    }
}
