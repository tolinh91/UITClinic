import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import appIcon from '../../assets/appicon.png';
import Sidebar from '../../components/Sidebar';

// ...existing code...

const CreateDT = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // ...existing code...
  const [menuOpen, setMenuOpen] = useState(false);

  // ...existing code...

  // Lấy danh sách bệnh nhân từ localStorage
  const benhNhanList = React.useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('benhNhanList') || '[]');
    } catch {
      return [];
    }
  }, []);

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
  // Thêm dòng mới rỗng vào danh sách thuốc
  const handleAddMedicine = () => {
    setMedicines(prev => [
      ...prev,
      { medicine: '', quantity: '', usage: '' }
    ]);
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
    <form
      style={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        background: '#f5f6fa',
        flexWrap: 'wrap',
        boxSizing: 'border-box',
      }}
      onSubmit={handleSave}
    >
      {/* Sidebar thay thế bằng component Sidebar giống MainPage */}
      <div style={{ minWidth: 0 }}>
        <Sidebar activePage="Đơn thuốc" />
      </div>
      {/* Main content */}
      <div
        style={{
          flex: 1,
          padding: '48px 48px 0 48px',
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          background: 'rgba(255,255,255,0.92)',
          margin: '32px',
          borderRadius: '18px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          position: 'relative',
          maxWidth: 1400,
          width: '100%',
          boxSizing: 'border-box',
          transition: 'all 0.3s',
        }}
      >
        {/* Top right menu */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            gap: 16,
            flexWrap: 'wrap',
            padding: '0 32px',
            flexDirection: 'row',
          }}
        >
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
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '0 32px',
            marginTop: 18,
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <div style={{ fontSize: '2rem', fontWeight: 600 }}>Thêm đơn thuốc</div>
        </div>
        {/* Form card */}
        <div
          style={{
            padding: '0 48px',
            marginTop: 24,
            marginBottom: 32,
            boxSizing: 'border-box',
            width: '100%',
            maxWidth: 1200,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: 20,
              padding: '48px 32px',
              maxWidth: 1200,
              margin: '0 auto',
              boxShadow: '0 4px 24px #0002',
              boxSizing: 'border-box',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: 32,
              transition: 'all 0.3s',
            }}
          >
            {/* Thông tin đơn thuốc */}
            <div style={{ fontWeight: 600, fontSize: 22, marginBottom: 8 }}>Thông tin đơn thuốc</div>
            <div style={{ color: '#1565c0', fontWeight: 500, fontSize: 17, marginBottom: 4 }}>Điền đầy đủ thông tin bên dưới</div>
            <div
              style={{
                display: 'flex',
                gap: 48,
                marginBottom: 24,
                flexWrap: 'wrap',
                width: '100%',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: 8, minWidth: 180, width: '100%' }}>
                <label style={{ fontWeight: 500 }}>Tên bệnh nhân</label>
                <input
                  name="patient"
                  value={form.patient ?? ''}
                  onChange={handleChange}
                  style={{ padding: '10px 14px', borderRadius: 8, border: '1px solid #ccc', fontSize: 16 }}
                  placeholder="Nhập tên bệnh nhân..."
                />
              </div>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8 }}>
                <label style={{ fontWeight: 500, minWidth: 70 }}>Thẻ BHYT</label>
                <input type="checkbox" name="bhyt" checked={!!form.bhyt} onChange={handleChange} style={{ width: 22, height: 22, minWidth: 22 }} />
              </div>
              <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label style={{ fontWeight: 500 }}>Bác sĩ</label>
                <select name="doctor" value={form.doctor ?? ''} onChange={handleChange} style={{ padding: '10px 14px', borderRadius: 8, border: '1px solid #ccc', fontSize: 16, minWidth: 120 }}>
                  <option value="">Bác sĩ</option>
                  <option value="BS01">BS01</option>
                  <option value="BS02">BS02</option>
                </select>
              </div>
            </div>
            {/* Chi tiết đơn thuốc */}
            <div style={{ fontWeight: 600, fontSize: 22, marginBottom: 8, marginTop: 24, color: '#1565c0', fontStyle: 'italic' }}>Chi tiết đơn thuốc</div>
            <div style={{ width: '100%', marginBottom: 24, overflowX: 'auto', maxWidth: '100vw' }}>
              <table style={{ minWidth: 600, width: '100%', borderCollapse: 'collapse', fontSize: 15, tableLayout: 'auto' }}>
                <thead>
                  <tr style={{ background: '#e3f2fd' }}>
                      <th style={{ padding: '8px 12px', border: '1px solid #ddd' }}>Tên thuốc</th>
                      <th style={{ padding: '8px 12px', border: '1px solid #ddd' }}>Số lượng</th>
                      <th style={{ padding: '8px 12px', border: '1px solid #ddd' }}>Cách dùng</th>
                      <th style={{ padding: '8px 12px', border: '1px solid #ddd', textAlign: 'center', width: 60 }}>
                        <button type="button" style={{ width: 36, height: 36, background: '#1ec9a4', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 500, fontSize: 20, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }} title="Thêm dòng mới" onClick={handleAddMedicine}>
                          <span style={{ display: 'inline-block', fontSize: 20 }}>➕</span>
                        </button>
                      </th>
                  </tr>
                </thead>
                <tbody>
                  {medicines.map((med, idx) => (
                    <tr key={idx}>
                       <td style={{ padding: '8px 12px', border: '1px solid #ddd', minWidth: 120 }}>
                         <input
                           type="text"
                           value={med.medicine}
                           onChange={e => {
                             const value = e.target.value;
                             setMedicines(prev => prev.map((m, i) => i === idx ? { ...m, medicine: value } : m));
                           }}
                           placeholder="Tên thuốc..."
                           style={{ width: '100%', minWidth: 100, maxWidth: 200, padding: '6px 10px', borderRadius: 6, border: '1px solid #ccc', fontSize: 15, boxSizing: 'border-box' }}
                         />
                       </td>
                       <td style={{ padding: '8px 12px', border: '1px solid #ddd', minWidth: 80 }}>
                         <input
                           type="text"
                           value={med.quantity}
                           onChange={e => {
                             const value = e.target.value;
                             setMedicines(prev => prev.map((m, i) => i === idx ? { ...m, quantity: value } : m));
                           }}
                           placeholder="Số lượng..."
                           style={{ width: '100%', minWidth: 60, maxWidth: 120, padding: '8px 12px', borderRadius: 6, border: '1px solid #ccc', fontSize: 15, boxSizing: 'border-box' }}
                         />
                       </td>
                       <td style={{ padding: '8px 12px', border: '1px solid #ddd', minWidth: 120 }}>
                         <input
                           type="text"
                           value={med.usage}
                           onChange={e => {
                             const value = e.target.value;
                             setMedicines(prev => prev.map((m, i) => i === idx ? { ...m, usage: value } : m));
                           }}
                           placeholder="Cách dùng..."
                           style={{ width: '100%', minWidth: 100, maxWidth: 220, padding: '6px 10px', borderRadius: 6, border: '1px solid #ccc', fontSize: 15, boxSizing: 'border-box' }}
                         />
                       </td>
                      <td style={{ padding: '8px 12px', border: '1px solid #ddd', textAlign: 'center' }}>
                        <button
                          type="button"
                          style={{ width: 32, height: 32, background: '#e53935', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 500, fontSize: 18, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                          title="Xóa dòng này"
                          onClick={() => handleRemoveMedicine(idx)}
                        >
                          <span style={{ display: 'inline-block', fontSize: 18 }}>🗑️</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                  {medicines.length === 0 && (
                    <tr>
                      <td colSpan={4} style={{ textAlign: 'center', padding: '16px', color: '#aaa' }}>Chưa có thuốc nào. Nhấn ➕ để thêm dòng mới.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {/* Danh sách thuốc đã thêm */}
            {/* Đã xóa icon delete, cột Tên thuốc, Số lượng, Cách dùng */}
            {/* Footer buttons */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: 32,
                marginTop: 48,
                flexWrap: 'wrap',
                width: '100%',
              }}
            >
              <button type="button" style={{ background: '#757575', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 40px', fontWeight: 500, fontSize: 17, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }} onClick={() => navigate('/qldonthuoc')}>
                <span style={{ display: 'inline-block', fontSize: 22, color: '#fff', marginRight: 6 }}>🔙</span>
                Quay lại
              </button>
              <button type="submit" style={{ background: '#3949ab', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 40px', fontWeight: 500, fontSize: 17, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ display: 'inline-block', fontSize: 22, color: '#fff' }}>💾</span>
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
