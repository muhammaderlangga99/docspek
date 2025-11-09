// src/theme/Navbar/Logo/index.tsx

import React from 'react';
import {useThemeConfig} from '@docusaurus/theme-common';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
// import type {Props} from '@theme/Navbar/Logo';
import clsx from 'clsx'; // Import clsx kalau belum ada
import { GitCompareArrows } from 'lucide-react';

// (Mungkin ada import lain, biarkan saja)

export default function NavbarLogo({className, ...props}): React.ReactElement {
  const {
    navbar: {title, logo},
  } = useThemeConfig();

  const logoLink = useBaseUrl(logo?.href ?? '/');
  
  // (Biarkan logic 'logoSrc', 'logoAlt', 'logoProps' bawaan)
  const logoSrc = logo?.src ? useBaseUrl(logo.src) : undefined;
  const logoAlt = logo?.alt ?? title ?? '';
  // ... (mungkin ada logic 'logoProps' di sini)

  return (
    <Link
      to={logoLink}
      // ... (biarkan props bawaan: ...props, logoProps, dsb)
      className={clsx('navbar__brand', className)}>
      
      {logo && (
        <img src={logoSrc} alt={logoAlt} className="navbar__logo" />
      )}
      
      {title && (
        <strong className="navbar__title text--truncate font-sans">
          
          {/* Ini adalah string 'cashDocs' dari config */}
          {/* {title} */}
          <span className='text-blue-800'>cash</span><span className='text-green-800'>Docs</span>
          
          {/* --- TAMBAHKAN KODE HTML KAMU DI SINI --- */}
          {/* {process.env.NODE_ENV === 'development' && (
            <span className="ml-2 rounded bg-orange-400 px-1.5 py-0.5 text-xs font-bold text-black">
              DEV
            </span>
          )} */}
          {/* -------------------------------------- */}
            
        </strong>
      )}
    </Link>
  );
}