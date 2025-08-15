import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from '../../components/Sidebar';

function Hotro() {
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
      <Sidebar activePage="Trang chủ" />
      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '24px 32px' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 28, fontWeight: 'bold', color: '#1e293b', marginBottom: 8 }}>
              Hỗ trợ kỹ thuật
            </h1>
            <p style={{ margin: 0, fontSize: 16, color: '#64748b' }}>
              Trung tâm hỗ trợ và giải đáp thắc mắc
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
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
        </div>

        {/* Content */}
        <div style={{ background: '#fff', borderRadius: 12, padding: '32px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', flex: 1 }}>
          <div style={{ textAlign: 'center', padding: '64px 0' }}>
            <div style={{ fontSize: 64, marginBottom: 24 }}>💡</div>
            <h2 style={{ fontSize: 24, fontWeight: 'bold', color: '#1e293b', marginBottom: 16 }}>
              Hỗ trợ kỹ thuật
            </h2>
            <p style={{ fontSize: 16, color: '#64748b', marginBottom: 32, maxWidth: 600, margin: '0 auto 32px' }}>
              Chúng tôi sẵn sàng hỗ trợ bạn 24/7. Vui lòng liên hệ với chúng tôi qua các kênh bên dưới.
            </p>
            
            {/* Contact Methods */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', maxWidth: 600, margin: '0 auto' }}>
              <div style={{ padding: '24px', border: '1px solid #e2e8f0', borderRadius: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: 32, marginBottom: 16 }}>📞</div>
                <h3 style={{ fontSize: 18, fontWeight: 'bold', color: '#1e293b', marginBottom: 8 }}>Hotline</h3>
                <p style={{ fontSize: 16, color: '#3b82f6', fontWeight: '500' }}>0902334456</p>
              </div>
              
              <div style={{ padding: '24px', border: '1px solid #e2e8f0', borderRadius: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: 32, marginBottom: 16 }}>📧</div>
                <h3 style={{ fontSize: 18, fontWeight: 'bold', color: '#1e293b', marginBottom: 8 }}>Email</h3>
                <p style={{ fontSize: 16, color: '#3b82f6', fontWeight: '500' }}>support@uitclinic.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hotro;
