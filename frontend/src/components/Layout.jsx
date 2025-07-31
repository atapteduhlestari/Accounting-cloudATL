import Header from './Header';
import Sidebar from './Sidebar'; 
import { ReactNode } from 'react';

function Layout({ children }) {
  return (
    <div>
      <Sidebar />
      <Header />
      <main className="ml-[50px] pt-[85px] p-6">{children}</main>
    </div>
  );
}

export default Layout;
