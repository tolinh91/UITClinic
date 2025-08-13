import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Medicine {
  name: string;
  quantity: number;
  usage: string;
}

interface DonThuoc {
  id: string;
  patientName: string;
  createdDate: string;
  medicines: Medicine[];
  notes?: string;
}

const InDonThuoc = () => {
  const [donThuoc, setDonThuoc] = useState<DonThuoc | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Lấy dữ liệu đơn thuốc từ localStorage, bạn chỉnh key cho đúng với TaoDonThuoc.tsx
    const data = localStorage.getItem("donThuoc");
    if (data) {
      setDonThuoc(JSON.parse(data));
    } else {
      alert("Không tìm thấy đơn thuốc để in");
      navigate("/qldonthuoc/tao"); // Chuyển về trang tạo đơn thuốc nếu không có dữ liệu
    }
  }, [navigate]);

  if (!donThuoc) {
    return <div>Đang tải đơn thuốc...</div>;
  }

  return (
    <div style={{ maxWidth: 800, margin: "20px auto", padding: 24, border: "1px solid #ddd", borderRadius: 8 }}>
      <h2 style={{ textAlign: "center", marginBottom: 20 }}>ĐƠN THUỐC</h2>
      
      <p><strong>Mã đơn thuốc:</strong> {donThuoc.id}</p>
      <p><strong>Bệnh nhân:</strong> {donThuoc.patientName}</p>
      <p><strong>Ngày tạo:</strong> {donThuoc.createdDate}</p>

      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 20 }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ccc", padding: 8 }}>STT</th>
            <th style={{ border: "1px solid #ccc", padding: 8 }}>Tên thuốc</th>
            <th style={{ border: "1px solid #ccc", padding: 8 }}>Số lượng</th>
            <th style={{ border: "1px solid #ccc", padding: 8 }}>Cách dùng</th>
          </tr>
        </thead>
        <tbody>
          {donThuoc.medicines.map((med, index) => (
            <tr key={index}>
              <td style={{ border: "1px solid #ccc", padding: 8, textAlign: "center" }}>{index + 1}</td>
              <td style={{ border: "1px solid #ccc", padding: 8 }}>{med.name}</td>
              <td style={{ border: "1px solid #ccc", padding: 8, textAlign: "center" }}>{med.quantity}</td>
              <td style={{ border: "1px solid #ccc", padding: 8 }}>{med.usage}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {donThuoc.notes && (
        <div style={{ marginTop: 20 }}>
          <strong>Ghi chú:</strong>
          <p>{donThuoc.notes}</p>
        </div>
      )}

      <div style={{ marginTop: 40, textAlign: "right" }}>
        <button
          onClick={() => window.print()}
          style={{
            padding: "10px 20px",
            backgroundColor: "#3b82f6",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            cursor: "pointer"
          }}
        >
          In đơn thuốc
        </button>
      </div>
    </div>
  );
};

export default InDonThuoc;