import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from '../../components/Sidebar';

function ThanhToan() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuSelect = (option: string) => {
    setMenuOpen(false);
    if (option === "Thông tin cá nhân") navigate("/profile");
    else if (option === "Đổi mật khẩu") navigate("/changepassword");
    else if (option === "Thoát") navigate("/login");
  };

  return (
    <div style={{ minHeight: '100vh', width: '100vw', display: 'flex', background: '#f5f6fa', position: 'relative' }}>
      {/* Sidebar */}
      <Sidebar activePage="Thanh toán" />

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '24px 32px' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 28, fontWeight: 'bold', color: '#1e293b', marginBottom: 8 }}>
              Thanh toán
            </h1>
            <p style={{ margin: 0, fontSize: 16, color: '#64748b' }}>
              Quản lý thanh toán và hóa đơn
            </p>
          </div>
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                background: '#fff',
                border: '1px solid #e2e8f0',
                borderRadius: '50%',
                width: 48,
                height: 48,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: 'bold',
                color: '#1e293b'
              }}
            >
              Mạnh
            </button>
            {menuOpen && (
              <div style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                marginTop: 8,
                background: '#fff',
                border: '1px solid #e2e8f0',
                borderRadius: 8,
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                zIndex: 1000,
                minWidth: 160
              }}>
                {["Thông tin cá nhân", "Đổi mật khẩu", "Thoát"].map(option => (
                  <div
                    key={option}
                    onClick={() => handleMenuSelect(option)}
                    style={{
                      padding: '12px 16px',
                      cursor: 'pointer',
                      fontSize: 14,
                      color: '#374151',
                      borderBottom: option !== "Thoát" ? '1px solid #f3f4f6' : 'none'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.background = '#f9fafb'}
                    onMouseOut={(e) => e.currentTarget.style.background = '#fff'}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div style={{ background: '#fff', borderRadius: 12, padding: '32px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', flex: 1 }}>
          <div style={{ textAlign: 'center', padding: '64px 0' }}>
            <div style={{ fontSize: 64, marginBottom: 24 }}>💰</div>
            <h2 style={{ fontSize: 24, fontWeight: 'bold', color: '#1e293b', marginBottom: 16 }}>
              Quản lý thanh toán
            </h2>
            <p style={{ fontSize: 16, color: '#64748b', marginBottom: 32, maxWidth: 600, margin: '0 auto 32px' }}>
              Tính năng quản lý thanh toán đang được phát triển.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThanhToan;
