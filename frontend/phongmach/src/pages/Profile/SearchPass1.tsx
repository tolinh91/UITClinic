import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import appIcon from '../../assets/appicon.png';
import forgotPasswordImage from '../../assets/forgot-password.jpg';

const SearchPass1: React.FC = () => {
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userId === 'admin@gmail.com' && email === 'admin@gmail.com') {
      setError('');
      navigate('/profile/searchpass2');
    } else {
      setError('Tài khoản không tồn tại');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#f5f6fa',
        padding: '20px'
      }}
    >
      <div
        style={{
          display: 'flex',
          width: '800px',
          height: '500px',
          background: '#fff',
          borderRadius: 10,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
          overflow: 'hidden'
        }}
      >
        {/* Left side - Image */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f8f9fa',
            padding: '40px'
          }}
        >
          <img 
            src={forgotPasswordImage} 
            alt="Forgot Password" 
            style={{
              maxWidth: '80%',
              maxHeight: '80%',
              objectFit: 'contain',
              borderRadius: '8px'
            }}
          />
        </div>
        
        {/* Right side - Form */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', background: '#dbe6f7', padding: '0', justifyContent: 'space-between', height: 80 }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <div style={{ fontSize: 22, color: '#2a5ca4', fontWeight: 500, marginTop: 16 }}>Quên mật khẩu</div>
              <div style={{ display: 'flex', alignItems: 'center', marginTop: 8 }}>
                <span style={{ width: 28, height: 28, borderRadius: '50%', background: '#1ca85c', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: 18 }}>1</span>
                <span style={{ width: 32, height: 2, background: '#1ca85c', margin: '0 2px' }}></span>
                <span style={{ width: 28, height: 28, borderRadius: '50%', background: '#2176c1', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: 18 }}>2</span>
                <span style={{ width: 32, height: 2, background: '#2176c1', margin: '0 2px' }}></span>
                <span style={{ width: 28, height: 28, borderRadius: '50%', background: '#2176c1', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: 18 }}>3</span>
              </div>
            </div>
            <div style={{ width: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
              <img src={appIcon} alt="logo" style={{ width: 60, borderRadius: '50%', background: '#fff', objectFit: 'cover', aspectRatio: '1/1' }} />
            </div>
          </div>
          <form style={{ padding: '32px 32px 0 32px', flex: 1, display: 'flex', flexDirection: 'column' }} onSubmit={handleSubmit}>
            <div style={{ marginBottom: 18 }}>
              <label style={{ fontWeight: 500 }}>User ID</label>
              <input type="text" value={userId} onChange={e => setUserId(e.target.value)} placeholder="Điền tên đăng nhập." style={{ width: '100%', marginTop: 8, padding: 10, borderRadius: 6, border: 'none', background: '#e0ecf7', fontSize: 16, color: '#888' }} />
            </div>
            <div style={{ marginBottom: 18 }}>
              <label style={{ fontWeight: 500 }}>Email đăng ký</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Điền email đã đăng kí." style={{ width: '100%', marginTop: 8, padding: 10, borderRadius: 6, border: 'none', background: '#e0ecf7', fontSize: 16, color: '#888' }} />
            </div>
            {error && <div style={{ color: 'red', marginBottom: 12, fontWeight: 500 }}>{error}</div>}
            <div style={{ marginTop: 'auto' }}>
              <button type="submit" style={{ width: '100%', background: '#2a5ca4', color: '#fff', border: 'none', borderRadius: 6, padding: '12px 0', fontWeight: 500, fontSize: 18, cursor: 'pointer', marginBottom: 12 }}>Gửi mã xác nhận</button>
              <button type="button" style={{ width: '100%', background: '#aaa', color: '#fff', border: 'none', borderRadius: 6, padding: '12px 0', fontWeight: 500, fontSize: 18, cursor: 'pointer' }} onClick={() => navigate('/login')}>Quay lại</button>
            </div>
          </form>
          <div style={{ textAlign: 'center', padding: '16px 32px 24px', color: '#222', fontSize: 12 }}>
            <div>
              <span style={{ marginRight: 16 }}><span role="img" aria-label="mail">✉️</span> uitclinic@uit.edu.vn</span>
              <span><span role="img" aria-label="phone">📞</span> (028) 372 52002</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPass1;
