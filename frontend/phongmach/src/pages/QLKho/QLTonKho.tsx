import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';

interface TonKho {
  maSanPham: string;
  tenSanPham: string;
  loaiSanPham: string;
  tonKho: number;
  mucToiThieu: number;
  viTriLuuTru: string;
  ngayCapNhat: string;
  trangThai: 'An toàn' | 'Sắp hết' | 'Hết hàng';
}

const QLTonKho = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLoai, setFilterLoai] = useState('Tất cả');
  const [filterTrangThai, setFilterTrangThai] = useState('Tất cả');
  const [filterViTri, setFilterViTri] = useState('Tất cả');
  const [showUserMenu, setShowUserMenu] = useState(false);

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

  // Dữ liệu mẫu tồn kho
  const tonKhoData: TonKho[] = [
    {
      maSanPham: 'T005',
      tenSanPham: 'Thuốc giảm đau - XYZ',
      loaiSanPham: 'Thuốc',
      tonKho: 0,
      mucToiThieu: 10,
      viTriLuuTru: 'Tủ thuốc 2',
      ngayCapNhat: '05/08/2025',
      trangThai: 'Hết hàng'
    },
    {
      maSanPham: 'VT008',
      tenSanPham: 'Khẩu trang N95',
      loaiSanPham: 'Vật tư',
      tonKho: 0,
      mucToiThieu: 50,
      viTriLuuTru: 'Tủ vật tư 1',
      ngayCapNhat: '04/08/2025',
      trangThai: 'Hết hàng'
    },
    {
      maSanPham: 'T003',
      tenSanPham: 'Kháng sinh - DEF',
      loaiSanPham: 'Thuốc',
      tonKho: 5,
      mucToiThieu: 20,
      viTriLuuTru: 'Tủ thuốc 1',
      ngayCapNhat: '03/08/2025',
      trangThai: 'Sắp hết'
    },
    {
      maSanPham: 'VT005',
      tenSanPham: 'Bơm tiêm 5ml',
      loaiSanPham: 'Vật tư',
      tonKho: 12,
      mucToiThieu: 30,
      viTriLuuTru: 'Tủ vật tư 2',
      ngayCapNhat: '02/08/2025',
      trangThai: 'Sắp hết'
    },
    {
      maSanPham: 'T007',
      tenSanPham: 'Vitamin C',
      loaiSanPham: 'Thuốc',
      tonKho: 8,
      mucToiThieu: 15,
      viTriLuuTru: 'Tủ thuốc 2',
      ngayCapNhat: '01/08/2025',
      trangThai: 'Sắp hết'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'An toàn':
        return '#10B981';
      case 'Sắp hết':
        return '#F59E0B';
      case 'Hết hàng':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  const filteredData = tonKhoData.filter(item => {
    const matchesSearch = item.tenSanPham.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.maSanPham.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLoai = filterLoai === 'Tất cả' || item.loaiSanPham === filterLoai;
    const matchesTrangThai = filterTrangThai === 'Tất cả' || item.trangThai === filterTrangThai;
    const matchesViTri = filterViTri === 'Tất cả' || item.viTriLuuTru === filterViTri;
    
    return matchesSearch && matchesLoai && matchesTrangThai && matchesViTri;
  });

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
            Cảnh báo tồn kho
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
              onClick={() => navigate('/qlkho/qlxuatnhap')}
              style={{
                padding: '16px 24px',
                border: 'none',
                backgroundColor: 'transparent',
                color: '#6b7280',
                fontWeight: '500',
                fontSize: '16px',
                cursor: 'pointer',
                borderBottom: '2px solid transparent',
                transition: 'all 0.2s'
              }}
            >
              Phiếu kho
            </button>
            <button
              style={{
                padding: '16px 24px',
                border: 'none',
                backgroundColor: 'white',
                color: '#3b82f6',
                fontWeight: '500',
                fontSize: '16px',
                cursor: 'pointer',
                borderBottom: '2px solid #3b82f6',
                transition: 'all 0.2s'
              }}
            >
              Cảnh báo tồn kho
            </button>
          </div>

          {/* Content Area */}
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
                    placeholder="Nhập mã sản phẩm, Tên sản phẩm..."
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
                      Loại sản phẩm
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
                      <option value="Thuốc">Thuốc</option>
                      <option value="Vật tư">Vật tư</option>
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
                      <option value="An toàn">An toàn</option>
                      <option value="Sắp hết">Sắp hết</option>
                      <option value="Hết hàng">Hết hàng</option>
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

              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                <button 
                  onClick={() => navigate('/qlkho/addphieu')}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: '#10b981',
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
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#10b981'}
                >
                  + Thêm phiếu
                </button>
              </div>
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
                      minWidth: '100px'
                    }}>
                      Mã sản phẩm
                    </th>
                    <th style={{ 
                      padding: '12px', 
                      textAlign: 'left', 
                      borderBottom: '2px solid #e5e7eb',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#374151',
                      minWidth: '200px'
                    }}>
                      Tên sản phẩm
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
                      Loại sản phẩm
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
                      Số lượng tồn
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
                      Số lượng tối thiểu
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
                      textAlign: 'center', 
                      borderBottom: '2px solid #e5e7eb',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#374151',
                      minWidth: '100px'
                    }}>
                      Ngày cập nhật
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
                    <tr key={item.maSanPham} style={{ 
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
                        {item.maSanPham}
                      </td>
                      <td style={{ 
                        padding: '12px', 
                        fontSize: '14px',
                        color: '#374151',
                        maxWidth: '200px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>
                        <span title={item.tenSanPham}>{item.tenSanPham}</span>
                      </td>
                      <td style={{ 
                        padding: '12px', 
                        fontSize: '14px',
                        color: '#374151'
                      }}>
                        {item.loaiSanPham}
                      </td>
                      <td style={{ 
                        padding: '12px', 
                        fontSize: '14px',
                        color: '#374151',
                        textAlign: 'center',
                        fontWeight: '600'
                      }}>
                        {item.tonKho}
                      </td>
                      <td style={{ 
                        padding: '12px', 
                        fontSize: '14px',
                        color: '#6b7280',
                        textAlign: 'center'
                      }}>
                        {item.mucToiThieu}
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
                        color: '#6b7280',
                        textAlign: 'center'
                      }}>
                        {item.ngayCapNhat}
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
                          title="Xem chi tiết"
                          style={{ color: '#1ec9a4', fontSize: 12, marginRight: 8, cursor: 'pointer' }}
                        >
                          👁️
                        </span>
                        <span
                          title="Cập nhật tồn kho" 
                          style={{ color: '#1ec9a4', fontSize: 12, marginRight: 8, cursor: 'pointer' }}
                        >
                          ✏️
                        </span>
                        <span
                          title="Nhập hàng"
                          onClick={() => navigate('/qlkho/addphieu')}
                          style={{ color: '#3b82f6', fontSize: 12, cursor: 'pointer' }}
                        >
                          📦
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QLTonKho;
