import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from '../../components/Sidebar';
import { useAccountContext } from '../../contexts/AccountContext';
import appIcon from '../../assets/appicon.png';

function ThemTaiKhoan() {
  const navigate = useNavigate();
  const { addAccount } = useAccountContext();
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    userId: "",
    hoVaTen: "",
    email: "",
    truongDaiHoc: "",
    vaiTro: "",
    matKhau: "",
    xacNhanMatKhau: "",
    cccd: "",
    gioiTinh: "Nam",
    ngaySinh: "",
    soDienThoai: "",
    diaChi: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    // Validate form data
    if (!formData.userId || !formData.hoVaTen || !formData.email || !formData.matKhau) {
      alert("Vui lòng điền đầy đủ thông tin bắt buộc");
      return;
    }

    if (formData.matKhau !== formData.xacNhanMatKhau) {
      alert("Mật khẩu xác nhận không khớp");
      return;
    }

    // Create new account object matching the Account interface
    const newAccount = {
      ma: formData.userId,
      hoVaTen: formData.hoVaTen,
      anhDaiDien: "",
      vaiTro: formData.vaiTro,
      cccd: formData.cccd,
      email: formData.email,
      gioiTinh: formData.gioiTinh,
      soDienThoai: formData.soDienThoai,
      ngaySinh: formData.ngaySinh,
      diaChi: formData.diaChi,
      truongDaiHoc: formData.truongDaiHoc,
      chuyenNganh: "",
      hanhDong: ""
    };

    // Add account using context
    addAccount(newAccount);
    
    alert("Thêm tài khoản thành công!");
    navigate('/caidat/taikhoan');
  };

  const handleCancel = () => {
    navigate('/caidat/taikhoan');
  };

  return (
    <div style={{ minHeight: '100vh', width: '100vw', display: 'flex', background: '#f5f6fa' }}>
      {/* Sidebar */}
      <Sidebar activePage="Cài đặt" />
      
      {/* Main content */}
      <div style={{ flex: 1, padding: '32px 0 0 0', minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        {/* Top right menu */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 16, flexWrap: 'wrap', padding: '0 32px' }}>
          <img src={appIcon} alt="logo" style={{ width: 40, borderRadius: '50%' }} />
          <span style={{ fontWeight: 500, fontSize: 18, color: '#2d4a7a' }}>Mạnh</span>
          <div style={{ position: 'relative' }}>
            <button
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18 }}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              ▼
            </button>
            {menuOpen && (
              <div style={{ position: 'absolute', right: 0, top: 32, background: '#fff', boxShadow: '0 2px 8px #0002', borderRadius: 8, minWidth: 220, zIndex: 10 }}>
                <div onClick={() => navigate('/profile')}
                  style={{ padding: '12px 28px', cursor: 'pointer', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', gap: 12, whiteSpace: 'nowrap' }}>
                  <span>👤</span> Thông tin cá nhân
                </div>
                <div onClick={() => navigate('/changepassword')}
                  style={{ padding: '12px 28px', cursor: 'pointer', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', gap: 12, whiteSpace: 'nowrap' }}>
                  <span>🔑</span> Đổi mật khẩu
                </div>
                <div onClick={() => navigate('/login')}
                  style={{ padding: '12px 28px', cursor: 'pointer', color: 'red', display: 'flex', alignItems: 'center', gap: 12, whiteSpace: 'nowrap' }}>
                  <span>⏻</span> Thoát
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Form */}
        <div style={{ background: '#fff', borderRadius: 16, margin: '0 32px', padding: '32px', boxShadow: '0 2px 12px #0001', maxWidth: 1200, alignSelf: 'center', width: '100%' }}>
          <div style={{ fontSize: '2rem', fontWeight: 600, marginBottom: 24, color: '#2d4a7a' }}>Thêm tài khoản</div>
          
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 16, color: '#333' }}>Điền đầy đủ thông tin bên dưới</div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            {/* Left Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>User ID</label>
                <input
                  type="text"
                  value={formData.userId}
                  onChange={(e) => handleInputChange('userId', e.target.value)}
                  placeholder="User ID"
                  style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: 8, fontSize: 16 }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Email"
                  style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: 8, fontSize: 16 }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>Trường đại học - chuyên ngành</label>
                <input
                  type="text"
                  value={formData.truongDaiHoc}
                  onChange={(e) => handleInputChange('truongDaiHoc', e.target.value)}
                  placeholder="Nhập chuyên ngành"
                  style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: 8, fontSize: 16 }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>Vai trò</label>
                <select
                  value={formData.vaiTro}
                  onChange={(e) => handleInputChange('vaiTro', e.target.value)}
                  style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: 8, fontSize: 16 }}
                >
                  <option value="">Chọn vai trò</option>
                  <option value="TPK">TPK</option>
                  <option value="Bác sĩ">Bác sĩ</option>
                  <option value="Y tá">Y tá</option>
                  <option value="Lễ tân">Lễ tân</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>Mật khẩu</label>
                <input
                  type="password"
                  value={formData.matKhau}
                  onChange={(e) => handleInputChange('matKhau', e.target.value)}
                  placeholder="Nhập mật khẩu"
                  style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: 8, fontSize: 16 }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>Xác nhận mật khẩu</label>
                <input
                  type="password"
                  value={formData.xacNhanMatKhau}
                  onChange={(e) => handleInputChange('xacNhanMatKhau', e.target.value)}
                  placeholder="Nhập xác nhận mật khẩu"
                  style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: 8, fontSize: 16 }}
                />
              </div>
            </div>

            {/* Right Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>Họ và tên</label>
                <input
                  type="text"
                  value={formData.hoVaTen}
                  onChange={(e) => handleInputChange('hoVaTen', e.target.value)}
                  placeholder="Họ và tên"
                  style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: 8, fontSize: 16 }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>CCCD</label>
                <input
                  type="text"
                  value={formData.cccd}
                  onChange={(e) => handleInputChange('cccd', e.target.value)}
                  placeholder="Gồm 12 chữ số"
                  style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: 8, fontSize: 16 }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>Giới tính</label>
                <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <input
                      type="radio"
                      name="gioiTinh"
                      value="Nam"
                      checked={formData.gioiTinh === "Nam"}
                      onChange={(e) => handleInputChange('gioiTinh', e.target.value)}
                    />
                    Nam
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <input
                      type="radio"
                      name="gioiTinh"
                      value="Nữ"
                      checked={formData.gioiTinh === "Nữ"}
                      onChange={(e) => handleInputChange('gioiTinh', e.target.value)}
                    />
                    Nữ
                  </label>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>Ngày sinh</label>
                <input
                  type="date"
                  value={formData.ngaySinh}
                  onChange={(e) => handleInputChange('ngaySinh', e.target.value)}
                  placeholder="Chọn ngày sinh"
                  style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: 8, fontSize: 16 }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>Số điện thoại</label>
                <input
                  type="tel"
                  value={formData.soDienThoai}
                  onChange={(e) => handleInputChange('soDienThoai', e.target.value)}
                  placeholder="Số điện thoại"
                  style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: 8, fontSize: 16 }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>Địa chỉ</label>
                <input
                  type="text"
                  value={formData.diaChi}
                  onChange={(e) => handleInputChange('diaChi', e.target.value)}
                  placeholder="Địa chỉ"
                  style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: 8, fontSize: 16 }}
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: 16, justifyContent: 'flex-end', marginTop: 32 }}>
            <button
              type="button"
              onClick={handleCancel}
              style={{ 
                background: '#6c757d', 
                color: '#fff', 
                border: 'none', 
                borderRadius: 8, 
                padding: '12px 24px', 
                fontWeight: 500, 
                fontSize: 16, 
                cursor: 'pointer' 
              }}
            >
              Quay lại
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              style={{ 
                background: '#1ec9a4', 
                color: '#fff', 
                border: 'none', 
                borderRadius: 8, 
                padding: '12px 24px', 
                fontWeight: 500, 
                fontSize: 16, 
                cursor: 'pointer' 
              }}
            >
              Thêm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThemTaiKhoan;
