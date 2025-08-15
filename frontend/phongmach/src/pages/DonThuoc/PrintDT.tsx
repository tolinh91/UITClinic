import React from 'react';
import { useParams } from 'react-router-dom';

// Định nghĩa Prescription giống ViewDT
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

const PrintDT: React.FC = () => {
  const { code } = useParams();
  const prescriptions = getPrescriptionsFromStorage();
  const prescription = prescriptions.find(p => p.code === code);

  if (!prescription) {
    return <div style={{ color: 'red', fontSize: 18 }}>Không tìm thấy đơn thuốc!</div>;
  }

  const allMedicines = [
    ...(prescription.medicines ?? []),
    { medicine: 'Paracetamol', quantity: '20', usage: 'Uống sau ăn' },
    { medicine: 'Amoxicillin', quantity: '15', usage: 'Uống sáng chiều' },
    { medicine: 'Vitamin C', quantity: '30', usage: 'Uống mỗi sáng' },
    { medicine: 'Ibuprofen', quantity: '10', usage: 'Uống khi đau' },
    { medicine: 'Cefuroxime', quantity: '12', usage: 'Uống trước ăn' }
  ];

  React.useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @media (max-width: 900px) {
        .printdt-container {
          max-width: 100vw !important;
          padding: 8px !important;
        }
        .printdt-table th, .printdt-table td {
          font-size: 14px !important;
          padding: 6px !important;
        }
        .printdt-btn {
          min-width: 100px !important;
          padding: 8px 12px !important;
          font-size: 14px !important;
        }
      }
      @media (max-width: 600px) {
        .printdt-container {
          max-width: 100vw !important;
          padding: 2px !important;
        }
        .printdt-table th, .printdt-table td {
          font-size: 12px !important;
          padding: 4px !important;
        }
        .printdt-btn {
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
    <div className="printdt-container" style={{ maxWidth: 700, margin: '0 auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #eee', padding: 32, fontFamily: 'Arial' }}>
      <h2 style={{ textAlign: 'center', marginBottom: 24 }}>Đơn Thuốc</h2>
      <div style={{ marginBottom: 12 }}><strong>Mã đơn thuốc:</strong> {prescription.code}</div>
      <div style={{ marginBottom: 12 }}><strong>Tên bệnh nhân:</strong> {prescription.patient || 'Nguyễn Văn A'}</div>
      <div style={{ marginBottom: 12 }}><strong>Bác sĩ:</strong> {prescription.doctor}</div>
      <div style={{ marginBottom: 12 }}><strong>Tổng tiền:</strong> {prescription.total}</div>
      <div style={{ marginBottom: 12 }}><strong>Trạng thái:</strong> {prescription.status}</div>
      <div style={{ marginBottom: 12 }}><strong>BHYT:</strong> {prescription.bhyt ? 'Có' : 'Không'}</div>
      <div style={{ marginBottom: 12 }}><strong>Ngày tạo:</strong> {
        prescription.createdAt
          ? (() => {
              const d = new Date(prescription.createdAt);
              const pad = (n: number) => n.toString().padStart(2, '0');
              return `${pad(d.getDate())}/${pad(d.getMonth()+1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
            })()
          : '(Chưa có)'
      }</div>
      <div style={{ marginBottom: 16 }}><strong>Danh sách thuốc:</strong></div>
      <table className="printdt-table" style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 24 }}>
        <thead>
          <tr style={{ background: '#f4f4f4' }}>
            <th style={{ padding: '8px', fontWeight: 500 }}>Tên thuốc</th>
            <th style={{ padding: '8px', fontWeight: 500 }}>Số lượng</th>
            <th style={{ padding: '8px', fontWeight: 500 }}>Cách dùng</th>
          </tr>
        </thead>
        <tbody>
          {allMedicines.length > 0 ? (
            allMedicines.map((m, idx) => (
              <tr key={idx}>
                <td style={{ padding: '8px' }}>{m.medicine}</td>
                <td style={{ padding: '8px' }}>{m.quantity}</td>
                <td style={{ padding: '8px' }}>{m.usage}</td>
              </tr>
            ))
          ) : (
            <tr><td colSpan={3} style={{ padding: '8px', textAlign: 'center', color: '#888' }}>(Không có dữ liệu thuốc)</td></tr>
          )}
        </tbody>
      </table>
      <div style={{ textAlign: 'center', marginTop: 32 }}>
        <button className="printdt-btn" onClick={() => window.print()} style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: 6, padding: '10px 32px', fontSize: 18, cursor: 'pointer' }}>
          In đơn thuốc
        </button>
      </div>
    </div>
  );
};

export default PrintDT;
