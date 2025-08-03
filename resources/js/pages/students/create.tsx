import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Props {
    errors?: Record<string, string>;
    [key: string]: unknown;
}

export default function StudentsCreate({ errors = {} }: Props) {
    const [formData, setFormData] = useState({
        student_id: '',
        name: '',
        email: '',
        phone: '',
        class: '',
        birth_date: '',
        address: '',
        status: 'active',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        router.post('/students', formData, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <AppShell>
            <Head title="Tambah Siswa" />
            
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">➕ Tambah Siswa Baru</h1>
                    <p className="text-gray-600 mt-1">Masukkan data siswa baru ke dalam sistem</p>
                </div>

                {/* Form */}
                <Card>
                    <CardHeader>
                        <CardTitle>Data Siswa</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Student ID */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        ID Siswa *
                                    </label>
                                    <input
                                        type="text"
                                        name="student_id"
                                        value={formData.student_id}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Masukkan ID siswa"
                                        required
                                    />
                                    {errors.student_id && (
                                        <p className="text-red-600 text-sm mt-1">{errors.student_id}</p>
                                    )}
                                </div>

                                {/* Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Nama Lengkap *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Masukkan nama lengkap"
                                        required
                                    />
                                    {errors.name && (
                                        <p className="text-red-600 text-sm mt-1">{errors.name}</p>
                                    )}
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Masukkan alamat email"
                                        required
                                    />
                                    {errors.email && (
                                        <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                                    )}
                                </div>

                                {/* Phone */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        No. Telepon
                                    </label>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Masukkan nomor telepon"
                                    />
                                    {errors.phone && (
                                        <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
                                    )}
                                </div>

                                {/* Class */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Kelas *
                                    </label>
                                    <select
                                        name="class"
                                        value={formData.class}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    >
                                        <option value="">Pilih Kelas</option>
                                        <option value="X-A">X-A</option>
                                        <option value="X-B">X-B</option>
                                        <option value="X-C">X-C</option>
                                        <option value="XI-A">XI-A</option>
                                        <option value="XI-B">XI-B</option>
                                        <option value="XI-C">XI-C</option>
                                        <option value="XII-A">XII-A</option>
                                        <option value="XII-B">XII-B</option>
                                        <option value="XII-C">XII-C</option>
                                    </select>
                                    {errors.class && (
                                        <p className="text-red-600 text-sm mt-1">{errors.class}</p>
                                    )}
                                </div>

                                {/* Birth Date */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Tanggal Lahir
                                    </label>
                                    <input
                                        type="date"
                                        name="birth_date"
                                        value={formData.birth_date}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    {errors.birth_date && (
                                        <p className="text-red-600 text-sm mt-1">{errors.birth_date}</p>
                                    )}
                                </div>
                            </div>

                            {/* Address */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Alamat
                                </label>
                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    rows={3}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Masukkan alamat lengkap"
                                />
                                {errors.address && (
                                    <p className="text-red-600 text-sm mt-1">{errors.address}</p>
                                )}
                            </div>

                            {/* Status */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Status *
                                </label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                >
                                    <option value="active">✅ Aktif</option>
                                    <option value="inactive">❌ Non-aktif</option>
                                </select>
                                {errors.status && (
                                    <p className="text-red-600 text-sm mt-1">{errors.status}</p>
                                )}
                            </div>

                            {/* Submit Buttons */}
                            <div className="flex space-x-4">
                                <Button type="submit">
                                    💾 Simpan Siswa
                                </Button>
                                <Button 
                                    type="button" 
                                    variant="outline"
                                    onClick={() => router.get('/students')}
                                >
                                    ❌ Batal
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    );
}