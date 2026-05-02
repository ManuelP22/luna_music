import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { RiCloseLine } from 'react-icons/ri';
import { HiOutlineMenu } from 'react-icons/hi';

import { links } from '../assets/constants';
import logoLuna from '../assets/logo_luna.png';
import { useI18n } from '../i18n';
import type { NavLinksProps } from './sidebar.types';

const NavLinks = ({ handleClick }: NavLinksProps) => {
  const { t } = useI18n();

  return (
    <div className="flex flex-col gap-3 px-1 py-1">
      {links.map((item) => (
        <NavLink
          key={item.labelKey}
          to={item.to}
          end={item.to === '/'}
          onClick={() => handleClick?.()}
          className={({ isActive }) => (isActive ? 'nav-item-active' : 'nav-item')}
        >
          <item.icon className="h-5 w-5 flex-shrink-0" />
          {t(item.labelKey)}
        </NavLink>
      ))}
    </div>
  );
};

const SidebarBrand = () => {
  const { t } = useI18n();

  return (
    <div className="mb-8 rounded-[30px] border border-white/10 bg-white/[0.035] p-4 shadow-glass-inset">
      <div className="flex items-center gap-4">
        <img
          src={logoLuna}
          alt="Logo"
          className="h-14 w-14 rounded-[18px] object-cover shadow-[0_12px_40px_rgba(0,0,0,0.28)]"
        />

        <div className="min-w-0">
          <p className="text-label-sm uppercase tracking-[0.22em] text-white/50">{t('sidebar.space')}</p>
          <h1 className="mt-1 truncate text-lg font-semibold text-white">{t('sidebar.title')}</h1>
        </div>
      </div>
    </div>
  );
};

const Sidebar = () => {
  const { t } = useI18n();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <aside className="glass-panel lg:w-[340px] hidden h-full min-h-0 overflow-visible border-r border-white/5 px-5 py-8 lg:flex lg:flex-col select-none">
        <div className="hide-scrollbar min-h-0 flex-1 overflow-y-auto pr-2">
          <SidebarBrand />
          <NavLinks />
        </div>
      </aside>

      <div className="fixed right-4 top-5 z-[60] block lg:hidden">
        {mobileMenuOpen ? (
          <button
            type="button"
            aria-label={t('sidebar.closeMenu')}
            className="glass-panel flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white"
            onClick={() => setMobileMenuOpen(false)}
          >
            <RiCloseLine className="h-6 w-6" />
          </button>
        ) : (
          <button
            type="button"
            aria-label={t('sidebar.openMenu')}
            className="glass-panel flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white"
            onClick={() => setMobileMenuOpen(true)}
          >
            <HiOutlineMenu className="h-6 w-6" />
          </button>
        )}
      </div>

      <div className={`fixed inset-0 z-50 bg-black/45 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${mobileMenuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}>
        <div className={`glass-panel h-full w-[82%] max-w-sm border-r border-white/10 px-6 pb-8 pt-20 transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <SidebarBrand />
          <NavLinks handleClick={() => setMobileMenuOpen(false)} />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
