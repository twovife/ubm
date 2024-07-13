<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AssetPlace extends Model
{
    use HasFactory;
    protected $fillable = [
        'place'
    ];
}
