<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAttendanceRequest;
use App\Models\Attendance;
use App\Models\Student;
use App\Models\Subject;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AttendanceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Attendance::with(['student', 'subject', 'teacher']);
        
        // Filter by date range
        if ($request->start_date) {
            $query->where('date', '>=', $request->start_date);
        }
        if ($request->end_date) {
            $query->where('date', '<=', $request->end_date);
        }
        
        // Filter by subject
        if ($request->subject_id) {
            $query->where('subject_id', $request->subject_id);
        }
        
        // Filter by student
        if ($request->student_id) {
            $query->where('student_id', $request->student_id);
        }
        
        $attendances = $query->latest('date')->paginate(15);
        $subjects = Subject::active()->get();
        $students = Student::active()->get();
        
        return Inertia::render('attendances/index', [
            'attendances' => $attendances,
            'subjects' => $subjects,
            'students' => $students,
            'filters' => $request->only(['start_date', 'end_date', 'subject_id', 'student_id'])
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $subjects = Subject::active()->get();
        $students = Student::active()->get();
        $selectedSubject = $request->subject_id ? Subject::find($request->subject_id) : null;
        $selectedDate = $request->date ?: today()->format('Y-m-d');
        
        return Inertia::render('attendances/create', [
            'subjects' => $subjects,
            'students' => $students,
            'selectedSubject' => $selectedSubject,
            'selectedDate' => $selectedDate
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAttendanceRequest $request)
    {
        $attendanceData = $request->validated()['attendances'];
        
        foreach ($attendanceData as $attendance) {
            Attendance::updateOrCreate(
                [
                    'student_id' => $attendance['student_id'],
                    'subject_id' => $attendance['subject_id'],
                    'date' => $attendance['date'],
                ],
                [
                    'teacher_id' => auth()->id(),
                    'status' => $attendance['status'],
                    'notes' => $attendance['notes'] ?? null,
                ]
            );
        }

        return redirect()->route('attendances.index')
            ->with('success', 'Attendance recorded successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Attendance $attendance)
    {
        $attendance->load(['student', 'subject', 'teacher']);
        
        return Inertia::render('attendances/show', [
            'attendance' => $attendance
        ]);
    }


}