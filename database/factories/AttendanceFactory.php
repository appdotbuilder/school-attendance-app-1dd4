<?php

namespace Database\Factories;

use App\Models\Attendance;
use App\Models\Student;
use App\Models\Subject;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Attendance>
 */
class AttendanceFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\Attendance>
     */
    protected $model = Attendance::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'student_id' => Student::factory(),
            'subject_id' => Subject::factory(),
            'teacher_id' => User::factory()->state(['role' => 'teacher']),
            'date' => fake()->dateTimeBetween('-3 months', 'now')->format('Y-m-d'),
            'status' => fake()->randomElement(['present', 'absent', 'permission', 'sick']),
            'notes' => fake()->optional(0.3)->sentence(),
        ];
    }

    /**
     * Indicate that the attendance is present.
     */
    public function present(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'present',
            'notes' => null,
        ]);
    }

    /**
     * Indicate that the attendance is absent.
     */
    public function absent(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'absent',
            'notes' => fake()->optional(0.5)->sentence(),
        ]);
    }

    /**
     * Indicate that the attendance is permission.
     */
    public function permission(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'permission',
            'notes' => fake()->sentence(),
        ]);
    }

    /**
     * Indicate that the attendance is sick.
     */
    public function sick(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'sick',
            'notes' => fake()->sentence(),
        ]);
    }
}