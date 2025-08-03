<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use App\Models\Subject;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReportController extends Controller
{
    /**
     * Show attendance report.
     */
    public function index(Request $request)
    {
        $query = Attendance::with(['student', 'subject']);
        
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
        
        $attendances = $query->get();
        
        // Generate summary statistics
        $summary = [
            'total_records' => $attendances->count(),
            'present' => $attendances->where('status', 'present')->count(),
            'absent' => $attendances->where('status', 'absent')->count(),
            'permission' => $attendances->where('status', 'permission')->count(),
            'sick' => $attendances->where('status', 'sick')->count(),
        ];
        
        $subjects = Subject::active()->get();
        
        return Inertia::render('reports/attendance', [
            'attendances' => $attendances,
            'summary' => $summary,
            'subjects' => $subjects,
            'filters' => $request->only(['start_date', 'end_date', 'subject_id'])
        ]);
    }
}