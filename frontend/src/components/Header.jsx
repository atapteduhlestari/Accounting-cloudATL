import { useState } from 'react';
import api from '../axios';

function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      // Ambil CSRF token dari Laravel
      await api.get('/sanctum/csrf-cookie');

      // Panggil endpoint logout
      await api.post('/logout');

      // Hapus token/session lokal jika ada
      localStorage.removeItem('auth'); // opsional

      // Redirect ke login
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout gagal:', error);
      alert('Gagal logout. Silakan coba lagi.');
    }
  };
  

  return (
    <nav className="fixed top-0 left-[50px] right-0 h-[64px] bg-white border-b px-4 py-3 flex justify-between items-center z-40">
      <span className="text-lg font-semibold">Accounting Cloud</span>

      <div className="flex items-center gap-4 relative">
        <i className="bi bi-bell text-xl cursor-pointer"></i>

        <div className="relative">
          <button onClick={() => setDropdownOpen(!dropdownOpen)}>
            <img
              src="https://via.placeholder.com/30"
              className="rounded-full w-8 h-8"
              alt="User"
            />
          </button>

          {dropdownOpen && (
            <ul className="absolute right-0 mt-2 w-40 bg-white border rounded shadow z-50">
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Profile
                </a>
              </li>
              <li>
                <hr className="border-t my-1" />
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Logout
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
