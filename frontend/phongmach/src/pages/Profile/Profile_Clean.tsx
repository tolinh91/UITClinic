import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

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

  return (
    <div style={{ 
      display: 'flex', 
      minHeight: '100vh',
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
        minHeight: '100vh'
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

        {/* Main Content Area - Empty for redesign */}
        <div style={{ 
          flex: 1, 
          padding: '24px',
          backgroundColor: '#f5f6fa'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '48px 32px',
            textAlign: 'center',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            <div style={{
              fontSize: '48px',
              marginBottom: '16px'
            }}>
              🏗️
            </div>
            <h2 style={{ 
              color: '#6b7280', 
              margin: '0 0 8px 0',
              fontSize: '20px',
              fontWeight: '600'
            }}>
              Trang thông tin cá nhân đang được thiết kế lại
            </h2>
            <p style={{ 
              color: '#9ca3af', 
              margin: 0,
              fontSize: '14px'
            }}>
              Vui lòng quay lại sau khi hoàn thiện design mới
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
