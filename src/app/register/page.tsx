'use client';
import { useState } from 'react';
import { api } from '@/lib/api';
import { saveToken } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { Mail, Lock, UserPlus, Eye, EyeOff, Shield, AlertCircle, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const router = useRouter();

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password: string) => {
        return password.length >= 6;
    };

    const submit = async () => {
        // Валидация
        if (!email.trim()) {
            setError('Введите email');
            return;
        }
        if (!validateEmail(email)) {
            setError('Введите корректный email');
            return;
        }
        if (!password.trim()) {
            setError('Введите пароль');
            return;
        }
        if (!validatePassword(password)) {
            setError('Пароль должен содержать минимум 6 символов');
            return;
        }
        if (password !== confirmPassword) {
            setError('Пароли не совпадают');
            return;
        }

        setIsLoading(true);
        setError('');
        setSuccess('');

        try {
            const res = await api.post('/auth/register', { email, password });
            saveToken(res.data.access_token);
            setSuccess('Регистрация успешна! Перенаправление...');
            setTimeout(() => {
                router.push('/profile');
            }, 1500);
            console.log("Регистрация успешна");
        } catch (error: any) {
            if (error.response?.status === 409) {
                setError('Пользователь с таким email уже существует');
            } else {
                setError('Ошибка регистрации. Попробуйте позже.');
            }
            console.log("Ошибка регистрации");
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            submit();
        }
    };

    const getPasswordStrength = () => {
        if (!password) return 0;
        let strength = 0;
        if (password.length >= 6) strength++;
        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;
        return Math.min(strength, 4);
    };

    const passwordStrength = getPasswordStrength();
    const strengthColors = ['bg-gray-200', 'bg-red-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];
    const strengthTexts = ['Очень слабый', 'Слабый', 'Средний', 'Хороший', 'Отличный'];

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-blue-50 px-4">
            {/* Декоративные элементы фона */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
            </div>

            {/* Карточка регистрации */}
            <div className="relative w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                    {/* Верхний градиентный бар */}
                    <div className="h-2 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500"></div>
                    
                    <div className="p-8">
                        {/* Логотип/Иконка */}
                        <div className="flex justify-center mb-6">
                            <div className="p-3 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl shadow-lg">
                                <UserPlus size={32} className="text-white" />
                            </div>
                        </div>

                        {/* Заголовок */}
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                                Создать аккаунт
                            </h2>
                            <p className="text-gray-500 mt-2">Присоединяйтесь к нам</p>
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
                                        <Mail size={18} className="text-gray-400 group-focus-within:text-green-500 transition-colors" />
                                    </div>
                                    <input
                                        type="email"
                                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 text-gray-700 placeholder-gray-400"
                                        placeholder="ivan@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                    />
                                </div>
                            </div>

                            {/* Поле Пароль */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 block">
                                    Пароль
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock size={18} className="text-gray-400 group-focus-within:text-green-500 transition-colors" />
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 text-gray-700 placeholder-gray-400"
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

                                {/* Индикатор сложности пароля */}
                                {password && (
                                    <div className="mt-2 space-y-1">
                                        <div className="flex gap-1">
                                            {[...Array(4)].map((_, i) => (
                                                <div
                                                    key={i}
                                                    className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                                                        i < passwordStrength
                                                            ? strengthColors[passwordStrength]
                                                            : 'bg-gray-200'
                                                    }`}
                                                />
                                            ))}
                                        </div>
                                        <p className="text-xs text-gray-500">
                                            Сложность: {strengthTexts[passwordStrength]}
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Поле Подтверждение пароля */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 block">
                                    Подтвердите пароль
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock size={18} className="text-gray-400 group-focus-within:text-green-500 transition-colors" />
                                    </div>
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        className="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 text-gray-700 placeholder-gray-400"
                                        placeholder="••••••••"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                                {confirmPassword && password !== confirmPassword && (
                                    <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                                        <AlertCircle size={12} />
                                        Пароли не совпадают
                                    </p>
                                )}
                                {confirmPassword && password === confirmPassword && password && (
                                    <p className="text-xs text-green-500 flex items-center gap-1 mt-1">
                                        <CheckCircle size={12} />
                                        Пароли совпадают
                                    </p>
                                )}
                            </div>

                            {/* Ошибка */}
                            {error && (
                                <div className="bg-red-50 border border-red-200 rounded-xl p-3 animate-shake">
                                    <p className="text-red-600 text-sm text-center flex items-center justify-center gap-2">
                                        <AlertCircle size={16} />
                                        {error}
                                    </p>
                                </div>
                            )}

                            {/* Успех */}
                            {success && (
                                <div className="bg-green-50 border border-green-200 rounded-xl p-3 animate-fade-in">
                                    <p className="text-green-600 text-sm text-center flex items-center justify-center gap-2">
                                        <CheckCircle size={16} />
                                        {success}
                                    </p>
                                </div>
                            )}

                            {/* Кнопка регистрации */}
                            <button
                                onClick={submit}
                                disabled={isLoading}
                                className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                            >
                                {isLoading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        <span>Регистрация...</span>
                                    </>
                                ) : (
                                    <>
                                        <UserPlus size={18} />
                                        <span>Зарегистрироваться</span>
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

                            {/* Ссылка на вход */}
                            <div className="text-center">
                                <p className="text-gray-600">
                                    Уже есть аккаунт?{' '}
                                    <Link href="/login" className="text-green-600 hover:text-green-700 font-semibold transition-colors">
                                        Войти
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Дополнительная информация */}
                <div className="text-center mt-6 space-y-2">
                    <p className="text-gray-400 text-xs">
                        Регистрируясь, вы соглашаетесь с условиями использования
                    </p>
                    <div className="flex justify-center gap-4 text-xs text-gray-400">
                        <Link href="/terms" className="hover:text-gray-500 transition-colors">
                            Условия
                        </Link>
                        <span>•</span>
                        <Link href="/privacy" className="hover:text-gray-500 transition-colors">
                            Конфиденциальность
                        </Link>
                    </div>
                </div>
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
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fadeIn 0.3s ease-out;
                }
            `}</style>
        </div>
    );
}