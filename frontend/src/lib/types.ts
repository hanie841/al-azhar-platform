// Auth types

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

// API response types matching Laravel backend

export interface LibraryItem {
  id: number;
  slug: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  abstract: string | null;
  type: string;
  authors: string[] | null;
  publisher: string | null;
  publication_year: number | null;
  edition: string | null;
  isbn: string | null;
  issn: string | null;
  doi: string | null;
  language: string;
  subjects: string[] | null;
  faculty: Faculty | null;
  department: Department | null;
  era: string | null;
  page_count: number | null;
  access_level: string;
  file_path: string | null;
  cover_image: string | null;
  cover_image_url?: string | null;
  has_pdf?: boolean;
  pdf_url?: string | null;
  manuscript_images: string[] | null;
  views_count: number;
  downloads_count: number;
  published_at: string | null;
  created_at: string;
}

export interface LibraryCollection {
  id: number;
  slug: string;
  name: string;
  description: string | null;
  cover_image: string | null;
  items_count?: number;
  items?: LibraryItem[];
}

export interface Faculty {
  id: number;
  slug: string;
  type?: string;
  category?: string;
  name: string;
  description: string | null;
  dean_message: string | null;
  featured_image: string | null;
  established_year?: number;
  departments_count: number;
  programs_count?: number;
  created_at: string;
}

export interface Department {
  id: number;
  slug: string;
  name: string;
  description: string | null;
}

export interface AcademicProgram {
  id: number;
  slug: string;
  name: string;
  description: string | null;
  degree_level: string;
  duration: string | null;
  credit_hours: number | null;
  requirements: string | null;
  career_prospects: string | null;
  faculty: Faculty | null;
  department: Department | null;
  created_at: string;
}

export interface NewsArticle {
  id: number;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  featured_image: string | null;
  category: NewsCategory | null;
  views_count: number;
  published_at: string | null;
  created_at: string;
}

export interface NewsCategory {
  id: number;
  slug: string;
  name: string;
}

export interface TimelineEra {
  id: number;
  slug: string;
  name: string;
  description: string | null;
  start_year: number;
  end_year: number | null;
  order: number;
  events: TimelineEvent[];
  created_at: string;
}

export interface TimelineEvent {
  id: number;
  slug: string;
  title: string;
  description: string | null;
  year: number | null;
  image: string | null;
  order: number;
  created_at: string;
}

export interface Person {
  id: number;
  slug: string;
  name: string;
  title: string;
  bio: string | null;
  photo: string | null;
  era: string | null;
  is_historical: boolean;
  is_current_leadership: boolean;
  order: number;
  created_at: string;
}

export interface Event {
  id: number;
  slug: string;
  title: string;
  description: string | null;
  location: string | null;
  featured_image: string | null;
  starts_at: string;
  ends_at: string | null;
  created_at: string;
}

export interface SearchResultGroup {
  type: 'library' | 'news' | 'faculties' | 'people' | 'events';
  label: string;
  items: (LibraryItem | NewsArticle | Faculty | Person | Event)[];
}

export interface SearchResults {
  data: SearchResultGroup[];
}

export interface OrgUnit {
  id: number;
  slug: string;
  type: string;
  name: string;
  description: string | null;
  order: number;
  head?: Person | null;
  children?: OrgUnit[];
  created_at: string;
}

export interface ResearchPublication {
  id: number;
  slug: string;
  title: string;
  abstract: string | null;
  authors: string[] | null;
  journal_name: string | null;
  publication_date: string | null;
  doi: string | null;
  citation_count: number;
  research_area: string | null;
  publication_type: string | null;
  pdf_url: string | null;
  external_url: string | null;
  faculty_id: number | null;
  faculty?: { id: number; slug: string; name: string };
  is_featured: boolean;
  created_at: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  links?: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta?: {
    current_page: number;
    from: number | null;
    last_page: number;
    per_page: number;
    to: number | null;
    total: number;
  };
}

export interface ListResponse<T> {
  data: T[];
}

// ===== E-Exam Types =====

export interface QuestionBank {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  course_id: number | null;
  faculty_id: number | null;
  is_shared: boolean;
  questions_count?: number;
}

export interface Question {
  id: number;
  question_bank_id: number;
  question_type: string;
  difficulty: string;
  content: string;
  options: any[] | null;
  correct_answer: any | null;
  explanation: string | null;
  points: number;
  learning_outcome: string | null;
  tags: string[] | null;
}

export interface Exam {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  exam_type: string;
  total_marks: number;
  pass_marks: number | null;
  duration_minutes: number;
  max_attempts: number;
  shuffle_questions: boolean;
  starts_at: string | null;
  ends_at: string | null;
  is_published: boolean;
  questions_count?: number;
}

export interface ExamAttempt {
  id: number;
  exam_id: number;
  student_id: number;
  attempt_number: number;
  status: string;
  started_at: string;
  submitted_at: string | null;
  time_spent_seconds: number | null;
  total_score: number | null;
  percentage: number | null;
  is_passed: boolean | null;
  exam?: Exam;
  answers?: ExamAnswer[];
}

export interface ExamAnswer {
  id: number;
  exam_attempt_id: number;
  exam_question_id: number;
  question_id: number;
  answer_content: any;
  is_correct: boolean | null;
  final_score: number | null;
  feedback: string | null;
  question?: Question;
}

export interface ExamStatistics {
  total_attempts: number;
  pass_rate: number;
  average_score: number;
  min_score: number;
  max_score: number;
  score_distribution: { range: string; count: number }[];
  item_analysis: { question_id: number; correct_rate: number; avg_score: number }[];
}

// ===== Faculty Portal Types =====

export interface CourseSection {
  id: number;
  course_id: number;
  section_number: string;
  semester: string;
  year: number;
  capacity: number;
  enrolled: number;
  schedule: { day: string; start: string; end: string; room: string }[] | null;
  course?: { id: number; name: string; code: string };
}

export interface FacultyProfile {
  id: number;
  user_id: number;
  faculty_id: number | null;
  department_id: number | null;
  employee_id: string | null;
  title: string;
  academic_rank: string | null;
  specialization: string | null;
  bio: string | null;
  phone: string | null;
  office_location: string | null;
  office_hours: { day: string; start: string; end: string }[] | null;
  research_interests: string[] | null;
  qualifications: { degree: string; institution: string; year: string }[] | null;
  publications_count: number;
  photo: string | null;
  is_active: boolean;
  user?: { id: number; name: string; email: string };
  faculty?: { id: number; name: string };
  department?: { id: number; name: string };
}

export interface LeaveRequest {
  id: number;
  faculty_profile_id: number;
  leave_type: string;
  start_date: string;
  end_date: string;
  reason: string;
  status: string;
  approved_by: number | null;
  approved_at: string | null;
  rejection_reason: string | null;
  duration_days?: number;
}

export interface CommitteeMembership {
  id: number;
  faculty_profile_id: number;
  committee_name: string;
  role: string;
  start_date: string;
  end_date: string | null;
  is_active: boolean;
}

export interface FacultyDashboard {
  current_courses: CourseSection[];
  total_students: number;
  pending_submissions: number;
  pending_exam_grading: number;
  schedule: { day: string; start: string; end: string; course: string; room: string }[];
}

// ===== M-SIS Types =====
export interface AcademicYear {
  id: number; name: string; slug: string; start_date: string; end_date: string;
  is_current: boolean; is_registration_open: boolean;
}
export interface Semester {
  id: number; name: string; slug: string; academic_year_id: number;
  type: 'fall' | 'spring' | 'summer'; start_date: string; end_date: string;
  registration_start: string | null; registration_end: string | null; is_current: boolean;
  academic_year?: AcademicYear;
}
export interface MsisStudent {
  id: number; user_id: number; student_id_number: string; name: string;
  date_of_birth: string | null; gender: string | null; nationality: string | null;
  phone: string | null; photo: string | null; faculty_id: number | null;
  department_id: number | null; academic_program_id: number | null;
  academic_level: string | null; enrollment_date: string | null;
  academic_status: string; cgpa: number | null; total_credit_hours: number;
  total_earned_hours: number; faculty?: { id: number; name: string };
  department?: { id: number; name: string }; program?: { id: number; name: string };
}
export interface Admission {
  id: number; application_number: string; name: string; email: string; phone: string;
  faculty_id: number; status: string; degree_level: string; submitted_at: string | null;
  reviewed_at: string | null; faculty?: { id: number; name: string };
}
export interface MsisCourse {
  id: number; code: string; name: string; slug: string; description: string | null;
  credit_hours: number; lecture_hours: number; lab_hours: number;
  course_type: string; academic_level: string | null; is_active: boolean;
  faculty?: { id: number; name: string }; department?: { id: number; name: string };
}
export interface MsisCourseSection {
  id: number; course_id: number; semester_id: number; section_number: string;
  instructor_id: number | null; room: string | null; building: string | null;
  capacity: number; enrolled_count: number; schedule: any[];
  course?: MsisCourse; semester?: Semester;
}
export interface MsisEnrollment {
  id: number; student_id: number; course_section_id: number; semester_id: number;
  status: string; enrolled_at: string; student?: MsisStudent; course_section?: MsisCourseSection;
}
export interface MsisGrade {
  id: number; student_id: number; course_section_id: number; semester_id: number;
  midterm_score: number | null; final_score: number | null; coursework_score: number | null;
  total_score: number | null; letter_grade: string | null; grade_points: number | null;
  credit_hours: number; is_pass: boolean | null; is_published: boolean;
  course_section?: MsisCourseSection;
}
export interface MsisPayment {
  id: number; student_fee_id: number; student_id: number; amount: number;
  payment_method: string; status: string; paid_at: string | null; receipt_number: string | null;
}

// ===== LMS Types =====
export interface LmsCourse {
  id: number; course_section_id: number; title: string; slug: string;
  description: string | null; cover_image: string | null; is_published: boolean;
  created_by: number; modules?: LmsModule[]; course_section?: MsisCourseSection;
}
export interface LmsModule {
  id: number; lms_course_id: number; title: string; description: string | null;
  order: number; is_published: boolean; lessons?: LmsLesson[];
}
export interface LmsLesson {
  id: number; lms_module_id: number; title: string; content_type: string;
  content: string | null; file_path: string | null; video_url: string | null;
  external_url: string | null; duration_minutes: number | null; order: number;
  is_published: boolean;
}
export interface LmsAssignment {
  id: number; lms_course_id: number; title: string; description: string | null;
  assignment_type: string; max_score: number; due_date: string | null;
  allow_late: boolean; is_published: boolean;
}
export interface AssignmentSubmission {
  id: number; lms_assignment_id: number; student_id: number; content: string | null;
  file_path: string | null; status: string; score: number | null;
  feedback: string | null; submitted_at: string; is_late: boolean;
}
export interface DiscussionThread {
  id: number; discussion_forum_id: number; user_id: number; title: string;
  body: string; is_pinned: boolean; is_locked: boolean; replies_count: number;
  created_at: string; user?: { id: number; name: string };
}
export interface DiscussionReply {
  id: number; discussion_thread_id: number; user_id: number; body: string;
  parent_id: number | null; created_at: string; user?: { id: number; name: string };
  children?: DiscussionReply[];
}
export interface DigitalCertificate {
  id: number; student_id: number; certificate_type: string; title: string;
  certificate_number: string; qr_code: string | null; verification_url: string | null;
  issued_at: string; expires_at: string | null;
}
