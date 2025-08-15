
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useVatTu } from '../../contexts/VatTuContext';
import Sidebar from '../../components/Sidebar';
import appIcon from '../../assets/appicon.png';


function QLVatTu() {
  const navigate = useNavigate();
  const { vatTuList, deleteVatTu } = useVatTu();
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [deleteIdx, setDeleteIdx] = useState<number|null>(null);
  const [deletePassword, setDeletePassword] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  const handleSearch = () => {
    return vatTuList.filter(t => t.name.toLowerCase().includes(search.toLowerCase()));
  };

  const handleDelete = (idx: number) => {
    setDeleteIdx(idx);
    setDeletePassword("");
    setDeleteError("");
  };

  const confirmDelete = () => {
    if (deletePassword === "123456" && deleteIdx !== null) {
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
      <Sidebar activePage="Vật tư" />
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
                        {vattu.name}
                      </td>
                      <td style={{ padding: '8px 12px', border: '1px solid #ddd', width: 70 }}>{vattu.price}</td>
                      <td style={{ padding: '8px 12px', border: '1px solid #ddd', width: 100 }}>
                        {vattu.type}
                      </td>
                      <td style={{ padding: '8px 12px', border: '1px solid #ddd', width: 120 }}>
                        {vattu.storage}
                      </td>
                      <td style={{ padding: '8px 12px', border: '1px solid #ddd', width: 100 }}>{vattu.dateImport}</td>
                      <td style={{ padding: '8px 12px', border: '1px solid #ddd', width: 100, color: expiryColor }}>{vattu.expiry}</td>
                      <td style={{ padding: '8px 12px', border: '1px solid #ddd', width: 100, color: vattu.stock ? 'red' : undefined }}>{vattu.stock}</td>
                      <td style={{ padding: '8px 12px', border: '1px solid #ddd', width: 120 }}>{vattu.supplier}</td>
                      <td style={{ padding: '8px 4px', border: '1px solid #ddd', width: 60, textAlign: 'center', verticalAlign: 'middle' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                          <button type="button" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#1ec9a4', fontSize: 22 }} title="Sửa" onClick={() => navigate('/qlvattu/sua', { state: { vatTu: vattu } })}>
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
