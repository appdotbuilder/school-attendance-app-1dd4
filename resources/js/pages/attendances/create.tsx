import React, { useState, useEffect } from 'react';
import { Head, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Student {
    id: number;
    student_id: string;
    name: string;
    class: string;
}

interface Subject {
    id: number;
    name: string;
    code: string;
}

interface AttendanceRecord {
    student_id: number;
    status: 'present' | 'absent' | 'permission' | 'sick';
    notes: string;
}

interface Props {
    subjects: Subject[];
    students: Student[];
    selectedSubject?: Subject;
    selectedDate: string;
    errors?: Record<string, string>;
    [key: string]: unknown;
}

export default function AttendancesCreate({ subjects, students, selectedSubject, selectedDate, errors = {} }: Props) {
    const [subjectId, setSubjectId] = useState(selectedSubject?.id?.toString() || '');
    const [date, setDate] = useState(selectedDate);
    const [attendances, setAttendances] = useState<Record<number, AttendanceRecord>>({});

    // Initialize attendance records when students change
    useEffect(() => {
        const initialAttendances: Record<number, AttendanceRecord> = {};
        students.forEach(student => {
            initialAttendances[student.id] = {
                student_id: student.id,
                status: 'present',
                notes: ''
            };
        });
        setAttendances(initialAttendances);
    }, [students]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!subjectId) {
            alert('Pilih mata pelajaran terlebih dahulu');
            return;
        }

        const attendanceArray = Object.values(attendances).map(attendance => ({
            ...attendance,
            subject_id: parseInt(subjectId),
            date: date
        }));

        router.post('/attendances', { attendances: attendanceArray }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const updateAttendance = (studentId: number, field: keyof AttendanceRecord, value: string) => {
        setAttendances(prev => ({
            ...prev,
            [studentId]: {
                ...prev[studentId],
                [field]: value
            }
        }));
    };

    const setAllStatus = (status: 'present' | 'absent' | 'permission' | 'sick') => {
        setAttendances(prev => {
            const updated = { ...prev };
            Object.keys(updated).forEach(studentId => {
                updated[parseInt(studentId)].status = status;
            });
            return updated;
        });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'present': return 'bg-green-100 text-green-800';
            case 'absent': return 'bg-red-100 text-red-800';
            case 'permission': return 'bg-blue-100 text-blue-800';
            case 'sick': return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'present': return '✅';
            case 'absent': return '❌';
            case 'permission': return '📝';
            case 'sick': return '🤒';
            default: return '❓';
        }
    };

    return (
        <AppShell>
            <Head title="Catat Absensi" />
            
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">✅ Catat Kehadiran Siswa</h1>
                    <p className="text-gray-600 mt-1">Pilih mata pelajaran dan catat kehadiran siswa</p>
                </div>

                {/* Form Header */}
                <Card>
                    <CardHeader>
                        <CardTitle>Informasi Absensi</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                {/* Subject Selection */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Mata Pelajaran *
                                    </label>
                                    <select
                                        value={subjectId}
                                        onChange={(e) => setSubjectId(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    >
                                        <option value="">Pilih Mata Pelajaran</option>
                                        {subjects.map(subject => (
                                            <option key={subject.id} value={subject.id}>
                                                {subject.code} - {subject.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.subject_id && (
                                        <p className="text-red-600 text-sm mt-1">{errors.subject_id}</p>
                                    )}
                                </div>

                                {/* Date Selection */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Tanggal *
                                    </label>
                                    <input
                                        type="date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                    {errors.date && (
                                        <p className="text-red-600 text-sm mt-1">{errors.date}</p>
                                    )}
                                </div>
                            </div>

                            {/* Quick Actions */}
                            {subjectId && (
                                <div className="border-t pt-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Aksi Cepat</h3>
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        <Button 
                                            type="button" 
                                            variant="outline" 
                                            onClick={() => setAllStatus('present')}
                                            className="text-green-600 hover:text-green-800"
                                        >
                                            ✅ Semua Hadir
                                        </Button>
                                        <Button 
                                            type="button" 
                                            variant="outline" 
                                            onClick={() => setAllStatus('absent')}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            ❌ Semua Absen
                                        </Button>
                                    </div>

                                    {/* Students List */}
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-medium text-gray-900">
                                            Daftar Siswa ({students.length} siswa)
                                        </h3>
                                        
                                        {students.length === 0 ? (
                                            <div className="text-center py-8 text-gray-500">
                                                <span className="text-4xl mb-4 block">👨‍🎓</span>
                                                <p>Belum ada data siswa aktif</p>
                                            </div>
                                        ) : (
                                            <div className="space-y-3">
                                                {students.map((student) => (
                                                    <div key={student.id} className="bg-gray-50 p-4 rounded-lg">
                                                        <div className="flex items-center justify-between mb-3">
                                                            <div className="flex-1">
                                                                <h4 className="font-medium text-gray-900">
                                                                    {student.name}
                                                                </h4>
                                                                <p className="text-sm text-gray-500">
                                                                    {student.student_id} • Kelas {student.class}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        
                                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
                                                            {(['present', 'absent', 'permission', 'sick'] as const).map((status) => (
                                                                <label key={status} className="flex items-center cursor-pointer">
                                                                    <input
                                                                        type="radio"
                                                                        name={`status_${student.id}`}
                                                                        value={status}
                                                                        checked={attendances[student.id]?.status === status}
                                                                        onChange={(e) => updateAttendance(student.id, 'status', e.target.value)}
                                                                        className="sr-only"
                                                                    />
                                                                    <span className={`px-3 py-2 rounded-lg text-xs font-medium text-center w-full transition-colors ${
                                                                        attendances[student.id]?.status === status
                                                                            ? getStatusColor(status)
                                                                            : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                                                                    }`}>
                                                                        {getStatusIcon(status)} {
                                                                            status === 'present' ? 'Hadir' :
                                                                            status === 'absent' ? 'Absen' :
                                                                            status === 'permission' ? 'Izin' : 'Sakit'
                                                                        }
                                                                    </span>
                                                                </label>
                                                            ))}
                                                        </div>

                                                        {/* Notes field - show for non-present status */}
                                                        {attendances[student.id]?.status !== 'present' && (
                                                            <div>
                                                                <input
                                                                    type="text"
                                                                    placeholder="Catatan (opsional)"
                                                                    value={attendances[student.id]?.notes || ''}
                                                                    onChange={(e) => updateAttendance(student.id, 'notes', e.target.value)}
                                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Submit Buttons */}
                                    {students.length > 0 && (
                                        <div className="flex space-x-4 pt-6 border-t">
                                            <Button type="submit">
                                                💾 Simpan Absensi
                                            </Button>
                                            <Button 
                                                type="button" 
                                                variant="outline"
                                                onClick={() => router.get('/attendances')}
                                            >
                                                ❌ Batal
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    );
}