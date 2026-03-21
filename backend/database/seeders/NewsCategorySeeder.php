<?php

namespace Database\Seeders;

use App\Models\NewsCategory;
use Illuminate\Database\Seeder;

class NewsCategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['slug' => 'university-news', 'name' => ['ar' => 'أخبار الجامعة', 'en' => 'University News'], 'is_active' => true],
            ['slug' => 'scientific-research', 'name' => ['ar' => 'البحث العلمي', 'en' => 'Scientific Research'], 'is_active' => true],
            ['slug' => 'cultural-events', 'name' => ['ar' => 'الفعاليات الثقافية', 'en' => 'Cultural Events'], 'is_active' => true],
            ['slug' => 'international-cooperation', 'name' => ['ar' => 'التعاون الدولي', 'en' => 'International Cooperation'], 'is_active' => true],
            ['slug' => 'student-achievements', 'name' => ['ar' => 'إنجازات الطلاب', 'en' => 'Student Achievements'], 'is_active' => true],
        ];

        foreach ($categories as $data) {
            NewsCategory::create($data);
        }
    }
}
