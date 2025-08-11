import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import appIcon from '../../assets/appicon.png';
const convertDateToISO = (dateStr: string) => {
  if (!dateStr) return "";
  if (dateStr.includes("-")) {
    // yyyy-MM-dd
    return dateStr;
  } else if (dateStr.includes("/")) {
    // dd/MM/yyyy
    const [day, month, year] = dateStr.split("/");
    return `${year}-${month}-${day}`;
  }
  return dateStr;
};
function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    full_name: "",
    id_number: "",
    gender: "Nam",
    birth_date:"",//phải là chuỗi YYYY-MM-DD
    phone_number: "",
    address: "",
    university: "",
    major: "",
    graduation_year: "",
    role: "",
  });
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (e.target.name === "email" && error) setError("");
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dữ liệu gửi:", form);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const text = await res.text();
      console.log("📥 Phản hồi thô (text):", text);

      let data;
      try {
        data = JSON.parse(text);
      } catch (parseError) {
        console.error("Lỗi parse JSON:", parseError);
        setError("Phản hồi server không hợp lệ");
        return;
      }

      console.log("JSON parse thành công:", data);

      if (data.success) {
        navigate("/login");
      } else {
        setError(data.message || "Đăng ký thất bại");
      }
    } catch (err) {
      console.error("Lỗi fetch:", err);
      setError("Không thể kết nối đến server");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f4f4f4",
      }}
    >
      <div
        style={{
          width: 800,
          background: "#fff",
          borderRadius: 10,
          boxShadow: "0 2px 8px #0001",
        }}
      >
        <div
          style={{
            background: "#e3ecfa",
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            padding: 20,
            textAlign: "left",
          }}
        >
          <h2
            style={{
              margin: 0,
              color: "#2d4a7a",
              fontWeight: 400,
            }}
          >
            Tạo tài khoản
          </h2>
          <img
            src={appIcon}
            alt="logo"
            style={{ width: 60, float: "right", marginTop: -40 }}
          />
        </div>
        <form style={{ padding: 24 }} onSubmit={handleSubmit}>
          {error && (
            <div style={{ color: "red", marginBottom: 12, fontWeight: 500 }}>
              {error}
            </div>
          )}
          <div style={{ display: "flex", gap: 24 }}>
            <div style={{ flex: 1 }}>
              <InputField label="Tên tài khoản" name="username" value={form.username} onChange={handleChange} required />
              <InputField label="Email" name="email" value={form.email} onChange={handleChange} required />
              <InputField label="Trường đại học" name="university" value={form.university} onChange={handleChange} />
              <InputField label="Chuyên ngành" name="major" value={form.major} onChange={handleChange} />
              <InputField label="Năm tốt nghiệp" name="graduation_year" value={form.graduation_year} onChange={handleChange} />
              <SelectField label="Vai trò" name="role" value={form.role} onChange={handleChange} required options={[
                { value: "BacSi", label: "Bác sĩ" },
                { value: "YTa", label: "Y tá" },
                { value: "DuocSi", label: "Dược sĩ" },
                { value: "DieuDuong", label: "Điều dưỡng" },
                { value: "LeTan", label: "Lễ tân" },
                { value: "KeToan", label: "Kế toán" },
                { value: "KTV", label: "Kỹ thuật viên" },
              ]} />
              <InputField label="Mật khẩu" name="password" type="password" value={form.password} onChange={handleChange} required />
              <InputField label="Xác nhận mật khẩu" name="confirm_password" type="password" value={form.confirm_password} onChange={handleChange} required />
            </div>
            <div style={{ flex: 1 }}>
              <InputField label="Họ và tên" name="full_name" value={form.full_name} onChange={handleChange} required />
              <InputField label="CCCD" name="id_number" value={form.id_number} onChange={handleChange} required />
              <div style={{ marginBottom: 12 }}>
                <label>Giới tính <span style={{ color: "red" }}>*</span></label><br />
                <label><input type="radio" name="gender" value="Nam" checked={form.gender === "Nam"} onChange={handleChange} /> Nam</label>
                <label style={{ marginLeft: 16 }}><input type="radio" name="gender" value="Nữ" checked={form.gender === "Nữ"} onChange={handleChange} /> Nữ</label>
              </div>
              <InputField label="Ngày sinh" name="birth_date" type="date" value={form.birth_date ? convertDateToISO(form.birth_date) : ""} onChange={handleChange} />
              <InputField label="Số điện thoại" name="phone_number" value={form.phone_number} onChange={handleChange} required />
              <InputField label="Địa chỉ" name="address" value={form.address} onChange={handleChange} />
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 16 }}>
            <button type="submit" style={btnStyle}>Xác nhận</button>
            <Link to="/login" style={{ ...btnStyle, background: "#333" }}>Quay lại</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

const InputField = ({ label, name, value, onChange, type = "text", required = false }: any) => (
  <div style={{ marginBottom: 12 }}>
    <label>
      {label} {required && <span style={{ color: "red" }}>*</span>}
    </label>
    <input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={label}
      style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
    />
  </div>
);

const SelectField = ({ label, name, value, onChange, options, required = false }: any) => (
  <div style={{ marginBottom: 12 }}>
    <label>
      {label} {required && <span style={{ color: "red" }}>*</span>}
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
    >
      <option value="">Chọn {label.toLowerCase()}</option>
      {options.map((opt: any) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  </div>
);

const btnStyle = {
  background: "#2d4a7a",
  color: "#fff",
  border: "none",
  borderRadius: 4,
  padding: "10px 24px",
  fontWeight: 500,
  fontSize: 16,
  cursor: "pointer",
};

export default Register;