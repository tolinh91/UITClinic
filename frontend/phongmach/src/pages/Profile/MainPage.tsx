import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import appIcon from '../../assets/appicon.png';
import Sidebar from '../../components/Sidebar';

function MainPage() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuSelect = (option: string) => {
    setMenuOpen(false);
    if (option === "Thông tin cá nhân") navigate("/profile");
    else if (option === "Đổi mật khẩu") navigate("/changepassword");
    else if (option === "Thoát") navigate("/login");
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        background: '#f4f4f4',
      }}
    >
      {/* Sidebar */}
      <Sidebar activePage="Trang chủ" />
      {/* Main content */}
      <div
        style={{
          flex: 1,
          padding: '32px 16px 0 16px',
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            gap: 16,
            flexWrap: 'wrap',
          }}
        >
          <img src={appIcon} alt="logo" style={{ width: 40, borderRadius: '50%' }} />
          <span style={{ fontWeight: 500, fontSize: 18, color: '#2d4a7a' }}>Admin</span>
          <div style={{ position: 'relative' }}>
            <button
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18 }}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              ▼
            </button>
            {menuOpen && (
              <div style={{ position: 'absolute', right: 0, top: 32, background: '#fff', boxShadow: '0 2px 8px #0002', borderRadius: 8, minWidth: 220, zIndex: 10 }}>
                <div onClick={() => handleMenuSelect('Thông tin cá nhân')}
                  style={{ padding: '12px 28px', cursor: 'pointer', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', gap: 12, whiteSpace: 'nowrap' }}>
                  <span>👤</span> Thông tin cá nhân
                </div>
                <div onClick={() => handleMenuSelect('Đổi mật khẩu')}
                  style={{ padding: '12px 28px', cursor: 'pointer', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', gap: 12, whiteSpace: 'nowrap' }}>
                  <span>🔑</span> Đổi mật khẩu
                </div>
                <div onClick={() => handleMenuSelect('Thoát')}
                  style={{ padding: '12px 28px', cursor: 'pointer', color: 'red', display: 'flex', alignItems: 'center', gap: 12, whiteSpace: 'nowrap' }}>
                  <span>⏻</span> Thoát
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Main content area */}
        <div style={{ marginTop: 32 }}>
          <h2 style={{ color: '#2d4a7a', fontWeight: 500, fontSize: '1.3rem', marginBottom: 16 }}>Trang chủ</h2>
          <div
            style={{
              background: '#fff',
              borderRadius: 12,
              padding: '18px 12px',
              boxShadow: '0 2px 8px #0001',
              marginBottom: 16,
              maxWidth: 400,
              minWidth: 220,
              width: '100%',
              display: 'inline-block',
            }}
          >
            <div style={{ fontSize: 18, fontWeight: 500, color: '#2d4a7a', marginBottom: 8 }}>Chào mừng trở lại!</div>
            <div style={{ marginTop: 8, display: 'flex', gap: 32, flexWrap: 'wrap' }}>
              <div>ID: Admin</div>
              <div>Vai trò: Quản trị viên</div>
            </div>
          </div>
          {/* Các card thống kê */}
          <div
            style={{
              display: 'flex',
              gap: 24,
              marginTop: 8,
              flexWrap: 'wrap',
            }}
          >
            <div style={{ background: '#fff', borderRadius: 10, padding: 18, minWidth: 160, boxShadow: '0 2px 8px #0001', textAlign: 'center', flex: '1 1 160px', marginBottom: 12 }}>
              <div style={{ fontWeight: 500 }}>Giấy khám bệnh</div>
              <div style={{ fontSize: 22, fontWeight: 700, margin: '8px 0' }}>10</div>
              <span style={{ fontSize: 22, color: '#bfc8d8' }}>📄</span>
            </div>
            <div style={{ background: '#fff', borderRadius: 10, padding: 18, minWidth: 160, boxShadow: '0 2px 8px #0001', textAlign: 'center', flex: '1 1 160px', marginBottom: 12 }}>
              <div style={{ fontWeight: 500 }}>Đơn thuốc</div>
              <div style={{ fontSize: 22, fontWeight: 700, margin: '8px 0' }}>10</div>
              <span style={{ fontSize: 22, color: '#bfc8d8' }}>📝</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
