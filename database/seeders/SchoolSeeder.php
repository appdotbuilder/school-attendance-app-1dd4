<?php

namespace Database\Seeders;

use App\Models\Attendance;
use App\Models\Student;
use App\Models\Subject;
use App\Models\User;
use Illuminate\Database\Seeder;

class SchoolSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create admin user
        $admin = User::create([
            'name' => 'Administrator',
            'email' => 'admin@sekolah.com',
            'password' => bcrypt('password'),
            'role' => 'administrator',
            'email_verified_at' => now(),
        ]);

        // Create teachers
        $teachers = User::factory(5)->create([
            'role' => 'teacher',
            'email_verified_at' => now(),
        ]);

        // Create subjects
        $subjects = [
            ['name' => 'Matematika', 'code' => 'MAT101', 'description' => 'Mata pelajaran matematika dasar'],
            ['name' => 'Bahasa Indonesia', 'code' => 'BIN101', 'description' => 'Mata pelajaran bahasa Indonesia'],
            ['name' => 'Bahasa Inggris', 'code' => 'ENG101', 'description' => 'Mata pelajaran bahasa Inggris'],
            ['name' => 'IPA', 'code' => 'IPA101', 'description' => 'Mata pelajaran Ilmu Pengetahuan Alam'],
            ['name' => 'IPS', 'code' => 'IPS101', 'description' => 'Mata pelajaran Ilmu Pengetahuan Sosial'],
        ];

        foreach ($subjects as $subject) {
            Subject::create(array_merge($subject, ['status' => 'active']));
        }

        // Create students
        $students = Student::factory(30)->active()->create();

        // Create attendance records for the last 30 days
        $subjectIds = Subject::pluck('id')->toArray();
        $teacherIds = $teachers->pluck('id')->toArray();
        
        foreach ($students as $student) {
            foreach ($subjectIds as $subjectId) {
                // Create random attendance records for the last 30 days
                for ($i = 0; $i < 15; $i++) {
                    $date = now()->subDays(random_int(1, 30))->format('Y-m-d');
                    
                    // Avoid duplicate entries
                    if (!Attendance::where('student_id', $student->id)
                        ->where('subject_id', $subjectId)
                        ->where('date', $date)
                        ->exists()) {
                        
                        Attendance::create([
                            'student_id' => $student->id,
                            'subject_id' => $subjectId,
                            'teacher_id' => fake()->randomElement($teacherIds),
                            'date' => $date,
                            'status' => fake()->randomElement(['present', 'present', 'present', 'absent', 'permission', 'sick']), // More present records
                            'notes' => fake()->optional(0.2)->sentence(),
                        ]);
                    }
                }
            }
        }
    }
}