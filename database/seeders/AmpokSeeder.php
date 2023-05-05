<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AmpokSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('titles')->insert([
            [
                'title' => 'mantri',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'kepala mantri',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'admin',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'kasir',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'wakil pimpinan',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'pimpinan',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'staf',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'staf kontrol',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'pengawas',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
