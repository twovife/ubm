<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Branch;
use App\Models\Title;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        try {
            $pusat = User::create([
                'username' => 'pusat',
                'email' => 'azizihsan69@gmail.com',
                'email_verified_at' => now(),
                'password' => Hash::make('4343abab'),
            ]);
            $unit = User::create([
                'username' => 'unit',
                'email' => 'azizihsan69@gmail.com',
                'email_verified_at' => now(),
                'password' => Hash::make('4343abab'),
            ]);
            $area = User::create([
                'username' => 'area',
                'email' => 'azizihsan69@gmail.com',
                'email_verified_at' => now(),
                'password' => Hash::make('4343abab'),
            ]);
            $pusat->givePermissionTo('pusat');
            $unit->givePermissionTo('unit');
            $area->givePermissionTo('area');
            DB::commit();
        } catch (\Exception $e) {
            dd($e);
            DB::rollBack();
        }

        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
