<?php

namespace Database\Seeders;

use App\Models\NewsCategory;
use Illuminate\Database\Seeder;

class NewsCategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            [
                'slug' => 'academic',
                'name' => [
                    'ar' => 'أكاديمي',
                    'en' => 'Academic',
                    'fr' => 'Academique',
                    'es' => 'Academico',
                    'zh' => '学术',
                    'ru' => 'Академический',
                    'ur' => 'اکیڈمک',
                ],
                'is_active' => true,
            ],
            [
                'slug' => 'international',
                'name' => [
                    'ar' => 'دولي',
                    'en' => 'International',
                    'fr' => 'International',
                    'es' => 'Internacional',
                    'zh' => '国际',
                    'ru' => 'Международный',
                    'ur' => 'بین الاقوامی',
                ],
                'is_active' => true,
            ],
            [
                'slug' => 'events',
                'name' => [
                    'ar' => 'فعاليات',
                    'en' => 'Events',
                    'fr' => 'Evenements',
                    'es' => 'Eventos',
                    'zh' => '活动',
                    'ru' => 'Мероприятия',
                    'ur' => 'تقریبات',
                ],
                'is_active' => true,
            ],
            [
                'slug' => 'research',
                'name' => [
                    'ar' => 'بحوث',
                    'en' => 'Research',
                    'fr' => 'Recherche',
                    'es' => 'Investigacion',
                    'zh' => '研究',
                    'ru' => 'Исследования',
                    'ur' => 'تحقیق',
                ],
                'is_active' => true,
            ],
        ];

        foreach ($categories as $data) {
            NewsCategory::create($data);
        }
    }
}
