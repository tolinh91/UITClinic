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

const generatePatientId = () => {
  const timestamp = Date.now().toString().slice(-6);
  return `BN${timestamp}`;
};

const CreateBN: React.FC = () => {
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

  export default CreateBN;
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
                const validateDate = (dateString: string): boolean => {
                  if (!dateString) return true;
                  const dateRegex = /^(\d{1,2})\/(\d{1,2})\/(\d{2,4})$/;
                  const match = dateString.match(dateRegex);
                  if (!match) return false;
                  let day = parseInt(match[1], 10);
                  let month = parseInt(match[2], 10);
                  let year = parseInt(match[3], 10);
                  if (year < 100) {
                    year += year < 50 ? 2000 : 1900;
                  }
                  const date = new Date(year, month - 1, day);
                  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
                    return false;
                  }
                  const minDate = new Date(1900, 0, 1);
                  const maxDate = new Date();
                  return date >= minDate && date <= maxDate;
                };

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
