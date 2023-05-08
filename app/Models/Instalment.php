<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Instalment extends Model
{
    use HasFactory;
    protected $fillable = [
        "loan_id",
        "pembayaran_date",
        "jumlah",
        "status",
        "mantri",
    ];
}
