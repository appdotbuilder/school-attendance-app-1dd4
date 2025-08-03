<?php

namespace Database\Factories;

use App\Models\Subject;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Subject>
 */
class SubjectFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\Subject>
     */
    protected $model = Subject::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $subjects = [
            'Matematika', 'Bahasa Indonesia', 'Bahasa Inggris', 'IPA', 'IPS',
            'Pendidikan Agama', 'Pendidikan Kewarganegaraan', 'Seni Budaya',
            'Pendidikan Jasmani', 'Prakarya', 'Sejarah', 'Geografi', 'Ekonomi',
            'Sosiologi', 'Fisika', 'Kimia', 'Biologi'
        ];

        $subjectName = fake()->randomElement($subjects);
        
        return [
            'name' => $subjectName,
            'code' => strtoupper(substr($subjectName, 0, 3)) . fake()->unique()->numberBetween(100, 999),
            'description' => fake()->sentence(10),
            'status' => fake()->randomElement(['active', 'inactive']),
        ];
    }

    /**
     * Indicate that the subject is active.
     */
    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'active',
        ]);
    }

    /**
     * Indicate that the subject is inactive.
     */
    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'inactive',
        ]);
    }
}