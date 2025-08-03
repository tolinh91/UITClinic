import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from '../../components/Sidebar';

interface GiayKhamBenh {
  id: string;
  tieuDe: string;
  tenBenhNhan: string;
  theBHYT: boolean;
  phongKham: string;
  gia: string;
  bacSi: string;
  ghiChu: string;
  ngayTao: string;
}

function CreateGKB() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Get patient info from location state if coming from patient list
  const patientInfo = location.state?.patientInfo;
  
  const [formData, setFormData] = useState({
    tieuDe: "",
    tenBenhNhan: patientInfo?.tenBenhNhan || "",
    theBHYT: false,
    phongKham: "",
    gia: "",
    bacSi: "",
    ghiChu: ""
  });

  const phongKhamOptions = [
    "Phòng chẩn đoán tổng quát",
    "Phòng tim mạch",
    "Phòng nhi khoa",
    "Phòng sản phụ khoa",
    "Phòng mắt",
    "Phòng tai mũi họng",
    "Phòng da liễu",
    "Phòng thần kinh"
  ];

  const bacSiOptions = [
    "BS. Nguyễn Văn A",
    "BS. Trần Thị B", 
    "BS. Lê Văn C",
    "BS. Phạm Thị D",
    "BS. Hoàng Văn E"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.tieuDe || !formData.tenBenhNhan || !formData.phongKham || !formData.bacSi) {
      alert("Vui lòng điền đầy đủ thông tin có dấu *");
      return;
    }

    // Create new exam record
    const newGKB: GiayKhamBenh = {
      id: Date.now().toString(),
      tieuDe: formData.tieuDe,
      tenBenhNhan: formData.tenBenhNhan,
      theBHYT: formData.theBHYT,
      phongKham: formData.phongKham,
      gia: formData.gia,
      bacSi: formData.bacSi,
      ghiChu: formData.ghiChu,
      ngayTao: new Date().toLocaleDateString('vi-VN')
    };

    // Store in localStorage
    const existingGKB = JSON.parse(localStorage.getItem('giayKhamBenhList') || '[]');
    existingGKB.push(newGKB);
    localStorage.setItem('giayKhamBenhList', JSON.stringify(existingGKB));
    localStorage.setItem('newGKBAdded', 'true');

    // Navigate back to examination list
    navigate('/qlgkb');
  };

  const handleCancel = () => {
    navigate('/qlgkb');
  };

  const handleMenuSelect = (option: string) => {
    setMenuOpen(false);
    if (option === "Thông tin cá nhân") navigate("/profile");
    else if (option === "Đổi mật khẩu") navigate("/changepassword");
    else if (option === "Thoát") navigate("/login");
  };

  return (
    <div style={{ minHeight: '100vh', width: '100vw', display: 'flex', background: '#f5f6fa', position: 'relative' }}>
      {/* Sidebar */}
      <Sidebar activePage="Giấy khám bệnh" />

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '24px 32px' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 28, fontWeight: 'bold', color: '#1e293b', marginBottom: 8 }}>
              Thêm giấy khám bệnh
            </h1>
            <p style={{ margin: 0, fontSize: 16, color: '#64748b' }}>
              Điền đầy đủ thông tin có có dấu <span style={{ color: 'red' }}>*</span> bên dưới
            </p>
          </div>
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                background: '#fff',
                border: '1px solid #e2e8f0',
                borderRadius: '50%',
                width: 48,
                height: 48,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: 'bold',
                color: '#1e293b'
              }}
            >
              Mạnh
            </button>
            {menuOpen && (
              <div style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                marginTop: 8,
                background: '#fff',
                border: '1px solid #e2e8f0',
                borderRadius: 8,
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                zIndex: 1000,
                minWidth: 160
              }}>
                {["Thông tin cá nhân", "Đổi mật khẩu", "Thoát"].map(option => (
                  <div
                    key={option}
                    onClick={() => handleMenuSelect(option)}
                    style={{
                      padding: '12px 16px',
                      cursor: 'pointer',
                      fontSize: 14,
                      color: '#374151',
                      borderBottom: option !== "Thoát" ? '1px solid #f3f4f6' : 'none'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.background = '#f9fafb'}
                    onMouseOut={(e) => e.currentTarget.style.background = '#fff'}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Form */}
        <div style={{ background: '#fff', borderRadius: 12, padding: '32px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <form onSubmit={handleSubmit}>
            {/* Title */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                Tiêu đề <span style={{ color: 'red' }}>*</span>
              </label>
              <input
                type="text"
                value={formData.tieuDe}
                onChange={(e) => setFormData({ ...formData, tieuDe: e.target.value })}
                placeholder="Tiêu đề"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px', marginBottom: '24px' }}>
              {/* Patient Name */}
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                  Tên bệnh nhân <span style={{ color: 'red' }}>*</span>
                </label>
                <select
                  value={formData.tenBenhNhan}
                  onChange={(e) => setFormData({ ...formData, tenBenhNhan: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none',
                    background: '#fff',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                >
                  <option value="">Chọn bệnh nhân</option>
                  <option value="Lê Mạnh">Lê Mạnh</option>
                  <option value="Tô Linh">Tô Linh</option>
                </select>
              </div>

              {/* Insurance Card */}
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                  Thẻ BHYT
                </label>
                <div style={{ display: 'flex', alignItems: 'center', marginTop: '12px' }}>
                  <input
                    type="checkbox"
                    checked={formData.theBHYT}
                    onChange={(e) => setFormData({ ...formData, theBHYT: e.target.checked })}
                    style={{ marginRight: '8px', transform: 'scale(1.2)' }}
                  />
                  <span style={{ fontSize: '14px', color: '#374151' }}>Có thẻ BHYT</span>
                </div>
              </div>

              {/* Examination Room */}
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                  Phòng khám <span style={{ color: 'red' }}>*</span>
                </label>
                <select
                  value={formData.phongKham}
                  onChange={(e) => setFormData({ ...formData, phongKham: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none',
                    background: '#fff',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                >
                  <option value="">Phòng chẩn đoán tổng quát</option>
                  {phongKhamOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
              {/* Price */}
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                  Giá <span style={{ color: 'red' }}>*</span>
                </label>
                <input
                  type="text"
                  value={formData.gia}
                  onChange={(e) => setFormData({ ...formData, gia: e.target.value })}
                  placeholder="Giá"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                />
              </div>

              {/* Doctor */}
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                  Bác sĩ <span style={{ color: 'red' }}>*</span>
                </label>
                <select
                  value={formData.bacSi}
                  onChange={(e) => setFormData({ ...formData, bacSi: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none',
                    background: '#fff',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                >
                  <option value="">Bác sĩ</option>
                  {bacSiOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Notes */}
            <div style={{ marginBottom: '32px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                Ghi chú
              </label>
              <textarea
                value={formData.ghiChu}
                onChange={(e) => setFormData({ ...formData, ghiChu: e.target.value })}
                placeholder="Ghi chú"
                rows={4}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  resize: 'vertical',
                  fontFamily: 'inherit'
                }}
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              />
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px' }}>
              <button
                type="button"
                onClick={handleCancel}
                style={{
                  padding: '12px 24px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  background: '#fff',
                  color: '#374151',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = '#f9fafb';
                  e.currentTarget.style.borderColor = '#9ca3af';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = '#fff';
                  e.currentTarget.style.borderColor = '#d1d5db';
                }}
              >
                Quay lại
              </button>
              <button
                type="submit"
                style={{
                  padding: '12px 24px',
                  border: 'none',
                  borderRadius: '8px',
                  background: '#3b82f6',
                  color: '#fff',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = '#2563eb'}
                onMouseOut={(e) => e.currentTarget.style.background = '#3b82f6'}
              >
                Thêm
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateGKB;
