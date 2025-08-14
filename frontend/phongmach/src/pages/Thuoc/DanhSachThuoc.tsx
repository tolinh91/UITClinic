import React, { useEffect, useState } from "react";
import axios from "axios";
import donthuocBg from "../../assets/donthuoc.jpg"
import "./DanhSachThuoc.css";
interface Drug {
  id: number;
  code: string;
  name: string;
  quantity: number;
  unit: string;
  expiration_date: string;
  description: string;
  supplier: string;
  threshold: number;
  unit_price: number;
}

const DanhSachThuoc: React.FC = () => {
  const [drugs, setDrugs] = useState<Drug[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDrugs = async () => {
    setLoading(true);
    setError("");

    const token = localStorage.getItem("access_token");
    console.log("Token trước khi gửi:", token);

    if (!token) {
      setError("Bạn chưa đăng nhập hoặc token không hợp lệ.");
      setLoading(false);
      return;
    }

    try {
    const res = await axios.get<Drug[]>(
        "http://127.0.0.1:8000/api/drug-supplies/",
         {
        headers: {
             Authorization: `Bearer ${token}`,
            },
        }
    );
    setDrugs(res.data);
    } catch (err: any) {
      setError(
        err.response?.data?.detail ||
          "❌ Lỗi khi tải danh sách thuốc. Vui lòng thử lại."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDrugs();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${donthuocBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "20px",
      }}
    >
      <div className = "drug-list-content">
        <h2>📋 Danh sách thuốc</h2>
        {loading && <p>⏳ Đang tải...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!loading && !error && (
          <table border={1} cellPadding={8} style={{ borderCollapse: "collapse", width: "100%" }} className="drug-list-table">
            <thead>
              <tr>
                <th>Mã</th>
                <th>Tên</th>
                <th>Số lượng</th>
                <th>Đơn vị</th>
                <th>Hạn sử dụng</th>
                <th>Nhà cung cấp</th>
                <th>Ngưỡng tồn kho</th>
                <th>Giá</th>
              </tr>
            </thead>
            <tbody>
              {drugs.map((drug) => (
                <tr key={drug.id}>
                  <td>{drug.code}</td>
                  <td>{drug.name}</td>
                  <td
                    style={{
                      color: drug.quantity <= drug.threshold ? "red" : "black",
                    }}
                  >
                    {drug.quantity}
                  </td>
                  <td>{drug.unit}</td>
                  <td>{drug.expiration_date}</td>
                  <td>{drug.supplier}</td>
                  <td>{drug.threshold}</td>
                  <td>{drug.unit_price.toLocaleString()} đ</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default DanhSachThuoc;