// src/theme/Navbar/Layout/index.tsx

import React, {
  type ComponentProps,
  type ReactNode,
  useState, // <-- 1. Import hook
  useEffect, // <-- 1. Import hook
} from 'react';
import clsx from 'clsx';
import {ThemeClassNames, useThemeConfig} from '@docusaurus/theme-common';
import {
  useHideableNavbar,
  useNavbarMobileSidebar,
} from '@docusaurus/theme-common/internal';
import {translate} from '@docusaurus/Translate';
import NavbarMobileSidebar from '@theme/Navbar/MobileSidebar';
import type {Props} from '@theme/Navbar/Layout';

import styles from './styles.module.css';

function NavbarBackdrop(props: ComponentProps<'div'>) {
  return (
    <div
      role="presentation"
      {...props}
      className={clsx('navbar-sidebar__backdrop', props.className)}
    />
  );
}

export default function NavbarLayout({children}: Props): ReactNode {
  const {
    navbar: {hideOnScroll, style},
  } = useThemeConfig();
  const mobileSidebar = useNavbarMobileSidebar();
  const {navbarRef, isNavbarVisible} = useHideableNavbar(hideOnScroll);

  // --- 2. LOGIC SCROLL ---
  // State untuk tahu apakah halaman sudah di-scroll
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Fungsi yang akan dijalankan saat user scroll
    const handleScroll = () => {
      // Cek apakah posisi scroll (Y) lebih dari 0
      const scrolled = window.scrollY > 0;
      setIsScrolled(scrolled);
    };

    // Set state awal saat komponen di-load
    handleScroll();

    // Tambahkan event listener saat user scroll
    window.addEventListener('scroll', handleScroll);

    // Hapus event listener saat komponen di-unmount (penting!)
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // [] artinya effect ini cuma jalan sekali saat mount
  // -------------------------

  return (
    <nav
      ref={navbarRef}
      aria-label={translate({
        id: 'theme.NavBar.navAriaLabel',
        message: 'Main',
        description: 'The ARIA label for the main navigation',
      })}
      className={clsx(
        ThemeClassNames.layout.navbar.container,
        'navbar',
        'navbar--fixed-top',
        
        // --- 3. LOGIC CLASSNAME (YANG INI PENTING) ---
        // Cek state 'isScrolled'
        isScrolled
          ? [ // JIKA SUDAH DI-SCROLL (isScrolled = true)
              '', // Kasih efek glass
              'border-b border-white/20 dark:border-white/10 z-[9999]', // Kasih border
            ]
          : [ // JIKA DI PALING ATAS (isScrolled = false)
              '', // Background transparan
              'border-b border-gray-200 shadow-sm', // Border transparan (biar ga geser)
            ],
        // ----------------------------------------------

        hideOnScroll && [
          styles.navbarHideable,
          !isNavbarVisible && styles.navbarHidden,
        ],
        {
          'navbar-sidebar--show': mobileSidebar.shown,
        },
      )}>
      {children}
      <NavbarBackdrop onClick={mobileSidebar.toggle} />
      <NavbarMobileSidebar />
    </nav>
  );
}