import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import appIcon from '../../assets/appicon.png';
import forgotPasswordImage from '../../assets/forgot-password.jpg';

const SearchPass2: React.FC = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (index: number, value: string) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      // Auto focus next
      if (value && index < 5) {
        const next = document.getElementById(`otp-${index + 1}`);
        if (next) (next as HTMLInputElement).focus();
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.join('') === '000000') {
      setError('');
      navigate('/profile/searchpass3');
    } else {
      setError('Mã xác nhận không đúng');
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
                <span style={{ width: 28, height: 28, borderRadius: '50%', background: '#1ca85c', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: 18 }}>2</span>
                <span style={{ width: 32, height: 2, background: '#2176c1', margin: '0 2px' }}></span>
                <span style={{ width: 28, height: 28, borderRadius: '50%', background: '#2176c1', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: 18 }}>3</span>
              </div>
            </div>
            <div style={{ width: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
              <img src={appIcon} alt="logo" style={{ width: 60, borderRadius: '50%', background: '#fff', objectFit: 'cover', aspectRatio: '1/1' }} />
            </div>
          </div>
          <div style={{ padding: '32px 32px 0 32px', flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{ background: '#eaf7e7', color: '#222', borderRadius: 6, padding: '12px 0', textAlign: 'center', fontSize: 18, marginBottom: 18 }}>
              Mã xác nhận đã được gửi đến email của bạn.<br />Vui lòng kiểm tra hộp thư.
            </div>
            <div style={{ textAlign: 'center', color: '#444', fontSize: 17, marginBottom: 18 }}>
              Vui lòng nhập mã xác nhận gồm 6 chữ số đã<br />được gửi đến email của bạn
            </div>
            <form onSubmit={handleSubmit} style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 18 }}>
                {otp.map((v, i) => (
                  <input
                    key={i}
                    id={`otp-${i}`}
                    type="text"
                    maxLength={1}
                    value={v}
                    onChange={e => handleChange(i, e.target.value)}
                    style={{ width: 48, height: 48, fontSize: 28, textAlign: 'center', borderRadius: 8, border: '1px solid #bbb', background: '#fff' }}
                  />
                ))}
              </div>
              <div style={{ textAlign: 'center', marginBottom: 18, color: '#222', fontSize: 15 }}>
                Không nhận được mã? <span style={{ color: '#2176c1', cursor: 'pointer', textDecoration: 'underline' }}>Gửi lại</span>
              </div>
              {error && <div style={{ color: 'red', marginBottom: 12, fontWeight: 500, textAlign: 'center' }}>{error}</div>}
              <div style={{ marginTop: 'auto' }}>
                <button type="submit" style={{ width: '100%', background: '#2a5ca4', color: '#fff', border: 'none', borderRadius: 6, padding: '12px 0', fontWeight: 500, fontSize: 18, cursor: 'pointer', marginBottom: 12 }}>Xác nhận mã</button>
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
    </div>
  );
};

export default SearchPass2;
