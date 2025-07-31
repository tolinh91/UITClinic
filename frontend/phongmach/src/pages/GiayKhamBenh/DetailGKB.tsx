import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import appIcon from '../../assets/appicon.png';

const sidebarItems = [
  { label: "Trang chủ", icon: "🏠", route: "/main" },
  { label: "Giấy khám bệnh", icon: "📄", route: "/qlgkb" },
  { label: "Bệnh nhân", icon: "👤", route: "/qlbenhnhan" },
  { label: "Đơn thuốc", icon: "📝", route: "/qldonthuoc" },
  { label: "Thuốc", icon: "➕", route: "/thuoc" },
  { label: "Vật tư", icon: "🔧", route: "/qlvattu" },
  { label: "Thanh toán", icon: "💲", route: "/thanhtoan" },
  { label: "Cài đặt", icon: "⚙️", route: "/caidat" },
];

const info = {
  code: "GKB00001",
  title: "Tổng quát",
  stt: 1,
  patient: "Mạnh",
  room: "Phòng xét nghiệm",
  status: "Đã khám",
  payment: "Đã thanh toán",
  doctor: "Lê Thắng",
  price: "300.000 VNĐ",
};

const result = {
  symptom: "Bình thường",
  diagnosis: "",
  instruction: "",
  warning: "",
};

const prescription = {
  code: "DT00001",
  total: "50.000 VNĐ",
  status: "Đã mua",
  details: [
    { stt: 1, name: "Hytelea", unit: "VNĐ", quantity: 2, usage: "1v/ngày", price: "50.000", total: "50.000" },
  ],
};

const DetailGKB: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState("Giấy khám bệnh");
  const [menuOpen, setMenuOpen] = useState(false);

  React.useEffect(() => {
    const found = sidebarItems.find(item => item.route === location.pathname || (location.pathname.startsWith('/qlgkb') && item.route === '/qlgkb'));
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

  return (
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
          paddingTop: 24,
          position: 'relative',
        }}
      >
        <img
          src={appIcon}
          alt="logo"
          style={{
            width: '70%',
            maxWidth: 90,
            minWidth: 50,
            borderRadius: '50%',
            marginBottom: 24,
            background: '#fff',
            objectFit: 'cover',
          }}
        />
        {sidebarItems.map(item => (
          <div
            key={item.label}
            onClick={() => handleSidebarClick(item)}
            style={{
              width: '90%',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '12px 18px',
              marginBottom: 8,
              borderRadius: 8,
              background: active === item.label ? '#fff' : 'transparent',
              color: active === item.label ? '#2d4a7a' : '#fff',
              fontWeight: active === item.label ? 600 : 400,
              cursor: 'pointer',
              boxShadow: active === item.label ? '0 2px 8px #0001' : 'none',
              transition: 'all 0.2s',
              fontSize: '1rem',
            }}
          >
            <span style={{ fontSize: 20, color: active === item.label ? '#2d4a7a' : '#e0e6ef', filter: active === item.label ? '' : 'grayscale(1)' }}>{item.icon}</span>
            <span style={{ display: 'inline-block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.label}</span>
          </div>
        ))}
      </div>
      {/* Main content with scroll */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '32px 0 0 0', minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        {/* Top right menu */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 16, flexWrap: 'wrap', padding: '0 32px' }}>
          <img src={appIcon} alt="logo" style={{ width: 40, borderRadius: '50%' }} />
          <span style={{ fontWeight: 500, fontSize: 18, color: '#2d4a7a' }}>Mạnh</span>
          <div style={{ position: 'relative' }}>
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
        {/* Title and breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', padding: '0 32px' }}>
          <div style={{ fontSize: '1.6rem', fontWeight: 500 }}>Thông tin giấy khám bệnh</div>
        </div>
        <div style={{ padding: '0 32px', marginTop: 18, marginBottom: 24 }}>
          {/* Card 1: Thông tin khám */}
          <div style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <div style={{ fontWeight: 700, color: '#2a5ca4', fontSize: 22, marginBottom: 12 }}>Thông tin khám</div>
            <table style={{ width: '100%', fontSize: 12, borderCollapse: 'collapse' }}>
              <tbody>
                <tr>
                  <td style={{ padding: '6px 8px', color: '#222', width: 180 }}><b>Mã giấy khám bệnh:</b></td>
                  <td style={{ padding: '6px 8px' }}>{info.code}</td>
                  <td style={{ padding: '6px 8px', color: '#222', width: 180 }}><b>Tiêu đề:</b></td>
                  <td style={{ padding: '6px 8px' }}>{info.title}</td>
                </tr>
                <tr>
                  <td style={{ padding: '6px 8px', color: '#222' }}><b>STT khám:</b></td>
                  <td style={{ padding: '6px 8px' }}>{info.stt}</td>
                  <td style={{ padding: '6px 8px', color: '#222' }}><b>Tên bệnh nhân:</b></td>
                  <td style={{ padding: '6px 8px' }}>{info.patient}</td>
                </tr>
                <tr>
                  <td style={{ padding: '6px 8px', color: '#222' }}><b>Tên phòng khám:</b></td>
                  <td style={{ padding: '6px 8px' }}>{info.room}</td>
                  <td style={{ padding: '6px 8px', color: '#222' }}><b>Trạng thái:</b></td>
                  <td style={{ padding: '6px 8px', color: '#1ec9a4' }}>{info.status}</td>
                </tr>
                <tr>
                  <td style={{ padding: '6px 8px', color: '#222' }}><b>Tên bác sĩ:</b></td>
                  <td style={{ padding: '6px 8px' }}>{info.doctor}</td>
                  <td style={{ padding: '6px 8px', color: '#222' }}><b>Thanh toán:</b></td>
                  <td style={{ padding: '6px 8px', color: '#1ec9a4' }}>{info.payment}</td>
                </tr>
                <tr>
                  <td style={{ padding: '6px 8px', color: '#222' }}><b>Giá:</b></td>
                  <td style={{ padding: '6px 8px', color: '#1ec9a4' }}>{info.price}</td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* Card 2: Kết quả khám */}
          <div style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <div style={{ fontWeight: 700, color: '#2a5ca4', fontSize: 22, marginBottom: 12 }}>Kết quả khám</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', fontSize: 12 }}>
              <div style={{ flex: 1, minWidth: 220, marginBottom: 8 }}>
                <b>Triệu chứng:</b> <span style={{ marginLeft: 8 }}>{result.symptom}</span>
              </div>
              <div style={{ flex: 1, minWidth: 220, marginBottom: 8 }}>
                <b>Chẩn đoán:</b> <span style={{ marginLeft: 8 }}>{result.diagnosis}</span>
              </div>
              <div style={{ flex: 1, minWidth: 220, marginBottom: 8 }}>
                <b>Hướng dẫn điều trị:</b> <span style={{ marginLeft: 8 }}>{result.instruction}</span>
              </div>
              <div style={{ flex: 1, minWidth: 220, marginBottom: 8 }}>
                <b>Dặn dò:</b> <span style={{ marginLeft: 8 }}>{result.warning}</span>
              </div>
            </div>
          </div>
          {/* Card 3: Đơn thuốc */}
          <div style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <div style={{ fontWeight: 700, color: '#2a5ca4', fontSize: 22, marginBottom: 12 }}>Đơn thuốc</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', fontSize: 12, marginBottom: 12 }}>
              <div style={{ flex: 1, minWidth: 220, marginBottom: 8 }}>
                <b>Mã đơn thuốc:</b> <span style={{ marginLeft: 8 }}>{prescription.code}</span>
              </div>
              <div style={{ flex: 1, minWidth: 220, marginBottom: 8 }}>
                <b>Tổng tiền:</b> <span style={{ marginLeft: 8 }}>{prescription.total}</span>
              </div>
              <div style={{ flex: 1, minWidth: 220, marginBottom: 8 }}>
                <b>Trạng thái:</b> <span style={{ marginLeft: 8, color: '#1ec9a4' }}>{prescription.status}</span>
              </div>
            </div>
            <div style={{ fontWeight: 500, marginBottom: 8 }}>Chi tiết đơn thuốc</div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 800, background: '#fff' }}>
                <thead>
                  <tr style={{ background: '#f5f6fa', color: '#2a5ca4' }}>
                    <th style={{ padding: 8, border: '1px solid #eee' }}>STT</th>
                    <th style={{ padding: 8, border: '1px solid #eee' }}>Tên thuốc</th>
                    <th style={{ padding: 8, border: '1px solid #eee' }}>Đơn vị tính</th>
                    <th style={{ padding: 8, border: '1px solid #eee' }}>Số lượng</th>
                    <th style={{ padding: 8, border: '1px solid #eee' }}>Cách dùng</th>
                    <th style={{ padding: 8, border: '1px solid #eee' }}>Giá (VNĐ)</th>
                    <th style={{ padding: 8, border: '1px solid #eee' }}>Tổng tiền (VNĐ)</th>
                  </tr>
                </thead>
                <tbody>
                  {prescription.details.map((item, idx) => (
                    <tr key={idx}>
                      <td style={{ padding: 8, border: '1px solid #eee', textAlign: 'center' }}>{item.stt}</td>
                      <td style={{ padding: 8, border: '1px solid #eee' }}>{item.name}</td>
                      <td style={{ padding: 8, border: '1px solid #eee' }}>{item.unit}</td>
                      <td style={{ padding: 8, border: '1px solid #eee', textAlign: 'center' }}>{item.quantity}</td>
                      <td style={{ padding: 8, border: '1px solid #eee' }}>{item.usage}</td>
                      <td style={{ padding: 8, border: '1px solid #eee', textAlign: 'right' }}>{item.price}</td>
                      <td style={{ padding: 8, border: '1px solid #eee', textAlign: 'right' }}>{item.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button style={{ marginTop: 18, background: '#222', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 32px', fontSize: 16, fontWeight: 500, cursor: 'pointer' }} onClick={() => window.history.back()}>Quay lại</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailGKB;
