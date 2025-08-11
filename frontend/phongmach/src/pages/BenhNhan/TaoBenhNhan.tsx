import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import appIcon from '../../assets/appicon.png';
import backgroundImage from '../../assets/medical.png';
interface FormData {
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
}

const initialForm: FormData = {
  full_name: "",
  id_number: "",
  has_insurance: false,
  address: "",
  phone: "",
  allergy: "",
  medical_history: "",
  current_medications: "",
  symptoms: "",
  blood_pressure_systolic: 120,
  blood_pressure_diastolic: 80,
  pulse: 70,
  spo2: 98,
  temperature: 36.5,
  old_test_results: "",
};

const TaoBenhNhan = () => {
  const [formData, setFormData] = useState<FormData>(initialForm);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, type } = e.target;
    let value: string | number | boolean = e.target.value;

    if (type === "checkbox") {
      value = (e.target as HTMLInputElement).checked;
    } else if (type === "number") {
      value = parseFloat(value);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/create_patient/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Tạo bệnh nhân thành công!");
        navigate(`/benhnhan/${data.patient_id}`);
      } else {
        setError("Lỗi: " + JSON.stringify(data.errors));
      }
    } catch {
      setError("Không thể kết nối server.");
    }
  };

  return (
    <div
    style={{
      minHeight: "100vh",
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      padding: 40,
    }}
  >
    <div
      style={{
        maxWidth: 800,
        margin: "0 auto",
        padding: 20,
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        borderRadius: 12,
        fontFamily: "Arial, sans-serif",
      }}
    >
        <img
        src={appIcon}
        alt="App Icon"
        style={{
          width: 80,
          height: 80,
          display: "flex",
          justifyContent: "center",
          margin: "0 auto 20px auto",
        }}
      />
      <h2 style={{ marginBottom: 20, color: "#2d4a7a",textAlign: "center" }}>TẠO BỆNH NHÂN MỚI</h2>
      {error && (
        <div
          style={{
            color: "red",
            marginBottom: 16,
            backgroundColor: "#ffe5e5",
            padding: 8,
            borderRadius: 4,
          }}
        >
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column"}}>
          <label style={{ color: "green" }}>Họ và tên</label>
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ color: "green" }}>CCCD</label>
          <input
            type="text"
            name="id_number"
            value={formData.id_number}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gridColumn: "1 / 3" }}>
          <label style={{ color: "green" }}>Địa chỉ</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ color: "green" }}>Số điện thoại</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <input
            type="checkbox"
            name="has_insurance"
            checked={formData.has_insurance}
            onChange={handleChange}
          />
          <label style={{ color: "green" }}>Có bảo hiểm y tế</label>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gridColumn: "1 / 3" }}>
          <label style={{ color: "green" }}>Dị ứng</label>
          <textarea
            name="allergy"
            value={formData.allergy}
            onChange={handleChange}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gridColumn: "1 / 3" }}>
          <label style={{ color: "green" }}>Tiền sử y khoa</label>
          <textarea
            name="medical_history"
            value={formData.medical_history}
            onChange={handleChange}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gridColumn: "1 / 3" }}>
          <label style={{ color: "green" }}>Triệu chứng</label>
          <textarea
            name="symptoms"
            value={formData.symptoms}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gridColumn: "1 / 3" }}>
          <label style={{ color: "green" }}>Thuốc đang dùng</label>
          <textarea
            name="current_medications"
            value={formData.current_medications}
            onChange={handleChange}
          />
        </div>

        <div>
          <label style={{ color: "green" }}>Huyết áp (tâm thu)</label>
          <input
            type="number"
            name="blood_pressure_systolic"
            value={formData.blood_pressure_systolic}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label style={{ color: "green" }}>Huyết áp (tâm trương)</label>
          <input
            type="number"
            name="blood_pressure_diastolic"
            value={formData.blood_pressure_diastolic}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label style={{ color: "green" }}>Mạch</label>
          <input
            type="number"
            name="pulse"
            value={formData.pulse}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label style={{ color: "green" }}>SpO2</label>
          <input
            type="number"
            step="0.1"
            name="spo2"
            value={formData.spo2}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label style={{ color: "green" }}>Nhiệt độ</label>
          <input
            type="number"
            step="0.1"
            name="temperature"
            value={formData.temperature}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gridColumn: "1 / 3" }}>
          <label style={{ color: "green" }}>Xét nghiệm cũ</label>
          <textarea
            name="old_test_results"
            value={formData.old_test_results}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          style={{
            gridColumn: "1 / 3",
            padding: "12px 24px",
            backgroundColor: "#2d4a7a",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            fontSize: 16,
            cursor: "pointer",
          }}
        >
          Lưu
        </button>
      </form>
      </div>
    </div>
  );
};

export default TaoBenhNhan;