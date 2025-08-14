import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from '../../components/Sidebar';
import { Link } from "react-router-dom";
import axios from "axios";
import './DanhSachBenhNhan.css';
import styles from './DanhSachBenhNhan.module.css';
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
    <div className="page-background">
      <h2>Danh sách bệnh nhân</h2>
      <div className="table-container">
      <table border={1} cellPadding={5} className={styles.table}>
        <thead>
          <tr>
            <th>Mã</th>
            <th>Họ tên</th>
            <th>CCCD</th>
            <th>Điện thoại</th>
            <th>Ngày tạo</th>
            <th>Chi tiết</th>
            <th>Chỉnh sửa</th>
            <th>Xóa</th>
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
                <button className={styles.detailButton} onClick={() => setSelectedPatient(p)}>Xem</button>
              </td>
              <td>
                <button>
                   <Link to={`/danh-sach-benh-nhan/edit/${p.id}`} className={styles.editButton}>
                      Chỉnh sửa
                    </Link>
                  </button>
                </td>
                <td>
                  <button
                      className={styles.deleteButton}
                      onClick={() => handleDeleteClick(p)}
                    >
                      🗑️ Xóa
                    </button>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
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
  );
};
export default DanhSachBenhNhan;
