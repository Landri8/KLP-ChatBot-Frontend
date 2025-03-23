import React from 'react'
import { Link } from 'react-router-dom'
import { FiMenu } from "react-icons/fi";

const NavBarComponent: React.FC = () => {
  return (
    <nav className='bg-white fixed top-0 left-1/2 -translate-x-1/2 py-6 w-full z-40'>
      <div className='w-[88%] md:w-11/12 max-w-[1560px] flex items-center justify-between mx-auto'>
        <Link to='/' className='font-semibold'>{import.meta.env.VITE_APP_NAME}</Link>
        <div className='hidden lg:flex gap-10 px-4 py-1'>
          <Link className='text-[14px]' to='/aboutus'>About Us</Link>
          <Link className='text-[14px]' to='/products'>Products</Link>
          <Link className='text-[14px]' to='/solutions'>Solutions</Link>
          <Link className='text-[14px]' to='/contactus'>Contact Us</Link>
          <Link className='text-[14px]' to='/blogs'>Blogs</Link>
          <Link className='text-[14px]' to='/testimonials'>Testimonials</Link>
        </div>

        <button title='Menu' className='lg:hidden w-[40px] aspect-square flex items-center justify-center text-[20px]'><FiMenu /></button>
      </div>
    </nav>
  )
}

export default NavBarComponent