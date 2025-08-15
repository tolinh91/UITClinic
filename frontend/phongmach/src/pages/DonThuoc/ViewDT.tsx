import React from 'react';
import { useParams } from 'react-router-dom';
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
    statusColor: item.status === 'Chưa mua' ? '#ffa726' : '#66bb6a',
    id: idx + 1,
  }));
}

const ViewDT: React.FC = () => {
  const { code } = useParams();
  const prescriptions = getPrescriptionsFromStorage();
  const prescription = prescriptions.find(p => p.code === code);

  return (
    <div style={{ minHeight: '100vh', width: '100vw', display: 'flex', background: '#f5f6fa' }}>
      <Sidebar activePage="Đơn thuốc" />
      <div style={{ flex: 1, padding: '32px 0 0 0', minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <div style={{ background: '#fff', borderRadius: 16, margin: '0 0 24px 0', padding: '24px', boxShadow: '0 2px 8px #0001', maxWidth: '900px', width: '100%', alignSelf: 'center', minWidth: 280 }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: 18 }}>Chi tiết đơn thuốc</h2>
          {prescription ? (
            <>
              <div style={{ fontSize: 18, marginBottom: 12 }}>
                <strong>Mã đơn thuốc:</strong> <span style={{ fontWeight: 500, color: '#2563eb' }}>{prescription.code}</span>
              </div>
              <div style={{ fontSize: 16, marginBottom: 8 }}><strong>Tên bệnh nhân:</strong> {prescription.patient}</div>
              <div style={{ fontSize: 16, marginBottom: 8 }}><strong>Bác sĩ:</strong> {prescription.doctor}</div>
              <div style={{ fontSize: 16, marginBottom: 8 }}><strong>Tổng tiền:</strong> {prescription.total}</div>
              <div style={{ fontSize: 16, marginBottom: 8 }}><strong>Trạng thái:</strong> <span style={{ background: prescription.statusColor, color: '#fff', borderRadius: 8, padding: '4px 12px' }}>{prescription.status}</span></div>
              <div style={{ fontSize: 16, marginBottom: 8 }}><strong>Ngày tạo:</strong> {prescription.createdAt || '(Chưa có)'}</div>
              <div style={{ fontSize: 16, marginBottom: 8 }}><strong>BHYT:</strong> {prescription.bhyt ? 'Có' : 'Không'}</div>
              <div style={{ fontSize: 16, marginBottom: 8 }}><strong>Danh sách thuốc:</strong></div>
              <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 16 }}>
                <thead>
                  <tr style={{ background: '#f4f4f4' }}>
                    <th style={{ padding: '8px', fontWeight: 500 }}>Tên thuốc</th>
                    <th style={{ padding: '8px', fontWeight: 500 }}>Số lượng</th>
                    <th style={{ padding: '8px', fontWeight: 500 }}>Cách dùng</th>
                  </tr>
                </thead>
                <tbody>
                  {prescription.medicines && prescription.medicines.length > 0 ? (
                    prescription.medicines.map((m, idx) => (
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
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 16, marginTop: 24 }}>
                <button
                  style={{
                    background: '#2563eb',
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
                  onClick={() => window.location.href = `/thuoc/edit/${prescription.code}`}
                >
                  Chỉnh sửa
                </button>
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
