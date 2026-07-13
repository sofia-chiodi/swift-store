import Container from "@/components/global/Container";
import Logo from "./Logo";
import NavSearch from "./NavSearch";
import DarkMode from "./DarkMode";
import LinksDropdown from "./LinksDropdown";
import CartButton from "./CartButton";
import { Suspense } from "react";

function Navbar() {
  return (
    <nav className='border-b'>
      <Container className='flex flex-nowrap items-center gap-2 py-6 sm:gap-4 sm:py-8'>
        <Logo />
        <div className='flex min-w-0 flex-1 justify-center'>
          <Suspense>
            <NavSearch />
          </Suspense>
        </div>
        <div className='flex items-center gap-2 sm:gap-4'>
          <CartButton />
          <DarkMode />
          <LinksDropdown />
        </div>
      </Container>
    </nav>
  );
}

export default Navbar;
