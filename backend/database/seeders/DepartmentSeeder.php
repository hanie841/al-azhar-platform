<?php

namespace Database\Seeders;

use App\Models\Department;
use App\Models\Faculty;
use Illuminate\Database\Seeder;

class DepartmentSeeder extends Seeder
{
    public function run(): void
    {
        $departmentsByFaculty = [
            'faculty-of-theology' => [
                ['name' => ['ar' => 'قسم العقيدة والفلسفة', 'en' => 'Department of Creed and Philosophy']],
                ['name' => ['ar' => 'قسم التفسير وعلوم القرآن', 'en' => 'Department of Exegesis and Quranic Sciences']],
                ['name' => ['ar' => 'قسم الحديث وعلومه', 'en' => 'Department of Hadith and Its Sciences']],
                ['name' => ['ar' => 'قسم الدعوة والثقافة الإسلامية', 'en' => 'Department of Da\'wa and Islamic Culture']],
            ],
            'faculty-of-sharia-and-law' => [
                ['name' => ['ar' => 'قسم الفقه الإسلامي', 'en' => 'Department of Islamic Jurisprudence']],
                ['name' => ['ar' => 'قسم أصول الفقه', 'en' => 'Department of Principles of Jurisprudence']],
                ['name' => ['ar' => 'قسم القانون العام', 'en' => 'Department of Public Law']],
                ['name' => ['ar' => 'قسم القانون الخاص', 'en' => 'Department of Private Law']],
            ],
            'faculty-of-arabic-language' => [
                ['name' => ['ar' => 'قسم النحو والصرف والعروض', 'en' => 'Department of Grammar, Morphology and Prosody']],
                ['name' => ['ar' => 'قسم البلاغة والنقد الأدبي', 'en' => 'Department of Rhetoric and Literary Criticism']],
                ['name' => ['ar' => 'قسم الأدب والنصوص', 'en' => 'Department of Literature and Texts']],
                ['name' => ['ar' => 'قسم علم اللغة', 'en' => 'Department of Linguistics']],
            ],
            'faculty-of-medicine' => [
                ['name' => ['ar' => 'قسم التشريح', 'en' => 'Department of Anatomy']],
                ['name' => ['ar' => 'قسم الباطنة العامة', 'en' => 'Department of Internal Medicine']],
                ['name' => ['ar' => 'قسم الجراحة العامة', 'en' => 'Department of General Surgery']],
                ['name' => ['ar' => 'قسم طب الأطفال', 'en' => 'Department of Pediatrics']],
                ['name' => ['ar' => 'قسم النساء والتوليد', 'en' => 'Department of Obstetrics and Gynecology']],
            ],
            'faculty-of-engineering' => [
                ['name' => ['ar' => 'قسم الهندسة المدنية', 'en' => 'Department of Civil Engineering']],
                ['name' => ['ar' => 'قسم الهندسة الكهربائية', 'en' => 'Department of Electrical Engineering']],
                ['name' => ['ar' => 'قسم الهندسة الميكانيكية', 'en' => 'Department of Mechanical Engineering']],
                ['name' => ['ar' => 'قسم هندسة الحاسبات والنظم', 'en' => 'Department of Computer and Systems Engineering']],
                ['name' => ['ar' => 'قسم الهندسة المعمارية', 'en' => 'Department of Architectural Engineering']],
            ],
            'faculty-of-science' => [
                ['name' => ['ar' => 'قسم الرياضيات', 'en' => 'Department of Mathematics']],
                ['name' => ['ar' => 'قسم الفيزياء', 'en' => 'Department of Physics']],
                ['name' => ['ar' => 'قسم الكيمياء', 'en' => 'Department of Chemistry']],
                ['name' => ['ar' => 'قسم علم الأحياء', 'en' => 'Department of Biology']],
                ['name' => ['ar' => 'قسم الجيولوجيا', 'en' => 'Department of Geology']],
            ],
            'faculty-of-commerce' => [
                ['name' => ['ar' => 'قسم المحاسبة', 'en' => 'Department of Accounting']],
                ['name' => ['ar' => 'قسم إدارة الأعمال', 'en' => 'Department of Business Administration']],
                ['name' => ['ar' => 'قسم الاقتصاد', 'en' => 'Department of Economics']],
                ['name' => ['ar' => 'قسم الإحصاء والتأمين', 'en' => 'Department of Statistics and Insurance']],
            ],
            'faculty-of-islamic-studies' => [
                ['name' => ['ar' => 'قسم الفقه وأصوله', 'en' => 'Department of Jurisprudence and Its Principles']],
                ['name' => ['ar' => 'قسم التفسير والحديث', 'en' => 'Department of Exegesis and Hadith']],
                ['name' => ['ar' => 'قسم العقيدة والدعوة', 'en' => 'Department of Creed and Da\'wa']],
            ],
            'faculty-of-islamic-dawa' => [
                ['name' => ['ar' => 'قسم الدعوة والإعلام', 'en' => 'Department of Da\'wa and Media']],
                ['name' => ['ar' => 'قسم الأديان والمذاهب', 'en' => 'Department of Religions and Sects']],
            ],
            'faculty-of-education' => [
                ['name' => ['ar' => 'قسم المناهج وطرق التدريس', 'en' => 'Department of Curricula and Teaching Methods']],
                ['name' => ['ar' => 'قسم علم النفس التربوي', 'en' => 'Department of Educational Psychology']],
                ['name' => ['ar' => 'قسم أصول التربية', 'en' => 'Department of Foundations of Education']],
            ],
            'faculty-of-pharmacy' => [
                ['name' => ['ar' => 'قسم الكيمياء الصيدلية', 'en' => 'Department of Pharmaceutical Chemistry']],
                ['name' => ['ar' => 'قسم الصيدلانيات', 'en' => 'Department of Pharmaceutics']],
                ['name' => ['ar' => 'قسم العقاقير', 'en' => 'Department of Pharmacognosy']],
                ['name' => ['ar' => 'قسم الأدوية والسموم', 'en' => 'Department of Pharmacology and Toxicology']],
            ],
            'faculty-of-dentistry' => [
                ['name' => ['ar' => 'قسم طب الفم والأسنان', 'en' => 'Department of Oral Medicine']],
                ['name' => ['ar' => 'قسم جراحة الفم والوجه والفكين', 'en' => 'Department of Oral and Maxillofacial Surgery']],
                ['name' => ['ar' => 'قسم التقويم', 'en' => 'Department of Orthodontics']],
            ],
        ];

        $order = 1;
        foreach ($departmentsByFaculty as $facultySlug => $departments) {
            $faculty = Faculty::where('slug', $facultySlug)->first();
            if (! $faculty) {
                continue;
            }

            foreach ($departments as $deptData) {
                $dept = new Department();
                $dept->slug = \Illuminate\Support\Str::slug($deptData['name']['en']);
                $dept->name = $deptData['name'];
                $dept->faculty_id = $faculty->id;
                $dept->order = $order++;
                $dept->is_published = true;
                $dept->save();
            }
        }
    }
}
