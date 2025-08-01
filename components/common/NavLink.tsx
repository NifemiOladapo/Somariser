"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavLink = ({
  href,
  children,
  classname,
}: {
  href: string;
  children: React.ReactNode;
  classname?: string;
}) => {
  const pathname = usePathname();
  console.log(pathname);
  const isActiveLink =
    href === pathname || (pathname.startsWith(href) && href !== "/");
  return (
    <Link
      href={href}
      className={cn(
        "transition-colors text-sm duration-200 text-gray-600 hover:text-rose-500",
        classname,
        isActiveLink && "text-rose-500"
      )}
    >
      {children}
    </Link>
  );
};

export default NavLink;
