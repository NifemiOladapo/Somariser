import { FileText } from "lucide-react";
import Link from "next/link";
import NavLink from "./NavLink";

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
        {isLoggedIn && <NavLink href={"/dashboard"}>Your Summaries</NavLink>}
      </div>
      <div className="flex lg:justify-end lg:flex-1">
        {isLoggedIn ? (
          <div className="flex gap-2 items-center">
            <NavLink href={"/sign-in"}>Upload a PDF</NavLink>
            <div>Pro</div>
            <button>User</button>
          </div>
        ) : (
          <div>
            <NavLink href={"/sign-in"}>Sign In</NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
