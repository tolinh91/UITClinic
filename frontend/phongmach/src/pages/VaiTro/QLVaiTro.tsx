import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from '../../components/Sidebar';

const initialRoles = [
  {
    id: 1,
    tenVaiTro: "Trưởng phòng khám"
  },
  {
    id: 2,
    tenVaiTro: "Bác sĩ"
  },
  {
    id: 3,
    tenVaiTro: "Dược sĩ"
  },
  {
    id: 4,
    tenVaiTro: "Kỹ thuật viên"
  },
  {
    id: 5,
    tenVaiTro: "Điều dưỡng"
  },
  {
    id: 6,
    tenVaiTro: "Kế toán"
  }
];

function QLVaiTro() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [roles, setRoles] = useState(initialRoles);
  const [filteredRoles, setFilteredRoles] = useState(initialRoles);
  const [menuOpen, setMenuOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<any>({});

  // Update filtered roles when roles change
  React.useEffect(() => {
    setFilteredRoles(roles);
  }, [roles]);

  const handleSearch = () => {
    const s = search.trim().toLowerCase();
    if (!s) {
      setFilteredRoles(roles);
    } else {
      setFilteredRoles(roles.filter(role => 
        role.tenVaiTro.toLowerCase().includes(s)
      ));
    }
  };

  const handleEdit = (role: any) => {
    setEditingId(role.id);
    setEditData({ ...role });
  };

  const handleSave = (id: number) => {
    setRoles(roles.map(role => 
      role.id === id ? { ...editData } : role
    ));
    setEditingId(null);
    setEditData({});
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData({});
  };

  const handleInputChange = (field: string, value: string) => {
    setEditData({ ...editData, [field]: value });
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa vai trò này?")) {
      setRoles(roles.filter(role => role.id !== id));
    }
  };

  const handleView = (role: any) => {
    alert(`Xem chi tiết vai trò: ${role.tenVaiTro}`);
  };

  return (
    <div style={{ minHeight: '100vh', width: '100vw', display: 'flex', background: '#f5f6fa' }}>
      {/* Sidebar */}
      <Sidebar activePage="Vai trò" />
      
      {/* Main content */}
      <div style={{ flex: 1, padding: '32px 0 0 0', minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        {/* Top right menu */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 16, flexWrap: 'wrap', padding: '0 32px' }}>
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

        {/* Title & search */}
        <div style={{ background: '#fff', borderRadius: 16, margin: '0 32px', padding: '32px 32px 24px 32px', boxShadow: '0 2px 12px #0001', maxWidth: 1200, alignSelf: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
            <div style={{ fontSize: '2rem', fontWeight: 600, color: '#2d4a7a' }}>Danh sách vai trò</div>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
            <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
              <div style={{ position: 'relative', width: 320, marginRight: 12 }}>
                <span style={{ position: 'absolute', left: 12, top: 10, fontSize: 18, color: '#888' }}>🔍</span>
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Nhập tên vai trò"
                  style={{ width: '70%', padding: '10px 14px 10px 40px', borderRadius: 8, border: '1px solid #ccc', fontSize: 16 }}
                />
              </div>
              <button 
                type="button" 
                style={{ 
                  background: '#1ec9a4', 
                  color: '#fff', 
                  border: 'none', 
                  borderRadius: 8, 
                  padding: '10px 24px', 
                  fontWeight: 500, 
                  fontSize: 16, 
                  cursor: 'pointer' 
                }} 
                onClick={handleSearch}
              >
                Tìm kiếm
              </button>
            </div>
            <button 
              type="button" 
              style={{ 
                background: '#1ec9a4', 
                color: '#fff', 
                border: 'none', 
                borderRadius: 8, 
                padding: '10px 24px', 
                fontWeight: 500, 
                fontSize: 16, 
                cursor: 'pointer',
                minWidth: 140
              }} 
              onClick={() => navigate('/caidat/vaitro/them')}
            >
              + Thêm vai trò
            </button>
          </div>

          {/* Table */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ background: '#f4f4f4' }}>
                  <th style={{ padding: '12px 8px', fontWeight: 600, textAlign: 'center' }}>STT</th>
                  <th style={{ padding: '12px 8px', fontWeight: 600, textAlign: 'left' }}>Tên vai trò</th>
                  <th style={{ padding: '12px 8px', fontWeight: 600, textAlign: 'center' }}>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {filteredRoles.map((role, idx) => (
                  <tr key={role.id} style={{ background: '#fff', borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '10px 8px', textAlign: 'center' }}>{idx + 1}</td>
                    <td style={{ padding: '10px 8px' }}>
                      {editingId === role.id ? (
                        <input
                          type="text"
                          value={editData.tenVaiTro || ''}
                          onChange={(e) => handleInputChange('tenVaiTro', e.target.value)}
                          style={{ width: '200px', padding: '4px', border: '1px solid #ccc', borderRadius: '4px' }}
                        />
                      ) : (
                        role.tenVaiTro
                      )}
                    </td>
                    <td style={{ padding: '10px 8px', textAlign: 'center' }}>
                      {editingId === role.id ? (
                        <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
                          <span 
                            style={{ cursor: 'pointer', fontSize: 20, color: '#1ec9a4' }} 
                            title="Lưu"
                            onClick={() => handleSave(role.id)}
                          >
                            💾
                          </span>
                          <span 
                            style={{ cursor: 'pointer', fontSize: 20, color: '#e53935' }} 
                            title="Hủy"
                            onClick={handleCancel}
                          >
                            ❌
                          </span>
                        </div>
                      ) : (
                        <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
                          <span 
                            style={{ cursor: 'pointer', fontSize: 20, color: '#1ec9a4' }} 
                            title="Sửa"
                            onClick={() => handleEdit(role)}
                          >
                            ✏️
                          </span>
                          <span 
                            style={{ cursor: 'pointer', fontSize: 20, color: '#e53935' }} 
                            title="Xóa"
                            onClick={() => handleDelete(role.id)}
                          >
                            🗑️
                          </span>
                          <span 
                            style={{ cursor: 'pointer', fontSize: 20, color: '#2196f3' }} 
                            title="Xem chi tiết"
                            onClick={() => handleView(role)}
                          >
                            🔍
                          </span>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QLVaiTro;
