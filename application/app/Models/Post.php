<?php

namespace App\Models;

use App\Traits\ModelAuditFields;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory, ModelAuditFields;

     /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'description',
        'gist'
    ];

    protected $with = ['contents', 'files'];

    public function contents()
    {
        return $this->hasMany(Content::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function files()
    {
        return $this->hasMany(File::class);
    }
}
