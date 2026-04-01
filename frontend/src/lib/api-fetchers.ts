import { api } from './api';
import type {
  User,
  AuthResponse,
  RegisterData,
  LibraryItem,
  Faculty,
  AcademicProgram,
  NewsArticle,
  TimelineEra,
  Person,
  Event,
  LibraryCollection,
  OrgUnit,
  ResearchPublication,
  PaginatedResponse,
  ListResponse,
  SearchResults,
  Exam,
  ExamAttempt,
  ExamStatistics,
  FacultyProfile,
  FacultyDashboard,
  CourseSection,
  LeaveRequest,
  AcademicYear,
  Semester,
  MsisStudent,
  MsisCourse,
  MsisCourseSection,
  MsisEnrollment,
  MsisGrade,
  MsisPayment,
  LmsCourse,
  LmsModule,
  LmsLesson,
  LmsAssignment,
  DiscussionThread,
  DigitalCertificate,
} from './types';

// Helper: fetch with locale header
function localeHeaders(locale: string): HeadersInit {
  return { 'Accept-Language': locale };
}

// --- Library ---

export async function fetchLibraryItems(
  locale: string,
  params?: Record<string, string | number | boolean | undefined>
): Promise<PaginatedResponse<LibraryItem>> {
  return api<PaginatedResponse<LibraryItem>>('/library', {
    headers: localeHeaders(locale),
    params: { per_page: 20, ...params },
    next: { revalidate: 60 },
  } as any);
}

export async function fetchLibraryItem(locale: string, slug: string): Promise<LibraryItem> {
  const res = await api<{ data: LibraryItem }>(`/library/${slug}`, {
    headers: localeHeaders(locale),
    next: { revalidate: 60 },
  } as any);
  return res.data;
}

export async function fetchLibraryCollections(locale: string): Promise<LibraryCollection[]> {
  const res = await api<ListResponse<LibraryCollection>>('/library/collections', {
    headers: localeHeaders(locale),
    next: { revalidate: 60 },
  } as any);
  return res.data;
}

// --- Faculties ---

export async function fetchFaculties(locale: string): Promise<Faculty[]> {
  const res = await api<PaginatedResponse<Faculty>>('/faculties', {
    headers: localeHeaders(locale),
    params: { per_page: 100 },
    next: { revalidate: 60 },
  } as any);
  return res.data;
}

export async function fetchFaculty(locale: string, slug: string): Promise<Faculty> {
  const res = await api<{ data: Faculty }>(`/faculties/${slug}`, {
    headers: localeHeaders(locale),
    next: { revalidate: 60 },
  } as any);
  return res.data;
}

// --- Programs ---

export async function fetchPrograms(
  locale: string,
  params?: Record<string, string | number | boolean | undefined>
): Promise<PaginatedResponse<AcademicProgram>> {
  return api<PaginatedResponse<AcademicProgram>>('/programs', {
    headers: localeHeaders(locale),
    params: { per_page: 100, ...params },
    next: { revalidate: 60 },
  } as any);
}

export async function fetchProgram(locale: string, slug: string): Promise<AcademicProgram> {
  const res = await api<{ data: AcademicProgram }>(`/programs/${slug}`, {
    headers: localeHeaders(locale),
    next: { revalidate: 60 },
  } as any);
  return res.data;
}

// --- News ---

export async function fetchNews(
  locale: string,
  params?: Record<string, string | number | boolean | undefined>
): Promise<PaginatedResponse<NewsArticle>> {
  return api<PaginatedResponse<NewsArticle>>('/news', {
    headers: localeHeaders(locale),
    params: { per_page: 20, ...params },
    next: { revalidate: 60 },
  } as any);
}

export async function fetchNewsArticle(locale: string, slug: string): Promise<NewsArticle> {
  const res = await api<{ data: NewsArticle }>(`/news/${slug}`, {
    headers: localeHeaders(locale),
    next: { revalidate: 60 },
  } as any);
  return res.data;
}

// --- Timeline ---

export async function fetchTimeline(locale: string): Promise<TimelineEra[]> {
  const res = await api<ListResponse<TimelineEra>>('/timeline', {
    headers: localeHeaders(locale),
    next: { revalidate: 300 },
  } as any);
  return res.data;
}

// --- People ---

export async function fetchPeople(locale: string): Promise<Person[]> {
  const res = await api<ListResponse<Person>>('/people', {
    headers: localeHeaders(locale),
    next: { revalidate: 300 },
  } as any);
  return res.data;
}

export async function fetchPerson(locale: string, slug: string): Promise<Person> {
  const res = await api<{ data: Person }>(`/people/${slug}`, {
    headers: localeHeaders(locale),
    next: { revalidate: 300 },
  } as any);
  return res.data;
}

// --- Events ---

export async function fetchEvents(locale: string): Promise<Event[]> {
  const res = await api<PaginatedResponse<Event>>('/events', {
    headers: localeHeaders(locale),
    params: { per_page: 50 },
    next: { revalidate: 60 },
  } as any);
  return res.data;
}

// --- Org Structure ---

export async function fetchOrgStructure(locale: string): Promise<OrgUnit[]> {
  const res = await api<ListResponse<OrgUnit>>('/org-structure', {
    headers: localeHeaders(locale),
    next: { revalidate: 300 },
  } as any);
  return res.data;
}

export async function fetchOrgUnit(locale: string, slug: string): Promise<OrgUnit> {
  const res = await api<{ data: OrgUnit }>(`/org-structure/${slug}`, {
    headers: localeHeaders(locale),
    next: { revalidate: 300 },
  } as any);
  return res.data;
}

// --- Research Publications ---

export async function fetchResearchPublications(
  locale: string,
  params?: Record<string, string | number | boolean | undefined>
): Promise<PaginatedResponse<ResearchPublication>> {
  return api<PaginatedResponse<ResearchPublication>>('/research', {
    headers: localeHeaders(locale),
    params: { per_page: 20, ...params },
    next: { revalidate: 60 },
  } as any);
}

export async function fetchResearchPublication(locale: string, slug: string): Promise<ResearchPublication> {
  const res = await api<{ data: ResearchPublication }>(`/research/${slug}`, {
    headers: localeHeaders(locale),
    next: { revalidate: 60 },
  } as any);
  return res.data;
}

// --- Search ---

export async function searchAll(
  locale: string,
  query: string,
  type?: string
): Promise<SearchResults> {
  const params: Record<string, string> = { q: query };
  if (type) {
    params.type = type;
  }
  return api<SearchResults>('/search', {
    headers: localeHeaders(locale),
    params,
  });
}

// --- Auth ---

const AUTH_BASE = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1') + '/auth';

async function authFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${AUTH_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.message || `Error ${response.status}`) as Error & {
      errors?: Record<string, string[]>;
    };
    error.errors = data.errors;
    throw error;
  }

  return data as T;
}

export async function loginUser(email: string, password: string): Promise<AuthResponse> {
  return authFetch<AuthResponse>('/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export async function registerUser(data: RegisterData): Promise<AuthResponse> {
  return authFetch<AuthResponse>('/register', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function logoutUser(token: string): Promise<void> {
  await authFetch<{ message: string }>('/logout', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function fetchCurrentUser(token: string): Promise<User> {
  const res = await authFetch<{ user: User }>('/me', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.user;
}

// ===== E-Exam Fetchers =====

export async function fetchExams(
  locale: string,
  params?: Record<string, string | number | boolean | undefined>
): Promise<PaginatedResponse<Exam>> {
  return api<PaginatedResponse<Exam>>('/exams', {
    headers: localeHeaders(locale),
    params: { per_page: 20, ...params },
    next: { revalidate: 60 },
  } as any);
}

export async function fetchExam(locale: string, slug: string): Promise<Exam> {
  const res = await api<{ data: Exam }>(`/exams/${slug}`, {
    headers: localeHeaders(locale),
    next: { revalidate: 60 },
  } as any);
  return res.data;
}

export async function startExam(token: string, examId: number): Promise<ExamAttempt> {
  const res = await api<{ data: ExamAttempt }>(`/exams/${examId}/start`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  } as any);
  return res.data;
}

export async function saveExamAnswer(
  token: string,
  attemptId: number,
  data: { exam_question_id: number; question_id: number; answer_content: any }
): Promise<void> {
  await api(`/exams/attempts/${attemptId}/save-answer`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  } as any);
}

export async function submitExam(token: string, attemptId: number): Promise<ExamAttempt> {
  const res = await api<{ data: ExamAttempt }>(`/exams/attempts/${attemptId}/submit`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  } as any);
  return res.data;
}

export async function fetchExamAttempt(token: string, attemptId: number): Promise<ExamAttempt> {
  const res = await api<{ data: ExamAttempt }>(`/exams/attempts/${attemptId}`, {
    headers: { Authorization: `Bearer ${token}` },
  } as any);
  return res.data;
}

export async function fetchMyExamAttempts(
  token: string,
  locale: string,
  examId: number
): Promise<ExamAttempt[]> {
  const res = await api<ListResponse<ExamAttempt>>(`/exams/${examId}/my-attempts`, {
    headers: { ...localeHeaders(locale), Authorization: `Bearer ${token}` },
  } as any);
  return res.data;
}

export async function fetchExamStatistics(
  token: string,
  locale: string,
  examId: number
): Promise<ExamStatistics> {
  const res = await api<{ data: ExamStatistics }>(`/exams/${examId}/statistics`, {
    headers: { ...localeHeaders(locale), Authorization: `Bearer ${token}` },
  } as any);
  return res.data;
}

// ===== Faculty Portal Fetchers =====

export async function fetchFacultyProfiles(
  locale: string,
  params?: Record<string, string | number | boolean | undefined>
): Promise<PaginatedResponse<FacultyProfile>> {
  return api<PaginatedResponse<FacultyProfile>>('/faculty-portal/profiles', {
    headers: localeHeaders(locale),
    params: { per_page: 20, ...params },
    next: { revalidate: 60 },
  } as any);
}

export async function fetchFacultyProfileById(
  locale: string,
  id: number
): Promise<FacultyProfile> {
  const res = await api<{ data: FacultyProfile }>(`/faculty-portal/profiles/${id}`, {
    headers: localeHeaders(locale),
    next: { revalidate: 60 },
  } as any);
  return res.data;
}

export async function fetchMyFacultyProfile(
  token: string,
  locale: string
): Promise<FacultyProfile> {
  const res = await api<{ data: FacultyProfile }>('/faculty-portal/me', {
    headers: { ...localeHeaders(locale), Authorization: `Bearer ${token}` },
  } as any);
  return res.data;
}

export async function fetchFacultyDashboard(
  token: string,
  locale: string
): Promise<FacultyDashboard> {
  const res = await api<{ data: FacultyDashboard }>('/faculty-portal/dashboard', {
    headers: { ...localeHeaders(locale), Authorization: `Bearer ${token}` },
  } as any);
  return res.data;
}

export async function fetchMyCourses(
  token: string,
  locale: string
): Promise<CourseSection[]> {
  const res = await api<ListResponse<CourseSection>>('/faculty-portal/my-courses', {
    headers: { ...localeHeaders(locale), Authorization: `Bearer ${token}` },
  } as any);
  return res.data;
}

export async function fetchCourseStudents(
  token: string,
  locale: string,
  sectionId: number
): Promise<any[]> {
  const res = await api<ListResponse<any>>(`/faculty-portal/courses/${sectionId}/students`, {
    headers: { ...localeHeaders(locale), Authorization: `Bearer ${token}` },
  } as any);
  return res.data;
}

export async function fetchLeaveRequests(
  token: string,
  locale: string,
  params?: Record<string, string | number | boolean | undefined>
): Promise<PaginatedResponse<LeaveRequest>> {
  return api<PaginatedResponse<LeaveRequest>>('/faculty-portal/leaves', {
    headers: { ...localeHeaders(locale), Authorization: `Bearer ${token}` },
    params: { per_page: 20, ...params },
  } as any);
}

export async function submitLeaveRequest(
  token: string,
  data: { leave_type: string; start_date: string; end_date: string; reason: string }
): Promise<LeaveRequest> {
  const res = await api<{ data: LeaveRequest }>('/faculty-portal/leaves', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  } as any);
  return res.data;
}

// ===== M-SIS Fetchers =====

export async function fetchAcademicYears(locale: string): Promise<AcademicYear[]> {
  const res = await api<ListResponse<AcademicYear>>('/msis/academic-years', {
    headers: localeHeaders(locale),
    next: { revalidate: 60 },
  } as any);
  return res.data;
}

export async function fetchSemesters(
  locale: string,
  academicYearId?: number
): Promise<Semester[]> {
  const params: Record<string, string | number> = {};
  if (academicYearId) params.academic_year_id = academicYearId;
  const res = await api<ListResponse<Semester>>('/msis/semesters', {
    headers: localeHeaders(locale),
    params,
    next: { revalidate: 60 },
  } as any);
  return res.data;
}

export async function fetchMsisStudents(
  locale: string,
  params?: Record<string, string | number | boolean | undefined>
): Promise<PaginatedResponse<MsisStudent>> {
  return api<PaginatedResponse<MsisStudent>>('/msis/students', {
    headers: localeHeaders(locale),
    params: { per_page: 20, ...params },
    next: { revalidate: 60 },
  } as any);
}

export async function fetchMsisStudent(locale: string, id: number): Promise<MsisStudent> {
  const res = await api<{ data: MsisStudent }>(`/msis/students/${id}`, {
    headers: localeHeaders(locale),
    next: { revalidate: 60 },
  } as any);
  return res.data;
}

export async function fetchMsisCourses(
  locale: string,
  params?: Record<string, string | number | boolean | undefined>
): Promise<PaginatedResponse<MsisCourse>> {
  return api<PaginatedResponse<MsisCourse>>('/msis/courses', {
    headers: localeHeaders(locale),
    params: { per_page: 20, ...params },
    next: { revalidate: 60 },
  } as any);
}

export async function fetchMsisCourse(locale: string, slug: string): Promise<MsisCourse> {
  const res = await api<{ data: MsisCourse }>(`/msis/courses/${slug}`, {
    headers: localeHeaders(locale),
    next: { revalidate: 60 },
  } as any);
  return res.data;
}

export async function fetchMsisCourseSections(
  locale: string,
  params?: Record<string, string | number | boolean | undefined>
): Promise<PaginatedResponse<MsisCourseSection>> {
  return api<PaginatedResponse<MsisCourseSection>>('/msis/course-sections', {
    headers: localeHeaders(locale),
    params: { per_page: 50, ...params },
    next: { revalidate: 60 },
  } as any);
}

export async function fetchMsisEnrollments(
  token: string,
  locale: string,
  params?: Record<string, string | number | boolean | undefined>
): Promise<PaginatedResponse<MsisEnrollment>> {
  return api<PaginatedResponse<MsisEnrollment>>('/msis/enrollments', {
    headers: { ...localeHeaders(locale), Authorization: `Bearer ${token}` },
    params: { per_page: 50, ...params },
  } as any);
}

export async function enrollInSection(
  token: string,
  courseSectionId: number
): Promise<MsisEnrollment> {
  const res = await api<{ data: MsisEnrollment }>('/msis/enrollments', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify({ course_section_id: courseSectionId }),
  } as any);
  return res.data;
}

export async function dropEnrollment(
  token: string,
  enrollmentId: number
): Promise<void> {
  await api(`/msis/enrollments/${enrollmentId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  } as any);
}

export async function fetchMsisGrades(
  token: string,
  locale: string,
  params?: Record<string, string | number | boolean | undefined>
): Promise<PaginatedResponse<MsisGrade>> {
  return api<PaginatedResponse<MsisGrade>>('/msis/grades', {
    headers: { ...localeHeaders(locale), Authorization: `Bearer ${token}` },
    params: { per_page: 50, ...params },
  } as any);
}

export async function fetchTranscript(
  token: string,
  locale: string,
  studentId: number
): Promise<{ semesters: { semester: Semester; grades: MsisGrade[]; gpa: number }[]; cgpa: number }> {
  const res = await api<{ data: { semesters: { semester: Semester; grades: MsisGrade[]; gpa: number }[]; cgpa: number } }>(
    `/msis/grades/transcript/${studentId}`,
    { headers: { ...localeHeaders(locale), Authorization: `Bearer ${token}` } } as any
  );
  return res.data;
}

export async function fetchMsisPayments(
  token: string,
  locale: string,
  params?: Record<string, string | number | boolean | undefined>
): Promise<PaginatedResponse<MsisPayment>> {
  return api<PaginatedResponse<MsisPayment>>('/msis/payments', {
    headers: { ...localeHeaders(locale), Authorization: `Bearer ${token}` },
    params: { per_page: 50, ...params },
  } as any);
}

// ===== LMS Fetchers =====

export async function fetchLmsCourses(
  locale: string,
  params?: Record<string, string | number | boolean | undefined>
): Promise<PaginatedResponse<LmsCourse>> {
  return api<PaginatedResponse<LmsCourse>>('/lms/courses', {
    headers: localeHeaders(locale),
    params: { per_page: 20, ...params },
    next: { revalidate: 60 },
  } as any);
}

export async function fetchLmsCourse(locale: string, slug: string): Promise<LmsCourse> {
  const res = await api<{ data: LmsCourse }>(`/lms/courses/${slug}`, {
    headers: localeHeaders(locale),
    next: { revalidate: 60 },
  } as any);
  return res.data;
}

export async function fetchLmsModules(locale: string, courseId: number): Promise<LmsModule[]> {
  const res = await api<ListResponse<LmsModule>>(`/lms/courses/${courseId}/modules`, {
    headers: localeHeaders(locale),
    next: { revalidate: 60 },
  } as any);
  return res.data;
}

export async function fetchLmsLesson(locale: string, id: number): Promise<LmsLesson> {
  const res = await api<{ data: LmsLesson }>(`/lms/lessons/${id}`, {
    headers: localeHeaders(locale),
    next: { revalidate: 60 },
  } as any);
  return res.data;
}

export async function fetchLmsAssignments(locale: string, courseId: number): Promise<LmsAssignment[]> {
  const res = await api<ListResponse<LmsAssignment>>(`/lms/courses/${courseId}/assignments`, {
    headers: localeHeaders(locale),
    next: { revalidate: 60 },
  } as any);
  return res.data;
}

export async function fetchDiscussionThreads(locale: string, forumId: number): Promise<DiscussionThread[]> {
  const res = await api<ListResponse<DiscussionThread>>(`/lms/forums/${forumId}/threads`, {
    headers: localeHeaders(locale),
    next: { revalidate: 60 },
  } as any);
  return res.data;
}

export async function verifyCertificate(certificateNumber: string): Promise<DigitalCertificate> {
  const res = await api<{ data: DigitalCertificate }>(`/lms/certificates/verify/${certificateNumber}`, {
    headers: localeHeaders('en'),
  } as any);
  return res.data;
}

export async function markLessonComplete(token: string, lessonId: number): Promise<void> {
  await api(`/lms/lessons/${lessonId}/complete`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  } as any);
}
