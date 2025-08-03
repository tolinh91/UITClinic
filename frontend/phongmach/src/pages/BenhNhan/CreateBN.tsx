
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from '../../components/Sidebar';

interface BenhNhan {
  id: string;
  maBenhNhan: string;
  tenBenhNhan: string;
  gioiTinh: string;
  soDienThoai: string;
  ngaySinh: string;
  diaChi: string;
  tienSuBenhNen?: string;
}

function CreateBN() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    tenBenhNhan: "",
    gioiTinh: "Nam",
    ngaySinh: "",
    soDienThoai: "",
    diaChi: "",
    tienSuBenhNen: ""
  });

  const generatePatientId = () => {
    // Generate a new patient ID (BN + 6 digits)
    const timestamp = Date.now().toString().slice(-6);
    return `BN${timestamp}`;
  };

  const validateDate = (dateString: string): boolean => {
    if (!dateString) return true; // Allow empty date
    
    // Parse date in dd/mm/yyyy or dd/mm/yy format
    const dateRegex = /^(\d{1,2})\/(\d{1,2})\/(\d{2,4})$/;
    const match = dateString.match(dateRegex);
    
    if (!match) return false;
    
    let day = parseInt(match[1], 10);
    let month = parseInt(match[2], 10);
    let year = parseInt(match[3], 10);
    
    // Convert 2-digit year to 4-digit year
    if (year < 100) {
      year += year < 50 ? 2000 : 1900;
    }
    
    // Check if date is valid
    const date = new Date(year, month - 1, day);
    if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
      return false;
    }
    
    // Check date range: 1/1/1900 to current date
    const minDate = new Date(1900, 0, 1);
    const maxDate = new Date();
    
    return date >= minDate && date <= maxDate;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.tenBenhNhan || !formData.soDienThoai || !formData.diaChi) {
      alert("Vui lòng điền đầy đủ thông tin có dấu *");
      return;
    }
    
    // Validate birth date
    if (formData.ngaySinh && !validateDate(formData.ngaySinh)) {
      alert("Ngày sinh không hợp lệ. Vui lòng nhập ngày sinh theo định dạng dd/mm/yyyy và trong khoảng từ 1/1/1900 đến ngày hiện tại");
      return;
    }

    // Create new patient object
    const newPatient: BenhNhan = {
      id: Date.now().toString(),
      maBenhNhan: generatePatientId(),
      tenBenhNhan: formData.tenBenhNhan,
      gioiTinh: formData.gioiTinh,
      soDienThoai: formData.soDienThoai,
      ngaySinh: formData.ngaySinh,
      diaChi: formData.diaChi,
      tienSuBenhNen: formData.tienSuBenhNen
    };

    // Store in localStorage to pass to parent component
    const existingPatients = JSON.parse(localStorage.getItem('benhNhanList') || '[]');
    existingPatients.push(newPatient);
    localStorage.setItem('benhNhanList', JSON.stringify(existingPatients));
    localStorage.setItem('newPatientAdded', 'true');

    // Navigate back to patient list
    navigate('/qlbenhnhan');
  };

  const handleCancel = () => {
    navigate('/qlbenhnhan');
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
      <Sidebar activePage="Bệnh nhân" />

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '24px 32px' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 28, fontWeight: 'bold', color: '#1e293b', marginBottom: 8 }}>
              Thêm bệnh nhân
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
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
              {/* Left Column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                    Tên bệnh nhân <span style={{ color: 'red' }}>*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.tenBenhNhan}
                    onChange={(e) => setFormData({ ...formData, tenBenhNhan: e.target.value })}
                    placeholder="Nhập tên bệnh nhân"
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

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                    Giới tính <span style={{ color: 'red' }}>*</span>
                  </label>
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#374151' }}>
                      <input
                        type="radio"
                        name="gioiTinh"
                        value="Nam"
                        checked={formData.gioiTinh === "Nam"}
                        onChange={(e) => setFormData({ ...formData, gioiTinh: e.target.value })}
                        style={{ marginRight: '4px' }}
                      />
                      Nam
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#374151' }}>
                      <input
                        type="radio"
                        name="gioiTinh"
                        value="Nữ"
                        checked={formData.gioiTinh === "Nữ"}
                        onChange={(e) => setFormData({ ...formData, gioiTinh: e.target.value })}
                        style={{ marginRight: '4px' }}
                      />
                      Nữ
                    </label>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                    Ngày sinh <span style={{ color: 'red' }}>*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.ngaySinh}
                    onChange={(e) => setFormData({ ...formData, ngaySinh: e.target.value })}
                    placeholder="dd/mm/yyyy (từ 1/1/1900 đến hiện tại)"
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
              </div>

              {/* Right Column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                    Số điện thoại <span style={{ color: 'red' }}>*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.soDienThoai}
                    onChange={(e) => setFormData({ ...formData, soDienThoai: e.target.value })}
                    placeholder="Nhập số điện thoại bệnh nhân"
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

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                    Địa chỉ <span style={{ color: 'red' }}>*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.diaChi}
                    onChange={(e) => setFormData({ ...formData, diaChi: e.target.value })}
                    placeholder="Nhập địa chỉ"
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
              </div>
            </div>

            {/* Full width field */}
            <div style={{ marginBottom: '32px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                Tiền sử bệnh nền
              </label>
              <textarea
                value={formData.tienSuBenhNen}
                onChange={(e) => setFormData({ ...formData, tienSuBenhNen: e.target.value })}
                placeholder="Ghi số tiền sử bệnh nền (nếu có)"
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

export default CreateBN;
