import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import appIcon from '../../assets/appicon.png';
import forgotPasswordImage from '../../assets/forgot-password.jpg';

const SearchPass1: React.FC = () => {
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Luôn báo đã gửi mã xác nhận
    setMessage('✅ Đã gửi mã xác nhận qua email.');
  };

  const handleVerifyCode = () => {
    if (code.trim() === '0678') {
      navigate('/ChangePassword');
    } else {
      setMessage('❌ Mã xác nhận không đúng.');
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
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', background: '#dbe6f7', justifyContent: 'space-between', height: 80 }}>
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
              <label style={{ fontWeight: 500 }}>Username</label>
              <input type="text" value={userId} onChange={e => setUserId(e.target.value)} placeholder="Điền tên đăng nhập." style={{ width: '100%', marginTop: 8, padding: 10, borderRadius: 6, border: 'none', background: '#e0ecf7', fontSize: 16, color: '#888' }} />
            </div>
            <div style={{ marginBottom: 18 }}>
              <label style={{ fontWeight: 500 }}>Email đăng ký</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Điền email đã đăng kí." style={{ width: '100%', marginTop: 8, padding: 10, borderRadius: 6, border: 'none', background: '#e0ecf7', fontSize: 16, color: '#888' }} />
            </div>
            {message && <div style={{ color: message.includes('❌') ? 'red' : 'green', marginBottom: 12, fontWeight: 500 }}>{message}</div>}
            <div style={{ marginTop: 'auto' }}>
              <button type="submit" style={{ width: '100%', background: '#2a5ca4', color: '#fff', border: 'none', borderRadius: 6, padding: '12px 0', fontWeight: 500, fontSize: 18, cursor: 'pointer', marginBottom: 12 }}>Gửi mã xác nhận</button>
            </div>
          </form>

          {/* Nhập mã xác nhận */}
          <div style={{ padding: '0 32px 16px' }}>
            <input 
              type="text" 
              value={code} 
              onChange={e => setCode(e.target.value)} 
              placeholder="Nhập mã xác nhận" 
              style={{ width: '100%', marginTop: 8, padding: 10, borderRadius: 6, border: '1px solid #ccc', fontSize: 16 }}
            />

            {/* Nút chia đều 2 bên */}
            <div 
              style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                gap: '10px', 
                marginTop: 12 
              }}
            >
              <button 
                type="button" 
                style={{ flex: 1, background: '#1ca85c', color: '#fff', border: 'none', borderRadius: 6, padding: '12px 0', fontWeight: 500, fontSize: 18, cursor: 'pointer' }} 
                onClick={handleVerifyCode}
              >
                Xác nhận
              </button>
              <button 
                type="button" 
                style={{ flex: 1, background: '#aaa', color: '#fff', border: 'none', borderRadius: 6, padding: '12px 0', fontWeight: 500, fontSize: 18, cursor: 'pointer' }} 
                onClick={() => navigate('/login')}
              >
                Quay lại
              </button>
            </div>
          </div>

          <div style={{ textAlign: 'center', padding: '8px 32px 8px', color: '#222', fontSize: 12, marginTop: 'auto' }}>
            <div>
              <span style={{ marginRight: 16 }}>✉️ uitclinic@uit.edu.vn</span>
              <span>📞 (028) 372 52002</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPass1;