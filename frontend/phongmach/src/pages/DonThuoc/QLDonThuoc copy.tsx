import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from '../../components/Sidebar';

type Prescription = {
  id: number;
  code: string;
  patient: string;
  doctor: string;
  total: string;
  status: string;
  statusColor: string;
  medicines?: { medicine: string; quantity: string; usage: string }[];
  bhyt?: boolean;
  createdAt?: string;
};

function getPrescriptionsFromStorage(): Prescription[] {
  const list = JSON.parse(localStorage.getItem('donthuoc_list') || '[]');
  // Add code and status for display
  return list.map((item: any, idx: number) => ({
    ...item,
    code: `DT${(idx + 1).toString().padStart(6, '0')}`,
    total: '',
    status: 'Chưa mua',
    statusColor: '#ffa726',
    id: idx + 1,
  }));
}


function QLDonThuoc() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [prescriptions, setPrescriptions] = useState<Prescription[]>(getPrescriptionsFromStorage());
  const [filtered, setFiltered] = useState<Prescription[]>(prescriptions);

  useEffect(() => {
    const list = getPrescriptionsFromStorage();
    setPrescriptions(list);
    setFiltered(list);
  }, []);

  const handleSearch = () => {
    const s = search.trim().toLowerCase();
    if (!s) {
      setFiltered(prescriptions);
    } else {
      setFiltered(prescriptions.filter((p: Prescription) => p.patient.toLowerCase().includes(s)));
    }
  };

  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div style={{ minHeight: '100vh', width: '100vw', display: 'flex', background: '#f5f6fa' }}>
  {/* Sidebar giống MainPage */}
  <Sidebar activePage="Đơn thuốc" />
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
        <div
          style={{
            background: '#fff',
            borderRadius: 16,
            margin: '0 0 24px 0',
            padding: '24px',
            boxShadow: '0 2px 8px #0001',
            maxWidth: '1200px',
            width: '100%',
            alignSelf: 'center',
            minWidth: 280,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
            <div style={{ fontSize: '2rem', fontWeight: 600 }}>Danh sách đơn thuốc</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
            <div style={{ display: 'flex', alignItems: 'center', flex: 1, flexWrap: 'wrap', gap: 12 }}>
              <div style={{ position: 'relative', minWidth: 120, maxWidth: 320, width: '100%', marginRight: 12 }}>
                <span style={{ position: 'absolute', left: 12, top: 10, fontSize: 18, color: '#888' }}>🔍</span>
                <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', width: '100%' }}>
                  <input
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Nhập thông tin"
                    style={{ flex: 1, padding: '10px 14px 10px 30px', borderRadius: 8, border: '1px solid #ccc', fontSize: 16, minWidth: 120, maxWidth: 400, width: '100%' }}
                  />
                  <button type="button" style={{ background: '#1ec9a4', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 500, fontSize: 16, cursor: 'pointer', minWidth: 100, marginLeft: 5, marginTop: 6 }} onClick={handleSearch}>Tìm kiếm</button>
                </div>
              </div>
            </div>
            <button type="button" style={{ background: '#1ec9a4', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 500, fontSize: 16, cursor: 'pointer', minWidth: 140, marginTop: 8 }} onClick={() => navigate('/qldonthuoc/tao')}>+ Thêm đơn thuốc</button>
          </div>
          {/* Table */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '1rem', wordBreak: 'break-word', overflowX: 'auto' }}>
              <thead>
                <tr style={{ background: '#f4f4f4' }}>
                  <th style={{ padding: '12px 8px', fontWeight: 600 }}>STT</th>
                  <th style={{ padding: '12px 8px', fontWeight: 600 }}>Mã</th>
                  <th style={{ padding: '12px 8px', fontWeight: 600 }}>Tên bệnh nhân</th>
                  <th style={{ padding: '12px 8px', fontWeight: 600 }}>Bác sĩ</th>
                  <th style={{ padding: '12px 8px', fontWeight: 600 }}>Tổng tiền (VNĐ)</th>
                  <th style={{ padding: '12px 8px', fontWeight: 600 }}>Trạng thái</th>
                  <th style={{ padding: '12px 8px', fontWeight: 600 }}>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p: Prescription, idx: number) => (
                  <tr key={p.code} style={{ background: '#fff', borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '10px 8px', textAlign: 'center' }}>{idx + 1}</td>
                    <td style={{ padding: '10px 8px', textAlign: 'center' }}>{p.code}</td>
                    <td style={{ padding: '10px 8px' }}>{p.patient}</td>
                    <td style={{ padding: '10px 8px' }}>{p.doctor}</td>
                    <td style={{ padding: '10px 8px', textAlign: 'right' }}>{p.total}</td>
                    <td style={{ padding: '10px 8px', textAlign: 'center' }}>
                      <span style={{ background: p.statusColor, color: '#fff', borderRadius: 8, padding: '6px 18px', fontWeight: 500, fontSize: 15 }}>{p.status}</span>
                    </td>
                    <td style={{ padding: '10px 8px', textAlign: 'center' }}>
                      <span style={{ color: '#1ec9a4', fontSize: 16, marginRight: 8, cursor: 'pointer' }} title="Xem">👁️</span>
                      <span style={{ color: '#1ec9a4', fontSize: 16, marginRight: 8, cursor: 'pointer' }} title="In">🖨️</span>
                      <span style={{ color: '#1ec9a4', fontSize: 16, marginRight: 8, cursor: 'pointer' }} title="Sửa">✏️</span>
                      <span style={{ color: '#e53935', fontSize: 16, cursor: 'pointer' }} title="Xóa">🗑️</span>
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

export default QLDonThuoc;
