<?php

namespace Database\Seeders;

use App\Models\AssetPlace;
use App\Models\AssetType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AssetSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $type = AssetType::create([
            'type' => "kendaraan"
        ]);

        $type->asset_category()->createMany([
            ['category' => "motor"],
            ['category' => "mobil"]
        ]);

        AssetPlace::create([
            'place' => "cabang"
        ]);
    }
}
