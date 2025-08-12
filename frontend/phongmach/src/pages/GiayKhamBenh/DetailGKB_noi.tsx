import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import appIcon from "../../assets/appicon.png";

const sidebarItems = [
  { label: "Trang chủ", icon: "🏠", route: "/main" },
  { label: "Giấy khám bệnh", icon: "📄", route: "/qlgkb" },
  { label: "Bệnh nhân", icon: "👤", route: "/qlbenhnhan" },
  { label: "Đơn thuốc", icon: "📝", route: "/qldonthuoc" },
  { label: "Thuốc", icon: "➕", route: "/thuoc" },
  { label: "Vật tư", icon: "🔧", route: "/qlvattu" },
  { label: "Cài đặt", icon: "⚙️", route: "/caidat" },
];

const DetailGKB: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams<{ id: string }>();

  const [active, setActive] = useState("Giấy khám bệnh");
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  // Đổi active tab khi load
  useEffect(() => {
    const found = sidebarItems.find(
      (item) =>
        item.route === location.pathname ||
        (location.pathname.startsWith("/qlgkb") && item.route === "/qlgkb")
    );
    if (found) setActive(found.label);
  }, [location.pathname]);

  // Lấy dữ liệu giấy khám bệnh từ API
  const {id} = useParams();
    seEffect(() => {
      if (id) {
        axios.get(`http://127.0.0.1:8000/api/giay-kham-benh/${id}/`)
          .then(res => setData(res.data))
          .catch(err => console.error(err));
      }
    }, [id]);

  const handleSidebarClick = (item: typeof sidebarItems[0]) => {
    navigate(item.route);
  };

  const handleMenuSelect = (option: string) => {
    setMenuOpen(false);
    if (option === "Thông tin cá nhân") navigate("/profile");
    else if (option === "Đổi mật khẩu") navigate("/changepassword");
    else if (option === "Thoát") navigate("/login");
  };

  if (loading) {
    return <div style={{ padding: 20 }}>Đang tải dữ liệu...</div>;
  }

  if (!data) {
    return <div style={{ padding: 20, color: "red" }}>Không tìm thấy dữ liệu!</div>;
  }

  const { info, result, prescription } = data;

  return (
    <div style={{ minHeight: "100vh", width: "100vw", display: "flex", background: "#f5f6fa" }}>
      {/* Sidebar */}
      <div
        style={{
          width: 250,
          minWidth: 70,
          background: "#2d4a7a",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 24,
        }}
      >
        <img
          src={appIcon}
          alt="logo"
          style={{
            width: "70%",
            maxWidth: 90,
            minWidth: 50,
            borderRadius: "50%",
            marginBottom: 24,
            background: "#fff",
            objectFit: "cover",
          }}
        />
        {sidebarItems.map((item) => (
          <div
            key={item.label}
            onClick={() => handleSidebarClick(item)}
            style={{
              width: "90%",
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 18px",
              marginBottom: 8,
              borderRadius: 8,
              background: active === item.label ? "#fff" : "transparent",
              color: active === item.label ? "#2d4a7a" : "#fff",
              fontWeight: active === item.label ? 600 : 400,
              cursor: "pointer",
              boxShadow: active === item.label ? "0 2px 8px #0001" : "none",
              transition: "all 0.2s",
              fontSize: "1rem",
            }}
          >
            <span
              style={{
                fontSize: 20,
                color: active === item.label ? "#2d4a7a" : "#e0e6ef",
                filter: active === item.label ? "" : "grayscale(1)",
              }}
            >
              {item.icon}
            </span>
            <span style={{ display: "inline-block", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* Main content */}
      <div style={{ flex: 1, overflowY: "auto", padding: "32px 0 0 0", minWidth: 0, display: "flex", flexDirection: "column" }}>
        {/* Top right menu */}
        <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 16, flexWrap: "wrap", padding: "0 32px" }}>
          <img src={appIcon} alt="logo" style={{ width: 40, borderRadius: "50%" }} />
          <span style={{ fontWeight: 500, fontSize: 18, color: "#2d4a7a" }}>{info.patient}</span>
          <div style={{ position: "relative" }}>
            <button
              style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18 }}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              ▼
            </button>
            {menuOpen && (
              <div style={{ position: "absolute", right: 0, top: 32, background: "#fff", boxShadow: "0 2px 8px #0002", borderRadius: 8, minWidth: 220, zIndex: 10 }}>
                <div onClick={() => handleMenuSelect("Thông tin cá nhân")} style={{ padding: "12px 28px", cursor: "pointer", borderBottom: "1px solid #eee" }}>
                  👤 Thông tin cá nhân
                </div>
                <div onClick={() => handleMenuSelect("Đổi mật khẩu")} style={{ padding: "12px 28px", cursor: "pointer", borderBottom: "1px solid #eee" }}>
                  🔑 Đổi mật khẩu
                </div>
                <div onClick={() => handleMenuSelect("Thoát")} style={{ padding: "12px 28px", cursor: "pointer", color: "red" }}>
                  ⏻ Thoát
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Title */}
        <div style={{ display: "flex", alignItems: "center", padding: "0 32px" }}>
          <div style={{ fontSize: "1.6rem", fontWeight: 500 }}>Thông tin giấy khám bệnh</div>
        </div>

        <div style={{ padding: "0 32px", marginTop: 18, marginBottom: 24 }}>
          {/* Thông tin khám */}
          <div style={{ background: "#fff", borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <div style={{ fontWeight: 700, color: "#2a5ca4", fontSize: 22, marginBottom: 12 }}>Thông tin khám</div>
            <table style={{ width: "100%", fontSize: 12, borderCollapse: "collapse" }}>
              <tbody>
                <tr>
                  <td><b>Mã giấy khám bệnh:</b></td>
                  <td>{info.code}</td>
                  <td><b>Tiêu đề:</b></td>
                  <td>{info.title}</td>
                </tr>
                <tr>
                  <td><b>STT khám:</b></td>
                  <td>{info.stt}</td>
                  <td><b>Tên bệnh nhân:</b></td>
                  <td>{info.patient}</td>
                </tr>
                <tr>
                  <td><b>Tên phòng khám:</b></td>
                  <td>{info.room}</td>
                  <td><b>Trạng thái:</b></td>
                  <td style={{ color: "#1ec9a4" }}>{info.status}</td>
                </tr>
                <tr>
                  <td><b>Tên bác sĩ:</b></td>
                  <td>{info.doctor}</td>
                  <td><b>Giá:</b></td>
                  <td style={{ color: "#1ec9a4" }}>{info.price}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Kết quả khám */}
          <div style={{ background: "#fff", borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <div style={{ fontWeight: 700, color: "#2a5ca4", fontSize: 22, marginBottom: 12 }}>Kết quả khám</div>
            <div style={{ display: "flex", flexWrap: "wrap", fontSize: 12 }}>
              <div><b>Triệu chứng:</b> {result.symptom}</div>
              <div><b>Chẩn đoán:</b> {result.diagnosis}</div>
              <div><b>Hướng dẫn điều trị:</b> {result.instruction}</div>
              <div><b>Dặn dò:</b> {result.warning}</div>
            </div>
          </div>

          {/* Đơn thuốc */}
          <div style={{ background: "#fff", borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <div style={{ fontWeight: 700, color: "#2a5ca4", fontSize: 22, marginBottom: 12 }}>Đơn thuốc</div>
            <div><b>Mã đơn thuốc:</b> {prescription.code}</div>
            <div><b>Tổng tiền:</b> {prescription.total}</div>
            <div><b>Trạng thái:</b> <span style={{ color: "#1ec9a4" }}>{prescription.status}</span></div>

            <div style={{ marginTop: 12 }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#f5f6fa", color: "#2a5ca4" }}>
                    <th>STT</th>
                    <th>Tên thuốc</th>
                    <th>Đơn vị tính</th>
                    <th>Số lượng</th>
                    <th>Cách dùng</th>
                    <th>Giá (VNĐ)</th>
                    <th>Tổng tiền (VNĐ)</th>
                  </tr>
                </thead>
                <tbody>
                  {prescription.details?.map((item: any, idx: number) => (
                    <tr key={idx}>
                      <td style={{ textAlign: "center" }}>{item.stt}</td>
                      <td>{item.name}</td>
                      <td>{item.unit}</td>
                      <td style={{ textAlign: "center" }}>{item.quantity}</td>
                      <td>{item.usage}</td>
                      <td style={{ textAlign: "right" }}>{item.price}</td>
                      <td style={{ textAlign: "right" }}>{item.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button
              style={{
                marginTop: 18,
                background: "#222",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                padding: "8px 32px",
                fontSize: 16,
                fontWeight: 500,
                cursor: "pointer",
              }}
              onClick={() => navigate(-1)}
            >
              Quay lại
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailGKB;