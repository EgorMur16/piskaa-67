"use client"
import {Button} from "@heroui/button";
import Link from "next/link"

const NotFoundPage = () => {
    return ( 
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="text-8xl font-bold">
                404
            </div>
            <h1 className="text-3xl font-bold">Страница не найдена</h1>
            <div className="pt-6">
                <Button as={Link} color="primary" variant="ghost" href="/">Назад</Button>
            </div>
            
        </div>
    );
}
 
export default NotFoundPage;