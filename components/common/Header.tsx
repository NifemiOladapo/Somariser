import { FileText } from "lucide-react";
import Link from "next/link";
import NavLink from "./NavLink";
import {
  SignedIn,
  SignedOut,
  SignIn,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";

const Header = () => {
  const isLoggedIn = false;
  return (
    <nav className="container flex  items-center justify-between lg:px-8 py-4 px-10 mx-auto text-lg">
      <div className="flex lg:flex-1">
        <NavLink href="/" classname="flex items-center gap-1 lg:gap-2 shrink-0">
          <FileText className="w-5 h-5 lg:w-8 lg:h-8 text-gray-900 hover:rotate-12 transform transition duration-200 ease-in-out" />
          <span className="font-extrabold lg:text-xl text-gray-900">Soma</span>
        </NavLink>
      </div>
      <div className="flex lg:justify-center gap-4 lg:gap-12 lg:items-center">
        <NavLink href="/#pricing">Pricing</NavLink>
        <SignedIn>
          <NavLink href={"/dashboard"}>Your Summaries</NavLink>
        </SignedIn>
      </div>
      <div className="flex lg:justify-end lg:flex-1">
        <SignedIn>
          <div className="flex gap-2 items-center">
            <NavLink href={"/sign-in"}>Upload a PDF</NavLink>
            <div>Pro</div>
            <UserButton />
          </div>
        </SignedIn>
        <SignedOut>
          <SignInButton>
            <button className="bg-transparent animate-pulse">Sign In</button>
          </SignInButton>
        </SignedOut>
      </div>
    </nav>
  );
};

export default Header;
