import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import './ChinhSuaBenhNhan.css';
const EditBenhNhan = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [patient, setPatient] = useState({
    full_name: "",
    gender: "",
    date_of_birth: "",
    cmnd_cccd: "",
    insurance: "",
    address: "",
    phone_number: "",
    allergy: "",
    medical_history: "",
    current_medication: "",
    symptoms: "",
    blood_pressure: "",
    heart_rate: "",
    spo2: "",
    temperature: "",
    previous_test_result: "",
    created_at: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/patient_detail/${id}/`)
      .then((res) => {
        console.log("ID hiện tại:", id);
        setPatient(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi khi tải bệnh nhân:", err);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatient((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://127.0.0.1:8000/api/patient/${id}/`, patient)
      .then(() => {
        alert("Cập nhật thành công!");
        navigate("/patients");
      })
      .catch((err) => {
        console.error("Lỗi khi cập nhật:", err);
        alert("Cập nhật thất bại!");
      });
  };

  if (loading) return <p>Đang tải dữ liệu bệnh nhân...</p>;

  return (
    <div className="form-container">
    <div className="form-group" >
      <h2>Chỉnh sửa thông tin bệnh nhân</h2>
      <form onSubmit={handleSubmit}>
        <label>Họ tên:</label>
        <input type="text" name="full_name" value={patient.full_name} onChange={handleChange} required />

        <label>Giới tính:</label>
        <select name="gender" value={patient.gender} onChange={handleChange} required>
          <option value="">-- Chọn --</option>
          <option value="Nam">Nam</option>
          <option value="Nữ">Nữ</option>
          <option value="Khác">Khác</option>
        </select>

        <label>Ngày sinh:</label>
        <input type="date" name="date_of_birth" value={patient.date_of_birth} onChange={handleChange} required />

        <label>CMND/CCCD:</label>
        <input type="text" name="cmnd_cccd" value={patient.cmnd_cccd} onChange={handleChange} />

        <label>Bảo hiểm:</label>
        <input type="text" name="insurance" value={patient.insurance} onChange={handleChange} />

        <label>Địa chỉ:</label>
        <input type="text" name="address" value={patient.address} onChange={handleChange} />

        <label>Điện thoại:</label>
        <input type="tel" name="phone_number" value={patient.phone_number} onChange={handleChange} />

        <label>Dị ứng:</label>
        <input type="text" name="allergy" value={patient.allergy} onChange={handleChange} />

        <label>Tiền sử bệnh:</label>
        <input type="text" name="medical_history" value={patient.medical_history} onChange={handleChange} />

        <label>Thuốc đang dùng:</label>
        <input type="text" name="current_medication" value={patient.current_medication} onChange={handleChange} />

        <label>Triệu chứng:</label>
        <input type="text" name="symptoms" value={patient.symptoms} onChange={handleChange} />

        <label>Huyết áp:</label>
        <input type="text" name="blood_pressure" value={patient.blood_pressure} onChange={handleChange} />

        <label>Mạch (bpm):</label>
        <input type="number" name="heart_rate" value={patient.heart_rate} onChange={handleChange} />

        <label>SpO₂ (%):</label>
        <input type="number" name="spo2" value={patient.spo2} onChange={handleChange} />

        <label>Nhiệt độ (°C):</label>
        <input type="number" step="0.1" name="temperature" value={patient.temperature} onChange={handleChange} />

        <label>Kết quả xét nghiệm cũ:</label>
        <input type="text" name="previous_test_result" value={patient.previous_test_result} onChange={handleChange} />

        <label>Ngày tạo:</label>
        <input type="text" name="created_at" value={patient.created_at} disabled />

        <div style={{ marginTop: "20px" }}>
          <button type="submit">💾 Lưu thay đổi</button>
          <button type="button" onClick={() => navigate("/danh-sach-benh-nhan")} style={{ marginLeft: "10px" }}>
            ❌ Hủy
          </button>
        </div>
      </form>
    </div>
  </div>
  );
};

export default EditBenhNhan