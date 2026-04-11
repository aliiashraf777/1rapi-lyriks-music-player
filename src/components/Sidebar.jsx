import { useState } from "react"
import { logo } from "../assets"
import { sidebarLinks } from "../assets/constants"
import { Link, NavLink } from "react-router-dom"

import { RiCloseLine } from 'react-icons/ri'
import { HiOutlineMenu } from "react-icons/hi"

const Sidebar = () => { 

  const [mobileMenu, setMobileMenu] = useState(false)

  return (
    <>
      <div className="hidden md:flex flex-col w-[240px] py-10 px-4 bg-[#191624]">
        <Link to='/'>
          <img src={logo} alt="logo"
            className='w-full h-14 object-contain'
          />
        </Link>

        <NavLinks />
      </div>

      {/* mobile nav toggle icons */}
      <div className="block md:hidden absolute top-6 right-3">
        {mobileMenu
          ? (<RiCloseLine
            className='w-6 h-6 text-white mr-2'
            onClick={() => setMobileMenu(false)}
          />)
          : (<HiOutlineMenu
            className='w-6 h-6 text-white mr-2'
            onClick={() => setMobileMenu(true)}
          />)
        }
      </div>

      {/* mobile menu */}
      <div
        className={`absolute md:hidden top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#483d8b] backdrop-blur-lg z-10 p-6 smooth-transition ${mobileMenu ? 'left-0' : '-left-full'}`}
      >
        <Link to='/'>
          <img src={logo} alt="logo"
            className='w-full h-14 object-contain'
          />
        </Link>

        <NavLinks handleNavClick={() => setMobileMenu(false)} />
      </div>
    </>
  )
}

export default Sidebar


const NavLinks = ({ handleNavClick }) => (
  <div className="mt-10">
    {sidebarLinks.map((item, idx) => (
      <NavLink
        key={idx}
        to={item.to}
        className='flex flex-row justify-start items-center my-8 text-sm font-medium text-gray-400 hover:text-cyan-400'
        onClick={() => handleNavClick && handleNavClick()}
      >
        {<item.icon className='w-6 h-6 mr-2' />}
        {item.name}
      </NavLink>
    )
    )}
  </div>
)