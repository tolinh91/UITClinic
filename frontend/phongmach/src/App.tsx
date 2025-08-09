import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { VatTuProvider } from './contexts/VatTuContext';
import { AccountProvider } from './contexts/AccountContext';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Profile from './pages/Profile/Profile';
import SearchPass1 from './pages/Profile/SearchPass1';
import SearchPass2 from './pages/Profile/SearchPass2';
import SearchPass3 from './pages/Profile/SearchPass3';
import MainPage from './pages/Profile/MainPage';
import ChangePassword from './pages/Profile/ChangePassword';
import QLGKB from './pages/GiayKhamBenh/QLGKB';
import DetailGKB from './pages/GiayKhamBenh/DetailGKB';
import PrintGKB from './pages/GiayKhamBenh/PrintGKB';
import CreateGKB from './pages/GiayKhamBenh/CreateGKB';
import DanhSachBenhNhan from './pages/BenhNhan/DanhSachBenhNhan';
import CreateBN from './pages/BenhNhan/CreateBN';
import QLDonThuoc from './pages/DonThuoc/QLDonThuoc';
import QLVatTu from './pages/VatTu/QLVatTu';
import CreateVT from './pages/VatTu/CreateVT';
import EditVT from './pages/VatTu/EditVT';
import CaiDat from './pages/CaiDat/CaiDat';
import CreateDT from './pages/DonThuoc/CreateDT';
import QLThuoc from './pages/Thuoc/QLThuoc';
import Hotro from './pages/HoTro/Hotro';
import CaiDatVatTu from './pages/CaiDat/CaiDatVatTu';
import TaiKhoan from './pages/TaiKhoan/TaiKhoan';
import ThemTaiKhoan from './pages/TaiKhoan/ThemTaiKhoan';
import QLVaiTro from './pages/VaiTro/QLVaiTro';
import QLXuatNhap from './pages/QLKho/QLXuatNhap';

function App() {
  return (
    <AccountProvider>
      <VatTuProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/searchpass1" element={<SearchPass1 />} />
            <Route path="/profile/searchpass2" element={<SearchPass2 />} />
            <Route path="/profile/searchpass3" element={<SearchPass3 />} />
            <Route path="/main" element={<MainPage />} />
            <Route path="/changepassword" element={<ChangePassword />} />
            <Route path="/qlgkb" element={<QLGKB />} />
            <Route path="/qlgkb/detail" element={<DetailGKB />} />
            <Route path="/qlgkb/print" element={<PrintGKB />} />
            <Route path="/qlgkb/tao" element={<CreateGKB />} />
            <Route path="/qlbenhnhan" element={<DanhSachBenhNhan />} />
            <Route path="/qlbenhnhan/tao" element={<CreateBN />} />
            <Route path="/qldonthuoc" element={<QLDonThuoc />} />
            <Route path="/qlvattu" element={<QLVatTu />} />
            <Route path="/qlvattu/tao" element={<CreateVT />} />
            <Route path="/qlvattu/sua" element={<EditVT />} />
            <Route path="/caidat" element={<CaiDat />} />
            <Route path="/qldonthuoc/tao" element={<CreateDT />} />
            <Route path="/thuoc" element={<QLThuoc />} />
            <Route path="/hotro" element={<Hotro />} />
            <Route path="/caidat/taikhoan" element={<TaiKhoan />} />
            <Route path="/caidat/taikhoan/them" element={<ThemTaiKhoan />} />
            <Route path="/caidat/vaitro" element={<QLVaiTro />} />
            <Route path="/caidat/vattu" element={<CaiDatVatTu />} />
            <Route path="/qlkho/qlxuatnhap" element={<QLXuatNhap />} />
          </Routes>
        </Router>
      </VatTuProvider>
    </AccountProvider>
  );
}

export default App;