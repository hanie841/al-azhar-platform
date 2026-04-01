<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;

class QuestionCategory extends Model
{
    use HasFactory, HasTranslations;

    protected $fillable = [
        'question_bank_id',
        'name',
        'parent_id',
        'order',
    ];

    public array $translatable = [
        'name',
    ];

    public function questionBank()
    {
        return $this->belongsTo(QuestionBank::class);
    }

    public function parent()
    {
        return $this->belongsTo(QuestionCategory::class, 'parent_id');
    }

    public function children()
    {
        return $this->hasMany(QuestionCategory::class, 'parent_id');
    }

    public function questions()
    {
        return $this->hasMany(Question::class);
    }
}
