import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import medicalBackground from "../../assets/medical.png";
function EditProfile() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    full_name: "",
    id_number: "",
    phone_number: "",
    birth_date: "",
    gender: "",
    university: "",
    major: "",
    graduation_year: "",
    work_position: "",
    role: "",
  });

  // Lấy thông tin hiện tại của user
  useEffect(() => {
    fetch("http://localhost:8000/api/current-user/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((res) => {
        if (res.status === 401) {
          navigate("/login");
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data) setFormData(data);
      })
      .catch((err) => console.error(err));
  }, [navigate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch("http://localhost:8000/api/update-profile/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (res.ok) {
          navigate("/profile");
        } else {
          alert("Cập nhật thất bại");
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div
    style={{
      maxWidth: 500,
      margin: "auto",
      padding: 20,
      backgroundImage: `url(${medicalBackground})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: "100vh",
    }}
  >
    <div style={{ maxWidth: 500, margin: "auto", padding: 20 }}>
      <h2 style={{ textAlign: "center" }}>Chỉnh sửa thông tin</h2>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <div>
          <label>Họ tên:</label>
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div>
          <label>CMND/CCCD:</label>
          <input
            type="text"
            name="id_number"
            value={formData.id_number}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div>
          <label>Số điện thoại:</label>
          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div>
          <label>Ngày sinh:</label>
          <input
            type="date"
            name="birth_date"
            value={formData.birth_date}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div>
          <label>Giới tính:</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px" }}
          >
            <option value="">-- Chọn giới tính --</option>
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
          </select>
        </div>

        <div>
          <label>Trường đại học:</label>
          <input
            type="text"
            name="university"
            value={formData.university}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div>
          <label>Chuyên ngành:</label>
          <input
            type="text"
            name="major"
            value={formData.major}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div>
          <label>Năm tốt nghiệp:</label>
          <input
            type="number"
            name="graduation_year"
            value={formData.graduation_year}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div>
          <label>Vị trí làm việc:</label>
          <select
            name="work_position"
            value={formData.work_position}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px" }}
          >
            <option value="">-- Chọn --</option>
            <option value="BS">Bác sĩ</option>
            <option value="DD">Điều dưỡng</option>
            <option value="DS">Dược sĩ</option>
            <option value="TiepTan">Tiếp tân</option>
          </select>
        </div>

        <div>
          <label>Chức vụ:</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px" }}
          >
            <option value="">-- Chọn --</option>
            <option value="TruongPhongKham">Trưởng phòng khám</option>
            <option value="NhanVien">Nhân viên</option>
          </select>
        </div>

        {/* Hai nút cùng một hàng */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "20px",
          }}
        >
          <Link to="/profile">
            <button
              type="button"
              style={{
                background: "#aaa",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                padding: "10px 16px",
                fontSize: 16,
                cursor: "pointer",
              }}
            >
              Trở về
            </button>
          </Link>

          <button
            type="submit"
            style={{
              background: "#28a745",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              padding: "10px 16px",
              fontSize: 16,
              cursor: "pointer",
            }}
          >
            Lưu thay đổi
          </button>
        </div>
      </form>
    </div>
    </div>
  );
}

export default EditProfile;