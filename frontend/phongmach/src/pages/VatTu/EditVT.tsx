import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useVatTu } from '../../contexts/VatTuContext';
import SuccessNotification from '../../components/SuccessNotification';
import appIcon from '../../assets/appicon.png';

const sidebarItems = [
  { label: "Trang chủ", icon: "🏠", route: "/main" },
  { label: "Giấy khám bệnh", icon: "📄", route: "/qlgkb" },
  { label: "Bệnh nhân", icon: "👤", route: "/danh-sach-benh-nhan" },
  { label: "Đơn thuốc", icon: "📝", route: "/qldonthuoc" },
  { label: "Thuốc", icon: "➕", route: "/thuoc" },
  { label: "Vật tư", icon: "🔧", route: "/qlvattu" },
  { label: "Hỗ trợ kỹ thuật", icon: "💡", route: "/hotro" },
  { label: "Cài đặt", icon: "⚙️", route: "/caidat" },
];

const typeOptions = [
  "Tiêu hao dùng 1 lần",
  "Tiêu hao nhiều lần", 
  "Dụng cụ hỗ trợ khám",
  "Thiết bị văn phòng"
];

const storageOptions = [
  "Tủ vật tư 1", "Tủ vật tư 2", "Tủ vật tư 3", "Tủ vật tư 4", "Tủ vật tư 5"
];

// Các lựa chọn cho tên vật tư theo loại
const nameOptionsByType: Record<string, string[]> = {
  "Tiêu hao dùng 1 lần": [
    "Găng tay cao su",
    "Găng tay nitrile",
    "Khẩu trang 3 lớp",
    "Kim tiêm 23G/25G",
    "Ống tiêm 1ml",
    "Ống tiêm 3ml",
    "Ống tiêm 5ml",
    "Gạc vô trùng",
    "Bông thấm",
    "Băng cuộn",
    "Ống nghiệm máu",
    "Que thử đường huyết",
    "Que thử nước tiểu"
  ],
  "Tiêu hao nhiều lần": [
    "Cồn 70 độ",
    "Chlorhexidine",
    "Gel rửa tay",
    "Khăn lau tay",
    "Giấy khám bệnh",
    "Giấy xét nghiệm",
    "Tăm bông vô trùng",
    "Que đè lưỡi gỗ"
  ],
  "Dụng cụ hỗ trợ khám": [
    "Đèn soi tai",
    "Gương soi họng",
    "Ống nội soi nhỏ",
    "Máy đo huyết áp điện tử",
    "Máy đo huyết áp thủy ngân",
    "Ống nghe y tế 1 đầu",
    "Ống nghe y tế 2 đầu",
    "Glucometer",
    "Que thử đường huyết",
    "Nhiệt kế hồng ngoại",
    "Nhiệt kế điện tử",
    "Máy xét nghiệm nước tiểu",
    "Máy test nhanh nước tiểu"
  ],
  "Thiết bị văn phòng": [
    "Máy in phiếu khám",
    "Giấy in toa thuốc",
    "Thẻ từ",
    "Hồ sơ",
    "Sổ khám",
    "Đơn thuốc",
    "Hóa đơn"
  ]
};

function EditVT() {
  const navigate = useNavigate();
  const location = useLocation();
  const { updateVatTu } = useVatTu();
  const [active] = useState("Vật tư");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    price: "",
    type: "",
    storage: "",
    dateImport: "",
    expiry: "",
    stock: "",
    supplier: ""
  });

  // Load existing data from location state
  useEffect(() => {
    if (location.state?.vatTu) {
      const vatTu = location.state.vatTu;
      setFormData({
        id: vatTu.id,
        name: vatTu.name,
        price: vatTu.price,
        type: vatTu.type,
        storage: vatTu.storage,
        dateImport: vatTu.dateImport,
        expiry: vatTu.expiry,
        stock: vatTu.stock,
        supplier: vatTu.supplier
      });
    }
  }, [location.state]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.price || !formData.type || !formData.storage || 
        !formData.dateImport || !formData.expiry || !formData.stock || !formData.supplier) {
      alert("Vui lòng điền đầy đủ thông tin");
      return;
    }

    // Update the vatTu
    updateVatTu(formData.id, {
      name: formData.name,
      price: formData.price,
      type: formData.type,
      storage: formData.storage,
      dateImport: formData.dateImport,
      expiry: formData.expiry,
      stock: formData.stock,
      supplier: formData.supplier
    });

    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      navigate('/qlvattu');
    }, 2000);
  };

  const handleCancel = () => {
    navigate('/qlvattu');
  };

  return (
    <div style={{ minHeight: '100vh', width: '100vw', display: 'flex', background: '#f5f6fa', position: 'relative' }}>
      {/* Success Notification */}
      {showSuccess && (
        <SuccessNotification 
          message={`Cập nhật ${formData.name} thành công`}
          isVisible={showSuccess}
          onClose={() => setShowSuccess(false)}
        />
      )}

      {/* Sidebar */}
      <div style={{ width: 250, minWidth: 70, background: '#2d4a7a', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 24, position: 'relative' }}>
        <img src={appIcon} alt="logo" style={{ width: '70%', maxWidth: 90, minWidth: 50, borderRadius: '50%', marginBottom: 24, background: '#fff', objectFit: 'cover' }} />
        {sidebarItems.map(item => (
          <div
            key={item.label}
            onClick={() => navigate(item.route)}
            style={{
              width: '90%',
              padding: '12px 16px',
              margin: '4px 0',
              borderRadius: 8,
              cursor: 'pointer',
              background: active === item.label ? '#1e3a8a' : 'transparent',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              fontSize: 14,
              fontWeight: 500,
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              if (active !== item.label) {
                e.currentTarget.style.background = '#1e40af';
              }
            }}
            onMouseOut={(e) => {
              if (active !== item.label) {
                e.currentTarget.style.background = 'transparent';
              }
            }}
          >
            <span style={{ fontSize: 18 }}>{item.icon}</span>
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '24px 32px' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 28, fontWeight: 'bold', color: '#1e293b', marginBottom: 8 }}>
              Chỉnh sửa vật tư
            </h1>
            <p style={{ margin: 0, fontSize: 16, color: '#64748b' }}>
              Điền đầy đủ thông tin có bên dưới
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
                    Tên vật tư
                  </label>
                  {formData.type && nameOptionsByType[formData.type] ? (
                    <select
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        fontSize: '14px',
                        outline: 'none',
                        background: '#fff',
                        cursor: 'pointer'
                      }}
                    >
                      <option value="">Chọn tên vật tư</option>
                      {nameOptionsByType[formData.type].map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Nhập tên vật tư"
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
                  )}
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                    Giá (VNĐ)
                  </label>
                  <input
                    type="text"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
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
                    Loại vật tư
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => {
                      const newType = e.target.value;
                      const newName = nameOptionsByType[newType]?.[0] || '';
                      setFormData({ ...formData, type: newType, name: newName });
                    }}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '14px',
                      outline: 'none',
                      background: '#fff',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="">Chọn loại vật tư</option>
                    {typeOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                    Vị trí lưu trữ
                  </label>
                  <select
                    value={formData.storage}
                    onChange={(e) => setFormData({ ...formData, storage: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '14px',
                      outline: 'none',
                      background: '#fff',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="">Chọn vị trí lưu trữ</option>
                    {storageOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Right Column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                    Ngày nhập
                  </label>
                  <input
                    type="text"
                    value={formData.dateImport}
                    onChange={(e) => setFormData({ ...formData, dateImport: e.target.value })}
                    placeholder="dd/mm/yyyy"
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
                    Hạn sử dụng
                  </label>
                  <input
                    type="text"
                    value={formData.expiry}
                    onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                    placeholder="dd/mm/yyyy"
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
                    Số lượng
                  </label>
                  <input
                    type="text"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
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
                    Nhà cung cấp
                  </label>
                  <input
                    type="text"
                    value={formData.supplier}
                    onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
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
                Lưu lại
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditVT;
