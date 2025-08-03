
import React, { useState } from "react";
import appIcon from '../../assets/appicon.png';
import { useNavigate } from "react-router-dom";
import { useVatTu } from '../../contexts/VatTuContext';

const sidebarItems = [
  { label: "Trang chủ", icon: "🏠", route: "/main" },
  { label: "Giấy khám bệnh", icon: "📄", route: "/qlgkb" },
  { label: "Bệnh nhân", icon: "👤", route: "/qlbenhnhan" },
  { label: "Đơn thuốc", icon: "📝", route: "/qldonthuoc" },
  { label: "Thuốc", icon: "➕", route: "/thuoc" },
  { label: "Vật tư", icon: "🔧", route: "/qlvattu" },
  { label: "Hỗ trợ kỹ thuật", icon: "💡", route: "/hotro" },
  { label: "Cài đặt", icon: "⚙️", route: "/caidat" },
];

const storageOptions = [
  "Tủ vật tư 1", "Tủ vật tư 2", "Tủ vật tư 3", "Tủ vật tư 4", "Tủ vật tư 5"
];
const typeOptions = [
  "Tiêu hao dùng 1 lần",
  "Tiêu hao nhiều lần",
  "Dụng cụ hỗ trợ khám",
  "Thiết bị văn phòng"
];

const currentUser = { email: "admin@gmail.com", password: "1234" };

function QLVatTu() {
  const navigate = useNavigate();
  const { vatTuList, deleteVatTu, updateVatTu } = useVatTu();
  const [active, setActive] = useState("Vật tư");
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [deleteIdx, setDeleteIdx] = useState<number|null>(null);
  const [deletePassword, setDeletePassword] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [deleteSuccess, setDeleteSuccess] = useState(false);

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

  const handleNameChange = (idx: number, value: string) => {
    const vatTu = vatTuList[idx];
    if (vatTu) {
      updateVatTu(vatTu.id, { name: value });
    }
  };

  const handleSearch = () => {
    return vatTuList.filter(t => t.name.toLowerCase().includes(search.toLowerCase()));
  };

  const handleDelete = (idx: number) => {
    setDeleteIdx(idx);
    setDeletePassword("");
    setDeleteError("");
  };

  const confirmDelete = () => {
    if (deletePassword === currentUser.password && deleteIdx !== null) {
      const vatTu = vatTuList[deleteIdx];
      if (vatTu) {
        deleteVatTu(vatTu.id);
      }
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
            Xóa Vật Tư thành công
          </div>
        </div>
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
      {/* Main content */}
      <div style={{ flex: 1, padding: '32px 0 0 0', minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        {/* Popup xác nhận mật khẩu khi xóa */}
        {deleteIdx !== null && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: '#0006', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ background: '#fff', borderRadius: 12, padding: 32, minWidth: 320, boxShadow: '0 2px 12px #0003', display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 8 }}>Xác nhận xóa vật tư</div>
              <div style={{ fontSize: 15 }}>Vui lòng nhập mật khẩu tài khoản để xác nhận xóa vật tư.</div>
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
          <div style={{ fontSize: '2rem', fontWeight: 600 }}>Danh sách vật tư</div>
          <button type="button" style={{ background: '#1ec9a4', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 32px', fontWeight: 500, fontSize: 18, cursor: 'pointer' }} onClick={() => navigate('/qlvattu/tao')}>+ Thêm vật tư</button>
        </div>
        <div style={{ padding: '0 32px', marginTop: 18, marginBottom: 24 }}>
          <div style={{ background: '#fff', borderRadius: 16, padding: 32, maxWidth: 1200, margin: '0 auto', boxShadow: '0 2px 12px #0001' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Nhập tên vật tư" style={{ padding: '10px 14px', borderRadius: 8, border: '1px solid #ccc', fontSize: 16, width: 240 }} />
              <button type="button" style={{ background: '#1ec9a4', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 28px', fontWeight: 500, fontSize: 16, cursor: 'pointer' }} onClick={() => {}}>
                Tìm kiếm
              </button>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
              <thead>
                <tr style={{ background: '#e3f2fd' }}>
                  <th style={{ padding: '8px 12px', border: '1px solid #ddd', width: 40 }}>STT</th>
                  <th style={{ padding: '8px 12px', border: '1px solid #ddd', width: 80 }}>Mã</th>
                  <th style={{ padding: '8px 12px', border: '1px solid #ddd', width: 220 }}>Tên vật tư</th>
                  <th style={{ padding: '8px 12px', border: '1px solid #ddd', width: 70 }}>Giá (VNĐ)</th>
                  <th style={{ padding: '8px 12px', border: '1px solid #ddd', width: 100 }}>Loại vật tư</th>
                  <th style={{ padding: '8px 12px', border: '1px solid #ddd', width: 120 }}>Vị trí lưu trữ</th>
                  <th style={{ padding: '8px 12px', border: '1px solid #ddd', width: 100 }}>Ngày nhập</th>
                  <th style={{ padding: '8px 12px', border: '1px solid #ddd', width: 100 }}>Hạn sử dụng</th>
                  <th style={{ padding: '8px 12px', border: '1px solid #ddd', width: 100 }}>Số lượng còn (cái)</th>
                  <th style={{ padding: '8px 12px', border: '1px solid #ddd', width: 120 }}>Nhà cung cấp</th>
                  <th style={{ padding: '8px 4px', border: '1px solid #ddd', width: 60 }}>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {handleSearch().map((vattu, idx) => {
                  // Tính màu hạn sử dụng
                  let expiryColor = undefined;
                  if (vattu.expiry) {
                    const now = new Date();
                    const [day, month, year] = vattu.expiry.split("/").map(Number);
                    const expiryDate = new Date(year, month - 1, day);
                    const diffMonths = (expiryDate.getFullYear() - now.getFullYear()) * 12 + (expiryDate.getMonth() - now.getMonth());
                    if (diffMonths < 6 || (diffMonths === 6 && expiryDate.getDate() < now.getDate())) {
                      expiryColor = 'red';
                    }
                  }
                  return (
                    <tr key={vattu.id}>
                      <td style={{ padding: '8px 12px', border: '1px solid #ddd' }}>{idx + 1}</td>
                      <td style={{ padding: '8px 12px', border: '1px solid #ddd' }}>{vattu.id}</td>
                      <td style={{ padding: '8px 12px', border: '1px solid #ddd', width: 220 }}>
                        {nameOptionsByType[vattu.type] ? (
                          <select value={vattu.name} style={{ padding: '4px 8px', borderRadius: 6, border: '1px solid #ccc', fontSize: 12, background: '#fff' }} onChange={e => handleNameChange(idx, e.target.value)}>
                            {nameOptionsByType[vattu.type].map(opt => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </select>
                        ) : (
                          vattu.name
                        )}
                      </td>
                      <td style={{ padding: '8px 12px', border: '1px solid #ddd', width: 70 }}>{vattu.price}</td>
                      <td style={{ padding: '8px 12px', border: '1px solid #ddd', width: 100 }}>
                        <select value={vattu.type} style={{ padding: '4px 8px', borderRadius: 6, border: '1px solid #ccc', fontSize: 12, background: '#fff' }} onChange={e => {
                          const newType = e.target.value;
                          const newName = nameOptionsByType[newType]?.[0] || vattu.name;
                          updateVatTu(vattu.id, { type: newType, name: newName });
                        }}>
                          {typeOptions.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </td>
                      <td style={{ padding: '8px 12px', border: '1px solid #ddd', width: 120 }}>
                        <select value={vattu.storage} style={{ padding: '4px 8px', borderRadius: 6, border: '1px solid #ccc', fontSize: 12, background: '#fff' }} onChange={e => updateVatTu(vattu.id, { storage: e.target.value })}>
                          {storageOptions.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </td>
                      <td style={{ padding: '8px 12px', border: '1px solid #ddd', width: 100 }}>{vattu.dateImport}</td>
                      <td style={{ padding: '8px 12px', border: '1px solid #ddd', width: 100, color: expiryColor }}>{vattu.expiry}</td>
                      <td style={{ padding: '8px 12px', border: '1px solid #ddd', width: 100, color: vattu.stock ? 'red' : undefined }}>{vattu.stock}</td>
                      <td style={{ padding: '8px 12px', border: '1px solid #ddd', width: 120 }}>{vattu.supplier}</td>
                      <td style={{ padding: '8px 4px', border: '1px solid #ddd', width: 60, textAlign: 'center', verticalAlign: 'middle' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                          <button type="button" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#1ec9a4', fontSize: 20 }} title="Sửa" onClick={() => navigate('/qlvattu/sua', { state: { vatTu: vattu } })}>
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
}

export default QLVatTu;
