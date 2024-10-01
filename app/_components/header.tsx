"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { UserButton, useUser } from "@clerk/nextjs";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";

function Header() {
  const { user, isSignedIn } = useUser();
  const MenuList = [
    { name: "Home", path: "/" },
    { name: "Create Story", path: "/create-story" },
    { name: "View Story", path: "/view-story/example-story-id" }, 
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    // Responsive Navbar
    <Navbar maxWidth="full" onMenuOpenChange={setIsMenuOpen} isBordered>
      <NavbarContent justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        {/* Logo section */}
        <NavbarBrand>
          <div className="flex items-center">
            <Image
              className="hidden sm:block rounded-xl"
              src="/logo.jpeg"
              alt="logo"
              width={60} // Set a smaller size for smaller screens
              height={60}
            />
            <h2 className="font-bold text-[20px] text-purple-900 ml-2">
              Kids Story
            </h2>
          </div>
        </NavbarBrand>
      </NavbarContent>

      {/* Navigation Links - Show on larger screens */}
      <NavbarContent justify="end" className="hidden sm:flex">
        {MenuList.map((item, index) => (
          <NavbarItem key={index} className="mx-2 text-white">
            <Link href={item.path}>{item.name}</Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      {/* Button & User Action */}
      <NavbarContent justify="end">
        <Link href={"/dashboard"}>
          <Button className="font-bold bg-blue-600 text-white cursor-pointer">
            {isSignedIn ? "Dashboard" : "Get Started"}
          </Button>
        </Link>
        <UserButton />
      </NavbarContent>

      {/* Collapsible menu for small screens */}
      <NavbarMenu>
        {MenuList.map((item, index) => (
          <NavbarMenuItem key={index}>
            <Link href={item.path}>{item.name}</Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

export default Header;






// "use client";
// import React, { useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { UserButton, useUser } from '@clerk/nextjs'

// import {
//   Navbar,
//   NavbarBrand,
//   NavbarContent,
//   NavbarItem,
//   NavbarMenu,
//   NavbarMenuItem,
//   NavbarMenuToggle,
// } from "@nextui-org/navbar";
// import { Button } from "@nextui-org/button";

// function Header() {

//   const {user, isSignedIn} = useUser();
//   const MenuList = [
//     { name: "Home", path: "/" },
//     { name: "Create Story", path: "/create-story" },
//     { name: "View Story",path: "/view-story"},
//   ];

//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   return (
//     //navbar
//     <Navbar maxWidth="full" onMenuOpenChange={setIsMenuOpen}>
//       <NavbarContent justify="start">
//         <NavbarMenuToggle
//           aria-label={isMenuOpen ? "Close menu" : "Open menu"}
//           className="sm:hidden"
//         />
//         {/* logo */}
//         <NavbarBrand>
//           <div className="flex items-center">
//             <Image className="hidden md:block rounded-xl" src="/logo.jpeg" alt="logo" width={80} height={80}/>
//             <h2 className="font-bold text-[20px] text-purple-900 ml-2"> Kids Story </h2>
//           </div>
//         </NavbarBrand>
//       </NavbarContent>
//       {/* headercontent */}
//       <NavbarContent justify="end" className="hidden sm:flex">
//         {MenuList.map((item, index) => (
//           <NavbarItem key={index} className="mx-2 text-white">
//             <Link href={item.path}>{item.name}</Link>
//           </NavbarItem>
//         ))}
//       </NavbarContent>
//       <NavbarContent justify='end'>
//           <Link href={'/dashboard'}>
//           <Button className="font-bold bg-blue-600 text-white cursor-pointer">
//             {isSignedIn?
//             'Dashboard':
//             'Get Started'
//           }
//           </Button>
//           </Link>
//           <UserButton/>
//       </NavbarContent>
//       <NavbarMenu>
//         {MenuList.map((item, index) => (
//           <NavbarMenuItem>
//             <Link href={item.path}>{item.name}</Link>
//           </NavbarMenuItem>
//         ))}
//       </NavbarMenu>
//     </Navbar>
//   );
// }

// export default Header;
