<?php

namespace Database\Seeders;

use App\Models\Branch;
use Exception;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BranchUpdateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $branchUpdate = json_decode(file_get_contents(storage_path('branchupdate.json')), true);

        try {
            DB::beginTransaction();
            $counter = 1;
            collect($branchUpdate)->each(function ($item) use (&$counter) {
                $branch = Branch::find($item['id']);
                $branch->isactive = $item['isactive'];
                $branch->save();
                echo $item['id'] . PHP_EOL;
                $counter++;
            });

            DB::commit();
        } catch (Exception $e) {
            dd($e);
            DB::rollBack();
        }
    }
}
