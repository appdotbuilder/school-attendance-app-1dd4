import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface Props {
    auth?: {
        user?: {
            id: number;
            name: string;
            email: string;
            role: 'administrator' | 'teacher';
        };
    };
    [key: string]: unknown;
}

export default function Welcome({ auth }: Props) {
    return (
        <>
            <Head title="Sistem Absensi Sekolah" />
            
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                {/* Header */}
                <header className="bg-white shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <span className="text-3xl">🏫</span>
                                </div>
                                <div className="ml-4">
                                    <h1 className="text-2xl font-bold text-gray-900">
                                        Sistem Absensi Sekolah
                                    </h1>
                                    <p className="text-sm text-gray-600">
                                        Kelola kehadiran siswa dengan mudah dan efisien
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex items-center space-x-4">
                                {auth?.user ? (
                                    <div className="flex items-center space-x-4">
                                        <span className="text-sm text-gray-600">
                                            Welcome, {auth.user.name}
                                        </span>
                                        <Link href="/dashboard">
                                            <Button>Dashboard</Button>
                                        </Link>
                                    </div>
                                ) : (
                                    <>
                                        <Link href="/login">
                                            <Button variant="outline">Login</Button>
                                        </Link>
                                        <Link href="/register">
                                            <Button>Register</Button>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            📊 Sistem Manajemen Absensi Modern
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Platform digital yang memudahkan administrator dan guru dalam mengelola 
                            data siswa, mata pelajaran, dan kehadiran dengan sistem yang terintegrasi.
                        </p>
                    </div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                        <Card className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                    <span className="text-2xl">👨‍💼</span>
                                </div>
                                <CardTitle>Administrator Dashboard</CardTitle>
                                <CardDescription>
                                    Kelola data master siswa dan mata pelajaran dengan interface yang intuitif
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="text-sm text-gray-600 space-y-2">
                                    <li>• Tambah, edit, hapus data siswa</li>
                                    <li>• Manajemen mata pelajaran</li>
                                    <li>• Laporan komprehensif</li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                                    <span className="text-2xl">👩‍🏫</span>
                                </div>
                                <CardTitle>Portal Guru</CardTitle>
                                <CardDescription>
                                    Catat kehadiran siswa dengan mudah dan cepat untuk setiap mata pelajaran
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="text-sm text-gray-600 space-y-2">
                                    <li>• Absensi real-time</li>
                                    <li>• Multiple status kehadiran</li>
                                    <li>• Catatan tambahan</li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                                    <span className="text-2xl">📈</span>
                                </div>
                                <CardTitle>Laporan & Analisis</CardTitle>
                                <CardDescription>
                                    Dapatkan insight mendalam tentang pola kehadiran siswa
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="text-sm text-gray-600 space-y-2">
                                    <li>• Rekapitulasi per siswa</li>
                                    <li>• Analisis per mata pelajaran</li>
                                    <li>• Filter rentang waktu</li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Status Types */}
                    <div className="bg-white rounded-lg shadow-sm p-8 mb-16">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                            Status Kehadiran
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="text-center p-4 bg-green-50 rounded-lg">
                                <div className="text-2xl mb-2">✅</div>
                                <div className="font-semibold text-green-800">Hadir</div>
                                <div className="text-sm text-green-600">Siswa hadir</div>
                            </div>
                            <div className="text-center p-4 bg-red-50 rounded-lg">
                                <div className="text-2xl mb-2">❌</div>
                                <div className="font-semibold text-red-800">Absen</div>
                                <div className="text-sm text-red-600">Tidak hadir</div>
                            </div>
                            <div className="text-center p-4 bg-blue-50 rounded-lg">
                                <div className="text-2xl mb-2">📝</div>
                                <div className="font-semibold text-blue-800">Izin</div>
                                <div className="text-sm text-blue-600">Ada keterangan</div>
                            </div>
                            <div className="text-center p-4 bg-yellow-50 rounded-lg">
                                <div className="text-2xl mb-2">🤒</div>
                                <div className="font-semibold text-yellow-800">Sakit</div>
                                <div className="text-sm text-yellow-600">Kondisi sakit</div>
                            </div>
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="text-center bg-white rounded-lg shadow-sm p-12">
                        <h3 className="text-3xl font-bold text-gray-900 mb-4">
                            Siap Memulai? 🚀
                        </h3>
                        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                            Bergabunglah dengan sistem absensi digital yang akan mengubah cara sekolah 
                            mengelola kehadiran siswa. Mudah, cepat, dan akurat.
                        </p>
                        
                        {auth?.user ? (
                            <div className="space-y-4">
                                <p className="text-lg text-gray-700">
                                    Welcome back, <strong>{auth.user.name}</strong>! 
                                    {auth.user.role === 'administrator' ? ' 👨‍💼' : ' 👩‍🏫'}
                                </p>
                                <Link href="/dashboard">
                                    <Button size="lg" className="text-lg px-8 py-3">
                                        Go to Dashboard
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <div className="flex justify-center space-x-4">
                                <Link href="/login">
                                    <Button size="lg" variant="outline" className="text-lg px-8 py-3">
                                        Login Sekarang
                                    </Button>
                                </Link>
                                <Link href="/register">
                                    <Button size="lg" className="text-lg px-8 py-3">
                                        Daftar Gratis
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </main>

                {/* Footer */}
                <footer className="bg-white border-t">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="text-center text-gray-600">
                            <p>&copy; 2024 Sistem Absensi Sekolah. Dibuat dengan ❤️ untuk pendidikan Indonesia.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}