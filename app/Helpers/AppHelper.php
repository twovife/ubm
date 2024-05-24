<?php

namespace App\Helpers;

use Carbon\Carbon;

class AppHelper
{
    public static function dateName($date)
    {
        return strtolower(Carbon::parse($date)->locale('id')->dayName);
    }

    public static function typeMutasi($type)
    {
        switch ($type) {
            case 1:
                return "Promosi";
            case 2:
                return "Mutasi";
            case 3:
                return "Demosi";
            case 4:
                return "Resign";
            case 5:
                return "Pecat";
            case 6:
                return "Kembali Masuk";
            default:
                return "Error";
        }
    }
    public static function format()
    {
        return new AppHelper();
    }
}
