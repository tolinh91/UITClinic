
import React from 'react';

const ChangePassword: React.FC = () => {
  return (
    <div style={ { minHeight: '100vh', minWidth: '100vw', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: '#f5f6fa' }}>
      <div style={{ flex: 1, padding: '32px 0 0 0' }}>
        <h2 style={{ color: '#2d4a7a', fontWeight: 600, marginLeft: 32 }}>Đổi mật khẩu</h2>
        <div style={{ background: '#fff', borderRadius: 12, padding: 32, margin: '32px', maxWidth: 1400, width: '100%' }}>
          <form style={{ maxWidth: 1100, margin: '0 auto', width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
              <label style={{ flex: 2, fontWeight: 500 }}>Mật khẩu hiện tại <span style={{ color: 'red' }}>*</span>:</label>
              <input type="password" placeholder="Nhập mật khẩu hiện tại" style={{ flex: 3, padding: 10, borderRadius: 4, border: '1px solid #ccc' }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
              <label style={{ flex: 2, fontWeight: 500 }}>Mật khẩu mới<span style={{ color: 'red' }}>*</span>:</label>
              <input type="password" placeholder="Nhập mật khẩu mới" style={{ flex: 3, padding: 10, borderRadius: 4, border: '1px solid #ccc' }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 32 }}>
              <label style={{ flex: 2, fontWeight: 500 }}>Xác nhận mật khẩu <span style={{ color: 'red' }}>*</span>:</label>
              <input type="password" placeholder="Nhập xác nhận mật khẩu" style={{ flex: 3, padding: 10, borderRadius: 4, border: '1px solid #ccc' }} />
            </div>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
              <button type="submit" style={{ background: '#2a5ca4', color: '#fff', border: 'none', borderRadius: 6, padding: '10px 32px', fontSize: 16, fontWeight: 500, cursor: 'pointer' }}>Lưu</button>
              <button type="button" style={{ background: '#222', color: '#fff', border: 'none', borderRadius: 6, padding: '10px 32px', fontSize: 16, fontWeight: 500, cursor: 'pointer' }}>Quay lại</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
