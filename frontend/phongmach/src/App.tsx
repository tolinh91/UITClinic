import ViewDT from './pages/DonThuoc/ViewDT';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { VatTuProvider } from './contexts/VatTuContext';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Profile_Fixed from './pages/Profile/Profile_Fixed';
import SearchPass1 from './pages/Profile/SearchPass1';
import SearchPass2 from './pages/Profile/SearchPass2';
import SearchPass3 from './pages/Profile/SearchPass3';
import MainPage from './pages/Profile/MainPage';
import ChangePassword from './pages/Profile/ChangePassword';
import EditProfile from './pages/Profile/EditProfile';
import QLGKB from './pages/GiayKhamBenh/QLGKB';
import DetailGKB from './pages/GiayKhamBenh/DetailGKB';
import EditGKB from './pages/GiayKhamBenh/EditGKB';
import PrintGKB from './pages/GiayKhamBenh/PrintGKB';
//import CreateGKB from './pages/GiayKhamBenh/CreateGKB';
import QLDonThuocCopy from './pages/DonThuoc/QLDonThuocCopy';
import EditDonThuoc from './pages/DonThuoc/EditDonThuoc';
import QLVatTu from './pages/VatTu/QLVatTu';
import CreateVatTu from './pages/VatTu/CreateVatTu';
import UpdateVatTu from './pages/VatTu/UpdateVatTu';
import CaiDat from './pages/CaiDat/CaiDat';
import QLThuoc from './pages/Thuoc/QLThuoc';
import Hotro from './pages/HoTro/Hotro';
//import CaiDatVatTu from './pages/CaiDat/CaiDatVatTu';
//import TaiKhoan from './pages/TaiKhoan/TaiKhoan';
//import ThemTaiKhoan from './pages/TaiKhoan/ThemTaiKhoan';
//import QLVaiTro from './pages/VaiTro/QLVaiTro';
import DanhSachBenhNhan from './pages/BenhNhan/DanhSachBenhNhan';
import TaoBenhNhan from './pages/BenhNhan/TaoBenhNhan';
import XoaBenhNhan from './pages/BenhNhan/XoaBenhNhan';
import EditBenhNhan from './pages/BenhNhan/EditBenhNhan';
import QLXuatNhap from './pages/QLKho/QLXuatNhap';
import AddPhieu from './pages/QLKho/AddPhieu';
import CaiDatTaiKhoan from './pages/CaiDat/CaiDatTaiKhoan';
import CaiDatVaiTro from './pages/CaiDat/CaiDatVaiTro';
import AddDrugForm from './pages/Thuoc/CreateThuoc';
import DanhSachThuoc from "./pages/Thuoc/DanhSachThuoc";
import EditThuoc from './pages/Thuoc/EditThuoc';
import PrintDT from './pages/DonThuoc/PrintDT';
// import CreateBN from './pages/BenhNhan/CreateBN';
function App() {
  return (
    <VatTuProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile_Fixed />} />
          <Route path="/profile/searchpass1" element={<SearchPass1 />} />
          <Route path="/profile/searchpass2" element={<SearchPass2 />} />
          <Route path="/profile/searchpass3" element={<SearchPass3 />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path ="/editprofile" element ={<EditProfile/>} />
          <Route path="/qlgkb" element={<QLGKB />} />
          <Route path="/qlgkb/detail" element={<DetailGKB />} />
          <Route path="/qlgkb/print" element={<PrintGKB />} />
          <Route path="/tao-benh-nhan" element={<TaoBenhNhan />} />
          <Route path="/danh-sach-benh-nhan" element={<DanhSachBenhNhan/>} />
          <Route path="/xoa-benh-nhan/:id" element={<XoaBenhNhan/>} />
          <Route path="/danh-sach-benh-nhan/edit/:id" element={<EditBenhNhan />} />
          <Route path="/viewdt/:code" element={<ViewDT />} />
          <Route path="/qlvattu" element={<QLVatTu />} />
          <Route path="/qlvattu/tao" element={<CreateVatTu />} />
          <Route path="/qlvattu/sua" element={<UpdateVatTu />} />
          <Route path="/caidat" element={<CaiDat />} />
            <Route path="/QLDonThuocCopy" element={<QLDonThuocCopy />} />
            <Route path="/QLDonThuocCopy/tao" element={<QLDonThuocCopy />} />
            <Route path="/qldonthuoc" element={<Navigate to="/QLDonThuocCopy" replace />} />
            <Route path="/qldonthuoc/tao" element={<Navigate to="/QLDonThuocCopy/tao" replace />} />
          <Route path="/thuoc" element={<QLThuoc />} />
          <Route path="/qlkho/qlxuatnhap" element={<QLXuatNhap />} />
          <Route path="/hotro" element={<Hotro />} />
          <Route path="/caidat/taikhoan" element={<CaiDatTaiKhoan />} />
          <Route path="/caidat/vaitro" element={<CaiDatVaiTro />} />
          <Route path="/thuoc/edit/:code" element={<EditDonThuoc />} />
          <Route path="/qlkho/addphieu" element={<AddPhieu />} />
          <Route path="/qlgkb/edit" element={<EditGKB />} />
          <Route path="/QLThuoc/themthuoc" element={<AddDrugForm/>} />
          <Route path="danh-sach-thuoc" element={<DanhSachThuoc />} />
          <Route path="thuoc/edit/:code" element={<EditThuoc />} />
          <Route path="/print-donthuoc/:code" element={<PrintDT />} />
        </Routes>
      </Router>
    </VatTuProvider>
  )
}
export default App;