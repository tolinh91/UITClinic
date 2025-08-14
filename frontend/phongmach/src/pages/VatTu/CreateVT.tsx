import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import appIcon from '../../assets/appicon.png';
import { useVatTu } from '../../contexts/VatTuContext';
import SuccessNotification from '../../components/SuccessNotification';

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

const CreateVT = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addVatTu } = useVatTu();
  const [active, setActive] = useState("Vật tư");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  // Form state
  const [formData, setFormData] = useState({
    tenVatTu: "",
    ngayNhap: "",
    gia: "",
    hanSuDung: "",
    loaiVatTu: "",
    viTriLuuTru: "",
    soLuong: "",
    nhaCungCap: ""
  });

  // Highlight sidebar item based on current route
  React.useEffect(() => {
    const found = sidebarItems.find(item => item.route === location.pathname || (location.pathname.startsWith('/qlvattu') && item.route === '/qlvattu'));
    if (found) setActive(found.label);
  }, [location.pathname]);

  const handleSidebarClick = (item: typeof sidebarItems[0]) => {
    navigate(item.route);
  };

  const handleMenuSelect = (option: string) => {
    setMenuOpen(false);
    if (option === "Thông tin cá nhân") navigate("/profile");
    else if (option === "Đổi mật khẩu") navigate("/changepassword");
    else if (option === "Thoát") navigate("/login");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    // Kiểm tra các trường bắt buộc
    if (!formData.tenVatTu.trim()) {
      alert("Vui lòng nhập tên vật tư");
      return;
    }

    // Chuyển đổi định dạng ngày từ YYYY-MM-DD sang DD/MM/YYYY
    const formatDate = (dateString: string) => {
      if (!dateString) return "";
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    };

    // Tạo object vật tư mới
    const newVatTu = {
      name: formData.tenVatTu,
      price: formData.gia || "0",
      type: formData.loaiVatTu || "Khác",
      storage: formData.viTriLuuTru || "Chưa xác định",
      dateImport: formatDate(formData.ngayNhap),
      expiry: formatDate(formData.hanSuDung),
      stock: formData.soLuong || "0",
      supplier: formData.nhaCungCap || "Chưa xác định"
    };

    // Thêm vật tư vào danh sách
    addVatTu(newVatTu);

    // Hiển thị thông báo thành công
    setNotificationMessage(`Thêm mới ${formData.tenVatTu} thành công`);
    setShowNotification(true);

    // Chờ 1.5 giây rồi điều hướng về trang danh sách
    setTimeout(() => {
      navigate("/qlvattu");
    }, 1500);
  };

  const handleCancel = () => {
    navigate("/qlvattu");
  };

  return (
    <>
      <div style={{ minHeight: '100vh', width: '100vw', display: 'flex', background: '#f5f6fa' }}>
        {/* Sidebar */}
        <div
          style={{
            width: 250,
            minWidth: 70,
            background: '#2d4a7a',
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '24px 0',
            boxShadow: '2px 0 8px rgba(0,0,0,0.1)'
          }}
        >
          <div style={{ marginBottom: 32, textAlign: 'center' }}>
            <img src={appIcon} alt="UIT Clinic" style={{ width: 48, height: 48, marginBottom: 8 }} />
            <div style={{ fontSize: 18, fontWeight: 600 }}>UIT CLINIC</div>
          </div>

          <div style={{ width: '100%', flex: 1 }}>
            {sidebarItems.map(item => (
              <div
                key={item.label}
                onClick={() => handleSidebarClick(item)}
                style={{
                  padding: '16px 24px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  background: active === item.label ? 'rgba(255,255,255,0.1)' : 'transparent',
                  borderRight: active === item.label ? '4px solid #fff' : 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                <span style={{ fontSize: 16 }}>{item.icon}</span>
                <span style={{ fontSize: 14, fontWeight: 500 }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Header */}
          <div
            style={{
              background: '#fff',
              padding: '16px 32px',
              borderBottom: '1px solid #e0e6ed',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <button
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: 20,
                  cursor: 'pointer',
                  padding: 8
                }}
              >
                ☰
              </button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <img src={appIcon} alt="User" style={{ width: 32, height: 32, borderRadius: '50%' }} />
                <span style={{ fontWeight: 500 }}>Mạnh</span>
              </div>
              <button
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18 }}
                onClick={() => setMenuOpen(!menuOpen)}
              >
                ▼
              </button>
              {menuOpen && (
                <div style={{ position: 'absolute', right: 0, top: 32, background: '#fff', boxShadow: '0 2px 8px #0002', borderRadius: 8, minWidth: 220, zIndex: 10 }}>
                  <div onClick={() => handleMenuSelect('Thông tin cá nhân')}
                    style={{ padding: '12px 28px', cursor: 'pointer', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', gap: 12, whiteSpace: 'nowrap' }}>
                    <span>👤</span> Thông tin cá nhân
                  </div>
                  <div onClick={() => handleMenuSelect('Đổi mật khẩu')}
                    style={{ padding: '12px 28px', cursor: 'pointer', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', gap: 12, whiteSpace: 'nowrap' }}>
                    <span>🔑</span> Đổi mật khẩu
                  </div>
                  <div onClick={() => handleMenuSelect('Thoát')}
                    style={{ padding: '12px 28px', cursor: 'pointer', color: 'red', display: 'flex', alignItems: 'center', gap: 12, whiteSpace: 'nowrap' }}>
                    <span>⏻</span> Thoát
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Main content area */}
          <div style={{ flex: 1, padding: 32, overflow: 'auto' }}>
            <div style={{ fontSize: 18, color: '#888', marginBottom: 8 }}>Quản lý</div>
            <h2 style={{ color: "#2d4a7a", fontWeight: 600, marginBottom: 18 }}>Thêm vật tư</h2>
            
            <div style={{ background: '#fff', borderRadius: 16, padding: 32, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <div style={{ color: '#4a90e2', fontSize: 16, marginBottom: 24, fontWeight: 500 }}>
                Điền đầy đủ thông tin có bên dưới
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                {/* Cột trái */}
                <div>
                  <div style={{ marginBottom: 20 }}>
                    <label style={{ display: 'block', marginBottom: 8, fontWeight: 500, color: '#333' }}>
                      Tên vật tư (*)
                    </label>
                    <input
                      type="text"
                      name="tenVatTu"
                      value={formData.tenVatTu}
                      onChange={handleInputChange}
                      placeholder="Nhập tên vật tư"
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '1px solid #ddd',
                        borderRadius: 8,
                        fontSize: 14,
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <label style={{ display: 'block', marginBottom: 8, fontWeight: 500, color: '#333' }}>
                      Giá (VNĐ)
                    </label>
                    <input
                      type="text"
                      name="gia"
                      value={formData.gia}
                      onChange={handleInputChange}
                      placeholder="100.000"
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '1px solid #ddd',
                        borderRadius: 8,
                        fontSize: 14,
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <label style={{ display: 'block', marginBottom: 8, fontWeight: 500, color: '#333' }}>
                      Loại vật tư
                    </label>
                    <select
                      name="loaiVatTu"
                      value={formData.loaiVatTu}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '1px solid #ddd',
                        borderRadius: 8,
                        fontSize: 14,
                        outline: 'none',
                        background: '#fff'
                      }}
                    >
                      <option value="">Chọn loại vật tư</option>
                      <option value="Dụng cụ y tế">Dụng cụ y tế</option>
                      <option value="Vật tư tiêu hao">Vật tư tiêu hao</option>
                      <option value="Thiết bị">Thiết bị</option>
                      <option value="Khác">Khác</option>
                    </select>
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <label style={{ display: 'block', marginBottom: 8, fontWeight: 500, color: '#333' }}>
                      Vị trí lưu trữ
                    </label>
                    <select
                      name="viTriLuuTru"
                      value={formData.viTriLuuTru}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '1px solid #ddd',
                        borderRadius: 8,
                        fontSize: 14,
                        outline: 'none',
                        background: '#fff'
                      }}
                    >
                      <option value="">Chọn vị trí</option>
                      <option value="Kho A">Kho A</option>
                      <option value="Kho B">Kho B</option>
                      <option value="Phòng khám">Phòng khám</option>
                      <option value="Phòng xét nghiệm">Phòng xét nghiệm</option>
                    </select>
                  </div>
                </div>

                {/* Cột phải */}
                <div>
                  <div style={{ marginBottom: 20 }}>
                    <label style={{ display: 'block', marginBottom: 8, fontWeight: 500, color: '#333' }}>
                      Ngày nhập
                    </label>
                    <input
                      type="date"
                      name="ngayNhap"
                      value={formData.ngayNhap}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '1px solid #ddd',
                        borderRadius: 8,
                        fontSize: 14,
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <label style={{ display: 'block', marginBottom: 8, fontWeight: 500, color: '#333' }}>
                      Hạn sử dụng
                    </label>
                    <input
                      type="date"
                      name="hanSuDung"
                      value={formData.hanSuDung}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '1px solid #ddd',
                        borderRadius: 8,
                        fontSize: 14,
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <label style={{ display: 'block', marginBottom: 8, fontWeight: 500, color: '#333' }}>
                      Số lượng
                    </label>
                    <input
                      type="number"
                      name="soLuong"
                      value={formData.soLuong}
                      onChange={handleInputChange}
                      placeholder="20"
                      min="1"
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '1px solid #ddd',
                        borderRadius: 8,
                        fontSize: 14,
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <label style={{ display: 'block', marginBottom: 8, fontWeight: 500, color: '#333' }}>
                      Nhà cung cấp
                    </label>
                    <input
                      type="text"
                      name="nhaCungCap"
                      value={formData.nhaCungCap}
                      onChange={handleInputChange}
                      placeholder="Nhập tên nhà cung cấp"
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '1px solid #ddd',
                        borderRadius: 8,
                        fontSize: 14,
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 32, paddingTop: 24, borderTop: '1px solid #eee' }}>
                <button
                  onClick={handleCancel}
                  style={{
                    padding: '12px 24px',
                    border: '1px solid #ddd',
                    borderRadius: 8,
                    background: '#f8f9fa',
                    color: '#666',
                    cursor: 'pointer',
                    fontSize: 14,
                    fontWeight: 500,
                    transition: 'all 0.2s ease'
                  }}
                >
                  Quay lại
                </button>
                <button
                  onClick={handleSubmit}
                  style={{
                    padding: '12px 24px',
                    border: 'none',
                    borderRadius: 8,
                    background: '#4a90e2',
                    color: '#fff',
                    cursor: 'pointer',
                    fontSize: 14,
                    fontWeight: 500,
                    transition: 'all 0.2s ease'
                  }}
                >
                  Thêm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Notification */}
      <SuccessNotification
        message={notificationMessage}
        isVisible={showNotification}
        onClose={() => setShowNotification(false)}
      />
    </>
  );
};

export default CreateVT;
