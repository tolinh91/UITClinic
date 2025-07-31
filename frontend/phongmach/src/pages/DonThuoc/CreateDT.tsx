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
  { label: "Hỗ trợ kỹ thuật", icon: "💡", route: "/hotro" },
  { label: "Cài đặt", icon: "⚙️", route: "/caidat" },
];

const CreateDT = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState("Đơn thuốc");
  const [menuOpen, setMenuOpen] = useState(false);

  React.useEffect(() => {
    const found = sidebarItems.find(item => item.route === location.pathname);
    if (found) setActive(found.label);
  }, [location.pathname]);

  // Form state
  const [form, setForm] = useState({
    patient: '',
    bhyt: false,
    doctor: '',
    medicine: '',
    quantity: '',
    usage: '',
  });
  // Danh sách thuốc đã thêm
  const [medicines, setMedicines] = useState<{ medicine: string; quantity: string; usage: string }[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({
      ...f,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Thêm thuốc vào danh sách
  const handleAddMedicine = () => {
    if (!form.medicine || !form.quantity || !form.usage) return;
    setMedicines(prev => [
      ...prev,
      {
        medicine: form.medicine,
        quantity: form.quantity,
        usage: form.usage
      }
    ]);
    setForm(f => ({ ...f, medicine: '', quantity: '', usage: '' }));
  };

  // Xóa thuốc khỏi danh sách
  const handleRemoveMedicine = (idx: number) => {
    setMedicines(prev => prev.filter((_, i) => i !== idx));
  };

  // Lưu đơn thuốc vào localStorage và chuyển về QLDonThuoc
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.patient || !form.doctor || medicines.length === 0) {
      alert('Vui lòng nhập đầy đủ thông tin và thêm ít nhất 1 thuốc!');
      return;
    }
    const newDonThuoc = {
      patient: form.patient,
      bhyt: form.bhyt,
      doctor: form.doctor,
      medicines: medicines,
      createdAt: new Date().toISOString()
    };
    // Lưu vào localStorage
    const oldList = JSON.parse(localStorage.getItem('donthuoc_list') || '[]');
    localStorage.setItem('donthuoc_list', JSON.stringify([...oldList, newDonThuoc]));
    navigate('/qldonthuoc');
  };

  return (
    <form style={{ minHeight: '100vh', width: '100vw', display: 'flex', background: '#f5f6fa' }} onSubmit={handleSave}>
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
        {/* Title */}
        <div style={{ display: 'flex', alignItems: 'center', padding: '0 32px', marginTop: 18 }}>
          <div style={{ fontSize: '2rem', fontWeight: 600 }}>Thêm đơn thuốc</div>
        </div>
        {/* Form card */}
        <div style={{ padding: '0 32px', marginTop: 18, marginBottom: 24 }}>
          <div style={{ background: '#fff', borderRadius: 16, padding: 32, maxWidth: 900, margin: '0 auto', boxShadow: '0 2px 12px #0001' }}>
            {/* Thông tin đơn thuốc */}
            <div style={{ fontWeight: 600, fontSize: 22, marginBottom: 8 }}>Thông tin đơn thuốc</div>
            <div style={{ color: '#1565c0', fontWeight: 500, fontSize: 17, marginBottom: 4 }}>Điền đầy đủ thông tin bên dưới</div>
            <div style={{ display: 'flex', gap: 24, marginBottom: 18 }}>
              <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label style={{ fontWeight: 500 }}>Tên bệnh nhân</label>
                <input name="patient" value={form.patient ?? ''} onChange={handleChange} style={{ padding: '10px 14px', borderRadius: 8, border: '1px solid #ccc', fontSize: 16 }} placeholder="Nhập tên bệnh nhân..." />
              </div>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8 }}>
                <label style={{ fontWeight: 500 }}>Thẻ BHYT</label>
                <input type="checkbox" name="bhyt" checked={!!form.bhyt} onChange={handleChange} style={{ width: 22, height: 22 }} />
              </div>
              <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label style={{ fontWeight: 500 }}>Bác sĩ</label>
                <select name="doctor" value={form.doctor ?? ''} onChange={handleChange} style={{ padding: '10px 14px', borderRadius: 8, border: '1px solid #ccc', fontSize: 16 }}>
                  <option value="">Bác sĩ</option>
                  <option value="BS01">BS01</option>
                  <option value="BS02">BS02</option>
                </select>
              </div>
            </div>
            {/* Chi tiết đơn thuốc */}
            <div style={{ fontWeight: 600, fontSize: 22, marginBottom: 8, marginTop: 24, color: '#1565c0', fontStyle: 'italic' }}>Chi tiết đơn thuốc</div>
            <div style={{ display: 'flex', gap: 18, marginBottom: 18, alignItems: 'flex-end' }}>
              <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label style={{ fontWeight: 500 }}>Tên thuốc</label>
                <input name="medicine" value={form.medicine ?? ''} onChange={handleChange} style={{ padding: '10px 14px', borderRadius: 8, border: '1px solid #ccc', fontSize: 16 }} placeholder="Tên thuốc..." />
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label style={{ fontWeight: 500 }}>Số lượng</label>
                <input name="quantity" value={form.quantity ?? ''} onChange={handleChange} style={{ padding: '10px 14px', borderRadius: 8, border: '1px solid #ccc', fontSize: 16 }} placeholder="Số lượng..." />
              </div>
              <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label style={{ fontWeight: 500 }}>Cách dùng</label>
                <input name="usage" value={form.usage ?? ''} onChange={handleChange} style={{ padding: '10px 14px', borderRadius: 8, border: '1px solid #ccc', fontSize: 16 }} placeholder="Cách dùng..." />
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', gap: 8, alignItems: 'flex-end', marginBottom: 4 }}>
                <button type="button" style={{ width: 48, height: 48, background: '#1ec9a4', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 500, fontSize: 24, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Thêm" onClick={handleAddMedicine}>
                  <span style={{ display: 'inline-block', fontSize: 24 }}>+</span>
                </button>
              </div>
            </div>
            {/* Danh sách thuốc đã thêm */}
            {medicines.length > 0 && (
              <div style={{ marginTop: 12, marginBottom: 18 }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 15 }}>
                  <thead>
                    <tr style={{ background: '#e3f2fd' }}>
                      <th style={{ padding: '8px 12px', border: '1px solid #ddd' }}>Tên thuốc</th>
                      <th style={{ padding: '8px 12px', border: '1px solid #ddd' }}>Số lượng</th>
                      <th style={{ padding: '8px 12px', border: '1px solid #ddd' }}>Cách dùng</th>
                      <th style={{ padding: '8px 12px', border: '1px solid #ddd' }}>Xóa</th>
                    </tr>
                  </thead>
                  <tbody>
                    {medicines.map((med, idx) => (
                      <tr key={idx}>
                        <td style={{ padding: '8px 12px', border: '1px solid #ddd' }}>{med.medicine}</td>
                        <td style={{ padding: '8px 12px', border: '1px solid #ddd' }}>{med.quantity}</td>
                        <td style={{ padding: '8px 12px', border: '1px solid #ddd' }}>{med.usage}</td>
                        <td style={{ padding: '8px 12px', border: '1px solid #ddd', textAlign: 'center' }}>
                          <button type="button" style={{ background: '#e53935', color: '#fff', border: 'none', borderRadius: 6, padding: '4px 10px', cursor: 'pointer' }} title="Xóa" onClick={() => handleRemoveMedicine(idx)}>
                            <span style={{ fontSize: 18 }}>&#128465;</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {/* Footer buttons */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 18, marginTop: 32 }}>
              <button type="button" style={{ background: '#263238', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 40px', fontWeight: 500, fontSize: 17, cursor: 'pointer' }} onClick={() => navigate('/qldonthuoc')}>Quay lại</button>
              <button type="submit" style={{ background: '#3949ab', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 40px', fontWeight: 500, fontSize: 17, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ display: 'inline-block', fontSize: 22, color: '#1976d2' }}>&#10003;</span>
                Lưu
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreateDT;
