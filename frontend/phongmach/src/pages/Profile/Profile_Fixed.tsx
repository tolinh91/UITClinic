import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editableData, setEditableData] = useState({
    phone: '10 chữ số',
    address: 'Đường 1, Thủ Đức',
    email: 'levanmanh@gmail.com'
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
      phone: '10 chữ số',
      address: 'Đường 1, Thủ Đức',
      email: 'levanmanh@gmail.com'
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
        {/* Header */}
        <div style={{
          backgroundColor: 'white',
          padding: '16px 24px',
          borderBottom: '1px solid #e5e7eb',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
        }}>
          <div>
            <h1 style={{ 
              margin: 0, 
              fontSize: '24px', 
              fontWeight: '600',
              color: '#1f2937'
            }}>
              Hồ sơ cá nhân
            </h1>
            <p style={{ 
              margin: '4px 0 0 0', 
              color: '#6b7280', 
              fontSize: '14px' 
            }}>
              Quản lý thông tin cá nhân của bạn
            </p>
          </div>
          
          {/* User Menu */}
          <div style={{ position: 'relative' }}>
            <button
              id="profile-button"
              onClick={() => setShowDropdown(!showDropdown)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 12px',
                backgroundColor: 'white',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                color: '#374151',
                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
              }}
            >
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#3b82f6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '14px',
                fontWeight: '500'
              }}>
                A
              </div>
              <span>Admin</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6,9 12,15 18,9"></polyline>
              </svg>
            </button>

            {showDropdown && (
              <div
                id="profile-dropdown"
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: '4px',
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                  minWidth: '200px',
                  zIndex: 50,
                  padding: '8px 0'
                }}
              >
                <div
                  onClick={() => navigate('/profile')}
                  style={{
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    cursor: 'pointer'
                  }}
                >
                  <span style={{ fontSize: '16px' }}>👤</span>
                  <span style={{ color: '#374151', fontSize: '14px' }}>Thông tin cá nhân</span>
                </div>
                
                <div
                  onClick={() => navigate('/changepassword')}
                  style={{
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    cursor: 'pointer'
                  }}
                >
                  <span style={{ fontSize: '16px' }}>🔑</span>
                  <span style={{ color: '#374151', fontSize: '14px' }}>Đổi mật khẩu</span>
                </div>
                
                <div
                  onClick={() => navigate('/login')}
                  style={{
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    cursor: 'pointer'
                  }}
                >
                  <span style={{ fontSize: '16px', color: '#ef4444' }}>⏻</span>
                  <span style={{ color: '#ef4444', fontSize: '14px' }}>Thoát</span>
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
              {/* Header với gradient xanh */}
              <div style={{
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                padding: '24px',
                color: 'white',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  marginBottom: '16px'
                }}>
                  Chào mừng trở lại!
                </div>
                
                {/* Logo UIT CLINIC */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  marginBottom: '16px'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <div style={{
                      width: '28px',
                      height: '28px',
                      background: 'linear-gradient(45deg, #6366f1, #8b5cf6)',
                      borderRadius: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '16px',
                      fontWeight: 'bold'
                    }}>
                      +
                    </div>
                  </div>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: '500'
                  }}>
                    UIT CLINIC
                  </div>
                </div>
              </div>

              {/* Profile Info */}
              <div style={{
                padding: '24px',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}>
                {/* Tên */}
                <div style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  color: '#1f2937',
                  marginBottom: '24px'
                }}>
                  Mạnh
                </div>

                {/* Thông tin cơ bản */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                  marginBottom: '24px'
                }}>
                  <div style={{ textAlign: 'center', flex: 1 }}>
                    <div style={{
                      fontSize: '12px',
                      color: '#6b7280',
                      marginBottom: '4px'
                    }}>
                      Mã
                    </div>
                    <div style={{
                      fontSize: '14px',
                      color: '#6b7280'
                    }}>
                      TPK
                    </div>
                  </div>
                  
                  <div style={{ textAlign: 'center', flex: 1 }}>
                    <div style={{
                      fontSize: '12px',
                      color: '#6b7280',
                      marginBottom: '4px'
                    }}>
                      Giới tính
                    </div>
                    <div style={{
                      fontSize: '14px',
                      color: '#6b7280'
                    }}>
                      Nam
                    </div>
                  </div>
                </div>

                {/* Badge Trưởng phòng khám */}
                <div style={{
                  backgroundColor: '#f59e0b',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: '500',
                  textAlign: 'center'
                }}>
                  Trưởng phòng khám
                </div>
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
