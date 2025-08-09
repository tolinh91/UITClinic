import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';

interface VatTuPhieu {
  maSanPham: string;
  tenSanPham: string;
  loaiSanPham: string;
  donViTinh: string;
  soLuong: number;
  donGia: number;
  thanhTien: number;
}

interface PhieuDetail {
  maPhieu: string;
  loaiPhieu: 'Nhập' | 'Xuất';
  ngayTao: string;
  nguoiTao: string;
  ghiChu: string;
  dsVatTu: VatTuPhieu[];
  tongTien: number;
  trangThai: 'Hoàn thành' | 'Đã hủy' | 'Đang xử lý';
}

const DetailPhieu = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const maPhieu = searchParams.get('maPhieu');
  const [phieuDetail, setPhieuDetail] = useState<PhieuDetail | null>(null);

  useEffect(() => {
    // Simulate fetching data based on maPhieu
    // In real app, this would be an API call
    const mockData: PhieuDetail = {
      maPhieu: maPhieu || 'NK001',
      loaiPhieu: 'Nhập',
      ngayTao: '05/08/2025',
      nguoiTao: 'Nguyễn Văn A',
      ghiChu: 'Nhập hàng định kỳ tháng 8',
      dsVatTu: [
        {
          maSanPham: 'KS001',
          tenSanPham: 'Kháng sinh - ABC',
          loaiSanPham: 'Thuốc',
          donViTinh: 'Viên',
          soLuong: 100,
          donGia: 2000,
          thanhTien: 200000
        },
        {
          maSanPham: 'BT001',
          tenSanPham: 'Bơm tiêm 5ml',
          loaiSanPham: 'Vật tư',
          donViTinh: 'Cái',
          soLuong: 50,
          donGia: 5000,
          thanhTien: 250000
        },
        {
          maSanPham: 'GX001',
          tenSanPham: 'Găng tay y tế',
          loaiSanPham: 'Vật tư',
          donViTinh: 'Hộp',
          soLuong: 20,
          donGia: 15000,
          thanhTien: 300000
        }
      ],
      tongTien: 750000,
      trangThai: 'Hoàn thành'
    };
    setPhieuDetail(mockData);
  }, [maPhieu]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Hoàn thành':
        return '#10B981';
      case 'Đang xử lý':
        return '#F59E0B';
      case 'Đã hủy':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  const getPhieuTypeColor = (type: string) => {
    return type === 'Nhập' ? '#10B981' : '#EF4444';
  };

  if (!phieuDetail) {
    return <div>Loading...</div>;
  }

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
              onClick={() => navigate('/qlkho/addphieu')}
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
              Thêm phiếu mới
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
              Chi tiết phiếu
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

        {/* Main Content */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '24px',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
          maxWidth: '100%',
          overflow: 'hidden'
        }}>
          {/* Header */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-start',
            marginBottom: '24px',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div>
              <h2 style={{ 
                fontSize: '20px', 
                fontWeight: '600', 
                color: '#374151', 
                marginBottom: '8px',
                margin: '0 0 8px 0' 
              }}>
                Chi tiết phiếu {phieuDetail.loaiPhieu.toLowerCase()}
              </h2>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px',
                flexWrap: 'wrap'
              }}>
                <span style={{
                  padding: '4px 12px',
                  backgroundColor: getPhieuTypeColor(phieuDetail.loaiPhieu),
                  color: 'white',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: '500'
                }}>
                  {phieuDetail.loaiPhieu} kho
                </span>
                <span style={{
                  padding: '4px 12px',
                  backgroundColor: getStatusColor(phieuDetail.trangThai),
                  color: 'white',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: '500'
                }}>
                  {phieuDetail.trangThai}
                </span>
              </div>
            </div>
            
            <div style={{ 
              display: 'flex', 
              gap: '8px',
              flexWrap: 'wrap'
            }}>
              <button
                onClick={() => window.print()}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#6366f1',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  cursor: 'pointer',
                  fontWeight: '500',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#4f46e5';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#6366f1';
                }}
              >
                🖨️ In phiếu
              </button>
              
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
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#e5e7eb';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#f3f4f6';
                }}
              >
                ← Quay lại
              </button>
            </div>
          </div>

          {/* Thông tin phiếu */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '20px',
            marginBottom: '32px',
            padding: '20px',
            backgroundColor: '#f9fafb',
            borderRadius: '8px'
          }}>
            <div>
              <label style={{ 
                display: 'block', 
                fontSize: '12px', 
                fontWeight: '600', 
                color: '#6b7280', 
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '4px' 
              }}>
                Mã phiếu
              </label>
              <span style={{ 
                fontSize: '16px', 
                fontWeight: '600', 
                color: '#374151' 
              }}>
                {phieuDetail.maPhieu}
              </span>
            </div>

            <div>
              <label style={{ 
                display: 'block', 
                fontSize: '12px', 
                fontWeight: '600', 
                color: '#6b7280', 
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '4px' 
              }}>
                Ngày tạo
              </label>
              <span style={{ 
                fontSize: '16px', 
                color: '#374151' 
              }}>
                {phieuDetail.ngayTao}
              </span>
            </div>

            <div>
              <label style={{ 
                display: 'block', 
                fontSize: '12px', 
                fontWeight: '600', 
                color: '#6b7280', 
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '4px' 
              }}>
                Người tạo
              </label>
              <span style={{ 
                fontSize: '16px', 
                color: '#374151' 
              }}>
                {phieuDetail.nguoiTao}
              </span>
            </div>

            <div>
              <label style={{ 
                display: 'block', 
                fontSize: '12px', 
                fontWeight: '600', 
                color: '#6b7280', 
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '4px' 
              }}>
                Tổng tiền
              </label>
              <span style={{ 
                fontSize: '18px', 
                fontWeight: '700', 
                color: '#059669' 
              }}>
                {phieuDetail.tongTien.toLocaleString('vi-VN')}đ
              </span>
            </div>
          </div>

          {/* Ghi chú */}
          {phieuDetail.ghiChu && (
            <div style={{ marginBottom: '32px' }}>
              <label style={{ 
                display: 'block', 
                fontSize: '14px', 
                fontWeight: '600', 
                color: '#374151', 
                marginBottom: '8px' 
              }}>
                Ghi chú
              </label>
              <div style={{
                padding: '12px 16px',
                backgroundColor: '#f9fafb',
                borderRadius: '6px',
                border: '1px solid #e5e7eb',
                fontSize: '14px',
                color: '#6b7280',
                lineHeight: '1.5'
              }}>
                {phieuDetail.ghiChu}
              </div>
            </div>
          )}

          {/* Danh sách vật tư */}
          <div>
            <h3 style={{ 
              fontSize: '16px', 
              fontWeight: '600', 
              color: '#374151',
              marginBottom: '16px',
              margin: '0 0 16px 0' 
            }}>
              Danh sách vật tư
            </h3>

            <div style={{ 
              overflowX: 'auto',
              border: '1px solid #e5e7eb',
              borderRadius: '8px'
            }}>
              <table style={{ 
                width: '100%', 
                borderCollapse: 'collapse',
                minWidth: '700px'
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
                      borderBottom: '1px solid #e5e7eb'
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
                      borderBottom: '1px solid #e5e7eb'
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
                      borderBottom: '1px solid #e5e7eb'
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
                      borderBottom: '1px solid #e5e7eb'
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
                      borderBottom: '1px solid #e5e7eb'
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
                      borderBottom: '1px solid #e5e7eb'
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
                      borderBottom: '1px solid #e5e7eb'
                    }}>
                      Thành tiền
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {phieuDetail.dsVatTu.map((item, index) => (
                    <tr 
                      key={index} 
                      style={{ 
                        borderBottom: '1px solid #f3f4f6'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#f9fafb';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
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
                        color: '#374151'
                      }}>
                        {item.tenSanPham}
                      </td>
                      <td style={{ 
                        padding: '12px', 
                        fontSize: '14px',
                        color: '#6b7280'
                      }}>
                        <span style={{
                          padding: '2px 8px',
                          backgroundColor: item.loaiSanPham === 'Thuốc' ? '#dbeafe' : '#ecfdf5',
                          color: item.loaiSanPham === 'Thuốc' ? '#1d4ed8' : '#059669',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: '500'
                        }}>
                          {item.loaiSanPham}
                        </span>
                      </td>
                      <td style={{ 
                        padding: '12px', 
                        fontSize: '14px',
                        color: '#6b7280',
                        textAlign: 'center'
                      }}>
                        {item.donViTinh}
                      </td>
                      <td style={{ 
                        padding: '12px', 
                        fontSize: '14px',
                        color: '#374151',
                        textAlign: 'center',
                        fontWeight: '600'
                      }}>
                        {item.soLuong.toLocaleString('vi-VN')}
                      </td>
                      <td style={{ 
                        padding: '12px', 
                        fontSize: '14px',
                        color: '#6b7280',
                        textAlign: 'center'
                      }}>
                        {item.donGia.toLocaleString('vi-VN')}đ
                      </td>
                      <td style={{ 
                        padding: '12px', 
                        fontSize: '14px',
                        color: '#059669',
                        textAlign: 'center',
                        fontWeight: '600'
                      }}>
                        {item.thanhTien.toLocaleString('vi-VN')}đ
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr style={{ backgroundColor: '#f9fafb' }}>
                    <td 
                      colSpan={6} 
                      style={{ 
                        padding: '16px 12px', 
                        fontSize: '16px',
                        fontWeight: '600',
                        color: '#374151',
                        textAlign: 'right',
                        borderTop: '2px solid #e5e7eb'
                      }}
                    >
                      Tổng cộng:
                    </td>
                    <td style={{ 
                      padding: '16px 12px', 
                      fontSize: '18px',
                      fontWeight: '700',
                      color: '#059669',
                      textAlign: 'center',
                      borderTop: '2px solid #e5e7eb'
                    }}>
                      {phieuDetail.tongTien.toLocaleString('vi-VN')}đ
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
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

export default DetailPhieu;
