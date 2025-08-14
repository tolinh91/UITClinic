import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ChangePassword: React.FC = () => {
  const [newPwd, setNewPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  //const token = localStorage.getItem('access_token');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!newPwd || !confirmPwd) {
      setError('Vui lòng nhập đầy đủ thông tin.');
      return;
    }

    if (newPwd !== confirmPwd) {
      setError('Mật khẩu mới và xác nhận mật khẩu không khớp.');
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
          setError('Bạn chưa đăng nhập. Vui lòng đăng nhập trước.');
          setLoading(false);
          return;
        }
      const response = await fetch('http://localhost:8000/api/change-password/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify({ new_password: newPwd }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.detail || 'Đổi mật khẩu thất bại.');
      } else {
        setSuccess('Đổi mật khẩu thành công!');
        setNewPwd('');
        setConfirmPwd('');
      }
    } catch (err) {
      setError('Lỗi kết nối tới server.');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToProfile = () => {
    navigate('/Login/');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        minWidth: '100vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#f5f6fa',
      }}
    >
      <div style={{ flex: 1, padding: '32px 0 0 0' }}>
        <h2 style={{ color: '#2d4a7a', fontWeight: 600, marginLeft: 32 }}>Đổi mật khẩu</h2>
        <div
          style={{
            background: '#fff',
            borderRadius: 12,
            padding: 32,
            margin: '32px',
            maxWidth: 600,
            width: '100%',
          }}
        >
          <form
            style={{ maxWidth: 500, margin: '0 auto', width: '100%' }}
            onSubmit={handleSubmit}
          >
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 32 }}
            >
              <label style={{ fontWeight: 500 }}>
                Mật khẩu mới <span style={{ color: 'red' }}>*</span>:
                <input
                  type="password"
                  placeholder="Nhập mật khẩu mới"
                  style={{
                    padding: 10,
                    borderRadius: 4,
                    border: '1px solid #ccc',
                    width: '100%',
                    marginTop: 4,
                  }}
                  value={newPwd}
                  onChange={(e) => setNewPwd(e.target.value)}
                  minLength={6}
                />
              </label>

              <label style={{ fontWeight: 500 }}>
                Xác nhận mật khẩu <span style={{ color: 'red' }}>*</span>:
                <input
                  type="password"
                  placeholder="Nhập lại mật khẩu mới"
                  style={{
                    padding: 10,
                    borderRadius: 4,
                    border: '1px solid #ccc',
                    width: '100%',
                    marginTop: 4,
                  }}
                  value={confirmPwd}
                  onChange={(e) => setConfirmPwd(e.target.value)}
                  minLength={6}
                />
              </label>
            </div>

            {error && (
              <p style={{ color: 'red', textAlign: 'center', marginBottom: 16 }}>{error}</p>
            )}
            {success && (
              <p style={{ color: 'green', textAlign: 'center', marginBottom: 16 }}>{success}</p>
            )}

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button
                type="submit"
                disabled={loading}
                style={{
                  background: '#2a5ca4',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 6,
                  padding: '10px 32px',
                  fontSize: 16,
                  fontWeight: 500,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.6 : 1,
                  marginBottom: 12,
                }}
              >
                {loading ? 'Đang xử lý...' : 'Lưu'}
              </button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button
                type="button"
                onClick={handleBackToProfile}
                style={{
                  background: '#222',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 6,
                  padding: '10px 32px',
                  fontSize: 16,
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                Quay Lại
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;