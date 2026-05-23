"use client"
import { layoutConfig } from "@/config/layout.config";
import { siteConfig } from "@/config/site.config";
import { useRouter } from "next/navigation";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Button} from "@heroui/react";
import Link from 'next/link'


export const Logo = () => {
  return (
    <svg version="1.1" id="Layer_1" x="0px" y="0px" width="256px" height="256px" viewBox="0 0 256 256">  <image id="image0" width="32" height="32" x="215" y="110"
    href="data:image/png;base64,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" />
</svg>

  );
};
 

export default function App() {
 const router = useRouter();

  
    const getNavItem = () => {
        return siteConfig.NavItems.map((item) => {
            return (
                <NavbarItem key={item.href}>
                    <Link href={item.href}
                    className={` py-1
                      color: white
                    hover: border-black-300   hover: rounded-md
                    transition-colors
                    transition-border
                    duration-200
                    `}
                    >
                      {item.label}
                    </Link>
                </NavbarItem>
            )
        })
    }

  return (
    <Navbar style={{height: `${layoutConfig.headerHeight} `}} className="hed ggv">
      <NavbarBrand>
        <p className="font-bold text-inherit cw">Sell&Buy</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4 hed3 cw">
       {getNavItem()}
      </NavbarContent>
      <NavbarContent justify="end">

        <NavbarItem>
          <Button onPress={() => router.push('/profile')}>Профиль</Button>
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <Button onPress={() => router.push("/login")} color="primary"  variant="ghost">Войти</Button>
        </NavbarItem>
        <NavbarItem className="hed2">
          <Button onPress={() => router.push("/register")} color="primary"  variant="ghost">
            Зарегистироваться
          </Button>
        </NavbarItem>
      </NavbarContent>




    </Navbar>
  );
}
