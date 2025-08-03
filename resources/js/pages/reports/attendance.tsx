import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Attendance {
    id: number;
    date: string;
    status: 'present' | 'absent' | 'permission' | 'sick';
    notes: string | null;
    student: {
        id: number;
        name: string;
        student_id: string;
        class: string;
    };
    subject: {
        id: number;
        name: string;
        code: string;
    };
}

interface Subject {
    id: number;
    name: string;
    code: string;
}

interface Summary {
    total_records: number;
    present: number;
    absent: number;
    permission: number;
    sick: number;
}

interface Filters {
    start_date?: string;
    end_date?: string;
    subject_id?: string;
}

interface Props {
    attendances: Attendance[];
    summary: Summary;
    subjects: Subject[];
    filters: Filters;
    [key: string]: unknown;
}

export default function AttendanceReport({ attendances, summary, subjects, filters }: Props) {
    const [formData, setFormData] = useState({
        start_date: filters.start_date || '',
        end_date: filters.end_date || '',
        subject_id: filters.subject_id || '',
    });

    const handleFilter = (e: React.FormEvent) => {
        e.preventDefault();
        
        const params = new URLSearchParams();
        if (formData.start_date) params.append('start_date', formData.start_date);
        if (formData.end_date) params.append('end_date', formData.end_date);
        if (formData.subject_id) params.append('subject_id', formData.subject_id);
        
        router.get(`/reports/attendance?${params.toString()}`);
    };

    const handleReset = () => {
        setFormData({
            start_date: '',
            end_date: '',
            subject_id: '',
        });
        router.get('/reports/attendance');
    };

    const getStatusDisplay = (status: string) => {
        switch (status) {
            case 'present': return { icon: '✅', text: 'Hadir', color: 'text-green-600' };
            case 'absent': return { icon: '❌', text: 'Absen', color: 'text-red-600' };
            case 'permission': return { icon: '📝', text: 'Izin', color: 'text-blue-600' };
            case 'sick': return { icon: '🤒', text: 'Sakit', color: 'text-yellow-600' };
            default: return { icon: '❓', text: 'Unknown', color: 'text-gray-600' };
        }
    };

    const getPercentage = (count: number, total: number) => {
        if (total === 0) return 0;
        return Math.round((count / total) * 100);
    };

    return (
        <AppShell>
            <Head title="Laporan Absensi" />
            
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">📊 Laporan Absensi</h1>
                    <p className="text-gray-600 mt-1">Rekapitulasi kehadiran siswa berdasarkan filter yang dipilih</p>
                </div>

                {/* Filter Form */}
                <Card>
                    <CardHeader>
                        <CardTitle>Filter Laporan</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleFilter} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Tanggal Mulai
                                    </label>
                                    <input
                                        type="date"
                                        value={formData.start_date}
                                        onChange={(e) => setFormData({...formData, start_date: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Tanggal Akhir
                                    </label>
                                    <input
                                        type="date"
                                        value={formData.end_date}
                                        onChange={(e) => setFormData({...formData, end_date: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Mata Pelajaran
                                    </label>
                                    <select
                                        value={formData.subject_id}
                                        onChange={(e) => setFormData({...formData, subject_id: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Semua Mata Pelajaran</option>
                                        {subjects.map(subject => (
                                            <option key={subject.id} value={subject.id}>
                                                {subject.code} - {subject.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            
                            <div className="flex space-x-4">
                                <Button type="submit">
                                    🔍 Filter Data
                                </Button>
                                <Button type="button" variant="outline" onClick={handleReset}>
                                    🔄 Reset Filter
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Summary Statistics */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm font-medium text-gray-500">Total Record</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{summary.total_records}</div>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm font-medium text-gray-500">Hadir</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">{summary.present}</div>
                            <p className="text-xs text-gray-500">{getPercentage(summary.present, summary.total_records)}%</p>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm font-medium text-gray-500">Absen</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-red-600">{summary.absent}</div>
                            <p className="text-xs text-gray-500">{getPercentage(summary.absent, summary.total_records)}%</p>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm font-medium text-gray-500">Izin</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-600">{summary.permission}</div>
                            <p className="text-xs text-gray-500">{getPercentage(summary.permission, summary.total_records)}%</p>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm font-medium text-gray-500">Sakit</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-yellow-600">{summary.sick}</div>
                            <p className="text-xs text-gray-500">{getPercentage(summary.sick, summary.total_records)}%</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Attendance Data */}
                <Card>
                    <CardHeader>
                        <CardTitle>Data Absensi</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {attendances.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">
                                <span className="text-4xl mb-4 block">📝</span>
                                <p>Tidak ada data absensi yang sesuai dengan filter</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="text-left p-4">Tanggal</th>
                                            <th className="text-left p-4">Siswa</th>
                                            <th className="text-left p-4">Kelas</th>
                                            <th className="text-left p-4">Mata Pelajaran</th>
                                            <th className="text-left p-4">Status</th>
                                            <th className="text-left p-4">Keterangan</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {attendances.map((attendance) => {
                                            const statusDisplay = getStatusDisplay(attendance.status);
                                            return (
                                                <tr key={attendance.id} className="border-b hover:bg-gray-50">
                                                    <td className="p-4">
                                                        {new Date(attendance.date).toLocaleDateString('id-ID')}
                                                    </td>
                                                    <td className="p-4">
                                                        <div>
                                                            <div className="font-medium">{attendance.student.name}</div>
                                                            <div className="text-sm text-gray-500">{attendance.student.student_id}</div>
                                                        </div>
                                                    </td>
                                                    <td className="p-4">{attendance.student.class}</td>
                                                    <td className="p-4">
                                                        <div>
                                                            <div className="font-medium">{attendance.subject.name}</div>
                                                            <div className="text-sm text-gray-500">{attendance.subject.code}</div>
                                                        </div>
                                                    </td>
                                                    <td className="p-4">
                                                        <span className={`font-medium ${statusDisplay.color}`}>
                                                            {statusDisplay.icon} {statusDisplay.text}
                                                        </span>
                                                    </td>
                                                    <td className="p-4 text-gray-600">
                                                        {attendance.notes || '-'}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    );
}