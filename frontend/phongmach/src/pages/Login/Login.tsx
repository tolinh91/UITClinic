// ...existing code from Login.tsx...
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import appIcon from '../../assets/appicon.png';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Fake check: email 'admin' and password '1234' are correct
    if (email === 'admin@gmail.com' && password === '1234') {
      setError('');
      setSuccess(true);
      setTimeout(() => {
        navigate('/main');
      }, 1200);
    } else {
      setError('Vui lòng kiểm tra lại tài khoản hoặc mật khẩu!');
    }
  };

  return (
    <div style={{ minHeight: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: '#f4f4f4' }}>
      <div style={{ width: 400, background: '#fff', borderRadius: 10, boxShadow: '0 2px 8px #0001' }}>
        <div style={{ background: '#e3ecfa', borderTopLeftRadius: 10, borderTopRightRadius: 10, padding: 20, textAlign: 'center' }}>
          <h2 style={{ margin: 0, color: '#2d4a7a', fontWeight: 400 }}>Chào mừng đến với UIT CLINIC!</h2>
          <img src={appIcon} alt="logo" style={{ width: 60, marginTop: 10, borderRadius: '50%', objectFit: 'cover', aspectRatio: '1/1', background: '#fff' }} />
        </div>
        <form style={{ padding: 24 }} onSubmit={handleSubmit}>
          <label style={{ fontWeight: 500 }}>Email</label>
          <input type="email" placeholder="Nhập email" value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', margin: '8px 0 16px 0', padding: 8, borderRadius: 4, border: '1px solid #ccc' }} />
          <label style={{ fontWeight: 500 }}>Mật khẩu</label>
          <input type="password" placeholder="Nhập mật khẩu" value={password} onChange={e => setPassword(e.target.value)} style={{ width: '100%', margin: '8px 0 16px 0', padding: 8, borderRadius: 4, border: '1px solid #ccc' }} />
          {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
          {success && <div style={{ color: 'green', marginBottom: 12, fontWeight: 500 }}>Đăng nhập thành công</div>}
          <button type="submit" style={{ width: '100%', background: '#2d4a7a', color: '#fff', border: 'none', borderRadius: 4, padding: 12, fontWeight: 500, fontSize: 16, cursor: 'pointer' }}>Đăng nhập</button>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
            <Link to="/register" style={{ textDecoration: 'none', color: '#222', fontWeight: 500 }}> <span role="img" aria-label="user">👤</span> Tạo tài khoản</Link>
            <span>
              <Link to="/profile/searchpass1" style={{ textDecoration: 'underline', color: '#222', fontWeight: 500 }}>
                <span role="img" aria-label="lock">🔒</span> Quên mật khẩu
              </Link>
            </span>
          </div>
        </form>
      </div>
      <div style={{ marginTop: 24, color: '#222', fontSize: 15, textAlign: 'center' }}>
        <div><span role="img" aria-label="mail">✉️</span> MDLT.UITclinic@gmail.com</div>
        <div><span role="img" aria-label="phone">📞</span> 0338056274</div>
      </div>
    </div>
  );
}

export default Login;
