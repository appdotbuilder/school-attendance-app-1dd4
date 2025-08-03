import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Student {
    id: number;
    student_id: string;
    name: string;
    email: string;
    class: string;
    status: 'active' | 'inactive';
    created_at: string;
}

interface PaginationData {
    data: Student[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface Props {
    students: PaginationData;
    [key: string]: unknown;
}

export default function StudentsIndex({ students }: Props) {
    const handleDelete = (student: Student) => {
        if (confirm(`Are you sure you want to delete ${student.name}?`)) {
            router.delete(`/students/${student.id}`);
        }
    };

    return (
        <AppShell>
            <Head title="Kelola Siswa" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">👨‍🎓 Kelola Data Siswa</h1>
                        <p className="text-gray-600 mt-1">Tambah, edit, dan hapus data siswa</p>
                    </div>
                    <Link href="/students/create">
                        <Button>+ Tambah Siswa</Button>
                    </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm font-medium text-gray-500">Total Siswa</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{students.total}</div>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm font-medium text-gray-500">Siswa Aktif</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">
                                {students.data.filter(s => s.status === 'active').length}
                            </div>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm font-medium text-gray-500">Siswa Non-aktif</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-red-600">
                                {students.data.filter(s => s.status === 'inactive').length}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Students Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Daftar Siswa</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {students.data.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">
                                <span className="text-4xl mb-4 block">📚</span>
                                <p>Belum ada data siswa</p>
                                <Link href="/students/create" className="mt-4 inline-block">
                                    <Button>Tambah Siswa Pertama</Button>
                                </Link>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="text-left p-4">ID Siswa</th>
                                            <th className="text-left p-4">Nama</th>
                                            <th className="text-left p-4">Email</th>
                                            <th className="text-left p-4">Kelas</th>
                                            <th className="text-left p-4">Status</th>
                                            <th className="text-left p-4">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {students.data.map((student) => (
                                            <tr key={student.id} className="border-b hover:bg-gray-50">
                                                <td className="p-4 font-mono">{student.student_id}</td>
                                                <td className="p-4 font-medium">{student.name}</td>
                                                <td className="p-4 text-gray-600">{student.email}</td>
                                                <td className="p-4">{student.class}</td>
                                                <td className="p-4">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                        student.status === 'active' 
                                                            ? 'bg-green-100 text-green-800' 
                                                            : 'bg-red-100 text-red-800'
                                                    }`}>
                                                        {student.status === 'active' ? '✅ Aktif' : '❌ Non-aktif'}
                                                    </span>
                                                </td>
                                                <td className="p-4">
                                                    <div className="flex space-x-2">
                                                        <Link href={`/students/${student.id}`}>
                                                            <Button variant="outline" size="sm">👁️ Lihat</Button>
                                                        </Link>
                                                        <Link href={`/students/${student.id}/edit`}>
                                                            <Button variant="outline" size="sm">✏️ Edit</Button>
                                                        </Link>
                                                        <Button 
                                                            variant="outline" 
                                                            size="sm"
                                                            onClick={() => handleDelete(student)}
                                                            className="text-red-600 hover:text-red-800"
                                                        >
                                                            🗑️ Hapus
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {/* Pagination */}
                        {students.last_page > 1 && (
                            <div className="flex justify-center mt-6 space-x-2">
                                {Array.from({ length: students.last_page }, (_, i) => i + 1).map((page) => (
                                    <Link
                                        key={page}
                                        href={`/students?page=${page}`}
                                        className={`px-3 py-2 rounded ${
                                            page === students.current_page
                                                ? 'bg-blue-500 text-white'
                                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                        }`}
                                    >
                                        {page}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    );
}