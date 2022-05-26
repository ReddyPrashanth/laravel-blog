<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

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

    protected $dateFormat = 'M d, Y h:m:s A';

    protected $with = ['contents', 'files'];

    public function contents()
    {
        return $this->hasMany(Content::class);
    }

    public function files()
    {
        return $this->hasMany(File::class);
    }

    public function getCreatedAtAttribute($value)
    {
        return Carbon::parse($value)->format($this->dateFormat);
    }

    public function getUpdatedAtAttribute($value)
    {
        return Carbon::parse($value)->format($this->dateFormat);
    }
}
