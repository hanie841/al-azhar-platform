<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\CourseSection;
use App\Models\Exam;
use App\Models\ExamQuestion;
use App\Models\Faculty;
use App\Models\LmsCourse;
use App\Models\Question;
use App\Models\QuestionBank;
use App\Models\QuestionCategory;
use App\Models\Semester;
use App\Models\User;
use Illuminate\Database\Seeder;

class ExamSeeder extends Seeder
{
    public function run(): void
    {
        $currentSemester = Semester::where('is_current', true)->first();
        $facultyUser = User::where('role', 'faculty_member')->first();

        if (! $currentSemester || ! $facultyUser) {
            return;
        }

        $islamicStudies = Faculty::where('slug', 'faculty-of-sharia-and-law')->first();
        $computers = Faculty::where('slug', 'faculty-of-science')->first();
        $science = Faculty::where('slug', 'faculty-of-science')->first();

        $islCourse = Course::where('code', 'ISL101')->first();
        $csCourse = Course::where('code', 'CS101')->first();
        $phyCourse = Course::where('code', 'PHY101')->first();

        // ========================================
        // Question Bank 1: Islamic Studies
        // ========================================
        $bank1 = QuestionBank::create([
            'name' => ['ar' => 'بنك أسئلة أصول الفقه', 'en' => 'Usul al-Fiqh Question Bank'],
            'description' => ['ar' => 'بنك أسئلة شامل لمقرر أصول الفقه الإسلامي', 'en' => 'Comprehensive question bank for the Principles of Islamic Jurisprudence course'],
            'course_id' => $islCourse?->id,
            'faculty_id' => $islamicStudies?->id,
            'created_by' => $facultyUser->id,
            'is_shared' => false,
        ]);

        $cat1 = QuestionCategory::create([
            'question_bank_id' => $bank1->id,
            'name' => ['ar' => 'الأدلة الشرعية', 'en' => 'Legal Sources'],
            'order' => 1,
        ]);

        // Islamic Studies Questions
        $islQuestions = [];

        $islQuestions[] = Question::create([
            'question_bank_id' => $bank1->id,
            'question_category_id' => $cat1->id,
            'question_type' => 'mcq',
            'difficulty' => 'easy',
            'content' => ['ar' => 'ما هو المصدر الأول للتشريع الإسلامي؟', 'en' => 'What is the primary source of Islamic legislation?'],
            'options' => [
                ['text' => 'القرآن الكريم', 'is_correct' => true],
                ['text' => 'السنة النبوية', 'is_correct' => false],
                ['text' => 'الإجماع', 'is_correct' => false],
                ['text' => 'القياس', 'is_correct' => false],
            ],
            'correct_answer' => ['القرآن الكريم'],
            'explanation' => ['ar' => 'القرآن الكريم هو المصدر الأول والأساسي للتشريع الإسلامي باتفاق جميع العلماء', 'en' => 'The Holy Quran is the primary source of Islamic legislation by consensus of all scholars'],
            'points' => 2,
            'time_limit_seconds' => 60,
            'tags' => ['sources', 'quran'],
            'created_by' => $facultyUser->id,
            'is_active' => true,
        ]);

        $islQuestions[] = Question::create([
            'question_bank_id' => $bank1->id,
            'question_category_id' => $cat1->id,
            'question_type' => 'mcq',
            'difficulty' => 'medium',
            'content' => ['ar' => 'ما المقصود بالإجماع في أصول الفقه؟', 'en' => 'What is meant by Ijma (consensus) in Usul al-Fiqh?'],
            'options' => [
                ['text' => 'اتفاق جميع المسلمين على حكم شرعي', 'is_correct' => false],
                ['text' => 'اتفاق مجتهدي الأمة في عصر على حكم شرعي', 'is_correct' => true],
                ['text' => 'اتفاق الصحابة فقط على حكم شرعي', 'is_correct' => false],
                ['text' => 'اتفاق أهل المدينة على حكم شرعي', 'is_correct' => false],
            ],
            'correct_answer' => ['اتفاق مجتهدي الأمة في عصر على حكم شرعي'],
            'explanation' => ['ar' => 'الإجماع هو اتفاق مجتهدي أمة محمد صلى الله عليه وسلم بعد وفاته في عصر من العصور على حكم شرعي', 'en' => 'Ijma is the consensus of the mujtahids of the Muslim Ummah in a given era on a religious ruling'],
            'points' => 3,
            'time_limit_seconds' => 90,
            'tags' => ['ijma', 'consensus'],
            'created_by' => $facultyUser->id,
            'is_active' => true,
        ]);

        $islQuestions[] = Question::create([
            'question_bank_id' => $bank1->id,
            'question_category_id' => $cat1->id,
            'question_type' => 'true_false',
            'difficulty' => 'easy',
            'content' => ['ar' => 'القياس هو المصدر الثالث من مصادر التشريع الإسلامي', 'en' => 'Qiyas (analogy) is the third source of Islamic legislation'],
            'options' => [
                ['text' => 'صح', 'is_correct' => false],
                ['text' => 'خطأ', 'is_correct' => true],
            ],
            'correct_answer' => [false],
            'explanation' => ['ar' => 'المصدر الثالث هو الإجماع، والقياس هو المصدر الرابع', 'en' => 'The third source is Ijma (consensus), Qiyas is the fourth source'],
            'points' => 1,
            'time_limit_seconds' => 30,
            'tags' => ['sources', 'qiyas'],
            'created_by' => $facultyUser->id,
            'is_active' => true,
        ]);

        $islQuestions[] = Question::create([
            'question_bank_id' => $bank1->id,
            'question_category_id' => $cat1->id,
            'question_type' => 'mcq',
            'difficulty' => 'hard',
            'content' => ['ar' => 'ما هي أركان القياس عند الأصوليين؟', 'en' => 'What are the pillars of Qiyas according to the scholars of Usul?'],
            'options' => [
                ['text' => 'الأصل والفرع والعلة والحكم', 'is_correct' => true],
                ['text' => 'الأصل والفرع والشرط والسبب', 'is_correct' => false],
                ['text' => 'النص والإجماع والقياس والاستحسان', 'is_correct' => false],
                ['text' => 'الكتاب والسنة والإجماع والقياس', 'is_correct' => false],
            ],
            'correct_answer' => ['الأصل والفرع والعلة والحكم'],
            'explanation' => ['ar' => 'أركان القياس أربعة: الأصل (المقيس عليه)، والفرع (المقيس)، والعلة (الوصف الجامع)، والحكم', 'en' => 'The four pillars of Qiyas are: the original case, the new case, the effective cause, and the ruling'],
            'points' => 4,
            'time_limit_seconds' => 120,
            'tags' => ['qiyas', 'pillars'],
            'created_by' => $facultyUser->id,
            'is_active' => true,
        ]);

        $islQuestions[] = Question::create([
            'question_bank_id' => $bank1->id,
            'question_category_id' => $cat1->id,
            'question_type' => 'essay',
            'difficulty' => 'hard',
            'content' => ['ar' => 'اشرح مفهوم المقاصد الشرعية وأقسامها مع التمثيل لكل قسم', 'en' => 'Explain the concept of Maqasid al-Shariah and its categories with examples for each'],
            'options' => null,
            'correct_answer' => null,
            'explanation' => ['ar' => 'المقاصد الشرعية هي الغايات التي وضعت الشريعة لأجل تحقيقها وتنقسم إلى ضرورية وحاجية وتحسينية', 'en' => 'Maqasid al-Shariah are the objectives for which the Shariah was established, divided into necessities, needs, and embellishments'],
            'points' => 10,
            'time_limit_seconds' => 900,
            'tags' => ['maqasid', 'essay'],
            'created_by' => $facultyUser->id,
            'is_active' => true,
        ]);

        $islQuestions[] = Question::create([
            'question_bank_id' => $bank1->id,
            'question_category_id' => $cat1->id,
            'question_type' => 'short_answer',
            'difficulty' => 'medium',
            'content' => ['ar' => 'عرّف الاستحسان اصطلاحاً', 'en' => 'Define Istihsan technically'],
            'options' => null,
            'correct_answer' => ['العدول عن حكم القياس إلى حكم آخر أقوى منه لدليل يقتضي ذلك'],
            'explanation' => ['ar' => 'الاستحسان هو العدول عن حكم القياس إلى حكم آخر أقوى منه لدليل اقتضى هذا العدول', 'en' => 'Istihsan is departing from the ruling of Qiyas to another stronger ruling based on evidence requiring this departure'],
            'points' => 3,
            'time_limit_seconds' => 180,
            'tags' => ['istihsan', 'definitions'],
            'created_by' => $facultyUser->id,
            'is_active' => true,
        ]);

        // ========================================
        // Question Bank 2: Computer Science
        // ========================================
        $bank2 = QuestionBank::create([
            'name' => ['ar' => 'بنك أسئلة البرمجة', 'en' => 'Programming Question Bank'],
            'description' => ['ar' => 'بنك أسئلة لمقرر مقدمة في البرمجة', 'en' => 'Question bank for Introduction to Programming course'],
            'course_id' => $csCourse?->id,
            'faculty_id' => $computers?->id,
            'created_by' => $facultyUser->id,
            'is_shared' => true,
        ]);

        $cat2 = QuestionCategory::create([
            'question_bank_id' => $bank2->id,
            'name' => ['ar' => 'أساسيات بايثون', 'en' => 'Python Basics'],
            'order' => 1,
        ]);

        $csQuestions = [];

        $csQuestions[] = Question::create([
            'question_bank_id' => $bank2->id,
            'question_category_id' => $cat2->id,
            'question_type' => 'mcq',
            'difficulty' => 'easy',
            'content' => ['ar' => 'ما نوع البيانات الناتج عن التعبير 5 / 2 في بايثون 3؟', 'en' => 'What is the data type of the expression 5 / 2 in Python 3?'],
            'options' => [
                ['text' => 'int', 'is_correct' => false],
                ['text' => 'float', 'is_correct' => true],
                ['text' => 'str', 'is_correct' => false],
                ['text' => 'bool', 'is_correct' => false],
            ],
            'correct_answer' => ['float'],
            'explanation' => ['ar' => 'في بايثون 3، عملية القسمة / تعطي دائماً نتيجة من نوع float حتى لو كان الناتج عدداً صحيحاً', 'en' => 'In Python 3, the / division operator always returns a float even if the result is a whole number'],
            'points' => 2,
            'time_limit_seconds' => 60,
            'tags' => ['python', 'data-types'],
            'created_by' => $facultyUser->id,
            'is_active' => true,
        ]);

        $csQuestions[] = Question::create([
            'question_bank_id' => $bank2->id,
            'question_category_id' => $cat2->id,
            'question_type' => 'mcq',
            'difficulty' => 'medium',
            'content' => ['ar' => 'ما هو الناتج من الكود التالي: print(len([1, [2, 3], 4]))؟', 'en' => 'What is the output of: print(len([1, [2, 3], 4]))?'],
            'options' => [
                ['text' => '3', 'is_correct' => true],
                ['text' => '4', 'is_correct' => false],
                ['text' => '5', 'is_correct' => false],
                ['text' => 'خطأ', 'is_correct' => false],
            ],
            'correct_answer' => ['3'],
            'explanation' => ['ar' => 'القائمة تحتوي على 3 عناصر: العدد 1، والقائمة الفرعية [2,3]، والعدد 4', 'en' => 'The list contains 3 elements: the number 1, the sublist [2,3], and the number 4'],
            'points' => 3,
            'time_limit_seconds' => 90,
            'tags' => ['python', 'lists'],
            'created_by' => $facultyUser->id,
            'is_active' => true,
        ]);

        $csQuestions[] = Question::create([
            'question_bank_id' => $bank2->id,
            'question_category_id' => $cat2->id,
            'question_type' => 'true_false',
            'difficulty' => 'easy',
            'content' => ['ar' => 'في بايثون، المتغيرات حساسة لحالة الأحرف (case-sensitive)', 'en' => 'In Python, variables are case-sensitive'],
            'options' => [
                ['text' => 'صح', 'is_correct' => true],
                ['text' => 'خطأ', 'is_correct' => false],
            ],
            'correct_answer' => [true],
            'explanation' => ['ar' => 'بايثون حساسة لحالة الأحرف، فالمتغير Name يختلف عن name', 'en' => 'Python is case-sensitive, so Name is different from name'],
            'points' => 1,
            'time_limit_seconds' => 30,
            'tags' => ['python', 'variables'],
            'created_by' => $facultyUser->id,
            'is_active' => true,
        ]);

        $csQuestions[] = Question::create([
            'question_bank_id' => $bank2->id,
            'question_category_id' => $cat2->id,
            'question_type' => 'mcq',
            'difficulty' => 'medium',
            'content' => ['ar' => 'ما الفرق بين القائمة (list) والصف (tuple) في بايثون؟', 'en' => 'What is the difference between a list and a tuple in Python?'],
            'options' => [
                ['text' => 'القائمة قابلة للتعديل والصف غير قابل للتعديل', 'is_correct' => true],
                ['text' => 'الصف أسرع من القائمة دائماً', 'is_correct' => false],
                ['text' => 'القائمة تقبل أنواع مختلفة والصف لا يقبل', 'is_correct' => false],
                ['text' => 'لا يوجد فرق بينهما', 'is_correct' => false],
            ],
            'correct_answer' => ['القائمة قابلة للتعديل والصف غير قابل للتعديل'],
            'explanation' => ['ar' => 'الفرق الأساسي هو أن القائمة (list) قابلة للتعديل (mutable) بينما الصف (tuple) غير قابل للتعديل (immutable)', 'en' => 'The main difference is that lists are mutable while tuples are immutable'],
            'points' => 2,
            'time_limit_seconds' => 60,
            'tags' => ['python', 'data-structures'],
            'created_by' => $facultyUser->id,
            'is_active' => true,
        ]);

        $csQuestions[] = Question::create([
            'question_bank_id' => $bank2->id,
            'question_category_id' => $cat2->id,
            'question_type' => 'short_answer',
            'difficulty' => 'medium',
            'content' => ['ar' => 'اكتب دالة بايثون تأخذ قائمة أعداد وتعيد مجموعها', 'en' => 'Write a Python function that takes a list of numbers and returns their sum'],
            'options' => null,
            'correct_answer' => ['def sum_list(numbers): return sum(numbers)'],
            'explanation' => ['ar' => 'يمكن استخدام الدالة المدمجة sum() أو حلقة تكرارية لحساب المجموع', 'en' => 'You can use the built-in sum() function or a loop to calculate the total'],
            'points' => 5,
            'time_limit_seconds' => 300,
            'tags' => ['python', 'functions'],
            'created_by' => $facultyUser->id,
            'is_active' => true,
        ]);

        $csQuestions[] = Question::create([
            'question_bank_id' => $bank2->id,
            'question_category_id' => $cat2->id,
            'question_type' => 'essay',
            'difficulty' => 'hard',
            'content' => ['ar' => 'اشرح مفهوم البرمجة كائنية التوجه (OOP) وأركانها الأربعة مع أمثلة من بايثون', 'en' => 'Explain the concept of Object-Oriented Programming (OOP) and its four pillars with Python examples'],
            'options' => null,
            'correct_answer' => null,
            'explanation' => ['ar' => 'البرمجة كائنية التوجه تعتمد على أربعة أركان: التغليف والوراثة وتعدد الأشكال والتجريد', 'en' => 'OOP is based on four pillars: Encapsulation, Inheritance, Polymorphism, and Abstraction'],
            'points' => 10,
            'time_limit_seconds' => 900,
            'tags' => ['python', 'oop'],
            'created_by' => $facultyUser->id,
            'is_active' => true,
        ]);

        $csQuestions[] = Question::create([
            'question_bank_id' => $bank2->id,
            'question_category_id' => $cat2->id,
            'question_type' => 'true_false',
            'difficulty' => 'easy',
            'content' => ['ar' => 'الدالة في بايثون يمكن أن تعيد أكثر من قيمة واحدة', 'en' => 'A function in Python can return more than one value'],
            'options' => [
                ['text' => 'صح', 'is_correct' => true],
                ['text' => 'خطأ', 'is_correct' => false],
            ],
            'correct_answer' => [true],
            'explanation' => ['ar' => 'يمكن للدالة في بايثون إعادة عدة قيم على شكل tuple', 'en' => 'Python functions can return multiple values as a tuple'],
            'points' => 1,
            'time_limit_seconds' => 30,
            'tags' => ['python', 'functions'],
            'created_by' => $facultyUser->id,
            'is_active' => true,
        ]);

        // ========================================
        // Question Bank 3: Physics
        // ========================================
        $bank3 = QuestionBank::create([
            'name' => ['ar' => 'بنك أسئلة الفيزياء العامة', 'en' => 'General Physics Question Bank'],
            'description' => ['ar' => 'بنك أسئلة لمقرر الفيزياء العامة يشمل الميكانيكا والكهرباء', 'en' => 'Question bank for General Physics covering mechanics and electricity'],
            'course_id' => $phyCourse?->id,
            'faculty_id' => $science?->id,
            'created_by' => $facultyUser->id,
            'is_shared' => true,
        ]);

        $cat3 = QuestionCategory::create([
            'question_bank_id' => $bank3->id,
            'name' => ['ar' => 'الميكانيكا', 'en' => 'Mechanics'],
            'order' => 1,
        ]);

        $phyQuestions = [];

        $phyQuestions[] = Question::create([
            'question_bank_id' => $bank3->id,
            'question_category_id' => $cat3->id,
            'question_type' => 'mcq',
            'difficulty' => 'easy',
            'content' => ['ar' => 'ما هي وحدة قياس القوة في النظام الدولي (SI)؟', 'en' => 'What is the SI unit of force?'],
            'options' => [
                ['text' => 'نيوتن (N)', 'is_correct' => true],
                ['text' => 'جول (J)', 'is_correct' => false],
                ['text' => 'واط (W)', 'is_correct' => false],
                ['text' => 'باسكال (Pa)', 'is_correct' => false],
            ],
            'correct_answer' => ['نيوتن (N)'],
            'explanation' => ['ar' => 'وحدة القوة في النظام الدولي هي النيوتن = كغ.م/ث²', 'en' => 'The SI unit of force is the Newton = kg.m/s²'],
            'points' => 2,
            'time_limit_seconds' => 45,
            'tags' => ['mechanics', 'units'],
            'created_by' => $facultyUser->id,
            'is_active' => true,
        ]);

        $phyQuestions[] = Question::create([
            'question_bank_id' => $bank3->id,
            'question_category_id' => $cat3->id,
            'question_type' => 'mcq',
            'difficulty' => 'medium',
            'content' => ['ar' => 'جسم كتلته 10 كجم يتحرك بتسارع 3 م/ث². ما مقدار القوة المؤثرة عليه؟', 'en' => 'A 10 kg object accelerates at 3 m/s². What is the applied force?'],
            'options' => [
                ['text' => '30 نيوتن', 'is_correct' => true],
                ['text' => '13 نيوتن', 'is_correct' => false],
                ['text' => '3.3 نيوتن', 'is_correct' => false],
                ['text' => '7 نيوتن', 'is_correct' => false],
            ],
            'correct_answer' => ['30 نيوتن'],
            'explanation' => ['ar' => 'بتطبيق قانون نيوتن الثاني: F = ma = 10 × 3 = 30 نيوتن', 'en' => 'Applying Newton\'s second law: F = ma = 10 × 3 = 30 N'],
            'points' => 3,
            'time_limit_seconds' => 90,
            'tags' => ['mechanics', 'newton'],
            'created_by' => $facultyUser->id,
            'is_active' => true,
        ]);

        $phyQuestions[] = Question::create([
            'question_bank_id' => $bank3->id,
            'question_category_id' => $cat3->id,
            'question_type' => 'true_false',
            'difficulty' => 'easy',
            'content' => ['ar' => 'الطاقة الحركية تتناسب طردياً مع مربع السرعة', 'en' => 'Kinetic energy is directly proportional to the square of velocity'],
            'options' => [
                ['text' => 'صح', 'is_correct' => true],
                ['text' => 'خطأ', 'is_correct' => false],
            ],
            'correct_answer' => [true],
            'explanation' => ['ar' => 'الطاقة الحركية = ½ × الكتلة × مربع السرعة (KE = ½mv²)', 'en' => 'Kinetic energy = ½ × mass × velocity² (KE = ½mv²)'],
            'points' => 1,
            'time_limit_seconds' => 30,
            'tags' => ['mechanics', 'energy'],
            'created_by' => $facultyUser->id,
            'is_active' => true,
        ]);

        $phyQuestions[] = Question::create([
            'question_bank_id' => $bank3->id,
            'question_category_id' => $cat3->id,
            'question_type' => 'mcq',
            'difficulty' => 'hard',
            'content' => ['ar' => 'كرة كتلتها 2 كجم تسقط سقوطاً حراً من ارتفاع 20 متراً. ما سرعتها لحظة وصولها للأرض؟ (g = 10 م/ث²)', 'en' => 'A 2 kg ball falls freely from 20m height. What is its speed when it hits the ground? (g = 10 m/s²)'],
            'options' => [
                ['text' => '20 م/ث', 'is_correct' => true],
                ['text' => '10 م/ث', 'is_correct' => false],
                ['text' => '40 م/ث', 'is_correct' => false],
                ['text' => '200 م/ث', 'is_correct' => false],
            ],
            'correct_answer' => ['20 م/ث'],
            'explanation' => ['ar' => 'باستخدام المعادلة v² = u² + 2gh => v² = 0 + 2×10×20 = 400 => v = 20 م/ث', 'en' => 'Using v² = u² + 2gh => v² = 0 + 2×10×20 = 400 => v = 20 m/s'],
            'points' => 4,
            'time_limit_seconds' => 120,
            'tags' => ['mechanics', 'free-fall'],
            'created_by' => $facultyUser->id,
            'is_active' => true,
        ]);

        $phyQuestions[] = Question::create([
            'question_bank_id' => $bank3->id,
            'question_category_id' => $cat3->id,
            'question_type' => 'short_answer',
            'difficulty' => 'medium',
            'content' => ['ar' => 'ما نص قانون نيوتن الثالث للحركة؟', 'en' => 'State Newton\'s Third Law of Motion'],
            'options' => null,
            'correct_answer' => ['لكل فعل رد فعل مساوٍ له في المقدار ومعاكس له في الاتجاه'],
            'explanation' => ['ar' => 'قانون نيوتن الثالث: لكل فعل رد فعل مساوٍ في المقدار ومعاكس في الاتجاه', 'en' => 'Newton\'s Third Law: For every action, there is an equal and opposite reaction'],
            'points' => 3,
            'time_limit_seconds' => 120,
            'tags' => ['mechanics', 'newton'],
            'created_by' => $facultyUser->id,
            'is_active' => true,
        ]);

        $phyQuestions[] = Question::create([
            'question_bank_id' => $bank3->id,
            'question_category_id' => $cat3->id,
            'question_type' => 'essay',
            'difficulty' => 'hard',
            'content' => ['ar' => 'اشرح قانون حفظ الطاقة مع ذكر ثلاثة أمثلة تطبيقية من الحياة اليومية', 'en' => 'Explain the law of conservation of energy with three practical examples from daily life'],
            'options' => null,
            'correct_answer' => null,
            'explanation' => ['ar' => 'قانون حفظ الطاقة ينص على أن الطاقة لا تفنى ولا تستحدث بل تتحول من شكل لآخر', 'en' => 'The law of conservation of energy states that energy cannot be created or destroyed, only transformed'],
            'points' => 10,
            'time_limit_seconds' => 900,
            'tags' => ['mechanics', 'energy', 'conservation'],
            'created_by' => $facultyUser->id,
            'is_active' => true,
        ]);

        $phyQuestions[] = Question::create([
            'question_bank_id' => $bank3->id,
            'question_category_id' => $cat3->id,
            'question_type' => 'true_false',
            'difficulty' => 'medium',
            'content' => ['ar' => 'في حالة السقوط الحر، تكون تسارع جميع الأجسام متساوية بغض النظر عن كتلتها (في غياب مقاومة الهواء)', 'en' => 'In free fall, all objects accelerate equally regardless of mass (ignoring air resistance)'],
            'options' => [
                ['text' => 'صح', 'is_correct' => true],
                ['text' => 'خطأ', 'is_correct' => false],
            ],
            'correct_answer' => [true],
            'explanation' => ['ar' => 'تسارع الجاذبية ثابت لجميع الأجسام عند نفس الموقع ≈ 9.8 م/ث²', 'en' => 'Gravitational acceleration is constant for all objects at the same location ≈ 9.8 m/s²'],
            'points' => 2,
            'time_limit_seconds' => 45,
            'tags' => ['mechanics', 'gravity'],
            'created_by' => $facultyUser->id,
            'is_active' => true,
        ]);

        $phyQuestions[] = Question::create([
            'question_bank_id' => $bank3->id,
            'question_category_id' => $cat3->id,
            'question_type' => 'mcq',
            'difficulty' => 'medium',
            'content' => ['ar' => 'ما مقدار الشغل المبذول لرفع جسم كتلته 5 كجم لارتفاع 4 أمتار؟ (g = 10 م/ث²)', 'en' => 'How much work is done lifting a 5 kg object to a height of 4 meters? (g = 10 m/s²)'],
            'options' => [
                ['text' => '200 جول', 'is_correct' => true],
                ['text' => '50 جول', 'is_correct' => false],
                ['text' => '20 جول', 'is_correct' => false],
                ['text' => '100 جول', 'is_correct' => false],
            ],
            'correct_answer' => ['200 جول'],
            'explanation' => ['ar' => 'الشغل = القوة × الإزاحة = mgh = 5 × 10 × 4 = 200 جول', 'en' => 'Work = Force × Displacement = mgh = 5 × 10 × 4 = 200 J'],
            'points' => 3,
            'time_limit_seconds' => 90,
            'tags' => ['mechanics', 'work'],
            'created_by' => $facultyUser->id,
            'is_active' => true,
        ]);

        // ========================================
        // Create Exams
        // ========================================
        $islSection = CourseSection::where('semester_id', $currentSemester->id)
            ->whereHas('course', fn ($q) => $q->where('code', 'ISL101'))
            ->first();

        $csSection = CourseSection::where('semester_id', $currentSemester->id)
            ->whereHas('course', fn ($q) => $q->where('code', 'CS101'))
            ->first();

        $phySection = CourseSection::where('semester_id', $currentSemester->id)
            ->whereHas('course', fn ($q) => $q->where('code', 'PHY101'))
            ->first();

        $islLms = $islSection ? LmsCourse::where('course_section_id', $islSection->id)->first() : null;

        // Exam 1: Midterm - Islamic Studies
        if ($islSection) {
            $exam1 = Exam::create([
                'title' => ['ar' => 'امتحان نصف الفصل - أصول الفقه', 'en' => 'Midterm Exam - Principles of Islamic Jurisprudence'],
                'description' => ['ar' => 'امتحان نصف الفصل يغطي الوحدتين الأولى والثانية', 'en' => 'Midterm exam covering units 1 and 2'],
                'course_section_id' => $islSection->id,
                'lms_course_id' => $islLms?->id,
                'exam_type' => 'midterm',
                'creation_method' => 'manual',
                'total_marks' => 40,
                'pass_marks' => 20,
                'duration_minutes' => 90,
                'max_attempts' => 1,
                'shuffle_questions' => false,
                'shuffle_options' => true,
                'show_results' => true,
                'starts_at' => now()->addDays(14),
                'ends_at' => now()->addDays(14)->addHours(2),
                'instructions' => ['ar' => 'أجب عن جميع الأسئلة. الوقت المحدد 90 دقيقة. لا يسمح بالخروج قبل انتهاء النصف الأول من الوقت.', 'en' => 'Answer all questions. Time allowed: 90 minutes. No early exit before half the allotted time.'],
                'is_proctored' => true,
                'allow_backtrack' => true,
                'is_published' => true,
                'created_by' => $facultyUser->id,
            ]);

            // Link questions to exam
            foreach ($islQuestions as $order => $question) {
                if ($order >= 5) break; // Only first 5 questions for midterm
                ExamQuestion::create([
                    'exam_id' => $exam1->id,
                    'question_id' => $question->id,
                    'order' => $order + 1,
                    'is_required' => true,
                ]);
            }
        }

        // Exam 2: Final - Computer Science
        if ($csSection) {
            $exam2 = Exam::create([
                'title' => ['ar' => 'الامتحان النهائي - مقدمة في البرمجة', 'en' => 'Final Exam - Introduction to Programming'],
                'description' => ['ar' => 'الامتحان النهائي يغطي جميع وحدات المقرر', 'en' => 'Final exam covering all course units'],
                'course_section_id' => $csSection->id,
                'exam_type' => 'final',
                'creation_method' => 'manual',
                'total_marks' => 60,
                'pass_marks' => 30,
                'duration_minutes' => 120,
                'max_attempts' => 1,
                'shuffle_questions' => true,
                'shuffle_options' => true,
                'show_results' => false,
                'results_available_at' => now()->addDays(45),
                'starts_at' => now()->addDays(60),
                'ends_at' => now()->addDays(60)->addHours(3),
                'instructions' => ['ar' => 'أجب عن جميع الأسئلة. يسمح باستخدام الآلة الحاسبة. الوقت المحدد ساعتان.', 'en' => 'Answer all questions. Calculator allowed. Time: 2 hours.'],
                'is_proctored' => true,
                'allow_backtrack' => true,
                'is_published' => false,
                'created_by' => $facultyUser->id,
            ]);

            foreach ($csQuestions as $order => $question) {
                ExamQuestion::create([
                    'exam_id' => $exam2->id,
                    'question_id' => $question->id,
                    'order' => $order + 1,
                    'is_required' => true,
                ]);
            }
        }

        // Exam 3: Quiz - Physics
        if ($phySection) {
            $exam3 = Exam::create([
                'title' => ['ar' => 'اختبار قصير - الميكانيكا', 'en' => 'Quiz - Mechanics'],
                'description' => ['ar' => 'اختبار قصير عن قوانين نيوتن والطاقة', 'en' => 'Short quiz on Newton\'s laws and energy'],
                'course_section_id' => $phySection->id,
                'exam_type' => 'quiz',
                'creation_method' => 'manual',
                'total_marks' => 20,
                'pass_marks' => 10,
                'duration_minutes' => 30,
                'max_attempts' => 2,
                'shuffle_questions' => true,
                'shuffle_options' => true,
                'show_results' => true,
                'starts_at' => now()->addDays(7),
                'ends_at' => now()->addDays(7)->addHours(1),
                'instructions' => ['ar' => 'اختبار قصير مدته 30 دقيقة. مسموح بمحاولتين.', 'en' => 'Short quiz, 30 minutes. Two attempts allowed.'],
                'is_proctored' => false,
                'allow_backtrack' => false,
                'is_published' => true,
                'created_by' => $facultyUser->id,
            ]);

            // Use only objective physics questions for quiz (first 4, skip essays)
            $quizQuestions = collect($phyQuestions)->filter(fn ($q) => in_array($q->question_type, ['mcq', 'true_false']))->values();
            foreach ($quizQuestions as $order => $question) {
                ExamQuestion::create([
                    'exam_id' => $exam3->id,
                    'question_id' => $question->id,
                    'order' => $order + 1,
                    'is_required' => true,
                ]);
            }
        }
    }
}
