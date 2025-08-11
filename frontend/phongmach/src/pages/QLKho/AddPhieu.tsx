import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';

interface VatTu {
  maSanPham: string;
  tenSanPham: string;
  loaiSanPham: string;
  donViTinh: string;
  soLuong: number;
  donGia: number;
  thanhTien: number;
}

const AddPhieu = () => {
  const navigate = useNavigate();
  const [loaiPhieu, setLoaiPhieu] = useState<'Nhập' | 'Xuất'>('Nhập');
  const [maPhieu, setMaPhieu] = useState('');
  const [ngayTao, setNgayTao] = useState(new Date().toISOString().split('T')[0]);
  const [nguoiTao, setNguoiTao] = useState('');
  const [ghiChu, setGhiChu] = useState('');
  const [dsVatTu, setDsVatTu] = useState<VatTu[]>([]);

  const handleAddVatTu = () => {
    const newVatTu: VatTu = {
      maSanPham: '',
      tenSanPham: '',
      loaiSanPham: '',
      donViTinh: '',
      soLuong: 0,
      donGia: 0,
      thanhTien: 0
    };
    setDsVatTu([...dsVatTu, newVatTu]);
  };

  const handleUpdateVatTu = (index: number, field: keyof VatTu, value: string | number) => {
    const updatedVatTu = [...dsVatTu];
    updatedVatTu[index] = { ...updatedVatTu[index], [field]: value };
    
    // Tự động tính thành tiền
    if (field === 'soLuong' || field === 'donGia') {
      updatedVatTu[index].thanhTien = updatedVatTu[index].soLuong * updatedVatTu[index].donGia;
    }
    
    setDsVatTu(updatedVatTu);
  };

  const handleRemoveVatTu = (index: number) => {
    const updatedVatTu = dsVatTu.filter((_, i) => i !== index);
    setDsVatTu(updatedVatTu);
  };

  const tongTien = dsVatTu.reduce((sum, item) => sum + item.thanhTien, 0);

  const handleSubmit = () => {
    // Xử lý logic lưu phiếu
    console.log('Lưu phiếu:', {
      loaiPhieu,
      maPhieu,
      ngayTao,
      nguoiTao,
      ghiChu,
      dsVatTu,
      tongTien
    });
    // Quay lại màn hình danh sách
    navigate('/qlkho/qlxuatnhap');
  };

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f8f9fa', overflow: 'hidden' }}>
      <Sidebar activePage="Xuất/Nhập kho" />
      
      <div style={{ flex: 1, padding: '16px', overflow: 'auto', minWidth: 0 }}>
        {/* Header với Submenu */}
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ 
            fontSize: clamp(20, 24, 28), 
            fontWeight: 'bold', 
            color: '#1f2937', 
            marginBottom: '16px',
            margin: 0
          }}>
            Quản lý Xuất/Nhập kho
          </h1>
          
          {/* Submenu Navigation */}
          <div style={{ 
            display: 'flex', 
            gap: '8px', 
            marginTop: '16px',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={() => navigate('/qlkho/qlxuatnhap')}
              style={{
                padding: '8px 16px',
                backgroundColor: '#f3f4f6',
                color: '#374151',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                cursor: 'pointer',
                fontWeight: '500',
                transition: 'all 0.2s',
                minWidth: 'fit-content'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#e5e7eb';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#f3f4f6';
              }}
            >
              Danh sách phiếu
            </button>
            
            <button
              style={{
                padding: '8px 16px',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: '1px solid #3b82f6',
                borderRadius: '6px',
                fontSize: '14px',
                cursor: 'pointer',
                fontWeight: '500',
                transition: 'all 0.2s',
                minWidth: 'fit-content'
              }}
            >
              Thêm phiếu mới
            </button>
            
            <button
              onClick={() => navigate('/qlkho/qltonkho')}
              style={{
                padding: '8px 16px',
                backgroundColor: '#f3f4f6',
                color: '#374151',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                cursor: 'pointer',
                fontWeight: '500',
                transition: 'all 0.2s',
                minWidth: 'fit-content'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#e5e7eb';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#f3f4f6';
              }}
            >
              Cảnh báo tồn kho
            </button>
          </div>
        </div>

        {/* Form Content */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '24px',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
          maxWidth: '100%',
          overflow: 'hidden'
        }}>
          <h2 style={{ 
            fontSize: '18px', 
            fontWeight: '600', 
            color: '#374151', 
            marginBottom: '20px',
            margin: '0 0 20px 0' 
          }}>
            Thêm phiếu mới
          </h2>

          {/* Thông tin cơ bản */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '16px',
            marginBottom: '24px'
          }}>
            <div>
              <label style={{ 
                display: 'block', 
                fontSize: '14px', 
                fontWeight: '500', 
                color: '#374151', 
                marginBottom: '8px' 
              }}>
                Loại phiếu *
              </label>
              <select
                value={loaiPhieu}
                onChange={(e) => setLoaiPhieu(e.target.value as 'Nhập' | 'Xuất')}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  backgroundColor: 'white',
                  boxSizing: 'border-box'
                }}
              >
                <option value="Nhập">Phiếu nhập</option>
                <option value="Xuất">Phiếu xuất</option>
              </select>
            </div>

            <div>
              <label style={{ 
                display: 'block', 
                fontSize: '14px', 
                fontWeight: '500', 
                color: '#374151', 
                marginBottom: '8px' 
              }}>
                Mã phiếu *
              </label>
              <input
                type="text"
                value={maPhieu}
                onChange={(e) => setMaPhieu(e.target.value)}
                placeholder="Nhập mã phiếu"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div>
              <label style={{ 
                display: 'block', 
                fontSize: '14px', 
                fontWeight: '500', 
                color: '#374151', 
                marginBottom: '8px' 
              }}>
                Ngày tạo *
              </label>
              <input
                type="date"
                value={ngayTao}
                onChange={(e) => setNgayTao(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div>
              <label style={{ 
                display: 'block', 
                fontSize: '14px', 
                fontWeight: '500', 
                color: '#374151', 
                marginBottom: '8px' 
              }}>
                Người tạo *
              </label>
              <input
                type="text"
                value={nguoiTao}
                onChange={(e) => setNguoiTao(e.target.value)}
                placeholder="Nhập tên người tạo"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>

          {/* Ghi chú */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ 
              display: 'block', 
              fontSize: '14px', 
              fontWeight: '500', 
              color: '#374151', 
              marginBottom: '8px' 
            }}>
              Ghi chú
            </label>
            <textarea
              value={ghiChu}
              onChange={(e) => setGhiChu(e.target.value)}
              placeholder="Nhập ghi chú (nếu có)"
              rows={3}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                boxSizing: 'border-box',
                resize: 'vertical'
              }}
            />
          </div>

          {/* Danh sách vật tư */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              marginBottom: '16px' 
            }}>
              <h3 style={{ 
                fontSize: '16px', 
                fontWeight: '600', 
                color: '#374151',
                margin: 0 
              }}>
                Danh sách vật tư
              </h3>
              <button
                onClick={handleAddVatTu}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  cursor: 'pointer',
                  fontWeight: '500',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#059669';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#10b981';
                }}
              >
                + Thêm vật tư
              </button>
            </div>

            {/* Table Header */}
            <div style={{ 
              overflowX: 'auto',
              border: '1px solid #e5e7eb',
              borderRadius: '8px'
            }}>
              <table style={{ 
                width: '100%', 
                borderCollapse: 'collapse',
                minWidth: '800px'
              }}>
                <thead>
                  <tr style={{ backgroundColor: '#f9fafb' }}>
                    <th style={{ 
                      padding: '12px', 
                      textAlign: 'left', 
                      fontSize: '12px', 
                      fontWeight: '600', 
                      color: '#6b7280', 
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      borderBottom: '1px solid #e5e7eb',
                      width: '120px'
                    }}>
                      Mã SP
                    </th>
                    <th style={{ 
                      padding: '12px', 
                      textAlign: 'left', 
                      fontSize: '12px', 
                      fontWeight: '600', 
                      color: '#6b7280', 
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      borderBottom: '1px solid #e5e7eb',
                      minWidth: '200px'
                    }}>
                      Tên sản phẩm
                    </th>
                    <th style={{ 
                      padding: '12px', 
                      textAlign: 'left', 
                      fontSize: '12px', 
                      fontWeight: '600', 
                      color: '#6b7280', 
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      borderBottom: '1px solid #e5e7eb',
                      width: '120px'
                    }}>
                      Loại
                    </th>
                    <th style={{ 
                      padding: '12px', 
                      textAlign: 'center', 
                      fontSize: '12px', 
                      fontWeight: '600', 
                      color: '#6b7280', 
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      borderBottom: '1px solid #e5e7eb',
                      width: '100px'
                    }}>
                      ĐVT
                    </th>
                    <th style={{ 
                      padding: '12px', 
                      textAlign: 'center', 
                      fontSize: '12px', 
                      fontWeight: '600', 
                      color: '#6b7280', 
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      borderBottom: '1px solid #e5e7eb',
                      width: '100px'
                    }}>
                      Số lượng
                    </th>
                    <th style={{ 
                      padding: '12px', 
                      textAlign: 'center', 
                      fontSize: '12px', 
                      fontWeight: '600', 
                      color: '#6b7280', 
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      borderBottom: '1px solid #e5e7eb',
                      width: '120px'
                    }}>
                      Đơn giá
                    </th>
                    <th style={{ 
                      padding: '12px', 
                      textAlign: 'center', 
                      fontSize: '12px', 
                      fontWeight: '600', 
                      color: '#6b7280', 
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      borderBottom: '1px solid #e5e7eb',
                      width: '120px'
                    }}>
                      Thành tiền
                    </th>
                    <th style={{ 
                      padding: '12px', 
                      textAlign: 'center', 
                      fontSize: '12px', 
                      fontWeight: '600', 
                      color: '#6b7280', 
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      borderBottom: '1px solid #e5e7eb',
                      width: '80px'
                    }}>
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dsVatTu.length === 0 ? (
                    <tr>
                      <td 
                        colSpan={8} 
                        style={{ 
                          padding: '40px', 
                          textAlign: 'center', 
                          color: '#6b7280',
                          fontSize: '14px'
                        }}
                      >
                        Chưa có vật tư nào. Nhấn "Thêm vật tư" để bắt đầu.
                      </td>
                    </tr>
                  ) : (
                    dsVatTu.map((item, index) => (
                      <tr key={index} style={{ 
                        borderBottom: '1px solid #f3f4f6'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#f9fafb';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}>
                        <td style={{ padding: '8px' }}>
                          <input
                            type="text"
                            value={item.maSanPham}
                            onChange={(e) => handleUpdateVatTu(index, 'maSanPham', e.target.value)}
                            placeholder="Mã SP"
                            style={{
                              width: '100%',
                              padding: '6px 8px',
                              border: '1px solid #d1d5db',
                              borderRadius: '4px',
                              fontSize: '13px',
                              boxSizing: 'border-box'
                            }}
                          />
                        </td>
                        <td style={{ padding: '8px' }}>
                          <input
                            type="text"
                            value={item.tenSanPham}
                            onChange={(e) => handleUpdateVatTu(index, 'tenSanPham', e.target.value)}
                            placeholder="Tên sản phẩm"
                            style={{
                              width: '100%',
                              padding: '6px 8px',
                              border: '1px solid #d1d5db',
                              borderRadius: '4px',
                              fontSize: '13px',
                              boxSizing: 'border-box'
                            }}
                          />
                        </td>
                        <td style={{ padding: '8px' }}>
                          <select
                            value={item.loaiSanPham}
                            onChange={(e) => handleUpdateVatTu(index, 'loaiSanPham', e.target.value)}
                            style={{
                              width: '100%',
                              padding: '6px 8px',
                              border: '1px solid #d1d5db',
                              borderRadius: '4px',
                              fontSize: '13px',
                              boxSizing: 'border-box'
                            }}
                          >
                            <option value="">Chọn loại</option>
                            <option value="Thuốc">Thuốc</option>
                            <option value="Vật tư">Vật tư</option>
                          </select>
                        </td>
                        <td style={{ padding: '8px' }}>
                          <input
                            type="text"
                            value={item.donViTinh}
                            onChange={(e) => handleUpdateVatTu(index, 'donViTinh', e.target.value)}
                            placeholder="ĐVT"
                            style={{
                              width: '100%',
                              padding: '6px 8px',
                              border: '1px solid #d1d5db',
                              borderRadius: '4px',
                              fontSize: '13px',
                              boxSizing: 'border-box'
                            }}
                          />
                        </td>
                        <td style={{ padding: '8px' }}>
                          <input
                            type="number"
                            value={item.soLuong || ''}
                            onChange={(e) => handleUpdateVatTu(index, 'soLuong', parseFloat(e.target.value) || 0)}
                            placeholder="0"
                            style={{
                              width: '100%',
                              padding: '6px 8px',
                              border: '1px solid #d1d5db',
                              borderRadius: '4px',
                              fontSize: '13px',
                              boxSizing: 'border-box',
                              textAlign: 'center'
                            }}
                          />
                        </td>
                        <td style={{ padding: '8px' }}>
                          <input
                            type="number"
                            value={item.donGia || ''}
                            onChange={(e) => handleUpdateVatTu(index, 'donGia', parseFloat(e.target.value) || 0)}
                            placeholder="0"
                            style={{
                              width: '100%',
                              padding: '6px 8px',
                              border: '1px solid #d1d5db',
                              borderRadius: '4px',
                              fontSize: '13px',
                              boxSizing: 'border-box',
                              textAlign: 'center'
                            }}
                          />
                        </td>
                        <td style={{ 
                          padding: '8px',
                          textAlign: 'center',
                          fontSize: '14px',
                          fontWeight: '600',
                          color: '#059669'
                        }}>
                          {item.thanhTien.toLocaleString('vi-VN')}đ
                        </td>
                        <td style={{ padding: '8px', textAlign: 'center' }}>
                          <button
                            onClick={() => handleRemoveVatTu(index)}
                            style={{
                              padding: '4px 8px',
                              backgroundColor: '#ef4444',
                              color: 'white',
                              border: 'none',
                              borderRadius: '4px',
                              fontSize: '12px',
                              cursor: 'pointer',
                              fontWeight: '500'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = '#dc2626';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = '#ef4444';
                            }}
                          >
                            Xóa
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Tổng tiền */}
            {dsVatTu.length > 0 && (
              <div style={{ 
                marginTop: '16px',
                padding: '16px',
                backgroundColor: '#f9fafb',
                borderRadius: '8px',
                textAlign: 'right'
              }}>
                <div style={{ 
                  fontSize: '16px', 
                  fontWeight: '600', 
                  color: '#374151' 
                }}>
                  Tổng tiền: <span style={{ color: '#059669' }}>{tongTien.toLocaleString('vi-VN')}đ</span>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div style={{ 
            display: 'flex', 
            gap: '12px', 
            justifyContent: 'flex-end',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={() => navigate('/qlkho/qlxuatnhap')}
              style={{
                padding: '10px 20px',
                backgroundColor: '#f3f4f6',
                color: '#374151',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                cursor: 'pointer',
                fontWeight: '500',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#e5e7eb';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#f3f4f6';
              }}
            >
              Hủy
            </button>
            <button
              onClick={handleSubmit}
              disabled={!maPhieu || !nguoiTao || dsVatTu.length === 0}
              style={{
                padding: '10px 20px',
                backgroundColor: dsVatTu.length > 0 && maPhieu && nguoiTao ? '#3b82f6' : '#9ca3af',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                cursor: dsVatTu.length > 0 && maPhieu && nguoiTao ? 'pointer' : 'not-allowed',
                fontWeight: '500',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                if (dsVatTu.length > 0 && maPhieu && nguoiTao) {
                  e.currentTarget.style.backgroundColor = '#2563eb';
                }
              }}
              onMouseLeave={(e) => {
                if (dsVatTu.length > 0 && maPhieu && nguoiTao) {
                  e.currentTarget.style.backgroundColor = '#3b82f6';
                }
              }}
            >
              Lưu phiếu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Utility function for responsive font sizing
function clamp(min: number, preferred: number, max: number): string {
  return `clamp(${min}px, ${preferred}px, ${max}px)`;
}

export default AddPhieu;
