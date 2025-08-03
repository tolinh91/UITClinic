import React from 'react';
import './Profile.css';

const Profile: React.FC = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f5f6fa' }}>
      {/* Sidebar */}
      <aside style={{ width: 250, background: '#43536b', color: '#fff', padding: '24px 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img src="/logo.png" alt="Logo" style={{ width: 120, borderRadius: '50%', marginBottom: 16 }} />
        <nav style={{ width: '100%' }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li style={{ padding: '12px 32px', display: 'flex', alignItems: 'center', gap: 12 }}><span role="img" aria-label="home">🏠</span> Trang chủ</li>
            <li style={{ padding: '12px 32px', display: 'flex', alignItems: 'center', gap: 12 }}><span role="img" aria-label="exam">📄</span> Giấy khám bệnh</li>
            <li style={{ padding: '12px 32px', display: 'flex', alignItems: 'center', gap: 12 }}><span role="img" aria-label="patient">🧑‍⚕️</span> Bệnh nhân</li>
            <li style={{ padding: '12px 32px', display: 'flex', alignItems: 'center', gap: 12 }}><span role="img" aria-label="prescription">💊</span> Đơn thuốc</li>
            <li style={{ padding: '12px 32px', display: 'flex', alignItems: 'center', gap: 12 }}><span role="img" aria-label="medicine">🩺</span> Thuốc</li>
            <li style={{ padding: '12px 32px', display: 'flex', alignItems: 'center', gap: 12 }}><span role="img" aria-label="supply">🔔</span> Vật tư</li>
            <li style={{ padding: '12px 32px', display: 'flex', alignItems: 'center', gap: 12 }}><span role="img" aria-label="settings">⚙️</span> Cài đặt</li>
          </ul>
        </nav>
      </aside>
      {/* Main Content */}
      <main style={{ flex: 1, padding: '32px 0 0 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 32px' }}>
          <div style={{ fontSize: '1.4rem', fontWeight: 600 }}>Thông tin cá nhân</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <img src="/logo.png" alt="Logo" style={{ width: 40, borderRadius: '50%' }} />
            <span style={{ fontWeight: 500 }}>Mạnh</span>
            <span style={{ fontSize: 18 }}>▼</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 32, marginTop: 32, padding: '0 32px' }}>
          {/* Welcome Card */}
          <section style={{ background: '#e8f0fc', borderRadius: 12, padding: 24, flex: '0 0 340px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src="/logo.png" alt="Avatar" style={{ width: 100, borderRadius: '50%' }} />
            <div style={{ marginTop: 12, fontWeight: 600, fontSize: 18 }}>Mạnh</div>
            <div style={{ marginTop: 8, background: '#222', color: '#fff', borderRadius: 6, padding: '2px 12px', fontSize: 14 }}>Trưởng phòng khám</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: 18 }}>
              <div style={{ textAlign: 'center', flex: 1 }}>
                <div style={{ fontSize: 14, color: '#888' }}>Mã</div>
                <div style={{ fontWeight: 500 }}>TPK</div>
              </div>
              <div style={{ textAlign: 'center', flex: 1 }}>
                <div style={{ fontSize: 14, color: '#888' }}>Giới tính</div>
                <div style={{ fontWeight: 500 }}>Nam</div>
              </div>
            </div>
            <div style={{ marginTop: 18, color: '#2a5ca4', fontWeight: 500, fontSize: 18 }}>Chào mừng trở lại!</div>
          </section>
          {/* Info Card */}
          <section style={{ background: '#fff', borderRadius: 12, padding: 24, flex: 1, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 18 }}>Thông tin cá nhân</div>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 24 }}>
              <tbody>
                <tr><td style={{ padding: '8px 0', color: '#222', width: 180 }}>Họ và tên:</td><td>Mạnh</td></tr>
                <tr><td style={{ padding: '8px 0', color: '#222' }}>CCCD:</td><td>12 chữ số</td></tr>
                <tr><td style={{ padding: '8px 0', color: '#222' }}>Email:</td><td>levanmanh@gmail.com</td></tr>
                <tr>
                  <td style={{ padding: '8px 0', color: '#222' }}>Ngày sinh / Số điện thoại:</td>
                  <td>1/1/2002 / 10 chữ số</td>
                </tr>
                <tr><td style={{ padding: '8px 0', color: '#222' }}>Địa chỉ</td><td>Đường 1, Thủ Đức</td></tr>
                <tr><td style={{ padding: '8px 0', color: '#222' }}>Trường đại học – chuyên ngành</td><td>UTE – Quản lý công nghiệp</td></tr>
              </tbody>
            </table>
            <div style={{ textAlign: 'right' }}>
              <button style={{ background: '#2a5ca4', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 32px', fontSize: 16, fontWeight: 500, cursor: 'pointer' }}>Chỉnh sửa</button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Profile;
