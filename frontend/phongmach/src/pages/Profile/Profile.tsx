/* Đây là code tôi code */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Sidebar';
import { Link } from "react-router-dom";

interface IUser {
  full_name: string;
  id_number: string;
  birth_date: string;
  phone_number: string;
  gender: string;
  address: string;
  university: string;
  major: string;
  graduation_year: number;
  is_manager: boolean;
  role: string;
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [showInfo, setShowInfo] = useState(false);

  // Gọi API khi component mount

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f5f6fa' }}>
  {/* Sidebar mới giống MainPage */}
  <Sidebar activePage="Thông tin cá nhân" />

      {/* Main Content */}
      <main style={{ flex: 1, padding: '32px 0 0 0' }}>

        {showInfo && user && (
          <div style={{ padding: '0 32px', marginTop: 24 }}>
            <section style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 24 }}>
                <tbody>
                  <tr><td style={{ padding: '8px 0', color: '#222', width: 180 }}>Họ và tên:</td><td>{user.full_name}</td></tr>
                  <tr><td style={{ padding: '8px 0', color: '#222' }}>CCCD:</td><td>{user.id_number}</td></tr>
                  <tr><td style={{ padding: '8px 0', color: '#222' }}>Ngày sinh:</td><td>{new Date(user.birth_date).toLocaleDateString()}</td></tr>
                  <tr><td style={{ padding: '8px 0', color: '#222' }}>Số điện thoại:</td><td>{user.phone_number}</td></tr>
                  <tr><td style={{ padding: '8px 0', color: '#222' }}>Giới tính:</td><td>{user.gender}</td></tr>
                  <tr><td style={{ padding: '8px 0', color: '#222' }}>Địa chỉ:</td><td>{user.address}</td></tr>
                  <tr><td style={{ padding: '8px 0', color: '#222' }}>Trường đại học:</td><td>{user.university}</td></tr>
                  <tr><td style={{ padding: '8px 0', color: '#222' }}>Chuyên ngành:</td><td>{user.major}</td></tr>
                  <tr><td style={{ padding: '8px 0', color: '#222' }}>Năm tốt nghiệp:</td><td>{user.graduation_year}</td></tr>
                  <tr><td style={{ padding: '8px 0', color: '#222' }}>Chức vụ:</td><td>{user.is_manager ? 'Trưởng phòng khám' : user.role}</td></tr>
                </tbody>
              </table>
              <div style={{ textAlign: 'right' ,display: 'flex', gap: '16px', justifyContent: 'flex-start'}}>
                <Link to="/editprofile">
                <button style={{ background: '#2a5ca4', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 32px', fontSize: 16, fontWeight: 500, cursor: 'pointer' }}>
                  Chỉnh sửa
                </button>
                </Link>
                <Link to="/main">
                <button style={{ background: '#2a5ca4', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 32px', fontSize: 16, fontWeight: 500, cursor: 'pointer' }}>
                  Trở về trang chủ
                </button>
                </Link>
              </div>
            </section>
          </div>
        )}

      </main>
    </div>
  );
};

export default Profile;
/* Đây là code tôi code */