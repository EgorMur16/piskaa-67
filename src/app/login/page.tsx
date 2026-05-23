'use client';
import { useState } from 'react';
import { api } from '@/lib/api';
import { saveToken } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { Mail, Lock, LogIn, Eye, EyeOff, Shield } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const submit = async () => {
        // Валидация
        if (!email.trim()) {
            setError('Введите email');
            return;
        }
        if (!password.trim()) {
            setError('Введите пароль');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const res = await api.post('/auth/login', { email, password });
            saveToken(res.data.access_token);
            router.push('/profile');
            console.log("Успешно");
        } catch (error) {
            setError('Неверный email или пароль');
            console.log("Не найдено");
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            submit();
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4">
            {/* Декоративные элементы фона */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
            </div>

            {/* Карточка входа */}
            <div className="relative w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                    {/* Верхний градиентный бар */}
                    <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
                    
                    <div className="p-8">
                        {/* Логотип/Иконка */}
                        <div className="flex justify-center mb-6">
                            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
                                <Shield size={32} className="text-white" />
                            </div>
                        </div>

                        {/* Заголовок */}
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Добро пожаловать
                            </h2>
                            <p className="text-gray-500 mt-2">Войдите в свой аккаунт</p>
                        </div>

                        {/* Форма */}
                        <div className="space-y-5">
                            {/* Поле Email */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 block">
                                    Email
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail size={18} className="text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                                    </div>
                                    <input
                                        type="email"
                                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-gray-700 placeholder-gray-400"
                                        placeholder="ivan@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                    />
                                </div>
                            </div>

                            {/* Поле Пароль */}
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <label className="text-sm font-medium text-gray-700 block">
                                        Пароль
                                    </label>
                                    <Link href="/forgot-password" className="text-xs text-blue-600 hover:text-blue-700 transition-colors">
                                        Забыли пароль?
                                    </Link>
                                </div>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock size={18} className="text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-gray-700 placeholder-gray-400"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            {/* Ошибка */}
                            {error && (
                                <div className="bg-red-50 border border-red-200 rounded-xl p-3 animate-shake">
                                    <p className="text-red-600 text-sm text-center">{error}</p>
                                </div>
                            )}

                            {/* Кнопка входа */}
                            <button
                                onClick={submit}
                                disabled={isLoading}
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                            >
                                {isLoading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        <span>Вход...</span>
                                    </>
                                ) : (
                                    <>
                                        <LogIn size={18} />
                                        <span>Войти</span>
                                    </>
                                )}
                            </button>

                            {/* Разделитель */}
                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-200"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-3 bg-white text-gray-500">или</span>
                                </div>
                            </div>

                            {/* Ссылка на регистрацию */}
                            <div className="text-center">
                                <p className="text-gray-600">
                                    Нет аккаунта?{' '}
                                    <Link href="/register" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
                                        Зарегистрироваться
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Дополнительная информация */}
                <p className="text-center text-gray-400 text-xs mt-6">
                    Вход означает согласие с условиями использования
                </p>
            </div>

            <style jsx>{`
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
                    20%, 40%, 60%, 80% { transform: translateX(2px); }
                }
                .animate-shake {
                    animation: shake 0.5s ease-in-out;
                }
            `}</style>
        </div>
    );
}