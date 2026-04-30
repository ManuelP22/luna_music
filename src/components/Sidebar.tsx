import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { RiCloseLine } from 'react-icons/ri';
import { HiOutlineMenu } from 'react-icons/hi';

import { links } from '../assets/constants';
import type { NavLinksProps } from './sidebar.types';

const NavLinks = ({ handleClick }: NavLinksProps) => (
  <div className="flex flex-col gap-2">
    {links.map((item) => (
      <NavLink
        key={item.name}
        to={item.to}
        end={item.to === '/'}
        onClick={() => handleClick?.()}
        className={({ isActive }) => (isActive ? 'nav-item-active' : 'nav-item')}
      >
        <item.icon className="h-5 w-5 flex-shrink-0" />
        {item.name}
      </NavLink>
    ))}
  </div>
);

const Sidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <aside className="glass-panel max-w-[300px] hidden h-full min-h-0 overflow-hidden border-r border-white/5 px-5 py-8 lg:flex lg:flex-col">
        <div className="mb-10 rounded-[28px] border border-white/10 bg-white/[0.03] px-5 py-5 shadow-glass-inset">
          <p className="text-label-sm uppercase tracking-[0.24em] text-primary-fixed">Luna Music</p>
          <h1 className="mt-2 text-headline-md font-black tracking-[-0.04em] text-white">Ocean Glass</h1>
          <p className="mt-2 text-sm text-on-surface-variant">
            Audio espacial, charts vivos y una atmosfera inspirada en Apple Music.
          </p>
        </div>

        <div className="hide-scrollbar min-h-0 flex-1 overflow-y-auto pr-1">
          <NavLinks />
        </div>
      </aside>

      <div className="fixed right-4 top-5 z-[60] block lg:hidden">
        {mobileMenuOpen ? (
          <button
            type="button"
            aria-label="Cerrar menu"
            className="glass-panel flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white"
            onClick={() => setMobileMenuOpen(false)}
          >
            <RiCloseLine className="h-6 w-6" />
          </button>
        ) : (
          <button
            type="button"
            aria-label="Abrir menu"
            className="glass-panel flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white"
            onClick={() => setMobileMenuOpen(true)}
          >
            <HiOutlineMenu className="h-6 w-6" />
          </button>
        )}
      </div>

      <div className={`fixed inset-0 z-50 bg-black/45 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${mobileMenuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}>
        <div className={`glass-panel h-full w-[82%] max-w-sm border-r border-white/10 px-6 pb-8 pt-20 transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="mb-8 rounded-[28px] border border-white/10 bg-white/[0.03] px-5 py-5 shadow-glass-inset">
            <p className="text-label-sm uppercase tracking-[0.24em] text-primary-fixed">Luna Music</p>
            <h1 className="mt-2 text-headline-md font-black tracking-[-0.04em] text-white">Ocean Glass</h1>
            <p className="mt-2 text-sm text-on-surface-variant">
              Navega, descubre y reproduce sin salir del flujo principal.
            </p>
          </div>

          <NavLinks handleClick={() => setMobileMenuOpen(false)} />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
