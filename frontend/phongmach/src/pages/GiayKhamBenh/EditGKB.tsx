import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import appIcon from '../../assets/appicon.png';
import Sidebar from '../../components/Sidebar';

// Dummy data, should be replaced with props or API
const info = {
  code: "GKB00001",
  title: "Tổng quát",
  stt: 1,
  patient: "Mạnh",
  room: "Phòng xét nghiệm",
  status: "Đã khám",
  doctor: "Lê Thắng",
  price: "300.000 VNĐ",
};

const result = {
  symptom: "Bình thường",
  diagnosis: "",
  instruction: "",
  warning: "",
};

const prescription = {
  code: "DT00001",
  total: "500.000 VNĐ",
  status: "Đã mua",
  details: [
    { stt: 1, name: "Hytelea", unit: "Viên", quantity: 2, usage: "1v/ngày", price: "50.000", total: "100.000" },
    { stt: 2, name: "Paracetamol", unit: "Viên", quantity: 5, usage: "2v/ngày", price: "10.000", total: "50.000" },
    { stt: 3, name: "Amoxicillin", unit: "Viên", quantity: 10, usage: "1v/ngày", price: "5.000", total: "50.000" },
    { stt: 4, name: "Vitamin C", unit: "Viên", quantity: 20, usage: "1v/ngày", price: "2.000", total: "40.000" },
    { stt: 5, name: "Ibuprofen", unit: "Viên", quantity: 8, usage: "1v/ngày", price: "8.000", total: "64.000" },
    { stt: 6, name: "Cefuroxime", unit: "Viên", quantity: 6, usage: "1v/ngày", price: "12.000", total: "72.000" },
    { stt: 7, name: "Azithromycin", unit: "Viên", quantity: 3, usage: "1v/ngày", price: "20.000", total: "60.000" },
    { stt: 8, name: "Loratadine", unit: "Viên", quantity: 4, usage: "1v/ngày", price: "15.000", total: "60.000" },
    { stt: 9, name: "Omeprazole", unit: "Viên", quantity: 7, usage: "1v/ngày", price: "9.000", total: "63.000" },
    { stt: 10, name: "Metformin", unit: "Viên", quantity: 9, usage: "1v/ngày", price: "12.000", total: "108.000" },
  ],
};

const EditGKB: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const handleMenuSelect = (option: string) => {
    setMenuOpen(false);
    if (option === "Thông tin cá nhân") navigate("/profile");
    else if (option === "Đổi mật khẩu") navigate("/changepassword");
    else if (option === "Thoát") navigate("/login");
  };
  const navigate = useNavigate();
  // ...existing code...
  // State for editable prescription only
  const [editPrescription, setEditPrescription] = useState(prescription);
  const [editRow, setEditRow] = useState<number | null>(null);




  // Handle save
  const handleSave = () => {
    // Lưu đơn thuốc vào localStorage để QLGKB có thể lấy lại
    localStorage.setItem('editGKBPrescription', JSON.stringify(editPrescription));
    navigate('/qlgkb');
  };

  return (
    <div style={{ minHeight: '100vh', width: '100vw', display: 'flex', background: '#f5f6fa' }}>
      {/* Sidebar giống MainPage */}
      <Sidebar activePage="Giấy khám bệnh" />
      {/* Main content with scroll */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '32px 0 0 0', minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        {/* Submenu góc trên bên phải giống MainPage */}
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
        {/* Title and breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', padding: '0 32px' }}>
          <div style={{ fontSize: '1.6rem', fontWeight: 500 }}>Chỉnh sửa giấy khám bệnh</div>
        </div>
        <div style={{ padding: '0 32px', marginTop: 18, marginBottom: 24 }}>
          {/* Card 1: Thông tin khám */}
          <div style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <div style={{ fontWeight: 700, color: '#2a5ca4', fontSize: 22, marginBottom: 12 }}>Thông tin khám</div>
            <table style={{ width: '100%', fontSize: 12, borderCollapse: 'collapse' }}>
              <tbody>
                <tr>
                  <td style={{ padding: '6px 8px', color: '#222', width: 180 }}><b>Mã giấy khám bệnh:</b></td>
                  <td style={{ padding: '6px 8px' }}>{info.code}</td>
                  <td style={{ padding: '6px 8px', color: '#222', width: 180 }}><b>Tiêu đề:</b></td>
                  <td style={{ padding: '6px 8px' }}>{info.title}</td>
                </tr>
                <tr>
                  <td style={{ padding: '6px 8px', color: '#222' }}><b>STT khám:</b></td>
                  <td style={{ padding: '6px 8px' }}>{info.stt}</td>
                  <td style={{ padding: '6px 8px', color: '#222' }}><b>Tên bệnh nhân:</b></td>
                  <td style={{ padding: '6px 8px' }}>{info.patient}</td>
                </tr>
                <tr>
                  <td style={{ padding: '6px 8px', color: '#222' }}><b>Tên phòng khám:</b></td>
                  <td style={{ padding: '6px 8px' }}>{info.room}</td>
                  <td style={{ padding: '6px 8px', color: '#222' }}><b>Trạng thái:</b></td>
                  <td style={{ padding: '6px 8px', color: '#1ec9a4' }}>{info.status}</td>
                </tr>
                <tr>
                  <td style={{ padding: '6px 8px', color: '#222' }}><b>Tên bác sĩ:</b></td>
                  <td style={{ padding: '6px 8px' }}>{info.doctor}</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td style={{ padding: '6px 8px', color: '#222' }}><b>Giá:</b></td>
                  <td style={{ padding: '6px 8px', color: '#1ec9a4' }}>{info.price}</td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* Card 2: Kết quả khám */}
          <div style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <div style={{ fontWeight: 700, color: '#2a5ca4', fontSize: 22, marginBottom: 12 }}>Kết quả khám</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', fontSize: 12 }}>
              <div style={{ flex: 1, minWidth: 220, marginBottom: 8 }}>
                <b>Triệu chứng:</b> <span style={{ marginLeft: 8 }}>{result.symptom}</span>
              </div>
              <div style={{ flex: 1, minWidth: 220, marginBottom: 8 }}>
                <b>Chẩn đoán:</b> <span style={{ marginLeft: 8 }}>{result.diagnosis}</span>
              </div>
              <div style={{ flex: 1, minWidth: 220, marginBottom: 8 }}>
                <b>Hướng dẫn điều trị:</b> <span style={{ marginLeft: 8 }}>{result.instruction}</span>
              </div>
              <div style={{ flex: 1, minWidth: 220, marginBottom: 8 }}>
                <b>Dặn dò:</b> <span style={{ marginLeft: 8 }}>{result.warning}</span>
              </div>
            </div>
          </div>
          {/* Card 3: Đơn thuốc */}
          <div style={{ background: '#fff', borderRadius: 12, padding: '24px 12px', marginBottom: 24, boxShadow: '0 2px 8px #0001' }}>
            <div style={{ fontWeight: 700, color: '#2a5ca4', fontSize: 22, marginBottom: 18, textAlign: 'center' }}>Đơn thuốc</div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: 24,
              fontSize: 14,
              marginBottom: 18,
              alignItems: 'center',
              justifyItems: 'start',
              maxWidth: 900,
              marginLeft: 0,
              marginRight: 'auto'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <b style={{ minWidth: 100 }}>Mã đơn thuốc:</b>
                <input value={editPrescription.code} onChange={e => setEditPrescription({ ...editPrescription, code: e.target.value })} style={{ flex: 1, padding: '6px 10px', borderRadius: 6, border: '1px solid #ccc' }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <b style={{ minWidth: 80 }}>Tổng tiền:</b>
                <input value={editPrescription.total} onChange={e => setEditPrescription({ ...editPrescription, total: e.target.value })} style={{ flex: 1, padding: '6px 10px', borderRadius: 6, border: '1px solid #ccc' }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <b style={{ minWidth: 80 }}>Trạng thái:</b>
                <select value={editPrescription.status} onChange={e => setEditPrescription({ ...editPrescription, status: e.target.value })} style={{ flex: 1, padding: '6px 10px', borderRadius: 6, border: '1px solid #ccc' }}>
                  <option value="Chưa mua">Chưa mua</option>
                  <option value="Đã mua">Đã mua</option>
                </select>
              </div>
            </div>
            <div style={{ fontWeight: 500, marginBottom: 12, textAlign: 'center', fontSize: 16 }}>Chi tiết đơn thuốc</div>
            <div style={{ overflowX: 'auto', width: '100%' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 700, background: '#fff', fontSize: 13 }}>
                <thead>
                  <tr style={{ background: '#f5f6fa', color: '#2a5ca4' }}>
                    <th style={{ padding: 5, border: '1px solid #eee', minWidth: '90%' }}>STT</th>
                    <th style={{ padding: 5, border: '1px solid #eee', minWidth: '90%' }}>Tên thuốc</th>
                    <th style={{ padding: 5, border: '1px solid #eee', minWidth: '90%' }}>Đơn vị tính</th>
                    <th style={{ padding: 5, border: '1px solid #eee', minWidth: '90%' }}>Số lượng</th>
                    <th style={{ padding: 5, border: '1px solid #eee', minWidth: '90%' }}>Cách dùng</th>
                    <th style={{ padding: 5, border: '1px solid #eee', minWidth: '90%' }}>Giá (VNĐ)</th>
                    <th style={{ padding: 5, border: '1px solid #eee', minWidth: '90%' }}>Tổng tiền (VNĐ)</th>
                    <th style={{ padding: 5, border: '1px solid #eee', minWidth: '90%', textAlign: 'center' }}>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {editPrescription.details.map((item, idx) => (
                    <tr key={idx}>
                      <td style={{ padding: 5, border: '1px solid #eee', textAlign: 'center' }}>{item.stt}</td>
                      <td style={{ padding: 5, border: '1px solid #eee' }}>
                        {editRow === idx ? (
                          <input value={item.name} onChange={e => {
                            const newDetails = [...editPrescription.details];
                            newDetails[idx].name = e.target.value;
                            setEditPrescription({ ...editPrescription, details: newDetails });
                          }} style={{ width: '100px', padding: '4px 6px', borderRadius: 6, border: '1px solid #ccc', fontSize: 12 }} />
                        ) : (
                          <span>{item.name}</span>
                        )}
                      </td>
                      <td style={{ padding: 5, border: '1px solid #eee' }}>
                        {editRow === idx ? (
                          <input value={item.unit} onChange={e => {
                            const newDetails = [...editPrescription.details];
                            newDetails[idx].unit = e.target.value;
                            setEditPrescription({ ...editPrescription, details: newDetails });
                          }} style={{ width: '100px', padding: '4px 6px', borderRadius: 6, border: '1px solid #ccc', fontSize: 12 }} />
                        ) : (
                          <span>{item.unit}</span>
                        )}
                      </td>
                      <td style={{ padding: 5, border: '1px solid #eee', textAlign: 'center' }}>
                        {editRow === idx ? (
                          <input type="number" value={item.quantity} onChange={e => {
                            const newDetails = [...editPrescription.details];
                            newDetails[idx].quantity = Number(e.target.value);
                            setEditPrescription({ ...editPrescription, details: newDetails });
                          }} style={{ width: '100px', padding: '4px 6px', borderRadius: 6, border: '1px solid #ccc', fontSize: 12 }} />
                        ) : (
                          <span>{item.quantity}</span>
                        )}
                      </td>
                      <td style={{ padding: 5, border: '1px solid #eee' }}>
                        {editRow === idx ? (
                          <input value={item.usage} onChange={e => {
                            const newDetails = [...editPrescription.details];
                            newDetails[idx].usage = e.target.value;
                            setEditPrescription({ ...editPrescription, details: newDetails });
                          }} style={{ width: '100px', padding: '4px 6px', borderRadius: 6, border: '1px solid #ccc', fontSize: 12 }} />
                        ) : (
                          <span>{item.usage}</span>
                        )}
                      </td>
                      <td style={{ padding: 5, border: '1px solid #eee', textAlign: 'right' }}>
                        {editRow === idx ? (
                          <input value={item.price} onChange={e => {
                            const newDetails = [...editPrescription.details];
                            newDetails[idx].price = e.target.value;
                            setEditPrescription({ ...editPrescription, details: newDetails });
                          }} style={{ width: '100px', padding: '4px 6px', borderRadius: 6, border: '1px solid #ccc', textAlign: 'right', fontSize: 12 }} />
                        ) : (
                          <span>{item.price}</span>
                        )}
                      </td>
                      <td style={{ padding: 5, border: '1px solid #eee', textAlign: 'right' }}>
                        {editRow === idx ? (
                          <input value={item.total} onChange={e => {
                            const newDetails = [...editPrescription.details];
                            newDetails[idx].total = e.target.value;
                            setEditPrescription({ ...editPrescription, details: newDetails });
                          }} style={{ width: '100px', padding: '4px 6px', borderRadius: 6, border: '1px solid #ccc', textAlign: 'right', fontSize: 12 }} />
                        ) : (
                          <span>{item.total}</span>
                        )}
                      </td>
                      <td style={{ padding: 5, border: '1px solid #eee', textAlign: 'center', whiteSpace: 'nowrap' }}>
                        {editRow === idx ? (
                          <>
                            <span
                              title="Lưu"
                              style={{ color: '#1ec9a4', fontSize: 16, marginRight: 8, cursor: 'pointer', verticalAlign: 'middle' }}
                              onClick={() => setEditRow(null)}
                            >
                              💾
                            </span>
                            <span
                              title="Hủy"
                              style={{ color: '#e53935', fontSize: 16, marginRight: 8, cursor: 'pointer', verticalAlign: 'middle' }}
                              onClick={() => setEditRow(null)}
                            >
                              ❌
                            </span>
                          </>
                        ) : (
                          <>
                            <span
                              title="Sửa"
                              style={{ color: '#1ec9a4', fontSize: 16, marginRight: 8, cursor: 'pointer', verticalAlign: 'middle' }}
                              onClick={() => setEditRow(idx)}
                            >
                              ✏️
                            </span>
                            <span
                              title="Xóa"
                              style={{ color: '#e53935', fontSize: 16, marginRight: 8, cursor: 'pointer', verticalAlign: 'middle' }}
                              onClick={() => {
                                const newDetails = editPrescription.details.filter((_, i) => i !== idx);
                                setEditPrescription({ ...editPrescription, details: newDetails });
                              }}
                            >
                              🗑️
                            </span>
                            <span
                              title="Thêm mới"
                              style={{ color: '#2a5ca4', fontSize: 16, cursor: 'pointer', verticalAlign: 'middle' }}
                              onClick={() => {
                                const newDetails = [...editPrescription.details];
                                newDetails.splice(idx + 1, 0, { stt: newDetails.length + 1, name: '', unit: '', quantity: 1, usage: '', price: '', total: '' });
                                setEditPrescription({ ...editPrescription, details: newDetails });
                              }}
                            >
                              ➕
                            </span>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 16, marginTop: 24 }}>
              <button style={{ background: '#1ec9a4', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 32px', fontSize: 16, fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }} onClick={handleSave}>
                <span role="img" aria-label="save">💾</span> Lưu
              </button>
              <button style={{ background: '#222', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 32px', fontSize: 16, fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }} onClick={() => window.history.back()}>
                <span role="img" aria-label="back">↩️</span> Quay lại
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditGKB;
