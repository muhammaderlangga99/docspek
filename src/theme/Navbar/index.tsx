import React, {type ReactNode} from 'react';
import NavbarLayout from '@theme/Navbar/Layout';
import NavbarContent from '@theme/Navbar/Content';

export default function Navbar(): ReactNode {
  return (
    <NavbarLayout>
      <div className="w-11/12 m-auto font-sans">
        <NavbarContent />
      </div>
    </NavbarLayout>
  );
}
