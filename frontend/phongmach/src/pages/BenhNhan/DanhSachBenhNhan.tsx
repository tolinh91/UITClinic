import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from '../../components/Sidebar';
import appIcon from '../../assets/appicon.png';
import { Link } from "react-router-dom";
import axios from "axios";
import './DanhSachBenhNhan.css';
import styles from './DanhSachBenhNhan.module.css';
// Responsive CSS riêng cho bảng
const responsiveTableStyle = `
@media (max-width: 900px) {
  .dsbn-table {
    font-size: 0.95rem !important;
    min-width: 600px !important;
    overflow-x: auto !important;
    display: block !important;
  }
  .dsbn-table th, .dsbn-table td {
    padding: 8px 4px !important;
    font-size: 0.95rem !important;
    white-space: nowrap !important;
  }
}
@media (max-width: 600px) {
  .dsbn-table {
    font-size: 0.85rem !important;
    min-width: 400px !important;
    overflow-x: auto !important;
    display: block !important;
  }
  .dsbn-table th, .dsbn-table td {
    padding: 4px 2px !important;
    font-size: 0.85rem !important;
    white-space: nowrap !important;
  }
}
`;
// Responsive CSS cho toàn bộ màn hình
const responsiveStyle = `
@media (max-width: 900px) {
  .dsbn-main {
    padding: 8px !important;
    margin: 4px !important;
    box-shadow: none !important;
    border-radius: 8px !important;
    min-width: 0 !important;
  }
  .dsbn-content {
    padding: 12px !important;
    margin: 0 !important;
    box-shadow: none !important;
    border-radius: 8px !important;
    min-width: 0 !important;
    max-width: 100vw !important;
  }
  .dsbn-table {
    font-size: 0.95rem !important;
  }
  .dsbn-table th, .dsbn-table td {
    padding: 8px 4px !important;
    font-size: 0.95rem !important;
  }
  .dsbn-header {
    flex-direction: column !important;
    gap: 8px !important;
    align-items: flex-start !important;
  }
}
@media (max-width: 600px) {
  .dsbn-main {
    padding: 2px !important;
    margin: 0 !important;
    border-radius: 0 !important;
  }
  .dsbn-content {
    padding: 4px !important;
    margin: 0 !important;
    border-radius: 0 !important;
    min-width: 0 !important;
    max-width: 100vw !important;
  }
  .dsbn-table {
    font-size: 0.85rem !important;
  }
  .dsbn-table th, .dsbn-table td {
    padding: 4px 2px !important;
    font-size: 0.85rem !important;
  }
  .dsbn-header {
    flex-direction: column !important;
    gap: 4px !important;
    align-items: flex-start !important;
  }
}
`;
interface Patient {
  id: number;
  code: string;
  full_name: string;
  id_number: string;
  has_insurance: boolean;
  address: string;
  phone: string;
  allergy: string;
  medical_history: string;
  current_medications: string;
  symptoms: string;
  blood_pressure_systolic: number;
  blood_pressure_diastolic: number;
  pulse: number;
  spo2: number;
  temperature: number;
  old_test_results: string;
  created_at: string;
}

const DanhSachBenhNhan: React.FC = () => {
  const navigate = useNavigate();
  const [deleteTarget, setDeleteTarget] = useState<Patient | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<Patient> | null>(null);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
  const fetchPatients = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/patient_list/");

      // Kiểm tra dữ liệu trả về
      if (Array.isArray(res.data)) {
        console.log("✅ Số lượng bệnh nhân:", res.data.length);
        console.log("🧍‍♂️ Bệnh nhân đầu tiên:", res.data[0]);
        // Ánh xạ maBenhNhan → code
        const mappedPatients = res.data.map(p => ({
          ...p,
          code: `BN-${String(p.id).padStart(5, '0')}` // ánh xạ thủ công
        }));
        console.log("🧪 Kiểm tra mã bệnh nhân:", res.data.map(p => p.maBenhNhan));
        console.log("🧪 Kiểm tra các trường từ API:", Object.keys(res.data[0]));
        setPatients(mappedPatients);
      } else {
        console.error("Dữ liệu không phải mảng:", res.data);
        setError("Dữ liệu từ API không hợp lệ.");
      }
    } catch (err) {
      console.error("Lỗi khi gọi API:", err);
      setError("Không thể tải danh sách bệnh nhân.");
    } finally {
      setLoading(false);
    }
  };

  fetchPatients();
}, []);
  /*useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await axios.get<Patient[]>("http://127.0.0.1:8000/api/patient_list/");
        if (Array.isArray(res.data)) {
        console.log("✅ Số lượng bệnh nhân:", res.data.length);
        console.log("🧍‍♂️ Bệnh nhân đầu tiên:", res.data[0]);
        console.log("🔍 Mã bệnh nhân:", res.data[0].code);
        }
        setPatients(res.data);
      } catch (err) {
        console.error(err);
        setError("Không thể tải danh sách bệnh nhân.");
      } finally {
        setLoading(false);
      }
    };
    fetchPatients();
  }, []); */

  if (loading) return <p>Đang tải...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  const validateDate = (dateString: string): boolean => {
    if (!dateString) return true; // Allow empty date
    
    // Parse date in dd/mm/yyyy or dd/mm/yy format
    const dateRegex = /^(\d{1,2})\/(\d{1,2})\/(\d{2,4})$/;
    const match = dateString.match(dateRegex);
    
    if (!match) return false;
    
    let day = parseInt(match[1], 10);
    let month = parseInt(match[2], 10);
    let year = parseInt(match[3], 10);
    
    // Convert 2-digit year to 4-digit year
    if (year < 100) {
      year += year < 50 ? 2000 : 1900;
    }
    
    // Check if date is valid
    const date = new Date(year, month - 1, day);
    if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
      return false;
    }
    
    // Check date range: 1/1/1900 to current date
    const minDate = new Date(1900, 0, 1);
    const maxDate = new Date();
    
    return date >= minDate && date <= maxDate;
  };

  const handleSearch = () => {
    if (!search.trim()) return benhNhanList;
    return benhNhanList.filter(bn => 
      bn.tenBenhNhan.toLowerCase().includes(search.toLowerCase()) ||
      bn.maBenhNhan.toLowerCase().includes(search.toLowerCase()) ||
      bn.soDienThoai.includes(search)
    );
  };

  const handleEdit = (benhNhan: BenhNhan) => {
    setEditingId(benhNhan.id);
    setEditFormData({ ...benhNhan });
  };

  const handleSave = () => {
    if (editFormData && editingId) {
      // Validate birth date before saving
      if (editFormData.ngaySinh && !validateDate(editFormData.ngaySinh)) {
        alert("Ngày sinh không hợp lệ. Vui lòng nhập ngày sinh theo định dạng dd/mm/yyyy và trong khoảng từ 1/1/1900 đến ngày hiện tại");
        return;
      }
      
      setBenhNhanList(prev => {
        const updated = prev.map(bn => bn.id === editingId ? editFormData : bn);
        localStorage.setItem('benhNhanList', JSON.stringify(updated));
        return updated;
      });
      setEditingId(null);
      setEditFormData(null);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditFormData(null);
  };

  const handleInputChange = (field: keyof BenhNhan, value: string) => {
    if (editFormData) {
      setEditFormData(prev => prev ? { ...prev, [field]: value } : null);
    }
  };

  const handleDeleteClick = (benhNhan: BenhNhan) => {
    setDeleteTarget(benhNhan);
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = () => {
    if (deleteTarget) {
      setBenhNhanList(prev => {
        const updated = prev.filter(bn => bn.id !== deleteTarget.id);
        localStorage.setItem('benhNhanList', JSON.stringify(updated));
        return updated;
      });
      setDeletedPatientInfo(`${deleteTarget.maBenhNhan} ${deleteTarget.tenBenhNhan}`);
      setShowDeleteSuccess(true);
      setTimeout(() => setShowDeleteSuccess(false), 4000);
    }
    setShowDeleteConfirm(false);
    setDeleteTarget(null);
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
    setDeleteTarget(null);
  };

  const handleMenuSelect = (option: string) => {
    setMenuOpen(false);
    if (option === "Thông tin cá nhân") navigate("/profile");
    else if (option === "Đổi mật khẩu") navigate("/changepassword");
    else if (option === "Thoát") navigate("/login");
  };

    return (
      <>
  <style>{responsiveStyle}</style>
  <style>{responsiveTableStyle}</style>
        <div style={{ minHeight: '100vh', width: '100vw', display: 'flex', background: '#f4f4f4' }}>
        {/* Sidebar giống MainPage */}
        <Sidebar activePage="Bệnh nhân" />
        {/* Main content */}
        <div className="dsbn-main" style={{ flex: 1, padding: '32px 16px 0 16px', minWidth: 0, display: 'flex', flexDirection: 'column', margin: '16px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', background: '#fff' }}>
          <div className="dsbn-content" style={{ background: '#fff', borderRadius: 16, margin: '0 0 24px 0', padding: '24px', boxShadow: '0 2px 8px #0001', maxWidth: '1200px', width: '100%', alignSelf: 'center', minWidth: 280 }}>
            {/* Submenu góc trên bên phải giống MainPage */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 16, flexWrap: 'wrap', marginBottom: 8 }}>
              <img src={appIcon} alt="logo" style={{ width: 40, borderRadius: '50%' }} />
              <span style={{ fontWeight: 500, fontSize: 18, color: '#2d4a7a' }}>Admin</span>
              <div style={{ position: 'relative' }}>
                <button
                  style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18 }}
                  onClick={() => setMenuOpen && setMenuOpen((prev: boolean) => !prev)}
                >
                  ▼
                </button>
                {typeof menuOpen !== 'undefined' && menuOpen && (
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
            <div className="dsbn-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
              <div style={{ fontSize: '2rem', fontWeight: 600 }}>Danh sách bệnh nhân</div>
              <button type="button" style={{ background: '#1ec9a4', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 500, fontSize: 16, cursor: 'pointer', minWidth: 140 }} onClick={() => navigate('/create-benh-nhan')}>+ Thêm bệnh nhân</button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
              <div style={{ position: 'relative', minWidth: 120, maxWidth: 200, width: '100%' }}>
                <span style={{ position: 'absolute', left: 12, top: 10, fontSize: 18, color: '#888' }}>🔍</span>
                <input
                  type="text"
                  placeholder="Nhập tên bệnh nhân"
                  style={{ flex: 1, padding: '10px 14px 10px 30px', borderRadius: 8, border: '1px solid #ccc', fontSize: 16, minWidth: 120, maxWidth: 400, width: '100%' }}
                  // value={search}
                  // onChange={e => setSearch(e.target.value)}
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
                  cursor: 'pointer',
                  minWidth: 100,
                  marginLeft: 50, // Push button to the right
                  display: 'block'
                }}
                >
                Tìm kiếm
                </button>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table className="dsbn-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '1rem', wordBreak: 'break-word', overflowX: 'auto' }}>
                <thead>
                  <tr style={{ background: '#f4f4f4' }}>
                    <th style={{ padding: '12px 8px', fontWeight: 600 }}>STT</th>
                    <th style={{ padding: '12px 8px', fontWeight: 600 }}>Mã</th>
                    <th style={{ padding: '12px 8px', fontWeight: 600 }}>Tên bệnh nhân</th>
                    {/* Xóa cột Ảnh đại diện */}
                    <th style={{ padding: '12px 8px', fontWeight: 600 }}>Số điện thoại</th>
                    <th style={{ padding: '12px 8px', fontWeight: 600 }}>CCCD</th>
                    <th style={{ padding: '12px 8px', fontWeight: 600 }}>Địa chỉ</th>
                    <th style={{ padding: '12px 8px', fontWeight: 600 }}>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map((p, idx) => (
                    <tr key={p.id} style={{ background: '#fff', borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '10px 8px', textAlign: 'center' }}>{idx + 1}</td>
                      <td style={{ padding: '10px 8px', textAlign: 'center' }}>{p.code}</td>
                      <td style={{ padding: '10px 8px' }}>
                        {editingId === p.id ? (
                          <input type="text" value={editFormData?.full_name ?? p.full_name} onChange={e => setEditFormData(f => ({ ...f, full_name: e.target.value }))} style={{ width: '100%', padding: '4px 8px', borderRadius: 4, border: '1px solid #ccc' }} />
                        ) : p.full_name}
                      </td>
                      <td style={{ padding: '10px 8px', textAlign: 'center' }}>
                        {editingId === p.id ? (
                          <input type="text" value={editFormData?.phone ?? p.phone} onChange={e => setEditFormData(f => ({ ...f, phone: e.target.value }))} style={{ width: '100%', padding: '4px 8px', borderRadius: 4, border: '1px solid #ccc' }} />
                        ) : p.phone}
                      </td>
                      <td style={{ padding: '10px 8px', textAlign: 'center' }}>
                        {editingId === p.id ? (
                          <input type="text" value={editFormData?.id_number ?? p.id_number} onChange={e => setEditFormData(f => ({ ...f, id_number: e.target.value }))} style={{ width: '100%', padding: '4px 8px', borderRadius: 4, border: '1px solid #ccc' }} />
                        ) : p.id_number}
                      </td>
                      <td style={{ padding: '10px 8px' }}>
                        {editingId === p.id ? (
                          <input type="text" value={editFormData?.address ?? p.address} onChange={e => setEditFormData(f => ({ ...f, address: e.target.value }))} style={{ width: '100%', padding: '4px 8px', borderRadius: 4, border: '1px solid #ccc' }} />
                        ) : p.address}
                      </td>
                      <td style={{ padding: '10px 8px', textAlign: 'center' }}>
                        {editingId === p.id ? (
                          <span style={{ color: '#1ec9a4', fontSize: 18, marginRight: 8, cursor: 'pointer' }} title="Lưu" onClick={() => {
                            setPatients(prev => prev.map(bn => bn.id === p.id ? { ...bn, ...editFormData } : bn));
                            setEditingId(null);
                            setEditFormData(null);
                          }}>💾</span>
                        ) : (
                          <span style={{ color: '#1ec9a4', fontSize: 18, marginRight: 8, cursor: 'pointer' }} title="Chỉnh sửa" onClick={() => {
                            setEditingId(p.id);
                            setEditFormData({ ...p });
                          }}>✏️</span>
                        )}
                        <span style={{ color: '#e53935', fontSize: 18, marginRight: 8, cursor: 'pointer' }} title="Xóa" onClick={() => {
                          setDeleteTarget(p);
                          setShowDeleteConfirm(true);
                        }}>🗑️</span>
      {/* Xác nhận xóa bệnh nhân */}
      {showDeleteConfirm && deleteTarget && (
        <div style={{ position: 'fixed', top: '20%', left: '50%', transform: 'translate(-50%, 0)', zIndex: 9999 }}>
          <div style={{ background: '#fff', borderRadius: 12, padding: 32, minWidth: 280, boxShadow: '0 2px 12px #0003', textAlign: 'center', border: '1px solid #eee' }}>
            <div style={{ fontSize: 18, fontWeight: 500, marginBottom: 18 }}>
              Bạn có muốn xóa Bệnh nhân <span style={{ color: '#e53935', fontWeight: 700 }}>{deleteTarget.full_name}</span>?
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 24 }}>
              <button style={{ background: '#e53935', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 24px', fontWeight: 500, fontSize: 16, cursor: 'pointer' }}
                onClick={() => {
                  setPatients(prev => prev.filter(bn => bn.id !== deleteTarget.id));
                  setShowDeleteConfirm(false);
                  setDeleteTarget(null);
                }}>
                Có
              </button>
              <button style={{ background: '#ccc', color: '#333', border: 'none', borderRadius: 8, padding: '8px 24px', fontWeight: 500, fontSize: 16, cursor: 'pointer' }}
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setDeleteTarget(null);
                }}>
                Không
              </button>
            </div>
          </div>
        </div>
      )}
                        <Link to={`/danh-sach-benh-nhan/detail/${p.id}`} style={{ color: '#1ec9a4', fontSize: 18 }} title="Chi tiết"><span>👁️</span></Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {selectedPatient && (
            <div className="patient-detail">
              <h3>Thông tin bệnh nhân: {selectedPatient.full_name}</h3>
              <ul>
                <li>Mã: {selectedPatient.code}</li>
                <li>CMND/CCCD: {selectedPatient.id_number}</li>
                <li>Bảo hiểm: {selectedPatient.has_insurance ? "Có" : "Không"}</li>
                <li>Địa chỉ: {selectedPatient.address}</li>
                <li>Điện thoại: {selectedPatient.phone}</li>
                <li>Dị ứng: {selectedPatient.allergy}</li>
                <li>Tiền sử bệnh: {selectedPatient.medical_history}</li>
                <li>Thuốc đang dùng: {selectedPatient.current_medications}</li>
                <li>Triệu chứng: {selectedPatient.symptoms}</li>
                <li>
                  Huyết áp: {selectedPatient.blood_pressure_systolic}/{selectedPatient.blood_pressure_diastolic} mmHg
                </li>
                <li>Mạch: {selectedPatient.pulse} bpm</li>
                <li>SpO₂: {selectedPatient.spo2} %</li>
                <li>Nhiệt độ: {selectedPatient.temperature} °C</li>
                <li>Kết quả xét nghiệm cũ: {selectedPatient.old_test_results}</li>
                <li>Ngày tạo: {new Date(selectedPatient.created_at).toLocaleString()}</li>
              </ul>
              <button onClick={() => setSelectedPatient(null)}>Đóng</button>
            </div>
          )}
        </div>
      </div>
      </>
  );
};
export default DanhSachBenhNhan;
