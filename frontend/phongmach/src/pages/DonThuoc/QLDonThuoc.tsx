import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from '../../components/Sidebar';

type Prescription = {
  id: number;
  code: string;
  patient_name: string; // đổi tên đúng theo API
  doctor: string;
  total: string;
  status: string;
  statusColor: string;
  medicines?: { medicine: string; quantity: string; usage: string }[];
  bhyt?: boolean;
  createdAt?: string;
};

// Hook tiện dụng lấy query param
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function QLDonThuoc() {
  const navigate = useNavigate();
  const query = useQuery();

  const [search, setSearch] = useState("");
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [filtered, setFiltered] = useState<Prescription[]>([]);

  // Lấy patientId từ query param
  const patientIdParam = query.get("patientId");
  const patientId = patientIdParam ? parseInt(patientIdParam, 10) : null;

  const [selectedPatientName, setSelectedPatientName] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/prescriptions/')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data: Prescription[]) => {
        const prescriptionsWithExtras = data.map((item, idx) => ({
          ...item,
          code: `BN-${(idx + 1).toString().padStart(6, '0')}`,
          statusColor: item.status === 'Chưa mua' ? '#ffa726' : '#66bb6a',
        }));
        setPrescriptions(prescriptionsWithExtras);
        setFiltered(prescriptionsWithExtras);

        if (patientId) {
          const patient = prescriptionsWithExtras.find(p => p.id === patientId);
          setSelectedPatientName(patient ? patient.patient_name : null);
        } else {
          setSelectedPatientName(null);
        }
      })
      .catch(err => {
        console.error("Fetch error:", err);
      });
  }, [patientId]);

  const handleSearch = () => {
    const s = search.trim().toLowerCase();
    if (!s) {
      setFiltered(prescriptions);
    } else {
      setFiltered(
        prescriptions.filter(p => p.patient_name.toLowerCase().includes(s))
      );
    }
  };

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div style={{ minHeight: '100vh', width: '100vw', display: 'flex', background: '#f5f6fa' }}>
      <Sidebar activePage="Đơn thuốc" />
      <div style={{ flex: 1, padding: '32px 0 0 0', minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        {/* Menu trên cùng */}
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
                <div onClick={() => navigate('/profile')} style={{ padding: '12px 28px', cursor: 'pointer', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', gap: 12, whiteSpace: 'nowrap' }}>
                  <span>👤</span> Thông tin cá nhân
                </div>
                <div onClick={() => navigate('/changepassword')} style={{ padding: '12px 28px', cursor: 'pointer', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', gap: 12, whiteSpace: 'nowrap' }}>
                  <span>🔑</span> Đổi mật khẩu
                </div>
                <div onClick={() => navigate('/login')} style={{ padding: '12px 28px', cursor: 'pointer', color: 'red', display: 'flex', alignItems: 'center', gap: 12, whiteSpace: 'nowrap' }}>
                  <span>⏻</span> Thoát
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Hiển thị thông tin bệnh nhân được chọn */}
        <div style={{ margin: '24px auto 0 auto', maxWidth: 1200, width: '100%', padding: '0 24px' }}>
          {patientId ? (
            selectedPatientName ? (
              <div style={{ fontSize: 16, marginBottom: 12 }}>
                🔎 Bệnh nhân được chọn: <b>{selectedPatientName}</b> (ID: {patientId})
              </div>
            ) : (
              <div style={{ fontSize: 16, marginBottom: 12, color: "red" }}>
                Không tìm thấy bệnh nhân với ID {patientId}
              </div>
            )
          ) : (
            <div style={{ fontSize: 16, marginBottom: 12 }}>Vui lòng chọn bệnh nhân để xem đơn thuốc.</div>
          )}
        </div>

        {/* Khối tìm kiếm và bảng */}
        <div style={{ background: '#fff', borderRadius: 16, margin: '0 auto 24px auto', padding: '24px', boxShadow: '0 2px 8px #0001', maxWidth: '1200px', width: '100%' }}>
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
                  <button
                    type="button"
                    style={{ background: '#1ec9a4', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 500, fontSize: 16, cursor: 'pointer', minWidth: 100, marginLeft: 5, marginTop: 6 }}
                    onClick={handleSearch}
                  >
                    Tìm kiếm
                  </button>
                </div>
              </div>
            </div>
            <button
              type="button"
              style={{ background: '#1ec9a4', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 500, fontSize: 16, cursor: 'pointer', minWidth: 140, marginTop: 8 }}
              onClick={() => navigate('/qldonthuoc/tao')}
            >
              + Thêm đơn thuốc
            </button>
          </div>

          {/* Bảng đơn thuốc */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '1rem', wordBreak: 'break-word' }}>
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
                {filtered.map((p, idx) => (
                  <tr key={p.id} style={{ background: '#fff', borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '10px 8px', textAlign: 'center' }}>{idx + 1}</td>
                    <td style={{ padding: '10px 8px', textAlign: 'center' }}>{p.code}</td>
                    <td style={{ padding: '10px 8px' }}>{p.patient_name}</td>
                    <td style={{ padding: '10px 8px' }}>{p.doctor}</td>
                    <td style={{ padding: '10px 8px', textAlign: 'right' }}>{p.total}</td>
                    <td style={{ padding: '10px 8px', textAlign: 'center' }}>
                      <span style={{ background: p.statusColor, color: '#fff', borderRadius: 8, padding: '6px 18px', fontWeight: 500, fontSize: 15 }}>
                        {p.status}
                      </span>
                    </td>
                    <td style={{ padding: '10px 8px', textAlign: 'center' }}>
                      <span title="Xem" style={{ color: '#1ec9a4', fontSize: 16, marginRight: 8, cursor: 'pointer' }}>👁️</span>
                      <span title="In" style={{ color: '#1ec9a4', fontSize: 16, marginRight: 8, cursor: 'pointer' }}>🖨️</span>
                      <span title="Sửa" style={{ color: '#1ec9a4', fontSize: 16, marginRight: 8, cursor: 'pointer' }}>✏️</span>
                      <span title="Xóa" style={{ color: '#e53935', fontSize: 16, cursor: 'pointer' }}>🗑️</span>
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
