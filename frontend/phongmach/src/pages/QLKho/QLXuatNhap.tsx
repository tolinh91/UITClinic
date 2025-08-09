import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';

interface PhieuKho {
  maPhieu: string;
  ngay: string;
  loai: 'Nhập kho' | 'Xuất kho';
  sanPham: string;
  soLuong: number;
  viTriLuuTru: string;
  kyThuatVienThucHien: string;
  trangThai: 'Hoàn thành' | 'Đã hủy' | 'Đang xử lý';
}

const QLXuatNhap = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'phieukho' | 'canhbao'>('phieukho');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLoai, setFilterLoai] = useState('Tất cả');
  const [filterTrangThai, setFilterTrangThai] = useState('Tất cả');
  const [filterViTri, setFilterViTri] = useState('Tất cả');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [selectedPhieu, setSelectedPhieu] = useState<PhieuKho | null>(null);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('[data-user-menu]')) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showUserMenu]);

  // Dữ liệu mẫu
  const phieuKhoData: PhieuKho[] = [
    {
      maPhieu: 'NK001',
      ngay: '05/08/2025',
      loai: 'Nhập kho',
      sanPham: 'Khẩu sinh - ABC',
      soLuong: 50,
      viTriLuuTru: 'Tủ thuốc 1',
      kyThuatVienThucHien: 'Nguyễn Văn A',
      trangThai: 'Hoàn thành'
    },
    {
      maPhieu: 'XK002',
      ngay: '04/08/2025',
      loai: 'Xuất kho',
      sanPham: 'Găng tay y tế - HTC',
      soLuong: 100,
      viTriLuuTru: 'Tủ vật tư 1',
      kyThuatVienThucHien: 'Trần Thị B',
      trangThai: 'Hoàn thành'
    },
    {
      maPhieu: 'NK003',
      ngay: '03/08/2025',
      loai: 'Nhập kho',
      sanPham: 'Thuốc giảm đau - XYZ',
      soLuong: 30,
      viTriLuuTru: 'Tủ thuốc 2',
      kyThuatVienThucHien: 'Lê Văn C',
      trangThai: 'Đã hủy'
    },
    {
      maPhieu: 'XK004',
      ngay: '02/08/2025',
      loai: 'Xuất kho',
      sanPham: 'Khẩu trang N95',
      soLuong: 200,
      viTriLuuTru: 'Tủ vật tư 2',
      kyThuatVienThucHien: 'Phạm Thị D',
      trangThai: 'Đang xử lý'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Hoàn thành':
        return '#10B981';
      case 'Đã hủy':
        return '#EF4444';
      case 'Đang xử lý':
        return '#F59E0B';
      default:
        return '#6B7280';
    }
  };

  const filteredData = phieuKhoData.filter(item => {
    const matchesSearch = item.sanPham.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.maPhieu.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLoai = filterLoai === 'Tất cả' || item.loai === filterLoai;
    const matchesTrangThai = filterTrangThai === 'Tất cả' || item.trangThai === filterTrangThai;
    const matchesViTri = filterViTri === 'Tất cả' || item.viTriLuuTru === filterViTri;
    
    return matchesSearch && matchesLoai && matchesTrangThai && matchesViTri;
  });

  // Functions xử lý xóa phiếu
  const handleDeleteClick = (phieu: PhieuKho) => {
    setSelectedPhieu(phieu);
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = () => {
    setShowDeleteConfirm(false);
    setShowPasswordConfirm(true);
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
    setSelectedPhieu(null);
  };

  const handlePasswordSubmit = () => {
    // Kiểm tra mật khẩu (admin@gmail.com / 1234)
    if (password === '1234') {
      // Xóa phiếu thành công
      console.log('Xóa phiếu:', selectedPhieu?.maPhieu);
      alert('Xóa phiếu thành công!');
      
      // Reset states
      setShowPasswordConfirm(false);
      setSelectedPhieu(null);
      setPassword('');
      setPasswordError('');
    } else {
      setPasswordError('Mật khẩu không đúng. Vui lòng thử lại.');
    }
  };

  const handlePasswordCancel = () => {
    setShowPasswordConfirm(false);
    setSelectedPhieu(null);
    setPassword('');
    setPasswordError('');
  };

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f8f9fa', overflow: 'hidden' }}>
      <Sidebar activePage="Xuất/Nhập kho" />
      
      <div style={{ flex: 1, padding: '16px', overflow: 'auto', minWidth: 0 }}>
        {/* Header với User info */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '16px',
          backgroundColor: 'white',
          padding: '12px 16px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <h1 style={{ 
            margin: 0, 
            fontSize: 'clamp(18px, 4vw, 24px)', 
            fontWeight: '600', 
            color: '#1f2937',
            minWidth: 'fit-content'
          }}>
            Danh sách Xuất/Nhập kho
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', position: 'relative' }} data-user-menu>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: '#3b82f6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold'
            }}>
              A
            </div>
            <span style={{ fontWeight: '500', color: '#374151' }}>Admin</span>
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              style={{
                background: 'none',
                border: 'none',
                color: '#9ca3af',
                cursor: 'pointer',
                fontSize: '16px',
                padding: '4px'
              }}
            >
              ▼
            </button>
            
            {/* Dropdown Menu */}
            {showUserMenu && (
              <div style={{
                position: 'absolute',
                top: '100%',
                right: '0',
                marginTop: '8px',
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                padding: '8px',
                minWidth: '200px',
                zIndex: 1000,
                border: '1px solid #e5e7eb'
              }}>
                <div
                  onClick={() => navigate('/profile')}
                  style={{
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    cursor: 'pointer',
                    borderRadius: '6px',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
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
                    cursor: 'pointer',
                    borderRadius: '6px',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
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
                    cursor: 'pointer',
                    borderRadius: '6px',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <span style={{ fontSize: '16px', color: '#ef4444' }}>⏻</span>
                  <span style={{ color: '#ef4444', fontSize: '14px' }}>Thoát</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div style={{ 
          backgroundColor: 'white', 
          borderRadius: '8px', 
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          overflow: 'hidden'
        }}>
          {/* Tabs */}
          <div style={{ 
            display: 'flex', 
            borderBottom: '1px solid #e5e7eb',
            backgroundColor: '#f9fafb'
          }}>
            <button
              onClick={() => setActiveTab('phieukho')}
              style={{
                padding: '16px 24px',
                border: 'none',
                backgroundColor: activeTab === 'phieukho' ? 'white' : 'transparent',
                color: activeTab === 'phieukho' ? '#3b82f6' : '#6b7280',
                fontWeight: '500',
                fontSize: '16px',
                cursor: 'pointer',
                borderBottom: activeTab === 'phieukho' ? '2px solid #3b82f6' : '2px solid transparent',
                transition: 'all 0.2s'
              }}
            >
              Phiếu kho
            </button>
            <button
              onClick={() => navigate('/qlkho/qltonkho')}
              style={{
                padding: '16px 24px',
                border: 'none',
                backgroundColor: activeTab === 'canhbao' ? 'white' : 'transparent',
                color: activeTab === 'canhbao' ? '#3b82f6' : '#6b7280',
                fontWeight: '500',
                fontSize: '16px',
                cursor: 'pointer',
                borderBottom: activeTab === 'canhbao' ? '2px solid #3b82f6' : '2px solid transparent',
                transition: 'all 0.2s'
              }}
            >
              Cảnh báo tồn kho
            </button>
          </div>

          {/* Content Area */}
          {activeTab === 'phieukho' && (
            <div style={{ padding: '16px' }}>
              {/* Action Bar */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'flex-start', 
                marginBottom: '20px',
                flexDirection: 'column',
                gap: '16px'
              }}>
                <div style={{ 
                  display: 'flex', 
                  gap: '16px', 
                  alignItems: 'flex-start', 
                  width: '100%',
                  flexDirection: 'column'
                }}>
                  {/* Search */}
                  <div style={{ width: '100%', maxWidth: '300px' }}>
                    <label style={{ 
                      display: 'block', 
                      fontSize: '12px', 
                      fontWeight: '500', 
                      color: '#374151', 
                      marginBottom: '4px' 
                    }}>
                      Tìm kiếm
                    </label>
                    <input
                      type="text"
                      placeholder="Nhập mã phiếu, Sản phẩm..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        fontSize: '14px',
                        outline: 'none',
                        transition: 'border-color 0.2s',
                        boxSizing: 'border-box'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                      onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                    />
                  </div>

                  {/* Filters */}
                  <div style={{ 
                    display: 'flex', 
                    gap: '12px', 
                    alignItems: 'flex-start',
                    flexWrap: 'wrap',
                    width: '100%'
                  }}>
                    <div style={{ minWidth: '150px' }}>
                      <label style={{ 
                        display: 'block', 
                        fontSize: '12px', 
                        fontWeight: '500', 
                        color: '#374151', 
                        marginBottom: '4px' 
                      }}>
                        Loại
                      </label>
                      <select
                        value={filterLoai}
                        onChange={(e) => setFilterLoai(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '8px 12px',
                          border: '1px solid #d1d5db',
                          borderRadius: '6px',
                          fontSize: '14px',
                          backgroundColor: 'white',
                          boxSizing: 'border-box'
                        }}
                      >
                        <option value="Tất cả">Tất cả</option>
                        <option value="Nhập kho">Nhập kho</option>
                        <option value="Xuất kho">Xuất kho</option>
                      </select>
                    </div>

                    <div style={{ minWidth: '150px' }}>
                      <label style={{ 
                        display: 'block', 
                        fontSize: '12px', 
                        fontWeight: '500', 
                        color: '#374151', 
                        marginBottom: '4px' 
                      }}>
                        Trạng thái
                      </label>
                      <select
                        value={filterTrangThai}
                        onChange={(e) => setFilterTrangThai(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '8px 12px',
                          border: '1px solid #d1d5db',
                          borderRadius: '6px',
                          fontSize: '14px',
                          backgroundColor: 'white',
                          boxSizing: 'border-box'
                        }}
                      >
                        <option value="Tất cả">Tất cả</option>
                        <option value="Hoàn thành">Hoàn thành</option>
                        <option value="Đã hủy">Đã hủy</option>
                        <option value="Đang xử lý">Đang xử lý</option>
                      </select>
                    </div>

                    <div style={{ minWidth: '150px' }}>
                      <label style={{ 
                        display: 'block', 
                        fontSize: '12px', 
                        fontWeight: '500', 
                        color: '#374151', 
                        marginBottom: '4px' 
                      }}>
                        Vị trí lưu trữ
                      </label>
                      <select
                        value={filterViTri}
                        onChange={(e) => setFilterViTri(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '8px 12px',
                          border: '1px solid #d1d5db',
                          borderRadius: '6px',
                          fontSize: '14px',
                          backgroundColor: 'white',
                          boxSizing: 'border-box'
                        }}
                      >
                        <option value="Tất cả">Tất cả</option>
                        <option value="Tủ thuốc 1">Tủ thuốc 1</option>
                        <option value="Tủ thuốc 2">Tủ thuốc 2</option>
                        <option value="Tủ vật tư 1">Tủ vật tư 1</option>
                        <option value="Tủ vật tư 2">Tủ vật tư 2</option>
                      </select>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => navigate('/qlkho/addphieu')}
                  style={{
                  padding: '12px 24px',
                  backgroundColor: '#10B981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'background-color 0.2s',
                  whiteSpace: 'nowrap',
                  alignSelf: 'flex-start'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#059669'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#10B981'}
                >
                  + Thêm phiếu
                </button>
              </div>

              {/* Table */}
              <div style={{ overflowX: 'auto', marginTop: '16px' }}>
                <table style={{ 
                  width: '100%', 
                  borderCollapse: 'collapse',
                  backgroundColor: 'white',
                  minWidth: '800px'
                }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f8f9fa' }}>
                      <th style={{ 
                        padding: '12px', 
                        textAlign: 'left', 
                        borderBottom: '2px solid #e5e7eb',
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#374151',
                        minWidth: '80px'
                      }}>
                        Mã phiếu
                      </th>
                      <th style={{ 
                        padding: '12px', 
                        textAlign: 'left', 
                        borderBottom: '2px solid #e5e7eb',
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#374151',
                        minWidth: '100px'
                      }}>
                        Ngày
                      </th>
                      <th style={{ 
                        padding: '12px', 
                        textAlign: 'left', 
                        borderBottom: '2px solid #e5e7eb',
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#374151',
                        minWidth: '100px'
                      }}>
                        Loại
                      </th>
                      <th style={{ 
                        padding: '12px', 
                        textAlign: 'center', 
                        borderBottom: '2px solid #e5e7eb',
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#374151',
                        minWidth: '80px'
                      }}>
                        Số lượng
                      </th>
                      <th style={{ 
                        padding: '12px', 
                        textAlign: 'left', 
                        borderBottom: '2px solid #e5e7eb',
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#374151',
                        minWidth: '120px'
                      }}>
                        Vị trí lưu trữ
                      </th>
                      <th style={{ 
                        padding: '12px', 
                        textAlign: 'left', 
                        borderBottom: '2px solid #e5e7eb',
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#374151',
                        minWidth: '150px'
                      }}>
                        Kỹ thuật viên thực hiện
                      </th>
                      <th style={{ 
                        padding: '12px', 
                        textAlign: 'center', 
                        borderBottom: '2px solid #e5e7eb',
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#374151',
                        minWidth: '100px'
                      }}>
                        Trạng thái
                      </th>
                      <th style={{ 
                        padding: '12px', 
                        textAlign: 'center', 
                        borderBottom: '2px solid #e5e7eb',
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#374151',
                        minWidth: '120px'
                      }}>
                        Hành động
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((item) => (
                      <tr key={item.maPhieu} style={{ 
                        borderBottom: '1px solid #f3f4f6'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
                      >
                        <td style={{ 
                          padding: '12px', 
                          fontSize: '14px',
                          color: '#374151',
                          fontWeight: '500'
                        }}>
                          {item.maPhieu}
                        </td>
                        <td style={{ 
                          padding: '12px', 
                          fontSize: '14px',
                          color: '#6b7280'
                        }}>
                          {item.ngay}
                        </td>
                        <td style={{ 
                          padding: '12px', 
                          fontSize: '14px',
                          color: '#374151'
                        }}>
                          {item.loai}
                        </td>
                        <td style={{ 
                          padding: '12px', 
                          fontSize: '14px',
                          color: '#374151',
                          textAlign: 'center'
                        }}>
                          {item.soLuong}
                        </td>
                        <td style={{ 
                          padding: '12px', 
                          fontSize: '14px',
                          color: '#374151'
                        }}>
                          {item.viTriLuuTru}
                        </td>
                        <td style={{ 
                          padding: '12px', 
                          fontSize: '14px',
                          color: '#374151',
                          maxWidth: '150px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}>
                          <span title={item.kyThuatVienThucHien}>{item.kyThuatVienThucHien}</span>
                        </td>
                        <td style={{ 
                          padding: '12px', 
                          textAlign: 'center'
                        }}>
                          <span style={{
                            padding: '6px 12px',
                            borderRadius: '20px',
                            fontSize: '12px',
                            fontWeight: '500',
                            backgroundColor: getStatusColor(item.trangThai),
                            color: 'white',
                            whiteSpace: 'nowrap'
                          }}>
                            {item.trangThai}
                          </span>
                        </td>
                        <td style={{ 
                          padding: '12px', 
                          textAlign: 'center',
                          minWidth: 120
                        }}>
                          <span
                            title="Xem"
                            onClick={() => navigate(`/qlkho/detailphieu?maPhieu=${item.maPhieu}`)}
                            style={{ color: '#1ec9a4', fontSize: 12, marginRight: 8, cursor: 'pointer' }}
                          >
                            👁️
                          </span>
                          <span
                            title="Sửa" 
                            onClick={() => navigate(`/qlkho/editphieu?maPhieu=${item.maPhieu}`)}
                            style={{ color: '#1ec9a4', fontSize: 12, marginRight: 8, cursor: 'pointer' }}
                          >
                            ✏️
                          </span>
                          <span
                            title="Xóa"
                            onClick={() => handleDeleteClick(item)}
                            style={{ color: '#e53935', fontSize: 12, cursor: 'pointer' }}
                          >
                            🗑️
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'canhbao' && (
            <div style={{ padding: '24px', textAlign: 'center', color: '#6b7280' }}>
              <h3>Cảnh báo tồn kho</h3>
              <p>Chức năng này đang được phát triển...</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal xác nhận xóa */}
      {showDeleteConfirm && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '24px',
            minWidth: '400px',
            maxWidth: '500px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '16px',
              margin: '0 0 16px 0'
            }}>
              Xác nhận xóa phiếu
            </h3>
            <p style={{
              fontSize: '14px',
              color: '#6b7280',
              lineHeight: '1.5',
              marginBottom: '24px'
            }}>
              Bạn có muốn xóa {selectedPhieu?.loai} số <strong>{selectedPhieu?.maPhieu}</strong> không?
            </p>
            <div style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'flex-end'
            }}>
              <button
                onClick={handleDeleteCancel}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#f3f4f6',
                  color: '#374151',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                Không
              </button>
              <button
                onClick={handleDeleteConfirm}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#ef4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                Có
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal nhập mật khẩu */}
      {showPasswordConfirm && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '24px',
            minWidth: '400px',
            maxWidth: '500px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '16px',
              margin: '0 0 16px 0'
            }}>
              Xác nhận mật khẩu
            </h3>
            <p style={{
              fontSize: '14px',
              color: '#6b7280',
              lineHeight: '1.5',
              marginBottom: '16px'
            }}>
              Vui lòng xác nhận mật khẩu để xóa phiếu
            </p>
            <div style={{ marginBottom: '16px' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '8px'
              }}>
                Mật khẩu *
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError('');
                }}
                placeholder="Nhập mật khẩu của bạn"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: passwordError ? '1px solid #ef4444' : '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  boxSizing: 'border-box'
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handlePasswordSubmit();
                  }
                }}
              />
              {passwordError && (
                <p style={{
                  fontSize: '12px',
                  color: '#ef4444',
                  marginTop: '4px'
                }}>
                  {passwordError}
                </p>
              )}
            </div>
            <div style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'flex-end'
            }}>
              <button
                onClick={handlePasswordCancel}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#f3f4f6',
                  color: '#374151',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                Hủy
              </button>
              <button
                onClick={handlePasswordSubmit}
                disabled={!password}
                style={{
                  padding: '8px 16px',
                  backgroundColor: password ? '#ef4444' : '#9ca3af',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  cursor: password ? 'pointer' : 'not-allowed',
                  fontWeight: '500'
                }}
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QLXuatNhap;