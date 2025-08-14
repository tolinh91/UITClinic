import React, { useState } from 'react';
import axios from 'axios';
import donthuocBg from "../../assets/donthuoc.jpg";
import './CreateThuoc.css';
interface DrugFormData {
  code: string;
  name: string;
  quantity: number | '';
  unit: string;
  expiration_date: string;
  description: string;
  supplier: string;
  threshold: number | '';
  unit_price: number | '';
}

const AddDrugForm: React.FC = () => {
  const [formData, setFormData] = useState<DrugFormData>({
    code: '',
    name: '',
    quantity: '',
    unit: '',
    expiration_date: '',
    description: '',
    supplier: '',
    threshold: 10,
    unit_price: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === 'number' ? Number(value) : value;
    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setMessage('');
  setError('');

  const token = localStorage.getItem('access_token');
    console.log('Token trước khi gửi:', token);

  if (!token) {
    setError('Bạn chưa đăng nhập hoặc token không hợp lệ');
    return;
  }

  // Chuẩn hóa dữ liệu gửi lên: ép các số nếu form còn '' thành 0 hoặc null tùy ý
  const payload = {
    ...formData,
    quantity: Number(formData.quantity) || 0,
    threshold: Number(formData.threshold) || 0,
    unit_price: Number(formData.unit_price) || 0,
  };

  try {
    await axios.post('http://127.0.0.1:8000/api/drugs/', payload, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    setMessage('✅ Thêm thuốc thành công!');
    setFormData({
      code: '',
      name: '',
      quantity: '',
      unit: '',
      expiration_date: '',
      description: '',
      supplier: '',
      threshold: 10,
      unit_price: '',
    });

  } catch (err: any) {
    setError(
      err.response?.data?.detail ||
      err.response?.data?.message ||
      '❌ Lỗi khi thêm thuốc. Vui lòng kiểm tra lại dữ liệu.'
    );
  }
};

  return (
     <div  className="form-wrapper"
      style={{
        position: 'relative', // Giúp định vị các phần tử con
        minHeight: '100vh',
        backgroundImage: `url(${donthuocBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }} >
    <form onSubmit={handleSubmit} className="form-container">
  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
    
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

    <button type="submit">➕ Thêm thuốc</button>

    {message && <p style={{ color: 'green' }}>{message}</p>}
    {error && <p style={{ color: 'red' }}>{error}</p>}
  </div>
</form>
</div>
  );
};

export default AddDrugForm;