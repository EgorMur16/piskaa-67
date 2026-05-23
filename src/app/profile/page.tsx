'use client'
import { Card, CardHeader, CardBody, Form, Input, Button, Image, CardFooter, Chip, Divider, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Avatar, Badge } from "@heroui/react";
import { useState, useEffect } from "react";
import { Package, DollarSign, TrendingUp, Plus, Trash2, Edit, Calendar, ShoppingBag, Eye } from 'lucide-react';

interface User {
    name: string,
    price: string,
    id: string,
    createdAt: string
}

interface CartItem {
    title: string,
    price: string,
    imag: string
}

const Profile = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [items, setItems] = useState<User[]>([
        {
            id: '1',
            name: 'Апельсины',
            price: '23',
            createdAt: new Date().toLocaleDateString()
        },
        {
            id: '2',
            name: 'Яблоки',
            price: '43',
            createdAt: new Date().toLocaleDateString()
        },
        {
            id: '3',
            name: 'Бананы',
            price: '35',
            createdAt: new Date().toLocaleDateString()
        }
    ]);

    const [formData, setFormData] = useState({
        name: '',
        price: ''
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        const cartJson = typeof window !== 'undefined' ? localStorage.getItem('cart') : null;
        if (cartJson) {
            setCartItems(JSON.parse(cartJson));
        }
    }, []);

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!formData.name.trim()) {
            newErrors.name = "Название обязательно";
        } else if (formData.name.length < 2) {
            newErrors.name = "Название должно содержать минимум 2 символа";
        }

        if (!formData.price.trim()) {
            newErrors.price = "Цена обязательна";
        } else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
            newErrors.price = "Введите корректную цену";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }

        const NewItem: User = {
            id: Date.now().toString(),
            name: formData.name,
            price: formData.price,
            createdAt: new Date().toLocaleDateString()
        };

        setItems([NewItem, ...items]);
        setFormData({ name: '', price: '' });
        setErrors({});
    };

    const handleDeleteItem = (id: string) => {
        setItems(items.filter(item => item.id !== id));
    };

    const calculateTotalRevenue = () => {
        return items.reduce((total, item) => total + Number(item.price), 0);
    };

    const calculateCartTotal = () => {
        return cartItems.reduce((total, item) => {
            const price = parseFloat(item.price.replace('$', ''));
            return total + price;
        }, 0);
    };

    const totalRevenue = calculateTotalRevenue();
    const cartTotal = calculateCartTotal();

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                {/* Заголовок */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
                                <Package size={24} className="text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    Личный кабинет
                                </h1>
                                <p className="text-gray-500 text-sm mt-1">
                                    Управление товарами и анализ продаж
                                </p>
                            </div>
                        </div>
                        <Chip color="primary" variant="flat" className="rounded-full hidden sm:flex">
                            <div className="flex items-center gap-1">
                                <ShoppingBag size={14} />
                                <span>Товаров: {items.length}</span>
                            </div>
                        </Chip>
                    </div>
                    <Divider className="my-4" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Форма добавления товара */}
                    <Card className="border-0 shadow-xl rounded-2xl overflow-hidden">
                        <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-600" />
                        <CardHeader className="pb-0 pt-6">
                            <div className="flex items-center gap-2">
                                <div className="p-2 bg-green-100 rounded-xl">
                                    <Plus size={20} className="text-green-600" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-800">Добавить товар</h2>
                            </div>
                        </CardHeader>
                        <CardBody className="py-6">
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <Input
                                    label="Название товара"
                                    placeholder="Например: Апельсины"
                                    value={formData.name}
                                    isInvalid={!!errors.name}
                                    errorMessage={errors.name}
                                    startContent={<Package size={16} className="text-gray-400" />}
                                    classNames={{
                                        inputWrapper: 'bg-gray-50 rounded-xl border-1 border-gray-200 hover:border-gray-300 transition-colors',
                                        input: 'text-sm text-black focus:outline-none',
                                        label: 'text-gray-700 font-medium'
                                    }}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                                <Input
                                    label="Цена (USD)"
                                    placeholder="0.00"
                                    value={formData.price}
                                    isInvalid={!!errors.price}
                                    errorMessage={errors.price}
                                    startContent={<DollarSign size={16} className="text-gray-400" />}
                                    classNames={{
                                        inputWrapper: 'bg-gray-50 rounded-xl border-1 border-gray-200 hover:border-gray-300 transition-colors',
                                        input: 'text-sm text-black focus:outline-none',
                                        label: 'text-gray-700 font-medium'
                                    }}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                />

                                <Button
                                    color="primary"
                                    type="submit"
                                    className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
                                    size="lg"
                                    startContent={<Plus size={18} />}
                                >
                                    Добавить товар
                                </Button>
                            </form>
                        </CardBody>
                    </Card>

                    {/* Статистика */}
                    <Card className="border-0 shadow-xl rounded-2xl overflow-hidden">
                        <div className="h-1 bg-gradient-to-r from-green-500 to-blue-600" />
                        <CardHeader className="pb-0 pt-6">
                            <div className="flex items-center gap-2">
                                <div className="p-2 bg-purple-100 rounded-xl">
                                    <TrendingUp size={20} className="text-purple-600" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-800">Статистика</h2>
                            </div>
                        </CardHeader>
                        <CardBody className="py-6">
                            <div className="space-y-6">
                                {/* Доход */}
                                <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-6 text-center">
                                    <p className="text-gray-600 mb-2">Итоговый доход</p>
                                    <div className="flex items-baseline justify-center gap-1">
                                        <h1 className="text-6xl font-bold text-gray-800 tracking-tight">
                                            {totalRevenue}
                                        </h1>
                                        <span className="text-3xl text-gray-400 font-medium">$</span>
                                    </div>
                                    <div className="mt-4 flex justify-center gap-1">
                                        <div className="w-12 h-1 bg-green-500 rounded-full"></div>
                                        <div className="w-12 h-1 bg-blue-500 rounded-full"></div>
                                        <div className="w-12 h-1 bg-purple-500 rounded-full"></div>
                                    </div>
                                </div>

                                {/* Корзина */}
                                <div className="bg-white rounded-2xl p-4 border border-gray-200">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-2">
                                            <div className="p-2 bg-orange-100 rounded-lg">
                                                <ShoppingBag size={16} className="text-orange-600" />
                                            </div>
                                            <span className="font-semibold text-gray-700">Корзина пользователя</span>
                                        </div>
                                        <Chip size="sm" color="warning" variant="flat">
                                            {cartItems.length} товаров
                                        </Chip>
                                    </div>
                                    <div className="flex items-baseline justify-between">
                                        <span className="text-gray-500 text-sm">Общая сумма:</span>
                                        <span className="text-2xl font-bold text-orange-600">${cartTotal.toFixed(2)}</span>
                                    </div>
                                </div>

                                {/* Дополнительная информация */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-blue-50 rounded-xl p-3 text-center">
                                        <p className="text-xs text-gray-500">Всего товаров</p>
                                        <p className="text-2xl font-bold text-blue-600">{items.length}</p>
                                    </div>
                                    <div className="bg-green-50 rounded-xl p-3 text-center">
                                        <p className="text-xs text-gray-500">Средняя цена</p>
                                        <p className="text-2xl font-bold text-green-600">
                                            ${(totalRevenue / items.length || 0).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>

                {/* Список товаров */}
                <Card className="mt-8 border-0 shadow-xl rounded-2xl overflow-hidden">
                    <div className="h-1 bg-gradient-to-r from-orange-500 to-red-600" />
                    <CardHeader className="pb-0 pt-6">
                        <div className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-2">
                                <div className="p-2 bg-orange-100 rounded-xl">
                                    <Package size={20} className="text-orange-600" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-800">Мои товары</h2>
                            </div>
                            <Chip color="primary" variant="flat" className="rounded-full">
                                Всего: {items.length}
                            </Chip>
                        </div>
                    </CardHeader>
                    <CardBody className="py-6">
                        {items.length === 0 ? (
                            <div className="text-center py-12">
                                <Package size={48} className="text-gray-300 mx-auto mb-3" />
                                <p className="text-gray-400">У вас пока нет товаров</p>
                                <p className="text-gray-400 text-sm">Добавьте первый товар с помощью формы</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <Table aria-label="Список товаров" classNames={{
                                    wrapper: 'rounded-xl shadow-none',
                                    th: 'bg-gray-50 text-gray-700 font-semibold',
                                    td: 'py-3'
                                }}>
                                    <TableHeader>
                                        <TableColumn className="font-semibold">НАЗВАНИЕ</TableColumn>
                                        <TableColumn className="font-semibold">ЦЕНА</TableColumn>
                                        <TableColumn className="font-semibold">ДАТА</TableColumn>
                                        <TableColumn className="font-semibold text-center">ДЕЙСТВИЕ</TableColumn>
                                    </TableHeader>
                                    <TableBody>
                                        {items.map((item) => (
                                            <TableRow key={item.id} className="hover:bg-gray-50 transition-colors">
                                                <TableCell>
                                                    <div className="flex items-center gap-3">
                                                        <Avatar 
                                                            name={item.name.charAt(0).toUpperCase()} 
                                                            size="sm" 
                                                            className="bg-gradient-to-br from-blue-500 to-purple-500 text-white"
                                                        />
                                                        <span className="font-medium text-gray-800">{item.name}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Chip size="sm" color="success" variant="flat" className="rounded-full">
                                                        ${item.price}
                                                    </Chip>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-1 text-gray-500 text-sm">
                                                        <Calendar size={12} />
                                                        <span>{item.createdAt}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <Button
                                                        isIconOnly
                                                        color="danger"
                                                        size="sm"
                                                        variant="light"
                                                        onPress={() => handleDeleteItem(item.id)}
                                                        className="hover:bg-red-50 transition-colors rounded-full"
                                                    >
                                                        <Trash2 size={16} />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        )}
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}

export default Profile;