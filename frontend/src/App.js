import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Auth/Login";
import Dashboard from "./Dashboard/Dashboard";
import { AuthProvider } from "./Auth/AuthContext";
import ProtectedRoute from "./Auth/ProtectedRoute";
import Users from "./Auth/Users";
import CompanyProfile from "./pages/Company/CompanyProfile";
import ChartOfAccount from "./pages/Accounting/ChartOfAccount";
import Currency from "./pages/Currency/Currency";
import KategoriList from "./pages/MasterData/KategoriList";
import NamaTipeAkun from "./pages/MasterData/NamaTipeAkun";
import CustomerTypePage from "./pages/MasterData/CustomerTypePage";
import PaymentTermForm from "./pages/MasterData/PaymentTermForm";
import MstTax from "./pages/MasterData/MstTax";
import CustomerForm from "./pages/customers/CustomerForm";
import CustomerList from "./pages/customers/CustomerList";
import TypeTaxList from "./pages/MasterData/TypeTax/TypeTaxList";
import PemasokList from "./pages/MstPemasok/PemasokList";
import BarangdanjasaList from "./pages/BarangDanJasa/BarangdanjasaList";
import ListProjectMst from "./pages/Proyek/ListProjectMst";
import DepartmentList from './pages/Department/DepartmentList';
import MetodePenyusutanPajakList from "./pages/MasterData/MetodePenyusutanPajak/MetodePenyusutanPajakList";
import TipeAktivaTetapPajakList from "./pages/AktivaTetap/TipeAktivaTetapPajak/TipeAktivaTetapPajakList";




function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/company/profile"
            element={
              <ProtectedRoute>
                <CompanyProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/accounting/chart-of-accounts"
            element={
              <ProtectedRoute>
                <ChartOfAccount />
              </ProtectedRoute>
            }
          />
          <Route
            path="/master/currency"
            element={
              <ProtectedRoute>
                <Currency />
              </ProtectedRoute>
            }
          />
          <Route
            path="/master/users"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Users />
              </ProtectedRoute>
            }
          />
          <Route
            path="/master/category"
            element={
              <ProtectedRoute>
                <KategoriList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/master/tipe-akun"
            element={
              <ProtectedRoute>
                <NamaTipeAkun />
              </ProtectedRoute>
            }
          />
          <Route
            path="/master/customer-types"
            element={
              <ProtectedRoute>
                <CustomerTypePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/master/PaymentTermForm"
            element={
              <ProtectedRoute>
                <PaymentTermForm/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/master/MstTax"
            element={
              <ProtectedRoute>
                <MstTax/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/customers/form"
            element={
              <ProtectedRoute>
                <CustomerForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customers/form/:id"
            element={
              <ProtectedRoute>
                <CustomerForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customers"
            element={
              <ProtectedRoute>
                <CustomerList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/master/type-tax"
            element={
              <ProtectedRoute>
                <TypeTaxList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/master/pemasok"
            element={
              <ProtectedRoute>
                <PemasokList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/barang-jasa"
            element={
              <ProtectedRoute>
                <BarangdanjasaList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/master/project"
            element={
              <ProtectedRoute>
                <ListProjectMst />
              </ProtectedRoute>
            }
          />
          <Route
            path="/master/depart"
            element={
              <ProtectedRoute>
                <DepartmentList/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/master/MetodePenyusutanPajak"
            element={
              <ProtectedRoute>
                <MetodePenyusutanPajakList/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/tipe-aktiva-tetap-pajak"
            element={
              <ProtectedRoute>
                <TipeAktivaTetapPajakList />
              </ProtectedRoute>
            }
          />
          {/* Default routes */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
