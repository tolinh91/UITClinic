// ...existing code from Register.tsx...
import { useState } from "react";
import { Link } from "react-router-dom";
import appIcon from '../../assets/appicon.png';

function Register() {
  const [form, setForm] = useState({
    userId: "",
    email: "",
    school: "",
    role: "",
    password: "",
    confirmPassword: "",
    name: "",
    cccd: "",
    gender: "Nam",
    birthday: "",
    phone: "",
    address: "",
  });
  const [error, setError] = useState("");
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (e.target.name === "email" && error) setError("");
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.email.trim().toLowerCase() === "Admin@gmail.com") {
      setError("Tài khoản đã được sử dụng.");
      return;
    }
    // ...thêm logic xác nhận khác nếu cần...
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
            style={{
              width: 60,
              float: "right",
              marginTop: -40,
            }}
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
              <div style={{ marginBottom: 12 }}>
                <label>
                  User ID <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  name="userId"
                  value={form.userId}
                  onChange={handleChange}
                  placeholder="Mã"
                  style={{
                    width: "100%",
                    padding: 8,
                    borderRadius: 4,
                    border: "1px solid #ccc",
                  }}
                />
              </div>
              <div style={{ marginBottom: 12 }}>
                <label>
                  Email <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email"
                  style={{
                    width: "100%",
                    padding: 8,
                    borderRadius: 4,
                    border: "1px solid #ccc",
                  }}
                />
              </div>
              <div style={{ marginBottom: 12 }}>
                <label>Trường đại học – chuyên ngành</label>
                <input
                  name="school"
                  value={form.school}
                  onChange={handleChange}
                  placeholder="Nhập chuyên ngành"
                  style={{
                    width: "100%",
                    padding: 8,
                    borderRadius: 4,
                    border: "1px solid #ccc",
                  }}
                />
              </div>
              <div style={{ marginBottom: 12 }}>
                <label>
                  Vai trò <span style={{ color: "red" }}>*</span>
                </label>
                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: 8,
                    borderRadius: 4,
                    border: "1px solid #ccc",
                  }}
                >
                  <option value="">Chọn vai trò</option>
                  <option value="BacSi">Bác sĩ</option>
                  <option value="YTa">Y tá</option>
                  <option value="Duocsi">Dược sĩ</option>
                  <option value="KTV">Kỹ Thuật Viên</option>
                  <option value="Dieuduong">Điều dưỡng</option>
                  <option value="KeToan">Kế toán</option>
                  <option value="LeTan">Lễ Tân</option>
                 
                </select>
              </div>
              <div style={{ marginBottom: 12 }}>
                <label>
                  Mật khẩu <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Nhập mật khẩu"
                  style={{
                    width: "100%",
                    padding: 8,
                    borderRadius: 4,
                    border: "1px solid #ccc",
                  }}
                />
              </div>
              <div style={{ marginBottom: 12 }}>
                <label>
                  Xác nhận mật khẩu <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Nhập xác nhận mật khẩu"
                  style={{
                    width: "100%",
                    padding: 8,
                    borderRadius: 4,
                    border: "1px solid #ccc",
                  }}
                />
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ marginBottom: 12 }}>
                <label>
                  Họ và tên <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Họ và tên"
                  style={{
                    width: "100%",
                    padding: 8,
                    borderRadius: 4,
                    border: "1px solid #ccc",
                  }}
                />
              </div>
              <div style={{ marginBottom: 12 }}>
                <label>
                  CCCD <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  name="cccd"
                  value={form.cccd}
                  onChange={handleChange}
                  placeholder="Gồm 12 chữ số"
                  style={{
                    width: "100%",
                    padding: 8,
                    borderRadius: 4,
                    border: "1px solid #ccc",
                  }}
                />
              </div>
              <div style={{ marginBottom: 12 }}>
                <label>
                  Giới tính <span style={{ color: "red" }}>*</span>
                </label>
                <br />
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Nam"
                    checked={form.gender === "Nam"}
                    onChange={handleChange}
                  />{" "}
                  Nam
                </label>
                <label style={{ marginLeft: 16 }}>
                  <input
                    type="radio"
                    name="gender"
                    value="Nữ"
                    checked={form.gender === "Nữ"}
                    onChange={handleChange}
                  />{" "}
                  Nữ
                </label>
              </div>
              <div style={{ marginBottom: 12 }}>
                <label>Ngày sinh</label>
                <input
                  type="date"
                  name="birthday"
                  value={form.birthday}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: 8,
                    borderRadius: 4,
                    border: "1px solid #ccc",
                  }}
                />
              </div>
              <div style={{ marginBottom: 12 }}>
                <label>
                  Số điện thoại <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Số điện thoại"
                  style={{
                    width: "100%",
                    padding: 8,
                    borderRadius: 4,
                    border: "1px solid #ccc",
                  }}
                />
              </div>
              <div style={{ marginBottom: 12 }}>
                <label>Địa chỉ</label>
                <input
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Địa chỉ"
                  style={{
                    width: "100%",
                    padding: 8,
                    borderRadius: 4,
                    border: "1px solid #ccc",
                  }}
                />
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 12,
              marginTop: 16,
            }}
          >
            <button
              type="submit"
              style={{
                background: "#2d4a7a",
                color: "#fff",
                border: "none",
                borderRadius: 4,
                padding: "10px 24px",
                fontWeight: 500,
                fontSize: 16,
                cursor: "pointer",
              }}
            >
              Xác nhận
            </button>
            <Link
              to="/login"
              style={{
                background: "#333",
                color: "#fff",
                border: "none",
                borderRadius: 4,
                padding: "10px 24px",
                fontWeight: 500,
                fontSize: 16,
                textDecoration: "none",
                display: "inline-block",
                textAlign: "center",
              }}
            >
              Quay lại
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;