import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface Props {
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
            role: 'administrator' | 'teacher';
        };
    };
    [key: string]: unknown;
}

export default function Dashboard({ auth }: Props) {
    const { user } = auth;
    const isAdmin = user.role === 'administrator';
    const isTeacher = user.role === 'teacher';

    return (
        <AppShell>
            <Head title="Dashboard" />
            
            <div className="space-y-6">
                {/* Welcome Section */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
                    <h1 className="text-3xl font-bold mb-2">
                        Selamat Datang, {user.name}! 
                        {isAdmin ? ' 👨‍💼' : ' 👩‍🏫'}
                    </h1>
                    <p className="text-blue-100 text-lg">
                        {isAdmin 
                            ? 'Kelola sistem absensi sekolah dengan mudah dan efisien'
                            : 'Catat kehadiran siswa untuk mata pelajaran yang Anda ajarkan'
                        }
                    </p>
                </div>

                {/* Quick Actions */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Menu Utama</h2>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {isAdmin && (
                            <>
                                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                                    <CardHeader>
                                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-2">
                                            <span className="text-2xl">👨‍🎓</span>
                                        </div>
                                        <CardTitle>Kelola Siswa</CardTitle>
                                        <CardDescription>
                                            Tambah, edit, dan hapus data siswa
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Link href="/students">
                                            <Button className="w-full">
                                                Kelola Data Siswa
                                            </Button>
                                        </Link>
                                    </CardContent>
                                </Card>

                                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                                    <CardHeader>
                                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-2">
                                            <span className="text-2xl">📚</span>
                                        </div>
                                        <CardTitle>Kelola Mata Pelajaran</CardTitle>
                                        <CardDescription>
                                            Tambah, edit, dan hapus mata pelajaran
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Link href="/subjects">
                                            <Button className="w-full">
                                                Kelola Mata Pelajaran
                                            </Button>
                                        </Link>
                                    </CardContent>
                                </Card>

                                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                                    <CardHeader>
                                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-2">
                                            <span className="text-2xl">📊</span>
                                        </div>
                                        <CardTitle>Laporan Absensi</CardTitle>
                                        <CardDescription>
                                            Lihat rekapitulasi kehadiran siswa
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Link href="/reports/attendance">
                                            <Button className="w-full">
                                                Lihat Laporan
                                            </Button>
                                        </Link>
                                    </CardContent>
                                </Card>
                            </>
                        )}

                        {isTeacher && (
                            <>
                                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                                    <CardHeader>
                                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-2">
                                            <span className="text-2xl">✅</span>
                                        </div>
                                        <CardTitle>Catat Absensi</CardTitle>
                                        <CardDescription>
                                            Rekam kehadiran siswa hari ini
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Link href="/attendances/create">
                                            <Button className="w-full">
                                                Catat Kehadiran
                                            </Button>
                                        </Link>
                                    </CardContent>
                                </Card>

                                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                                    <CardHeader>
                                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-2">
                                            <span className="text-2xl">📋</span>
                                        </div>
                                        <CardTitle>Riwayat Absensi</CardTitle>
                                        <CardDescription>
                                            Lihat riwayat absensi yang telah dicatat
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Link href="/attendances">
                                            <Button className="w-full">
                                                Lihat Riwayat
                                            </Button>
                                        </Link>
                                    </CardContent>
                                </Card>
                            </>
                        )}
                    </div>
                </div>

                {/* Status Legend */}
                <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Keterangan Status Kehadiran</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="flex items-center p-3 bg-green-50 rounded-lg">
                            <span className="text-2xl mr-3">✅</span>
                            <div>
                                <div className="font-semibold text-green-800">Hadir</div>
                                <div className="text-sm text-green-600">Siswa hadir</div>
                            </div>
                        </div>
                        <div className="flex items-center p-3 bg-red-50 rounded-lg">
                            <span className="text-2xl mr-3">❌</span>
                            <div>
                                <div className="font-semibold text-red-800">Absen</div>
                                <div className="text-sm text-red-600">Tidak hadir</div>
                            </div>
                        </div>
                        <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                            <span className="text-2xl mr-3">📝</span>
                            <div>
                                <div className="font-semibold text-blue-800">Izin</div>
                                <div className="text-sm text-blue-600">Ada keterangan</div>
                            </div>
                        </div>
                        <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
                            <span className="text-2xl mr-3">🤒</span>
                            <div>
                                <div className="font-semibold text-yellow-800">Sakit</div>
                                <div className="text-sm text-yellow-600">Kondisi sakit</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Informasi Sistem</h3>
                    <div className="text-gray-600 space-y-2">
                        <p>🏫 <strong>Sistem Absensi Sekolah</strong> - Platform digital untuk mengelola kehadiran siswa</p>
                        <p>👤 Logged in as: <strong>{user.name}</strong> ({user.role === 'administrator' ? 'Administrator' : 'Guru'})</p>
                        <p>📧 Email: <strong>{user.email}</strong></p>
                        <p>🕒 Login time: <strong>{new Date().toLocaleString('id-ID')}</strong></p>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}