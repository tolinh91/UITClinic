import React, { useEffect, useState } from "react";

import axios from "axios";

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
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await axios.get<Patient[]>("http://127.0.0.1:8000/patient_list/");
        setPatients(res.data);
      } catch (err) {
        console.error(err);
        setError("Không thể tải danh sách bệnh nhân.");
      } finally {
        setLoading(false);
      }
    };
    fetchPatients();
  }, []);

  if (loading) return <p>Đang tải...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Danh sách bệnh nhân</h2>
      <table border={1} cellPadding={5}>
        <thead>
          <tr>
            <th>Mã</th>
            <th>Họ tên</th>
            <th>CCCD</th>
            <th>Điện thoại</th>
            <th>Ngày tạo</th>
            <th>Chi tiết</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((p) => (
            <tr key={p.id}>
              <td>{p.code}</td>
              <td>{p.full_name}</td>
              <td>{p.id_number}</td>
              <td>{p.phone}</td>
              <td>{new Date(p.created_at).toLocaleDateString()}</td>
              <td>
                <button onClick={() => setSelectedPatient(p)}>Xem</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedPatient && (
        <div style={{ marginTop: "20px", border: "1px solid #ccc", padding: "10px" }}>
          <h3>Thông tin bệnh nhân: {selectedPatient.full_name}</h3>
          <ul>
            <li>Mã: {selectedPatient.code}</li>
            <li>CMND: {selectedPatient.id_number}</li>
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
  );
};
export default DanhSachBenhNhan;
