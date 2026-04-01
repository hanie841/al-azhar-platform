<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExamAttempt extends Model
{
    use HasFactory;

    protected $fillable = [
        'exam_id',
        'student_id',
        'attempt_number',
        'status',
        'started_at',
        'submitted_at',
        'time_spent_seconds',
        'total_score',
        'percentage',
        'is_passed',
        'ip_address',
        'browser_info',
        'auto_saved_at',
        'graded_by',
        'graded_at',
    ];

    protected function casts(): array
    {
        return [
            'total_score' => 'decimal:2',
            'percentage' => 'decimal:2',
            'is_passed' => 'boolean',
            'started_at' => 'datetime',
            'submitted_at' => 'datetime',
            'auto_saved_at' => 'datetime',
            'graded_at' => 'datetime',
        ];
    }

    public function exam()
    {
        return $this->belongsTo(Exam::class);
    }

    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function grader()
    {
        return $this->belongsTo(User::class, 'graded_by');
    }

    public function answers()
    {
        return $this->hasMany(ExamAnswer::class);
    }

    public function isCompleted(): bool
    {
        return in_array($this->status, ['submitted', 'graded']);
    }

    public function timeRemaining(): ?int
    {
        if ($this->isCompleted()) {
            return 0;
        }

        $durationSeconds = $this->exam->duration_minutes * 60;
        $elapsed = now()->diffInSeconds($this->started_at);

        return max(0, $durationSeconds - $elapsed);
    }

    public function autoGradeObjective(): void
    {
        $totalScore = 0;
        $hasSubjective = false;

        foreach ($this->answers()->with(['examQuestion.question', 'question'])->get() as $answer) {
            $question = $answer->question;
            $examQuestion = $answer->examQuestion;
            $maxPoints = $examQuestion->getEffectivePoints();

            if ($question->isSubjective()) {
                $hasSubjective = true;
                continue;
            }

            $answerContent = $answer->answer_content;
            $correctAnswer = $question->correct_answer;
            $options = $question->options;
            $isCorrect = false;
            $score = 0;

            switch ($question->question_type) {
                case 'mcq':
                    // answerContent is the selected option index; options is array with is_correct
                    if ($answerContent !== null && is_array($options)) {
                        $selectedIndex = is_array($answerContent) ? ($answerContent['selected'] ?? null) : $answerContent;
                        if ($selectedIndex !== null && isset($options[$selectedIndex])) {
                            $isCorrect = ! empty($options[$selectedIndex]['is_correct']);
                        }
                    }
                    break;

                case 'true_false':
                    $studentAnswer = is_array($answerContent) ? ($answerContent['answer'] ?? $answerContent) : $answerContent;
                    $correct = is_array($correctAnswer) ? ($correctAnswer['answer'] ?? $correctAnswer) : $correctAnswer;
                    $isCorrect = strtolower((string) $studentAnswer) === strtolower((string) $correct);
                    break;

                case 'fill_blank':
                    // correctAnswer is array of accepted answers
                    $studentText = is_array($answerContent) ? ($answerContent['text'] ?? '') : (string) $answerContent;
                    $acceptedAnswers = is_array($correctAnswer) ? $correctAnswer : [$correctAnswer];
                    foreach ($acceptedAnswers as $accepted) {
                        if (mb_strtolower(trim((string) $studentText)) === mb_strtolower(trim((string) $accepted))) {
                            $isCorrect = true;
                            break;
                        }
                    }
                    break;

                case 'matching':
                    // answerContent and correctAnswer are both arrays of pairs
                    $studentPairs = is_array($answerContent) ? $answerContent : [];
                    $correctPairs = is_array($correctAnswer) ? $correctAnswer : [];
                    $isCorrect = ! empty($studentPairs)
                        && ! empty($correctPairs)
                        && count($studentPairs) === count($correctPairs);
                    if ($isCorrect) {
                        foreach ($correctPairs as $key => $value) {
                            $studentValue = $studentPairs[$key] ?? null;
                            if ((string) $studentValue !== (string) $value) {
                                $isCorrect = false;
                                break;
                            }
                        }
                    }
                    break;
            }

            $score = $isCorrect ? $maxPoints : 0;
            $totalScore += $score;

            $answer->update([
                'is_correct' => $isCorrect,
                'auto_score' => $score,
                'final_score' => $score,
            ]);
        }

        $totalPossible = $this->exam->total_marks;
        $percentage = $totalPossible > 0 ? round(($totalScore / $totalPossible) * 100, 2) : 0;

        $updateData = [
            'total_score' => $totalScore,
            'percentage' => $percentage,
        ];

        if ($this->exam->pass_marks !== null) {
            $updateData['is_passed'] = $totalScore >= $this->exam->pass_marks;
        }

        if ($hasSubjective) {
            $updateData['status'] = 'submitted';
        } else {
            $updateData['status'] = 'graded';
            $updateData['graded_at'] = now();
        }

        $this->update($updateData);
    }
}
