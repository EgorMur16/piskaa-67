"use client"
import { Card, CardBody, CardFooter, Image, Button, Chip, Divider } from "@heroui/react";
import { useEffect, useState } from "react";
import { api } from '@/lib/api';
import { ShoppingCart, Trash2, CreditCard, ArrowLeft, ShoppingBag, XCircle } from 'lucide-react';
import Link from 'next/link';

interface CartItem {
    title: string,
    price: string,
    imag: string
}

const Cart = () => {
    const [items, setItems] = useState<CartItem[]>([])
    const [isProcessing, setIsProcessing] = useState(false);
    
    useEffect(() => {
        const cartJson = localStorage.getItem('cart')
        setItems(cartJson ? JSON.parse(cartJson) : [])
    }, [])
    
    const DeleteCard = (title: string) => {
        const cartJson = localStorage.getItem('cart')
        const itemsArray = cartJson ? JSON.parse(cartJson) : []
        const updated = itemsArray.filter((item: CartItem) => item.title !== title)
        localStorage.setItem('cart', JSON.stringify(updated))
        setItems(updated)
    }

    const sumbit = async (title2: string, price2: string) => {
        setIsProcessing(true);
        try {
            const res = await api.post('/buy/buyThis', { title: title2, price: price2 });
            console.log(res.data.status)
            // Можно добавить уведомление об успешной покупке
        } catch (error) {
            console.error('Ошибка при покупке:', error)
        } finally {
            setIsProcessing(false);
        }
    };

    const getTotalPrice = () => {
        return items.reduce((total, item) => {
            const price = parseFloat(item.price.replace('$', ''));
            return total + price;
        }, 0).toFixed(2);
    };

    const clearCart = () => {
        localStorage.removeItem('cart');
        setItems([]);
    };

    if (items.length === 0) {
        return (
            <div className="container mx-auto px-4 py-16 max-w-4xl">
                <div className="text-center">
                    <div className="inline-block p-4 bg-gray-100 rounded-full mb-4">
                        <ShoppingBag size={48} className="text-gray-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Корзина пуста</h2>
                    <p className="text-gray-500 mb-6">Добавьте товары в корзину, чтобы продолжить покупки</p>
                    <Link href="/buy">
                        <Button color="primary" className="rounded-full px-8">
                            Перейти к покупкам
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            {/* Заголовок */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl">
                            <ShoppingCart size={24} className="text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Моя корзина
                            </h1>
                            <p className="text-gray-500 text-sm mt-1">
                                {items.length} {items.length === 1 ? 'товар' : items.length < 5 ? 'товара' : 'товаров'}
                            </p>
                        </div>
                    </div>
                    <Button 
                        color="danger" 
                        variant="light" 
                        onPress={clearCart}
                        startContent={<Trash2 size={16} />}
                        className="rounded-full"
                    >
                        Очистить корзину
                    </Button>
                </div>
                <Divider className="my-4" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Список товаров */}
                <div className="lg:col-span-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {items.map((item: CartItem, index: number) => (
                            <Card 
                                className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl rounded-2xl border-0" 
                                key={index} 
                                shadow="sm"
                            >
                                <CardBody className="overflow-visible p-0">
                                    <div className="relative overflow-hidden rounded-t-2xl">
                                        <Image
                                            alt={item.title}
                                            className="w-full object-cover h-[180px] transition-transform duration-500 group-hover:scale-110"
                                            radius="none"
                                            shadow="none"
                                            src={item.imag}
                                            width="100%"
                                        />
                                        {/* Кнопка удаления поверх изображения */}
                                        <Button
                                            isIconOnly
                                            color="danger"
                                            size="sm"
                                            variant="flat"
                                            className="absolute top-2 right-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white"
                                            onPress={() => DeleteCard(item.title)}
                                        >
                                            <XCircle size={16} />
                                        </Button>
                                    </div>
                                </CardBody>
                                
                                <div className="p-4">
                                    <div className="mb-3">
                                        <h3 className="text-lg font-bold text-gray-800 line-clamp-1">
                                            {item.title}
                                        </h3>
                                        <div className="flex items-center gap-2 mt-2">
                                            <Chip size="sm" variant="flat" color="primary" className="rounded-full">
                                                В наличии
                                            </Chip>
                                        </div>
                                    </div>
                                    
                                    <CardFooter className="p-0 pt-2 flex justify-between items-center">
                                        <div>
                                            <p className="text-2xl font-bold text-primary">{item.price}</p>
                                            <p className="text-xs text-gray-400 line-through">
                                                {item.price === "$8.50" ? "$10.99" : ""}
                                            </p>
                                        </div>
                                        <Button
                                            color="success"
                                            size="sm"
                                            onPress={() => sumbit(item.title, item.price)}
                                            isLoading={isProcessing}
                                            className="rounded-full px-4"
                                            startContent={<CreditCard size={14} />}
                                        >
                                            Купить
                                        </Button>
                                    </CardFooter>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Боковая панель с итогом */}
                <div className="lg:col-span-1">
                    <Card className="sticky top-8 rounded-2xl border-0 shadow-lg">
                        <CardBody className="p-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Итого</h2>
                            
                            <div className="space-y-3 mb-4">
                                <div className="flex justify-between text-gray-600">
                                    <span>Товары ({items.length})</span>
                                    <span>${getTotalPrice()}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Доставка</span>
                                    <span className="text-green-600">Бесплатно</span>
                                </div>
                                <Divider />
                                <div className="flex justify-between text-xl font-bold text-gray-800">
                                    <span>К оплате</span>
                                    <span className="text-primary">${getTotalPrice()}</span>
                                </div>
                            </div>

                            <Button 
                                color="primary" 
                                size="lg"
                                className="w-full rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
                                startContent={<CreditCard size={18} />}
                            >
                                Оформить заказ
                            </Button>

                            <Link href="/buy">
                                <Button 
                                    variant="light" 
                                    className="w-full mt-3 rounded-full"
                                    startContent={<ArrowLeft size={16} />}
                                >
                                    Продолжить покупки
                                </Button>
                            </Link>
                        </CardBody>
                    </Card>

                    {/* Блок с преимуществами */}
                    <Card className="mt-4 rounded-2xl border-0 bg-gradient-to-r from-blue-50 to-purple-50">
                        <CardBody className="p-4">
                            <div className="flex items-center gap-3 text-sm">
                                <div className="p-2 bg-white rounded-full shadow-sm">
                                    <ShoppingBag size={16} className="text-blue-600" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-800">Бесплатная доставка</p>
                                    <p className="text-gray-500 text-xs">При заказе от $50</p>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default Cart;