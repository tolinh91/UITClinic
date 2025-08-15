import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';

// Định nghĩa Prescription giống QLDonThuoc
interface Prescription {
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
}

function getPrescriptionsFromStorage(): Prescription[] {
  const list = JSON.parse(localStorage.getItem('donthuoc_list') || '[]');
  return list.map((item: any, idx: number) => ({
    ...item,
    code: `DT${(idx + 1).toString().padStart(6, '0')}`,
    total: item.total || '',
    status: item.status || 'Chưa mua',
    statusColor: item.status === 'Chưa mua' ? '#ffa726' :'#ffa726',
    id: idx + 1,
  }));
}

const ViewDT: React.FC = () => {
  const { code } = useParams();
  const navigate = useNavigate();
  const prescriptions = getPrescriptionsFromStorage();
  const prescription = prescriptions.find(p => p.code === code);
  const [addRowIdx, setAddRowIdx] = React.useState<number | null>(null);
  const [newMedicine, setNewMedicine] = React.useState<{ medicine: string; quantity: string; usage: string }>({ medicine: '', quantity: '', usage: '' });
  const [editingIdx, setEditingIdx] = React.useState<number | null>(null);
  const [editMedicine, setEditMedicine] = React.useState<{ quantity: string; usage: string } | null>(null);
  const [deleteIdx, setDeleteIdx] = React.useState<number | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
  const [medicines, setMedicines] = React.useState<Array<{ medicine: string; quantity: string; usage: string }>>([]);
  React.useEffect(() => {
    if (prescription) {
      const newMedicines = [
        ...(prescription.medicines ?? []),
        { medicine: 'Paracetamol', quantity: '20', usage: 'Uống sau ăn' },
        { medicine: 'Amoxicillin', quantity: '15', usage: 'Uống sáng chiều' },
        { medicine: 'Vitamin C', quantity: '30', usage: 'Uống mỗi sáng' },
        { medicine: 'Ibuprofen', quantity: '10', usage: 'Uống khi đau' },
        { medicine: 'Cefuroxime', quantity: '12', usage: 'Uống trước ăn' }
      ];
      // Chỉ setMedicines nếu giá trị thực sự thay đổi
      if (JSON.stringify(newMedicines) !== JSON.stringify(medicines)) {
        setMedicines(newMedicines);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prescription]);
  React.useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @media (max-width: 900px) {
        .viewdt-container {
          max-width: 100vw !important;
          padding: 8px !important;
        }
        .viewdt-table th, .viewdt-table td {
          font-size: 14px !important;
          padding: 6px !important;
        }
        .viewdt-actions {
          flex-direction: column !important;
          gap: 8px !important;
        }
        .viewdt-btn {
          min-width: 100px !important;
          padding: 8px 12px !important;
          font-size: 14px !important;
        }
      }
      @media (max-width: 600px) {
        .viewdt-container {
          max-width: 100vw !important;
          padding: 2px !important;
        }
        .viewdt-table th, .viewdt-table td {
          font-size: 12px !important;
          padding: 4px !important;
        }
        .viewdt-btn {
          min-width: 80px !important;
          padding: 6px 8px !important;
          font-size: 12px !important;
        }
      }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  return (
    <div style={{ minHeight: '100vh', width: '100vw', display: 'flex', background: '#f5f6fa' }}>
      <Sidebar activePage="Đơn thuốc" />
      <div style={{ flex: 1, padding: '32px 0 0 0', minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <div className="viewdt-container" style={{ background: '#fff', borderRadius: 16, margin: '0 0 24px 0', padding: '24px', boxShadow: '0 2px 8px #0001', maxWidth: '900px', width: '100%', alignSelf: 'center', minWidth: 280 }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: 18 }}>Chi tiết đơn thuốc</h2>
          {prescription ? (
            <>
              <div style={{ fontSize: 18, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span
                  role="img"
                  aria-label="print"
                  style={{ fontSize: 22, cursor: 'pointer' }}
                  onClick={() => navigate(`/print-donthuoc/${prescription.code}`)}
                >🖨️</span>
                <strong>Mã đơn thuốc:</strong> <span style={{ fontWeight: 500, color: '#2563eb' }}>{prescription.code}</span>
              </div>
              <div style={{ fontSize: 16, marginBottom: 8 }}><strong>Tên bệnh nhân:</strong> Nguyễn Văn A</div>
              <div style={{ fontSize: 16, marginBottom: 8 }}><strong>Bác sĩ:</strong> {prescription.doctor}</div>
              <div style={{ fontSize: 16, marginBottom: 8 }}><strong>Tổng tiền:</strong> {prescription.total}</div>
              <div style={{ fontSize: 16, marginBottom: 8 }}>
                <strong>Trạng thái:</strong>
                <span style={{
                  background: prescription.status === 'Chưa mua' ? '#ffa726' : prescription.statusColor,
                  color: '#fff',
                  borderRadius: 8,
                  padding: '4px 12px'
                }}>{prescription.status}</span>
              </div>
              <div style={{ fontSize: 16, marginBottom: 8 }}>
                <strong>Ngày tạo:</strong> {
                  prescription.createdAt
                    ? (() => {
                        const d = new Date(prescription.createdAt);
                        const pad = (n: number) => n.toString().padStart(2, '0');
                        return `${pad(d.getDate())}/${pad(d.getMonth()+1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
                      })()
                    : '(Chưa có)'
                }
              </div>
              <div style={{ fontSize: 16, marginBottom: 8 }}><strong>BHYT:</strong> {prescription.bhyt ? 'Có' : 'Không'}</div>
              <div style={{ fontSize: 16, marginBottom: 8 }}><strong>Danh sách thuốc:</strong></div>
              <table className="viewdt-table" style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 16 }}>
                <thead>
                  <tr style={{ background: '#f4f4f4' }}>
                    <th style={{ padding: '8px', fontWeight: 500 }}>Tên thuốc</th>
                    <th style={{ padding: '8px', fontWeight: 500 }}>Số lượng</th>
                    <th style={{ padding: '8px', fontWeight: 500 }}>Cách dùng</th>
                    <th style={{ padding: '8px', fontWeight: 500 }}>Hành Động</th>
                  </tr>
                </thead>
                <tbody>
                  {medicines.length > 0 ? (
                    medicines.flatMap((m, idx) => {
                      const result = [];
                      result.push(
                        <tr key={idx}>
                          <td style={{ padding: '8px' }}>{m.medicine}</td>
                          <td style={{ padding: '8px' }}>
                            {editingIdx === idx ? (
                              <input type="text" value={editMedicine?.quantity ?? m.quantity} onChange={e => setEditMedicine({ quantity: e.target.value, usage: editMedicine?.usage ?? m.usage })} style={{ width: 60, padding: '2px 6px', borderRadius: 4, border: '1px solid #ccc' }} />
                            ) : m.quantity}
                          </td>
                          <td style={{ padding: '8px' }}>
                            {editingIdx === idx ? (
                              <input type="text" value={editMedicine?.usage ?? m.usage} onChange={e => setEditMedicine({ quantity: editMedicine?.quantity ?? m.quantity, usage: e.target.value })} style={{ width: 120, padding: '2px 6px', borderRadius: 4, border: '1px solid #ccc' }} />
                            ) : m.usage}
                          </td>
                          <td className="viewdt-actions" style={{ padding: '8px', textAlign: 'center', display: 'flex', gap: 8, justifyContent: 'center' }}>
                            {editingIdx === idx ? (
                              <>
                                <button title="Lưu" style={{ background: '#22c55e', color: '#fff', border: 'none', borderRadius: 6, padding: '4px 12px', cursor: 'pointer', fontSize: 14 }}
                                  onClick={() => {
                                    setEditMedicine(null);
                                    setEditingIdx(null);
                                  }}>
                                  Lưu
                                </button>
                                <button title="Hủy" style={{ background: '#ccc', color: '#222', border: 'none', borderRadius: 6, padding: '4px 12px', cursor: 'pointer', fontSize: 14 }}
                                  onClick={() => { setEditMedicine(null); setEditingIdx(null); }}>
                                  Hủy
                                </button>
                              </>
                            ) : (
                              <>
                                <button title="Sửa" style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18 }}
                                  onClick={() => { setEditingIdx(idx); setEditMedicine({ quantity: m.quantity, usage: m.usage }); }}>
                                  <span role="img" aria-label="edit">✏️</span>
                                </button>
                                <button title="Thêm" style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18 }}
                                  onClick={() => setAddRowIdx(idx)}>
                                  <span role="img" aria-label="add">➕</span>
                                </button>
                                <button title="Xóa" style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18 }}
                                  onClick={() => { setDeleteIdx(idx); setShowDeleteDialog(true); }}>
                                  <span role="img" aria-label="delete">🗑️</span>
                                </button>
                              </>
                            )}
                          </td>
                        </tr>
                      );
                      if (addRowIdx === idx) {
                        result.push(
                          <tr key={`add-${idx}`}>
                            <td style={{ padding: '8px' }}>
                              <input type="text" value={newMedicine.medicine} onChange={e => setNewMedicine(nm => ({ ...nm, medicine: e.target.value }))} placeholder="Tên thuốc" style={{ width: 100, padding: '2px 6px', borderRadius: 4, border: '1px solid #ccc' }} />
                            </td>
                            <td style={{ padding: '8px' }}>
                              <input type="text" value={newMedicine.quantity} onChange={e => setNewMedicine(nm => ({ ...nm, quantity: e.target.value }))} placeholder="Số lượng" style={{ width: 60, padding: '2px 6px', borderRadius: 4, border: '1px solid #ccc' }} />
                            </td>
                            <td style={{ padding: '8px' }}>
                              <input type="text" value={newMedicine.usage} onChange={e => setNewMedicine(nm => ({ ...nm, usage: e.target.value }))} placeholder="Cách dùng" style={{ width: 120, padding: '2px 6px', borderRadius: 4, border: '1px solid #ccc' }} />
                            </td>
                            <td style={{ padding: '8px', textAlign: 'center' }}>
                              <button title="Lưu" style={{ background: '#22c55e', color: '#fff', border: 'none', borderRadius: 6, padding: '4px 12px', cursor: 'pointer', fontSize: 14 }}
                                onClick={() => {
                                  setNewMedicine({ medicine: '', quantity: '', usage: '' });
                                  setAddRowIdx(null);
                                }}>
                                Lưu
                              </button>
                              <button title="Hủy" style={{ background: '#ccc', color: '#222', border: 'none', borderRadius: 6, padding: '4px 12px', cursor: 'pointer', fontSize: 14 }}
                                onClick={() => { setNewMedicine({ medicine: '', quantity: '', usage: '' }); setAddRowIdx(null); }}>
                                Hủy
                              </button>
                            </td>
                          </tr>
                        );
                      }
                      return result;
                    })
                  ) : (
                    <tr>
                      <td colSpan={4} style={{ padding: '16px', textAlign: 'center', color: '#888' }}>
                        (Không có dữ liệu thuốc)<br />
                        <button
                          className="viewdt-btn"
                          style={{ marginTop: 12, background: '#2563eb', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 24px', fontSize: 16, cursor: 'pointer' }}
                          onClick={() => setAddRowIdx(0)}
                        >
                          + Thêm thuốc mới
                        </button>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              {showDeleteDialog && deleteIdx !== null && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999 }}>
                  <div style={{ background: '#fff', borderRadius: 8, padding: 32, boxShadow: '0 2px 8px #aaa', minWidth: 320 }}>
                    <div style={{ fontSize: 18, marginBottom: 24 }}>
                      Bạn có muốn xóa <b>{medicines[deleteIdx]?.medicine}</b> không?
                    </div>
                    <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
                      <button style={{ background: '#ef4444', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 24px', fontSize: 16, cursor: 'pointer' }}
                        onClick={() => {
                          const newList = [...medicines];
                          newList.splice(deleteIdx, 1);
                          setMedicines(newList);
                          setShowDeleteDialog(false);
                          setDeleteIdx(null);
                          // Nếu không đang nhập dòng mới và đã xóa hết thuốc thì hiện dòng nhập mới
                          if (newList.length === 0 && addRowIdx === null) setAddRowIdx(0);
                        }}>
                        Xóa
                      </button>
                      <button style={{ background: '#ccc', color: '#222', border: 'none', borderRadius: 6, padding: '8px 24px', fontSize: 16, cursor: 'pointer' }}
                        onClick={() => { setShowDeleteDialog(false); setDeleteIdx(null); }}>
                        Hủy
                      </button>
                    </div>
                  </div>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 16, marginTop: 24 }}>
                <button
                  style={{
                    background: '#22c55e',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 8,
                    padding: '10px 32px',
                    fontWeight: 500,
                    fontSize: 16,
                    cursor: 'pointer',
                    minWidth: 140,
                    height: 44,
                    boxSizing: 'border-box',
                  }}
                  onClick={() => alert('Lưu thông tin đơn thuốc!')}
                >
                  Lưu
                </button>
                <button
                  style={{
                    background: '#222',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 8,
                    padding: '10px 32px',
                    fontWeight: 500,
                    fontSize: 16,
                    cursor: 'pointer',
                    minWidth: 140,
                    height: 44,
                    boxSizing: 'border-box',
                  }}
                  onClick={() => window.history.back()}
                >
                  Quay lại
                </button>
              </div>
            </>
          ) : (
            <div style={{ color: 'red', fontSize: 18 }}>Không tìm thấy đơn thuốc!</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewDT;
