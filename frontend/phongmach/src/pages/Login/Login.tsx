// ...existing code from Login.tsx...
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import appIcon from '../../assets/appicon.png';
import loginBackground from '../../assets/login-background.jpg';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');
  setSuccess(false);

  try {
    const response = await fetch('http://127.0.0.1:8000/api/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    const text = await response.text();
    try {
      const data = JSON.parse(text);

      if (response.ok) {
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);

        setSuccess(true);
        setTimeout(() => {
          navigate('/main');
        }, 1000);
      } else {
        setError(data.detail || 'Đăng nhập thất bại.');
      }
    } catch (jsonErr) {
      console.error("Phản hồi không phải JSON:", text);
      setError('Máy chủ trả về dữ liệu không hợp lệ.');
    }
  } catch (err) {
    setError('Không thể kết nối máy chủ.');
    console.error('Login error:', err);
  }
};

  return (
    <div style={{ 
      minHeight: '100vh', 
      width: '100vw', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center', 
      // Sử dụng ảnh login-background.jpg làm hình nền
      backgroundImage: `url(${loginBackground})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      position: 'relative'
    }}>
      {/* Overlay để làm mờ background nếu cần */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        zIndex: 1
      }}></div>
      
      <div style={{ 
        width: 400, 
        background: '#fff', 
        borderRadius: 10, 
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
        position: 'relative',
        zIndex: 2
      }}>
        <div style={{ background: '#e3ecfa', borderTopLeftRadius: 10, borderTopRightRadius: 10, padding: 20, textAlign: 'center' }}>
          <h2 style={{ margin: 0, color: '#2d4a7a', fontWeight: 400 }}>Chào mừng đến với UIT CLINIC!</h2>
          <img src={appIcon} alt="logo" style={{ width: 60, marginTop: 10, borderRadius: '50%', objectFit: 'cover', aspectRatio: '1/1', background: '#fff' }} />
        </div>
        <form style={{ padding: 24 }} onSubmit={handleSubmit}>
          <label style={{ fontWeight: 500 }}>Nhập tên đăng nhập</label>
          <input type="text" placeholder="Nhập tên" value={username} onChange={e => setUsername(e.target.value)} style={{ width: '100%', margin: '8px 0 16px 0', padding: 8, borderRadius: 4, border: '1px solid #ccc' }} />
          <label style={{ fontWeight: 500 }}>Mật khẩu</label>
          <input type="password" placeholder="Nhập mật khẩu" value={password} onChange={e => setPassword(e.target.value)} style={{ width: '100%', margin: '8px 0 16px 0', padding: 8, borderRadius: 4, border: '1px solid #ccc' }} />
          {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
          {success && <div style={{ color: 'green', marginBottom: 12, fontWeight: 500 }}>Đăng nhập thành công</div>}
          <button type="submit" style={{ width: '100%', background: '#2d4a7a', color: '#fff', border: 'none', borderRadius: 4, padding: 12, fontWeight: 500, fontSize: 16, cursor: 'pointer' }}>Đăng nhập</button>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16, width:'300px'}}>
            <Link to="/register" style={{ textDecoration: 'none', color: '#222', fontWeight: 500 }}> <span role="img" aria-label="user">👤</span> Tạo tài khoản</Link> 
            <span>
              <Link to="/profile/searchpass1" style={{ textDecoration: 'none', color: '#222', fontWeight: 500 }}>
                <span role="img" aria-label="lock">🔒</span> Quên mật khẩu
              </Link>
            </span>
          </div>
        </form>
      </div>
      <div style={{ 
        marginTop: 24, 
        color: '#fff', 
        fontSize: 15, 
        textAlign: 'left',
        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.7)',
        position: 'relative',
        zIndex: 2,
        width: 400,
        paddingLeft: 0
      }}>
        <div style={{ marginBottom: 4 }}><span style={{ color: '#fff' }}>✉</span> uitclinic@uit.edu.vn</div>
        <div style={{ marginBottom: 4 }}><span style={{ color: '#fff' }}>☎</span> (028) 372 52002 </div>
        <div><span style={{ color: '#fff' }}>📍</span> Khu Phố 34, Phường Linh Xuân, Thành phố Hồ Chí Minh</div>
      </div>
    </div>
  );
}

export default Login;
