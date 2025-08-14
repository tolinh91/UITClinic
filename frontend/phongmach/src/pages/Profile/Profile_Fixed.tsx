import React, { useState, useEffect } from 'react';
import appIcon from '../../assets/appicon.png';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editableData, setEditableData] = useState({
    name: 'Admin',
    cccd: '001122334456',
    email: 'admin@uit.clinic.edu.vn',
    dob: '1/1/2002',
    phone: '09022334456',
    address: 'Đường 1, Thủ Đức',
    university: 'UTE – Quản lý công nghiệp',
    role: 'Quản Trị Viên'
  });

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdown = document.getElementById('profile-dropdown');
      const button = document.getElementById('profile-button');
      
      if (dropdown && button && 
          !dropdown.contains(event.target as Node) && 
          !button.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSave = () => {
    setIsEditing(false);
    // TODO: API call to save data
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset to original data
    setEditableData({
      name: 'Admin',
      cccd: '001122334456',
      email: 'admin@uit.clinic.edu.vn',
      dob: '1/1/2002',
      phone: '09022334456',
      address: 'Đường 1, Thủ Đức',
      university: 'UTE – Quản lý công nghiệp',
      role: 'Quản Trị Viên'
    });
  };

  return (
    <div style={{ 
      display: 'flex', 
      minHeight: '100vh',
      width: '100vw',
      backgroundColor: '#f8fafc',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    }}>
      {/* Sidebar */}
      <Sidebar activePage="Hồ sơ cá nhân" />

      {/* Main Content */}
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column',
        minHeight: '100vh',
        width: '100%'
      }}>
        {/* Header - Submenu giống MainPage */}
        <div style={{
          backgroundColor: 'white',
          padding: '16px 24px',
          borderBottom: '1px solid #e5e7eb',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
        }}>
          <img src={appIcon} alt="logo" style={{ width: 40, borderRadius: '50%' }} />
          <span style={{ fontWeight: 500, fontSize: 18, color: '#2d4a7a', marginLeft: 16 }}>Admin</span>
          <div style={{ position: 'relative', marginLeft: 16 }}>
            <button
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18 }}
              onClick={() => setShowDropdown(!showDropdown)}
            >
              ▼
            </button>
            {showDropdown && (
              <div style={{ position: 'absolute', right: 0, top: 32, background: '#fff', boxShadow: '0 2px 8px #0002', borderRadius: 8, minWidth: 220, zIndex: 10 }}>
                <div onClick={() => navigate('/profile')}
                  style={{ padding: '12px 28px', cursor: 'pointer', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', gap: 12, whiteSpace: 'nowrap' }}>
                  <span>👤</span> Thông tin cá nhân
                </div>
                <div onClick={() => navigate('/changepassword')}
                  style={{ padding: '12px 28px', cursor: 'pointer', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', gap: 12, whiteSpace: 'nowrap' }}>
                  <span>🔑</span> Đổi mật khẩu
                </div>
                <div onClick={() => navigate('/login')}
                  style={{ padding: '12px 28px', cursor: 'pointer', color: 'red', display: 'flex', alignItems: 'center', gap: 12, whiteSpace: 'nowrap' }}>
                  <span>⏻</span> Thoát
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Content Area - Profile Information */}
        <div style={{ 
          flex: 1, 
          padding: '24px',
          backgroundColor: '#f5f6fa',
          width: '100%',
          height: '100%'
        }}>
          <div style={{
            display: 'flex',
            gap: '24px',
            height: 'calc(100vh - 160px)',
            width: '100%'
          }}>
            {/* Left Side - Profile Card */}
            <div style={{
              width: '350px',
              backgroundColor: 'white',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              display: 'flex',
              flexDirection: 'column'
            }}>
              {/* Header với gradient xanh - theo thiết kế mới */}
              <div style={{
                background: '#f3f3f3',
                borderRadius: '10px',
                padding: '0',
                marginBottom: '24px',
                boxShadow: '0 2px 8px #0001',
                width: '100%',
                maxWidth: '350px',
                margin: '0 auto'
              }}>
                <div style={{
                  background: '#dbeafe',
                  borderTopLeftRadius: '10px',
                  borderTopRightRadius: '10px',
                  padding: '12px 0',
                  textAlign: 'center',
                  fontSize: '22px',
                  color: '#2563eb',
                  fontWeight: 500
                }}>
                  Chào mừng trở lại!
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px 0 0 0' }}>
                  <img src={appIcon} alt="logo" style={{ width: 70, borderRadius: '50%' }} />
                  <div style={{ fontWeight: 500, fontSize: 18, marginTop: 8 }}>UIT CLINIC</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 32px 0 32px', fontSize: 16 }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ color: '#374151', fontWeight: 500 }}>Mã</div>
                    <div style={{ color: '#374151' }}>QTV</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ color: '#374151', fontWeight: 500 }}>Giới tính</div>
                    <div style={{ color: '#374151' }}>Nam</div>
                  </div>
                </div>
                <div style={{ textAlign: 'center', marginTop: 8, fontSize: 17, color: '#374151', fontWeight: 500 }}>Admin</div>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: 8 }}>
                  <span style={{ background: '#fbbf24', color: '#fff', borderRadius: 8, padding: '6px 24px', fontWeight: 500, fontSize: 16 }}>Quản Trị Viên</span>
                </div>
                <div style={{ height: 12 }}></div>
              </div>
            </div>

            {/* Right Side - Information Table */}
            <div style={{
              flex: 1,
              backgroundColor: 'white',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              padding: '32px',
              position: 'relative'
            }}>
              {/* Title */}
              <h2 style={{
                fontSize: '24px',
                fontWeight: '600',
                color: '#1f2937',
                margin: '0 0 32px 0'
              }}>
                Thông tin cá nhân
              </h2>

              {/* Information Table */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '200px 1fr',
                gap: '16px 24px',
                marginBottom: '40px'
              }}>
                {/* Họ và tên */}
                <div style={{
                  fontSize: '14px',
                  color: '#374151',
                  fontWeight: '500'
                }}>
                  Họ và tên:
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#1f2937'
                }}>
                  Mạnh
                </div>

                {/* CCCD */}
                <div style={{
                  fontSize: '14px',
                  color: '#374151',
                  fontWeight: '500'
                }}>
                  CCCD:
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#1f2937'
                }}>
                  12 chữ số
                </div>

                {/* Email */}
                <div style={{
                  fontSize: '14px',
                  color: '#374151',
                  fontWeight: '500'
                }}>
                  Email:
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#1f2937'
                }}>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editableData.email}
                      onChange={(e) => setEditableData(prev => ({...prev, email: e.target.value}))}
                      style={{
                        border: '1px solid #d1d5db',
                        borderRadius: '4px',
                        padding: '4px 8px',
                        fontSize: '14px',
                        width: '100%'
                      }}
                    />
                  ) : (
                    editableData.email
                  )}
                </div>

                {/* Ngày sinh */}
                <div style={{
                  fontSize: '14px',
                  color: '#374151',
                  fontWeight: '500'
                }}>
                  Ngày sinh:
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#1f2937'
                }}>
                  1/1/2002
                </div>

                {/* Số điện thoại */}
                <div style={{
                  fontSize: '14px',
                  color: '#374151',
                  fontWeight: '500'
                }}>
                  Số điện thoại:
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#1f2937'
                }}>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editableData.phone}
                      onChange={(e) => setEditableData(prev => ({...prev, phone: e.target.value}))}
                      style={{
                        border: '1px solid #d1d5db',
                        borderRadius: '4px',
                        padding: '4px 8px',
                        fontSize: '14px',
                        width: '100%'
                      }}
                    />
                  ) : (
                    editableData.phone
                  )}
                </div>

                {/* Địa chỉ */}
                <div style={{
                  fontSize: '14px',
                  color: '#374151',
                  fontWeight: '500'
                }}>
                  Địa chỉ:
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#1f2937'
                }}>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editableData.address}
                      onChange={(e) => setEditableData(prev => ({...prev, address: e.target.value}))}
                      style={{
                        border: '1px solid #d1d5db',
                        borderRadius: '4px',
                        padding: '4px 8px',
                        fontSize: '14px',
                        width: '100%'
                      }}
                    />
                  ) : (
                    editableData.address
                  )}
                </div>

                {/* Trường đại học */}
                <div style={{
                  fontSize: '14px',
                  color: '#374151',
                  fontWeight: '500'
                }}>
                  Trường đại học – chuyên ngành:
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#1f2937'
                }}>
                  UTE – Quản lý công nghiệp
                </div>

                {/* Vai trò */}
                <div style={{
                  fontSize: '14px',
                  color: '#374151',
                  fontWeight: '500'
                }}>
                  Vai trò:
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#1f2937'
                }}>
                  Trưởng phòng khám
                </div>
              </div>

              {/* Edit Buttons - Căn thẳng với submenu */}
              <div style={{
                position: 'absolute',
                bottom: '32px',
                left: '32px'
              }}>
                {!isEditing ? (
                  <button 
                    onClick={() => setIsEditing(true)}
                    style={{
                      backgroundColor: '#3b82f6',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '12px 24px',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      boxShadow: '0 2px 4px rgba(59, 130, 246, 0.3)'
                    }}
                  >
                    Chỉnh sửa
                  </button>
                ) : (
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button 
                      onClick={handleSave}
                      style={{
                        backgroundColor: '#10b981',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '12px 24px',
                        fontSize: '14px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        boxShadow: '0 2px 4px rgba(16, 185, 129, 0.3)'
                      }}
                    >
                      Lưu
                    </button>
                    <button 
                      onClick={handleCancel}
                      style={{
                        backgroundColor: '#6b7280',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '12px 24px',
                        fontSize: '14px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        boxShadow: '0 2px 4px rgba(107, 114, 128, 0.3)'
                      }}
                    >
                      Hủy
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
