import React from "react";

const PrintGKB: React.FC = () => {
  // Có thể nhận props hoặc lấy dữ liệu từ localStorage/location.state nếu cần
  return (
    <div style={{ padding: 32, background: '#fff', minHeight: '100vh' }}>
      <h2 style={{ color: '#2a5ca4', fontWeight: 700, textAlign: 'center', marginBottom: 32 }}>Giấy khám bệnh</h2>
      {/* Nội dung giấy khám bệnh để in, có thể copy từ DetailGKB hoặc tuỳ chỉnh */}
      <div style={{ maxWidth: 800, margin: '0 auto', fontSize: 14, color: '#222', border: '1px solid #eee', borderRadius: 12, padding: 32 }}>
        <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 18 }}>Thông tin khám</div>
        <table style={{ width: '100%', fontSize: 12, borderCollapse: 'collapse', marginBottom: 24 }}>
          <tbody>
            <tr><td style={{ padding: 6 }}>Mã giấy khám bệnh:</td><td>GKB00001</td><td>Tiêu đề:</td><td>Tổng quát</td></tr>
            <tr><td style={{ padding: 6 }}>STT khám:</td><td>1</td><td>Tên bệnh nhân:</td><td>Mạnh</td></tr>
            <tr><td style={{ padding: 6 }}>Tên phòng khám:</td><td>Phòng xét nghiệm</td><td>Trạng thái:</td><td style={{ color: '#1ec9a4' }}>Đã khám</td></tr>
            <tr><td style={{ padding: 6 }}>Tên bác sĩ:</td><td>Lê Thắng</td><td>Thanh toán:</td><td style={{ color: '#1ec9a4' }}>Đã thanh toán</td></tr>
            <tr><td style={{ padding: 6 }}>Giá:</td><td style={{ color: '#1ec9a4' }}>300.000 VNĐ</td><td></td><td></td></tr>
          </tbody>
        </table>
        <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 18 }}>Kết quả khám</div>
        <table style={{ width: '100%', fontSize: 12, borderCollapse: 'collapse', marginBottom: 24 }}>
          <tbody>
            <tr><td style={{ padding: 6 }}>Triệu chứng:</td><td>Bình thường</td></tr>
            <tr><td style={{ padding: 6 }}>Chẩn đoán:</td><td></td></tr>
            <tr><td style={{ padding: 6 }}>Hướng dẫn điều trị:</td><td></td></tr>
            <tr><td style={{ padding: 6 }}>Dặn dò:</td><td></td></tr>
          </tbody>
        </table>
        <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 18 }}>Đơn thuốc</div>
        <table style={{ width: '100%', fontSize: 12, borderCollapse: 'collapse', marginBottom: 24 }}>
          <thead>
            <tr style={{ background: '#f5f6fa', color: '#2a5ca4' }}>
              <th style={{ padding: 6 }}>STT</th>
              <th style={{ padding: 6 }}>Tên thuốc</th>
              <th style={{ padding: 6 }}>Đơn vị tính</th>
              <th style={{ padding: 6 }}>Số lượng</th>
              <th style={{ padding: 6 }}>Cách dùng</th>
              <th style={{ padding: 6 }}>Giá (VNĐ)</th>
              <th style={{ padding: 6 }}>Tổng tiền (VNĐ)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: 6, textAlign: 'center' }}>1</td>
              <td style={{ padding: 6 }}>Hytelea</td>
              <td style={{ padding: 6 }}>VNĐ</td>
              <td style={{ padding: 6, textAlign: 'center' }}>2</td>
              <td style={{ padding: 6 }}>1v/ngày</td>
              <td style={{ padding: 6, textAlign: 'right' }}>50.000</td>
              <td style={{ padding: 6, textAlign: 'right' }}>50.000</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PrintGKB;
