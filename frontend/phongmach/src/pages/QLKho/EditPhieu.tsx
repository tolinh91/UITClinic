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

interface PhieuEdit {
  maPhieu: string;
  loaiPhieu: 'Nhập' | 'Xuất';
  ngayTao: string;
  nguoiTao: string;
  ghiChu: string;
  dsVatTu: VatTuPhieu[];
  tongTien: number;
  trangThai: 'Hoàn thành' | 'Đã hủy' | 'Đang xử lý';
}

const EditPhieu = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const maPhieu = searchParams.get('maPhieu');
  
  const [loaiPhieu, setLoaiPhieu] = useState<'Nhập' | 'Xuất'>('Nhập');
  const [ngayTao, setNgayTao] = useState('');
  const [nguoiTao, setNguoiTao] = useState('');
  const [ghiChu, setGhiChu] = useState('');
  const [dsVatTu, setDsVatTu] = useState<VatTuPhieu[]>([]);
  const [trangThai, setTrangThai] = useState<'Hoàn thành' | 'Đã hủy' | 'Đang xử lý'>('Đang xử lý');

  useEffect(() => {
    // Simulate fetching data based on maPhieu
    // In real app, this would be an API call
    const mockData: PhieuEdit = {
      maPhieu: maPhieu || 'NK001',
      loaiPhieu: 'Nhập',
      ngayTao: '2025-08-05',
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
    
    // Set form data
    setLoaiPhieu(mockData.loaiPhieu);
    setNgayTao(mockData.ngayTao);
    setNguoiTao(mockData.nguoiTao);
    setGhiChu(mockData.ghiChu);
    setDsVatTu(mockData.dsVatTu);
    setTrangThai(mockData.trangThai);
  }, [maPhieu]);

  const handleAddVatTu = () => {
    const newVatTu: VatTuPhieu = {
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

  const handleUpdateVatTu = (index: number, field: keyof VatTuPhieu, value: string | number) => {
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
    // Xử lý logic cập nhật phiếu
    console.log('Cập nhật phiếu:', {
      maPhieu,
      loaiPhieu,
      ngayTao,
      nguoiTao,
      ghiChu,
      dsVatTu,
      tongTien,
      trangThai
    });
    // Quay lại màn hình danh sách
    navigate('/qlkho/qlxuatnhap');
  };

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
              Sửa phiếu
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
                Sửa phiếu {loaiPhieu.toLowerCase()} - {maPhieu}
              </h2>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px',
                flexWrap: 'wrap'
              }}>
                <span style={{
                  padding: '4px 12px',
                  backgroundColor: getPhieuTypeColor(loaiPhieu),
                  color: 'white',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: '500'
                }}>
                  {loaiPhieu} kho
                </span>
                <span style={{
                  padding: '4px 12px',
                  backgroundColor: getStatusColor(trangThai),
                  color: 'white',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: '500'
                }}>
                  {trangThai}
                </span>
              </div>
            </div>
            
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

          {/* Form thông tin cơ bản */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '20px',
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
                Mã phiếu
              </label>
              <input
                type="text"
                value={maPhieu || ''}
                disabled
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  backgroundColor: '#f9fafb',
                  color: '#6b7280',
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

            <div>
              <label style={{ 
                display: 'block', 
                fontSize: '14px', 
                fontWeight: '500', 
                color: '#374151', 
                marginBottom: '8px' 
              }}>
                Trạng thái
              </label>
              <select
                value={trangThai}
                onChange={(e) => setTrangThai(e.target.value as 'Hoàn thành' | 'Đã hủy' | 'Đang xử lý')}
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
                <option value="Đang xử lý">Đang xử lý</option>
                <option value="Hoàn thành">Hoàn thành</option>
                <option value="Đã hủy">Đã hủy</option>
              </select>
            </div>
          </div>

          {/* Ghi chú */}
          <div style={{ marginBottom: '32px' }}>
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

            {/* Table */}
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
                      }}
                      >
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
              disabled={!nguoiTao || dsVatTu.length === 0}
              style={{
                padding: '10px 20px',
                backgroundColor: dsVatTu.length > 0 && nguoiTao ? '#3b82f6' : '#9ca3af',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                cursor: dsVatTu.length > 0 && nguoiTao ? 'pointer' : 'not-allowed',
                fontWeight: '500',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                if (dsVatTu.length > 0 && nguoiTao) {
                  e.currentTarget.style.backgroundColor = '#2563eb';
                }
              }}
              onMouseLeave={(e) => {
                if (dsVatTu.length > 0 && nguoiTao) {
                  e.currentTarget.style.backgroundColor = '#3b82f6';
                }
              }}
            >
              Cập nhật phiếu
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

export default EditPhieu;
