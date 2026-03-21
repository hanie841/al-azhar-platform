<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Default admin user
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        // Seed in dependency order
        $this->call([
            TimelineSeeder::class,
            FacultySeeder::class,
            DepartmentSeeder::class,
            PersonSeeder::class,
            OrganizationalUnitSeeder::class,
            NewsCategorySeeder::class,
            NewsArticleSeeder::class,
            EventSeeder::class,
            LibrarySeeder::class,
            LibraryCollectionSeeder::class,
            PageSeeder::class,
        ]);
    }
}
