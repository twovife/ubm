<?php

namespace App\Helpers;

use Carbon\Carbon;

class AppHelper
{
    public static function dateName($date)
    {
        return strtolower(Carbon::parse($date)->locale('id')->dayName);
    }

    public static function format()
    {
        return new AppHelper();
    }
}
