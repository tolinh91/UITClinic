import React from 'react';
import Sidebar from '../../components/Sidebar';

const QLXuatNhap = () => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar activePage="Xuất/Nhập kho" />
      <div style={{ flex: 1, padding: '20px', backgroundColor: '#f5f5f5' }}>
        <h1>Quản lý Xuất/Nhập kho</h1>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <p>Chức năng quản lý xuất nhập kho đang được phát triển...</p>
        </div>
      </div>
    </div>
  );
};

export default QLXuatNhap;