import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from '../../components/Sidebar';
import appIcon from '../../assets/appicon.png';

const initialThuocList = [
  {
    id: "T00001",
    name: "Kháng sinh",
    price: "12000",
    unit: "viên",
    usage: "uống",
    storage: "Tủ thuốc 1",
    dateImport: "01/01/2025",
    expiry: "10/10/2025",
    stock: "10",
    supplier: "Công ty Dược A",
  },
  {
    id: "T00002",
    name: "Hyetla",
    price: "15000",
    unit: "viên",
    usage: "thoa",
    storage: "Tủ thuốc 2",
    dateImport: "15/02/2025",
    expiry: "20/12/2025",
    stock: "20",
    supplier: "Công ty Dược B",
  },
  {
    id: "T00003",
    name: "Paracetamol",
    price: "5000",
    unit: "viên",
    usage: "uống",
    storage: "Tủ thuốc 3",
    dateImport: "10/03/2025",
    expiry: "01/01/2026",
    stock: "50",
    supplier: "Công ty Dược C",
  },
  {
    id: "T00004",
    name: "Vitamin C",
    price: "8000",
    unit: "viên",
    usage: "uống",
    storage: "Tủ thuốc 1",
    dateImport: "20/04/2025",
    expiry: "20/10/2025",
    stock: "30",
    supplier: "Công ty Dược D",
  },
  {
    id: "T00005",
    name: "Thuốc ho",
    price: "10000",
    unit: "chai",
    usage: "uống",
    storage: "Tủ thuốc 2",
    dateImport: "05/05/2025",
    expiry: "05/11/2025",
    stock: "15",
    supplier: "Công ty Dược E",
  },
  {
    id: "T00006",
    name: "Thuốc nhỏ mắt",
    price: "20000",
    unit: "lọ",
    usage: "xịt",
    storage: "Tủ thuốc 3",
    dateImport: "12/06/2025",
    expiry: "12/12/2025",
    stock: "25",
    supplier: "Công ty Dược F",
  },
  {
    id: "T00007",
    name: "Thuốc mỡ",
    price: "18000",
    unit: "tuýp",
    usage: "thoa",
    storage: "Tủ thuốc 4",
    dateImport: "18/07/2025",
    expiry: "18/01/2026",
    stock: "12",
    supplier: "Công ty Dược G",
  },
  {
    id: "T00008",
    name: "Thuốc đặt âm đạo",
    price: "25000",
    unit: "viên",
    usage: "đặt âm đạo",
    storage: "Tủ thuốc 5",
    dateImport: "25/08/2025",
    expiry: "25/02/2026",
    stock: "18",
    supplier: "Công ty Dược H",
  },
  {
    id: "T00009",
    name: "Thuốc nhét hậu môn",
    price: "22000",
    unit: "viên",
    usage: "nhét hậu môn",
    storage: "Tủ thuốc 1",
    dateImport: "30/09/2025",
    expiry: "30/03/2026",
    stock: "22",
    supplier: "Công ty Dược I",
  },
  {
    id: "T00010",
    name: "Thuốc sát trùng",
    price: "12000",
    unit: "chai",
    usage: "xịt",
    storage: "Tủ thuốc 2",
    dateImport: "10/10/2025",
    expiry: "10/04/2026",
    stock: "16",
    supplier: "Công ty Dược J",
  },
  {
    id: "T00011",
    name: "Thuốc bổ tổng hợp",
    price: "30000",
    unit: "hộp",
    usage: "uống",
    storage: "Tủ thuốc 3",
    dateImport: "15/11/2025",
    expiry: "15/05/2026",
    stock: "20",
    supplier: "Công ty Dược K",
  },
];

const QLThuoc = () => {
  // Hàm cập nhật vị trí lưu trữ cho từng thuốc
  const storageOptions = [
    "Tủ thuốc 1", "Tủ thuốc 2", "Tủ thuốc 3", "Tủ thuốc 4", "Tủ thuốc 5"
  ];
  const handleStorageChange = (idx: number, value: string) => {
    setThuocList(list => list.map((thuoc, i) => i === idx ? { ...thuoc, storage: value } : thuoc));
  };
  // Hàm cập nhật cách dùng cho từng thuốc
  const handleUsageChange = (idx: number, value: string) => {
    setThuocList(list => list.map((thuoc, i) => i === idx ? { ...thuoc, usage: value } : thuoc));
  };
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [thuocList, setThuocList] = useState(initialThuocList);
  const usageOptions = [
    "uống", "thoa", "xịt", "nhét hậu môn", "đặt âm đạo"
  ];
  // Popup xác nhận mật khẩu khi xóa
  const [deleteIdx, setDeleteIdx] = useState<number|null>(null);
  const [deletePassword, setDeletePassword] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  // Tài khoản đang đăng nhập là admin@gmail.com, mật khẩu là '1234'
  const currentUser = { email: "admin@gmail.com", password: "1234" };
  const currentPassword = currentUser.password;

  const handleSearch = () => {
    // Tìm kiếm đơn giản theo tên thuốc
    return thuocList.filter(t => t.name.toLowerCase().includes(search.toLowerCase()));
  };

  const handleDelete = (idx: number) => {
    setDeleteIdx(idx);
    setDeletePassword("");
    setDeleteError("");
  };

  const confirmDelete = () => {
    if (deletePassword === currentPassword) {
      setThuocList(list => list.filter((_, i) => i !== deleteIdx));
      setDeleteIdx(null);
      setDeletePassword("");
      setDeleteError("");
      setDeleteSuccess(true);
      setTimeout(() => setDeleteSuccess(false), 2000);
    } else {
      setDeleteError("Sai mật khẩu. Vui lòng thử lại.");
    }
  };

  const cancelDelete = () => {
    setDeleteIdx(null);
    setDeletePassword("");
    setDeleteError("");
  };

  return (
    <div style={{ minHeight: '100vh', width: '100vw', display: 'flex', background: '#f5f6fa', position: 'relative' }}>
      {/* Thông báo xóa thành công */}
      {deleteSuccess && (
        <div style={{ position: 'fixed', top: 24, right: 24, zIndex: 1000 }}>
          <div style={{ background: '#1ec9a4', color: '#fff', padding: '14px 32px', borderRadius: 8, fontWeight: 500, fontSize: 16, boxShadow: '0 2px 8px #0002' }}>
            Xóa Thuốc thành công
          </div>
        </div>
      )}
      {/* Sidebar */}
      <Sidebar activePage="Thuốc" />
      {/* Main content */}
      <div style={{ flex: 1, padding: '32px 0 0 0', minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        {/* Popup xác nhận mật khẩu khi xóa */}
        {deleteIdx !== null && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: '#0006', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ background: '#fff', borderRadius: 12, padding: 32, minWidth: 320, boxShadow: '0 2px 12px #0003', display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 8 }}>Xác nhận xóa thuốc</div>
              <div style={{ fontSize: 15 }}>Vui lòng nhập mật khẩu tài khoản để xác nhận xóa thuốc.</div>
              <input
                type="password"
                value={deletePassword}
                onChange={e => setDeletePassword(e.target.value)}
                placeholder="Nhập mật khẩu"
                style={{ padding: '10px 14px', borderRadius: 8, border: '1px solid #ccc', fontSize: 16 }}
              />
              {deleteError && <div style={{ color: 'red', fontSize: 14 }}>{deleteError}</div>}
              <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                <button type="button" style={{ background: '#1ec9a4', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 28px', fontWeight: 500, fontSize: 16, cursor: 'pointer' }} onClick={confirmDelete}>Xác nhận</button>
                <button type="button" style={{ background: '#eee', color: '#333', border: 'none', borderRadius: 8, padding: '10px 28px', fontWeight: 500, fontSize: 16, cursor: 'pointer' }} onClick={cancelDelete}>Hủy</button>
              </div>
            </div>
          </div>
        )}
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
                <div onClick={() => navigate('/profile')}
                  style={{ padding: '12px 28px', cursor: 'pointer', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', gap: 12, whiteSpace: 'nowrap' }}>
                  <span>👤</span> Thông tin cá nhân
                </div>
                <div onClick={() => navigate('/changepassword')}
                  style={{ padding: '12px 28px', cursor: 'pointer', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', gap: 12, whiteSpace: 'nowrap' }}>
                  <span>🔑</span> Đổi mật khẩu
                </div>
                <div onClick={() => navigate('/login')}
                  style={{ padding: '12px 28px', cursor: 'pointer', color: 'red', display: 'flex', alignItems: 'center', gap: 12, whiteSpace: 'nowrap' }}>
                  <span>⏻</span> Thoát
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Title & Search & Add */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px', marginTop: 18 }}>
          <div style={{ fontSize: '2rem', fontWeight: 600 }}>Danh sách thuốc</div>
          <button type="button" style={{ background: '#1ec9a4', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 32px', fontWeight: 500, fontSize: 18, cursor: 'pointer' }} onClick={() => navigate('/thuoc/tao')}>+ Thêm thuốc</button>
        </div>
        <div style={{ padding: '0 32px', marginTop: 18, marginBottom: 24 }}>
          <div style={{ background: '#fff', borderRadius: 16, padding: 32, maxWidth: 1200, margin: '0 auto', boxShadow: '0 2px 12px #0001' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Nhập tên thuốc" style={{ padding: '10px 14px', borderRadius: 8, border: '1px solid #ccc', fontSize: 16, width: 240 }} />
              <button type="button" style={{ background: '#1ec9a4', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 28px', fontWeight: 500, fontSize: 16, cursor: 'pointer' }} onClick={() => {}}>
                Tìm kiếm
              </button>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
              <thead>
                <tr style={{ background: '#e3f2fd' }}>
                  <th style={{ padding: '8px 12px', border: '1px solid #ddd', width: 40 }}>STT</th>
                  <th style={{ padding: '8px 12px', border: '1px solid #ddd', width: 80 }}>Mã</th>
                  <th style={{ padding: '8px 12px', border: '1px solid #ddd', width: 220 }}>Tên thuốc</th>
                  <th style={{ padding: '8px 12px', border: '1px solid #ddd', width: 70 }}>Giá</th>
                  <th style={{ padding: '8px 12px', border: '1px solid #ddd', width: 70 }}>Đơn vị</th>
                  <th style={{ padding: '8px 12px', border: '1px solid #ddd', width: 120 }}>Cách dùng</th>
                  <th style={{ padding: '8px 12px', border: '1px solid #ddd', width: 120 }}>Vị trí lưu trữ</th>
                  <th style={{ padding: '8px 12px', border: '1px solid #ddd', width: 100 }}>Ngày nhập</th>
                  <th style={{ padding: '8px 12px', border: '1px solid #ddd', width: 100 }}>Hạn sử dụng</th>
                  <th style={{ padding: '8px 12px', border: '1px solid #ddd', width: 70 }}>Tồn kho</th>
                  <th style={{ padding: '8px 12px', border: '1px solid #ddd', width: 120 }}>Nhà cung cấp</th>
                  <th style={{ padding: '8px 4px', border: '1px solid #ddd', width: 60 }}>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {handleSearch().map((thuoc, idx) => {
                  // Tính màu hạn sử dụng
                  let expiryColor = undefined;
                  if (thuoc.expiry) {
                    const now = new Date();
                    const [day, month, year] = thuoc.expiry.split("/").map(Number);
                    const expiryDate = new Date(year, month - 1, day);
                    const diffMonths = (expiryDate.getFullYear() - now.getFullYear()) * 12 + (expiryDate.getMonth() - now.getMonth());
                    if (diffMonths < 6 || (diffMonths === 6 && expiryDate.getDate() < now.getDate())) {
                      expiryColor = 'red';
                    }
                  }
                  return (
                    <tr key={thuoc.id}>
                      <td style={{ padding: '8px 12px', border: '1px solid #ddd' }}>{idx + 1}</td>
                      <td style={{ padding: '8px 12px', border: '1px solid #ddd' }}>{thuoc.id}</td>
                      <td style={{ padding: '8px 12px', border: '1px solid #ddd', width: 220 }}>{thuoc.name}</td>
                      <td style={{ padding: '8px 12px', border: '1px solid #ddd', width: 70 }}>{thuoc.price}</td>
                      <td style={{ padding: '8px 12px', border: '1px solid #ddd', width: 70 }}>{thuoc.unit}</td>
                      <td style={{ padding: '8px 12px', border: '1px solid #ddd', width: 120 }}>
                        <select value={thuoc.usage} style={{ padding: '4px 8px', borderRadius: 6, border: '1px solid #ccc', fontSize: 12, background: '#fff' }} onChange={e => handleUsageChange(idx, e.target.value)}>
                          {usageOptions.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </td>
                      <td style={{ padding: '8px 12px', border: '1px solid #ddd', width: 120 }}>
                        <select value={thuoc.storage} style={{ padding: '4px 8px', borderRadius: 6, border: '1px solid #ccc', fontSize: 12, background: '#fff' }} onChange={e => handleStorageChange(idx, e.target.value)}>
                          {storageOptions.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </td>
                      <td style={{ padding: '8px 12px', border: '1px solid #ddd', width: 100 }}>{thuoc.dateImport}</td>
                      <td style={{ padding: '8px 12px', border: '1px solid #ddd', width: 100, color: expiryColor }}>{thuoc.expiry}</td>
                      <td style={{ padding: '8px 12px', border: '1px solid #ddd', width: 70, color: thuoc.stock ? 'red' : undefined }}>{thuoc.stock}</td>
                      <td style={{ padding: '8px 12px', border: '1px solid #ddd', width: 120 }}>{thuoc.supplier}</td>
                      <td style={{ padding: '8px 4px', border: '1px solid #ddd', width: 60, textAlign: 'center', verticalAlign: 'middle' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                          <button type="button" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#1ec9a4', fontSize: 20 }} title="Sửa" onClick={() => navigate(`/thuoc/edit/${thuoc.id}`)}>
                            <span role="img" aria-label="edit">✏️</span>
                          </button>
                          <button type="button" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'red', fontSize: 20 }} title="Xóa" onClick={() => handleDelete(idx)}>
                            <span role="img" aria-label="delete">🗑️</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QLThuoc;
