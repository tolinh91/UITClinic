import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import donthuocBg from "../../assets/donthuoc.jpg";

interface DrugFormData {
  code: string;
  name: string;
  quantity: number | "";
  unit: string;
  expiration_date: string;
  description: string;
  supplier: string;
  threshold: number | "";
  unit_price: number | "";
}

const EditThuoc: React.FC = () => {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<DrugFormData>({
    code: "",
    name: "",
    quantity: "",
    unit: "",
    expiration_date: "",
    description: "",
    supplier: "",
    threshold: 10,
    unit_price: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Lấy dữ liệu thuốc khi component mount
  useEffect(() => {
    const fetchDrug = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        setError("Bạn chưa đăng nhập hoặc token không hợp lệ");
        return;
      }

      try {
        const res = await axios.get<DrugFormData>(
          `http://127.0.0.1:8000/api/drugs/${code}/`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setFormData({
          code: res.data.code,
          name: res.data.name,
          quantity: res.data.quantity,
          unit: res.data.unit,
          expiration_date: res.data.expiration_date,
          description: res.data.description || "",
          supplier: res.data.supplier || "",
          threshold: res.data.threshold || 10,
          unit_price: res.data.unit_price || "",
        });
      } catch (err: any) {
        setError("Không thể tải dữ liệu thuốc.");
      }
    };

    if (code) fetchDrug();
  }, [code]);

  // Xử lý thay đổi input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === "number" ? Number(value) : value;
    setFormData((prev) => ({ ...prev, [name]: newValue }));
  };

  // Xử lý submit cập nhật
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    const token = localStorage.getItem("access_token");
    if (!token) {
      setError("Bạn chưa đăng nhập hoặc token không hợp lệ");
      return;
    }

    const payload = {
      ...formData,
      quantity: Number(formData.quantity) || 0,
      threshold: Number(formData.threshold) || 0,
      unit_price: Number(formData.unit_price) || 0,
    };

    try {
      await axios.put(
        `http://127.0.0.1:8000/api/drugs/${code}/`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage("✅ Cập nhật thuốc thành công!");
      setTimeout(() => navigate("/thuoc/danh-sach-thuoc"), 1000);
    } catch (err: any) {
      setError(
        err.response?.data?.detail ||
          err.response?.data?.message ||
          "❌ Lỗi khi cập nhật thuốc."
      );
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${donthuocBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "auto" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div>
            <label>Mã thuốc</label>
            <input
              name="code"
              placeholder="Nhập mã thuốc"
              onChange={handleChange}
              value={formData.code}
              required
            />
          </div>

          <div>
            <label>Tên thuốc</label>
            <input
              name="name"
              placeholder="Nhập tên thuốc"
              onChange={handleChange}
              value={formData.name}
              required
            />
          </div>

          <div>
            <label>Số lượng</label>
            <input
              name="quantity"
              type="number"
              placeholder="Nhập số lượng"
              onChange={handleChange}
              value={formData.quantity}
              required
            />
          </div>

          <div>
            <label>Đơn vị</label>
            <input
              name="unit"
              placeholder="Nhập đơn vị"
              onChange={handleChange}
              value={formData.unit}
              required
            />
          </div>

          <div>
            <label>Hạn sử dụng</label>
            <input
              name="expiration_date"
              type="date"
              onChange={handleChange}
              value={formData.expiration_date}
              required
            />
          </div>

          <div>
            <label>Mô tả</label>
            <input
              name="description"
              placeholder="Mô tả thuốc"
              onChange={handleChange}
              value={formData.description}
            />
          </div>

          <div>
            <label>Nhà cung cấp</label>
            <input
              name="supplier"
              placeholder="Nhập nhà cung cấp"
              onChange={handleChange}
              value={formData.supplier}
            />
          </div>

          <div>
            <label>Ngưỡng tồn kho</label>
            <input
              name="threshold"
              type="number"
              placeholder="Nhập ngưỡng tồn kho"
              onChange={handleChange}
              value={formData.threshold}
            />
          </div>

          <div>
            <label>Giá</label>
            <input
              name="unit_price"
              type="number"
              placeholder="Nhập giá"
              onChange={handleChange}
              value={formData.unit_price}
              required
            />
          </div>

          <button type="submit">💾 Cập nhật thuốc</button>

          {message && <p style={{ color: "green" }}>{message}</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      </form>
    </div>
  );
};

export default EditThuoc;