import React, { useState } from 'react';
import './Sidebar.css';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const location = useLocation();

  const toggleSubmenu = (id) => {
    setActiveSubmenu((prev) => (prev === id ? null : id));
  };

  const sidebarMenu = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'bi-speedometer2',
      submenu: false,
    },
    {
      label: 'Company',
      path: '/company',
      icon: 'bi-building',
      submenu: true,
      id: 'company',
      children: ['/company/profile', '/company/menu1', '/company/menu2'],
    },
    {
      label: 'Master Data',
      path: '/master',
      icon: 'bi-archive',
      submenu: true,
      id: 'masterdata',
      children: [
        '/master/category',
        '/master/tipe-akun',
        '/master/customer-types',
        '/master/PaymentTermForm',
        '/master/MstTax',
        '/master/type-tax',
      ],
    },
    {
      label: 'Essential',
      path: '/essential',
      icon: 'bi-database',
      submenu: true,
      id: 'essential',
      children: [
        '/master/currency',
        '/accounting/chart-of-accounts',
        '/customers',
        '/master/pemasok',
      ],
    },
    {
      label: 'Entry',
      path: '/entry',
      icon: 'bi-journal-text',
      submenu: true,
      id: 'entry',
      children: [
        '/entry/gl',
        '/entry/cash',
        '/entry/sales',
        '/entry/purchase',
        '/entry/inventory',
      ],
    },
    {
      label: 'Users',
      path: '/master/users',
      icon: 'bi-people',
      submenu: false,
    },
  ];
  

  return (
    <>
      <div className="sidebar">
        {sidebarMenu.map((menu) =>
          menu.submenu ? (
            <div
              key={menu.label}
              className={`sidebar-icon ${
                menu.children?.includes(location.pathname) ? 'active' : ''
              }`}
              onClick={() => toggleSubmenu(menu.id)}
              title={menu.label}
            >
              <i className={`bi ${menu.icon}`}></i>
            </div>
          ) : (
            <Link
              key={menu.label}
              to={menu.path}
              className={`sidebar-icon ${
                location.pathname === menu.path ? 'active' : ''
              }`}
              title={menu.label}
            >
              <i className={`bi ${menu.icon}`}></i>
            </Link>
          )
        )}
      </div>

      {/* Submenu: Company */}
      {activeSubmenu === 'company' && (
        <div className="submenu" style={{ top: '90px' }}>
          <div className="submenu-header">
            <h3 className="submenu-title">Perusahaan</h3>
          </div>
          <div className="submenu-content">
            <div className="submenu-grid">
              <Link
                to="/company/profile"
                className={`menu-card ${
                  location.pathname === '/company/profile'
                    ? 'active-submenu'
                    : ''
                }`}
              >
                <i
                  className="bi bi-person-badge"
                  style={{ fontSize: '1.2rem' }}
                ></i>
                <div className="menu-card-title">Company Profile</div>
              </Link>
              <Link
                to="/company/menu1"
                className={`menu-card ${
                  location.pathname === '/company/menu1' ? 'active-submenu' : ''
                }`}
              >
                <i
                  className="bi bi-list-task"
                  style={{ fontSize: '1.2rem' }}
                ></i>
                <div className="menu-card-title">Menu 1</div>
              </Link>
              <Link
                to="/company/menu2"
                className={`menu-card ${
                  location.pathname === '/company/menu2' ? 'active-submenu' : ''
                }`}
              >
                <i className="bi bi-layers" style={{ fontSize: '1.2rem' }}></i>
                <div className="menu-card-title">Menu 2</div>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Submenu: Essential */}
      {activeSubmenu === 'essential' && (
        <div className="submenu" style={{ top: '210px' }}>
          <div className="submenu-header">
            <h3 className="submenu-title">Essential Data</h3>
          </div>
          <div className="submenu-content">
            <div className="submenu-grid">
              <Link
                to="/master/currency"
                className={`menu-card ${
                  location.pathname === '/master/currency'
                    ? 'active-submenu'
                    : ''
                }`}
              >
                <i
                  className="bi bi-currency-dollar"
                  style={{ fontSize: '1.2rem' }}
                ></i>
                <div className="menu-card-title">Currency</div>
              </Link>
              <Link
                to="/accounting/chart-of-accounts"
                className={`menu-card ${
                  location.pathname === '/accounting/chart-of-accounts'
                    ? 'active-submenu'
                    : ''
                }`}
              >
                <i
                  className="bi bi-diagram-3"
                  style={{ fontSize: '1.2rem' }}
                ></i>
                <div className="menu-card-title">Chart Of Account</div>
              </Link>
              <Link
                to="/customers"
                className={`menu-card ${
                  location.pathname === '/customers' ? 'active-submenu' : ''
                }`}
              >
                <i
                  className="bi bi-person-lines-fill"
                  style={{ fontSize: '1.2rem' }}
                ></i>
                <div className="menu-card-title">Daftar Pelanggan</div>
              </Link>
              <Link
                to="/master/pemasok"
                className={`menu-card ${
                  location.pathname === '/master/pemasok' ? 'active-submenu' : ''
                }`}
              >
                <i
                  className="bi bi-box-seam"
                  style={{ fontSize: '1.2rem' }}
                ></i>
                <div className="menu-card-title">Daftar Pemasok</div>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Submenu: Entry */}
      {activeSubmenu === 'entry' && (
        <div className="submenu" style={{ top: '270px' }}>
          <div className="submenu-header">
            <h3 className="submenu-title">Data Entry</h3>
          </div>
          <div className="submenu-content">
            <div className="submenu-grid">
              {sidebarMenu
                .find((m) => m.id === 'entry')
                ?.children.map((path) => {
                  const nameMap = {
                    '/entry/gl': 'General Ledger',
                    '/entry/cash': 'Cash & Bank',
                    '/entry/sales': 'Sales',
                    '/entry/purchase': 'Purchase',
                    '/entry/inventory': 'Inventory',
                  };
                  const iconMap = {
                    '/entry/gl': 'bi-journal-check',
                    '/entry/cash': 'bi-cash-stack',
                    '/entry/sales': 'bi-cart-check',
                    '/entry/purchase': 'bi-bag-check',
                    '/entry/inventory': 'bi-box-seam',
                  };
                  return (
                    <Link
                      key={path}
                      to={path}
                      className={`menu-card ${
                        location.pathname === path ? 'active-submenu' : ''
                      }`}
                    >
                      <i
                        className={`bi ${iconMap[path]}`}
                        style={{ fontSize: '1.2rem' }}
                      ></i>
                      <div className="menu-card-title">{nameMap[path]}</div>
                    </Link>
                  );
                })}
            </div>
          </div>
        </div>
      )}

      {/* Submenu: Master Data */}
      {activeSubmenu === 'masterdata' && (
        <div className="submenu" style={{ top: '150px' }}>
          <div className="submenu-header">
            <h3 className="submenu-title">Master Data</h3>
          </div>
          <div className="submenu-content">
            <div className="submenu-grid">
              <Link
                to="/master/category"
                className={`menu-card ${
                  location.pathname === '/master/category'
                    ? 'active-submenu'
                    : ''
                }`}
              >
                <i className="bi bi-tags" style={{ fontSize: '1.2rem' }}></i>
                <div className="menu-card-title">Kategori</div>
              </Link>
              <Link
                to="/master/tipe-akun"
                className={`menu-card ${
                  location.pathname === '/master/tipe-akun'
                    ? 'active-submenu'
                    : ''
                }`}
              >
                <i className="bi bi-tags" style={{ fontSize: '1.2rem' }}></i>
                <div className="menu-card-title">Master Data Tipe Akun</div>
              </Link>
              <Link
                to="/master/customer-types"
                className={`menu-card ${
                  location.pathname === '/master/customer-types'
                    ? 'active-submenu'
                    : ''
                }`}
              >
                <i
                  className="bi bi-person-vcard"
                  style={{ fontSize: '1.2rem' }}
                ></i>
                <div className="menu-card-title">Tipe Pelanggan</div>
              </Link>
              <Link
                to="/master/PaymentTermForm"
                className={`menu-card ${
                  location.pathname === '/master/PaymentTermForm'
                    ? 'active-submenu'
                    : ''
                }`}
              >
                <i
                  className="bi bi-clipboard-check"
                  style={{ fontSize: '1.2rem' }}
                ></i>
                <div className="menu-card-title">Syarat Pembayaran</div>
              </Link>
              <Link
                to="/master/MstTax"
                className={`menu-card ${
                  location.pathname === '/master/MstTax' ? 'active-submenu' : ''
                }`}
              >
                <i
                  className="bi bi-credit-card"
                  style={{ fontSize: '1.2rem' }}
                ></i>
                <div className="menu-card-title">Master Pajak</div>
              </Link>
              <Link
                to="/master/type-tax"
                className={`menu-card ${
                  location.pathname === '/master/type-tax'
                    ? 'active-submenu'
                    : ''
                }`}
              >
                <i
                  className="bi bi-file-earmark-text"
                  style={{ fontSize: '1.2rem' }}
                ></i>
                <div className="menu-card-title">Master Tipe Pajak</div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
