<?php

namespace App\Traits;

use Carbon\Carbon;

trait ModelAuditFields
{
    protected $date_format = 'M d, Y h:m:s A';

    public function getCreatedAtAttribute($value)
    {
        return Carbon::parse($value)->format($this->date_format);
    }

    public function getUpdatedAtAttribute($value)
    {
        return Carbon::parse($value)->format($this->date_format);
    }
}