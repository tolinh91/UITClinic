import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from '../../components/Sidebar';
import appIcon from '../../assets/appicon.png';

const initialData = [
  {
    id: 1,
    code: "GKB0001",
    patient: "Nguyễn Văn A",
    title: "Cấp cứu",
    room: "Phòng cấp cứu",
    doctor: "BS. Trần Văn B",
    date: "2025-07-25",
    status: "Đã khám",
  },
  {
    id: 2,
    code: "GKB0002",
    patient: "Trần Thị B",
    title: "Nội soi",
    room: "Nội soi",
    doctor: "BS. Nguyễn Văn C",
    date: "2025-07-25",
    status: "Chưa khám",
  },
  {
    id: 3,
    code: "GKB0003",
    patient: "Lê Văn C",
    title: "Khám tổng quát",
    room: "Phòng 101",
    doctor: "BS. Lê Thắng",
    date: "2025-07-24",
    status: "Đã khám",
  },
  {
    id: 4,
    code: "GKB0004",
    patient: "Phạm Thị D",
    title: "Khám mắt",
    room: "Phòng mắt",
    doctor: "BS. Nguyễn Văn A",
    date: "2025-07-23",
    status: "Chưa khám",
  },
  {
    id: 5,
    code: "GKB0005",
    patient: "Ngô Văn E",
    title: "Khám tai mũi họng",
    room: "Phòng TMH",
    doctor: "BS. Trần Thị B",
    date: "2025-07-22",
    status: "Đã khám",
  },
  {
    id: 6,
    code: "GKB0006",
    patient: "Đỗ Thị F",
    title: "Khám da liễu",
    room: "Phòng da liễu",
    doctor: "BS. Phạm Văn C",
    date: "2025-07-21",
    status: "Chưa khám",
  },
  {
    id: 7,
    code: "GKB0007",
    patient: "Bùi Văn G",
    title: "Khám nội tổng quát",
    room: "Phòng 102",
    doctor: "BS. Lê Thắng",
    date: "2025-07-20",
    status: "Đã khám",
  },
  {
    id: 8,
    code: "GKB0008",
    patient: "Vũ Thị H",
    title: "Khám ngoại tổng quát",
    room: "Phòng 103",
    doctor: "BS. Nguyễn Văn A",
    date: "2025-07-19",
    status: "Chưa khám",
  },
  {
    id: 9,
    code: "GKB0009",
    patient: "Trịnh Văn I",
    title: "Khám sản",
    room: "Phòng sản",
    doctor: "BS. Trần Thị B",
    date: "2025-07-18",
    status: "Đã khám",
  },
  {
    id: 10,
    code: "GKB0010",
    patient: "Lý Thị K",
    title: "Khám nhi",
    room: "Phòng nhi",
    doctor: "BS. Phạm Văn C",
    date: "2025-07-17",
    status: "Chưa khám",
  },
  {
    id: 11,
    code: "GKB0011",
    patient: "Phan Văn L",
    title: "Khám tổng quát",
    room: "Phòng 104",
    doctor: "BS. Lê Thắng",
    date: "2025-07-16",
    status: "Đã khám",
  },
  {
    id: 12,
    code: "GKB0012",
    patient: "Đặng Thị M",
    title: "Khám nội soi",
    room: "Phòng nội soi",
    doctor: "BS. Nguyễn Văn A",
    date: "2025-07-15",
    status: "Chưa khám",
  },
];



function QLGKB() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [data, setData] = useState(initialData);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteCode, setDeleteCode] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showAddSuccess, setShowAddSuccess] = useState(false);

  // Check if new GKB was added and show success message
  useEffect(() => {
    const newGKBAdded = localStorage.getItem('newGKBAdded');
    if (newGKBAdded === 'true') {
      setShowAddSuccess(true);
      localStorage.removeItem('newGKBAdded'); // Clean up
      
      // Auto hide after 5 seconds
      const timer = setTimeout(() => {
        setShowAddSuccess(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleMenuSelect = (option: string) => {
    setMenuOpen(false);
    if (option === "Thông tin cá nhân") navigate("/profile");
    else if (option === "Đổi mật khẩu") navigate("/changepassword");
    else if (option === "Thoát") navigate("/login");
  };

  const filtered = data.filter(
    (item) =>
      item.code.toLowerCase().includes(search.toLowerCase()) ||
      item.patient.toLowerCase().includes(search.toLowerCase()) ||
      item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div style={{ minHeight: '100vh', width: '100vw', display: 'flex', background: '#f5f6fa' }}>
        {/* Sidebar */}
        <Sidebar activePage="Giấy khám bệnh" />
        {/* Main content */}
        <div style={{ flex: 1, padding: '32px 16px 0 16px', minWidth: 0, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <img src={appIcon} alt="logo" style={{ width: 40, borderRadius: '50%' }} />
            <span style={{ fontWeight: 500, fontSize: 18, color: '#2d4a7a' }}>Admin</span>
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
          {/* Main content area */}
          <div style={{ fontSize: 18, color: '#888', marginBottom: 8, marginTop: 8 }}>Quản lý / Danh sách giấy khám bệnh</div>
          <h2 style={{ color: "#2d4a7a", fontWeight: 600, marginBottom: 18 }}>Danh sách giấy khám bệnh</h2>
          <div style={{ background: '#fff', borderRadius: 16, padding: 24, marginBottom: 24 }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 18 }}>
              <span style={{ fontSize: 22, color: '#aaa' }}>🔍</span>
              <input
                type="text"
                placeholder="Nhập thông tin"
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{
                  flex: 1,
                  minWidth: 220,
                  padding: 10,
                  borderRadius: 8,
                  border: '1px solid #ccc',
                  fontSize: 15,
                  marginRight: 8,
                }}
              />
              <button style={{ background: '#1ec9a4', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 28px', fontWeight: 500, fontSize: 16, cursor: 'pointer' }}>Tìm kiếm</button>
            </div>
            <div style={{ overflowX: 'auto', borderRadius: 12 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 900 }}>
                <thead>
                  <tr style={{ background: '#e3ecfa', color: '#2d4a7a' }}>
                    <th style={{ padding: 12 }}>STT</th>
                    <th style={{ padding: 12 }}>Mã</th>
                    <th style={{ padding: 12 }}>Tên bệnh nhân</th>
                    <th style={{ padding: 12 }}>Tiêu đề</th>
                    <th style={{ padding: 12 }}>Phòng khám</th>
                    <th style={{ padding: 12 }}>Bác sĩ</th>
                    <th style={{ padding: 12 }}>Ngày</th>
                    <th style={{ padding: 12 }}>Trạng thái</th>
                    <th style={{ padding: 12 }}>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={9} style={{ textAlign: 'center', padding: 32, color: '#888' }}>Không có dữ liệu phù hợp.</td>
                    </tr>
                  ) : (
                    filtered.map((item, idx) => (
                      <tr key={item.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                        <td style={{ padding: 12, fontSize: 12 }}>{idx + 1}</td>
                        <td style={{ padding: 12, fontSize: 12 }}>{item.code}</td>
                        <td style={{ padding: 12, fontSize: 12 }}>{item.patient}</td>
                        <td style={{ padding: 12, fontSize: 12 }}>{item.title}</td>
                        <td style={{ padding: 12, fontSize: 12 }}>{item.room}</td>
                        <td style={{ padding: 12, fontSize: 12 }}>{item.doctor}</td>
                        <td style={{ padding: 12, fontSize: 12 }}>{item.date}</td>
                        <td style={{ padding: 12 }}>
                          {item.status === "Đã khám" ? (
                            <span style={{ background: '#1ec9a4', color: '#fff', borderRadius: 8, padding: '6px 18px', fontWeight: 500, fontSize: 12 }}>Đã khám</span>
                          ) : (
                            <span style={{ background: '#ffb74d', color: '#fff', borderRadius: 8, padding: '6px 18px', fontWeight: 500, fontSize: 12 }}>Chưa khám</span>
                          )}
                        </td>
                        <td style={{ padding: 12, textAlign: 'center', minWidth: 120 }}>
                          <span
                            title="Xem"
                            style={{ color: '#1ec9a4', fontSize: 12, marginRight: 8, cursor: 'pointer' }}
                            onClick={() => navigate('/qlgkb/detail')}
                          >
                            👁️
                          </span>
                          <span
                            title="In"
                            style={{ color: '#1ec9a4', fontSize: 12, marginRight: 8, cursor: 'pointer' }}
                            onClick={() => navigate('/qlgkb/print')}
                          >
                            🖨️
                          </span>
                          <span
                            title="Sửa"
                            style={{ color: '#1ec9a4', fontSize: 12, marginRight: 8, cursor: 'pointer' }}
                            onClick={() => navigate('/qlgkb/edit')}
                          >
                            ✏️
                          </span>
                          <span
                            title="Xóa"
                            style={{ color: '#e53935', fontSize: 12, cursor: 'pointer' }}
                            onClick={() => { setShowDelete(true); setDeleteCode(item.code); }}
                          >
                            🗑️
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Popup xác nhận xóa */}
        {showDelete && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.2)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div style={{ background: '#fff', borderRadius: 12, padding: 32, minWidth: 340, boxShadow: '0 2px 16px #0003', textAlign: 'center' }}>
              <div style={{ fontSize: 18, marginBottom: 18 }}>
                Bạn có muốn xóa giấy khám bệnh <b>{deleteCode}</b> không?
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 24 }}>
                <button
                  style={{ background: '#e53935', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 32px', fontSize: 16, fontWeight: 500, cursor: 'pointer' }}
                  onClick={() => {
                    setData(prev => prev.filter(item => item.code !== deleteCode));
                    setShowDelete(false);
                    setDeleteCode(null);
                    setShowSuccess(true);
                    setTimeout(() => setShowSuccess(false), 2000);
                  }}
                >
                  Có
                </button>
                <button
                  style={{ background: '#888', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 32px', fontSize: 16, fontWeight: 500, cursor: 'pointer' }}
                  onClick={() => { setShowDelete(false); setDeleteCode(null); }}
                >
                  Không
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Success message for delete */}
      {showSuccess && (
        <div style={{
          position: 'fixed',
          top: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#1ec9a4',
          color: '#fff',
          padding: '12px 32px',
          borderRadius: 8,
          fontSize: 18,
          fontWeight: 500,
          zIndex: 2000,
          boxShadow: '0 2px 8px #0002',
        }}>
          Đã xóa thành công
        </div>
      )}
      
      {/* Success message for add */}
      {showAddSuccess && (
        <div style={{
          position: 'fixed',
          top: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#1ec9a4',
          color: '#fff',
          padding: '12px 32px',
          borderRadius: 8,
          fontSize: 18,
          fontWeight: 500,
          zIndex: 2000,
          boxShadow: '0 2px 8px #0002',
        }}>
          Thông tin giấy khám bệnh được thêm mới thành công
        </div>
      )}
    </>
  );
}

export default QLGKB; 