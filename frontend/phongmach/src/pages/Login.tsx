import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import appIcon from '../assets/appicon.png';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [forgotPasswordClicked, setForgotPasswordClicked] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Fake check: email 'admin' and password '1234' are correct
    if (email === 'admin@gmail.com' && password === '1234') {
      setError('');
      navigate('/main');
    } else {
      setError('Sai tài khoản hoặc mật khẩu!');
    }
  };

  const handleForgotPassword = () => {
    setForgotPasswordClicked(true);
    // Thêm hiệu ứng click bằng cách thay đổi style tạm thời
    setTimeout(() => {
      setForgotPasswordClicked(false);
      navigate('/profile/searchpass1');
    }, 300); // Tăng thời gian hiệu ứng lên 300ms để rõ ràng hơn
  };

  return (
    <div style={{ minHeight: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: '#f4f4f4' }}>
      <div style={{ width: 400, background: '#fff', borderRadius: 10, boxShadow: '0 2px 8px #0001' }}>
        <div style={{ background: '#e3ecfa', borderTopLeftRadius: 10, borderTopRightRadius: 10, padding: 20, textAlign: 'center' }}>
          <h2 style={{ margin: 0, color: '#2d4a7a', fontWeight: 400 }}>Chào mừng đến với MDLT CLINIC!</h2>
          <img src={appIcon} alt="logo" style={{ width: 60, marginTop: 10 }} />
        </div>
        <form style={{ padding: 24 }} onSubmit={handleSubmit}>
          <label style={{ fontWeight: 500 }}>Email</label>
          <input type="email" placeholder="Nhập email" value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', margin: '8px 0 16px 0', padding: 8, borderRadius: 4, border: '1px solid #ccc' }} />
          <label style={{ fontWeight: 500 }}>Mật khẩu</label>
          <input type="password" placeholder="Nhập mật khẩu" value={password} onChange={e => setPassword(e.target.value)} style={{ width: '100%', margin: '8px 0 16px 0', padding: 8, borderRadius: 4, border: '1px solid #ccc' }} />
          {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
          <button type="submit" style={{ width: '100%', background: '#2d4a7a', color: '#fff', border: 'none', borderRadius: 4, padding: 12, fontWeight: 500, fontSize: 16, cursor: 'pointer' }}>Đăng nhập</button>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
            {/* <Link to="/register" style={{ textDecoration: 'none', color: '#222', fontWeight: 500 }}> <span role="img" aria-label="user">👤</span> Tạo tài khoản</Link> */}
            <button 
              onClick={handleForgotPassword}
              style={{ 
                background: 'none', 
                border: forgotPasswordClicked ? '2px solid #2d4a7a' : '2px solid transparent', 
                textDecoration: 'none', 
                color: forgotPasswordClicked ? '#fff' : '#2d4a7a', 
                fontWeight: 600, 
                cursor: 'pointer',
                transform: forgotPasswordClicked ? 'scale(0.95)' : 'scale(1)',
                transition: 'all 0.3s ease',
                padding: '8px 16px',
                borderRadius: '8px',
                backgroundColor: forgotPasswordClicked ? '#2d4a7a' : '#e3ecfa',
                boxShadow: forgotPasswordClicked ? '0 4px 12px rgba(45, 74, 122, 0.3)' : '0 2px 4px rgba(0,0,0,0.1)',
                fontSize: '14px'
              }}
              onMouseEnter={(e) => {
                if (!forgotPasswordClicked) {
                  e.currentTarget.style.backgroundColor = '#d4e6f7';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }
              }}
              onMouseLeave={(e) => {
                if (!forgotPasswordClicked) {
                  e.currentTarget.style.backgroundColor = '#e3ecfa';
                  e.currentTarget.style.transform = 'scale(1)';
                }
              }}
            >
              <span role="img" aria-label="lock">🔒</span> Quên mật khẩu
            </button>
          </div>
        </form>
      </div>
      <div style={{ marginTop: 24, color: '#222', fontSize: 15, textAlign: 'center' }}>
        <div><span role="img" aria-label="mail">✉️</span> uitclinic@uit.edu.vn</div>
        <div><span role="img" aria-label="phone">📞</span> (028) 372 52002</div>
      </div>
    </div>
  );
}

export default Login;