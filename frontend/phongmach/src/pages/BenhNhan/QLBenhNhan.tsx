import React from "react";
import { Link } from "react-router-dom";
import appIcon from '../../assets/appicon.png';
import backgroundImage from '../../assets/medical.png';

export default function QLBenhNhan() {
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

      {/* Tiêu đề */}
      <h1 className="text-3xl font-bold text-white text-center mt-4 mb-6 shadow-lg">
        Trang Quản lý Bệnh nhân
      </h1>

      {/* Các nút */}
      <div className="flex justify-end gap-4 mt-4 pr-4">
        <Link
          to="/tao-benh-nhan"
          style={{ marginRight: "20px" }}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Tạo bệnh nhân
        </Link>

        <Link
          to="/danh-sach-benh-nhan"
          style={{ marginRight: "20px" }}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Danh sách bệnh nhân
        </Link>

        <Link
          to="/sua-benh-nhan"
          style={{ marginRight: "20px" }}
          className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
        >
          Sửa bệnh nhân
        </Link>

        <Link
          to="/xoa-benh-nhan"
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Xóa bệnh nhân
        </Link>
      </div>
    </div>
    </div>
  );
}