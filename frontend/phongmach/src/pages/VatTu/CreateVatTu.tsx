import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVatTu } from '../../contexts/VatTuContext';
import Sidebar from '../../components/Sidebar';
import appIcon from '../../assets/appicon.png';

const storageOptions = [
  "Tủ vật tư 1", "Tủ vật tư 2", "Tủ vật tư 3", "Tủ vật tư 4", "Tủ vật tư 5"
];

const typeOptions = [
  "Tiêu hao dùng 1 lần",
  "Tiêu hao nhiều lần",
  "Dụng cụ hỗ trợ khám",
  "Thiết bị văn phòng"
];

const nameOptionsByType: Record<string, string[]> = {
  "Tiêu hao dùng 1 lần": [
    "Găng tay cao su", "Găng tay nitrile", "Khẩu trang 3 lớp", "Kim tiêm 23G/25G",
    "Ống tiêm 1ml", "Ống tiêm 3ml", "Ống tiêm 5ml", "Gạc vô trùng", "Bông thấm",
    "Băng cuộn", "Ống nghiệm máu", "Que thử đường huyết", "Que thử nước tiểu"
  ],
  "Tiêu hao nhiều lần": [
    "Cồn 70 độ", "Chlorhexidine", "Gel rửa tay", "Khăn lau tay", "Giấy khám bệnh",
    "Giấy xét nghiệm", "Tăm bông vô trùng", "Que đè lưỡi gỗ"
  ],
  "Dụng cụ hỗ trợ khám": [
    "Đèn soi tai", "Gương soi họng", "Ống nội soi nhỏ", "Máy đo huyết áp điện tử",
    "Máy đo huyết áp thủy ngân", "Ống nghe y tế 1 đầu", "Ống nghe y tế 2 đầu",
    "Glucometer", "Que thử đường huyết", "Nhiệt kế hồng ngoại", "Nhiệt kế điện tử",
    "Máy xét nghiệm nước tiểu", "Máy test nhanh nước tiểu"
  ],
  "Thiết bị văn phòng": [
    "Máy in phiếu khám", "Giấy in toa thuốc", "Thẻ từ", "Hồ sơ", "Sổ khám",
    "Đơn thuốc", "Hóa đơn"
  ]
};

function CreateVatTu() {
  const navigate = useNavigate();
  const { addVatTu } = useVatTu();
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Form state
  const [type, setType] = useState(typeOptions[0]);
  const [name, setName] = useState(nameOptionsByType[typeOptions[0]][0]);
  const [price, setPrice] = useState('');
  const [storage, setStorage] = useState(storageOptions[0]);
  const [dateImport, setDateImport] = useState('');
  const [expiry, setExpiry] = useState('');
  const [stock, setStock] = useState('');
  const [supplier, setSupplier] = useState('');

  // Validation state
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!name) newErrors.name = 'Vui lòng chọn tên vật tư';
    if (!price) newErrors.price = 'Vui lòng nhập giá';
    else if (isNaN(Number(price))) newErrors.price = 'Giá phải là số';
    if (!type) newErrors.type = 'Vui lòng chọn loại vật tư';
    if (!storage) newErrors.storage = 'Vui lòng chọn vị trí lưu trữ';
    if (!dateImport) newErrors.dateImport = 'Vui lòng nhập ngày nhập';
    if (!expiry) newErrors.expiry = 'Vui lòng nhập hạn sử dụng';
    if (!stock) newErrors.stock = 'Vui lòng nhập số lượng';
    else if (isNaN(Number(stock))) newErrors.stock = 'Số lượng phải là số';
    if (!supplier) newErrors.supplier = 'Vui lòng nhập nhà cung cấp';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      addVatTu({
        name,
        price,
        type,
        storage,
        dateImport,
        expiry,
        stock,
        supplier
      });
      navigate('/qlvattu');
    }
  };

  const handleTypeChange = (newType: string) => {
    setType(newType);
    // Reset name when type changes to avoid invalid name for type
    setName(nameOptionsByType[newType][0]);
  };

  return (
    <div style={{ minHeight: '100vh', width: '100vw', display: 'flex', background: '#f5f6fa', position: 'relative' }}>
      {/* Sidebar */}
      <Sidebar activePage="Vật tư" />
      {/* Main content */}
      <div style={{ flex: 1, padding: '32px 0 0 0', minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        {/* Top right menu */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 16, flexWrap: 'wrap', padding: '0 32px' }}>
          <img src={appIcon} alt="logo" style={{ width: 40, borderRadius: '50%' }} />
          <span style={{ fontWeight: 500, fontSize: 18, color: '#2d4a7a' }}>Mạnh</span>
          <div style={{ position: 'relative' }}>
            <button
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18 }}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              ▼
            </button>
            {menuOpen && (
              <div style={{ position: 'absolute', right: 0, top: 32, background: '#fff', boxShadow: '0 2px 8px #0002', borderRadius: 8, minWidth: 220, zIndex: 10 }}>
                <div onClick={() => navigate('/profile')}
                  style={{ padding: '12px 28px', cursor: 'pointer', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', gap: 12, whiteSpace: 'nowrap' }}>
                  <span>👤</span> Thông tin cá nhân
                </div>
                <div onClick={() => navigate('/changepassword')}
                  style={{ padding: '12px 28px', cursor: 'pointer', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', gap: 12, whiteSpace: 'nowrap' }}>
                  <span>🔑</span> Đổi mật khẩu
                </div>
                <div onClick={() => navigate('/login')}
                  style={{ padding: '12px 28px', cursor: 'pointer', color: 'red', display: 'flex', alignItems: 'center', gap: 12, whiteSpace: 'nowrap' }}>
                  <span>⏻</span> Thoát
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Form content */}
        <div style={{ padding: '0 32px', marginTop: 18, marginBottom: 24 }}>
          <div style={{ background: '#fff', borderRadius: 16, padding: 32, maxWidth: 800, margin: '0 auto', boxShadow: '0 2px 12px #0001' }}>
            <div style={{ fontSize: '2rem', fontWeight: 600, marginBottom: 24 }}>Thêm vật tư mới</div>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Type selection */}
              <div>
                <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>Loại vật tư:</label>
                <select
                  value={type}
                  onChange={(e) => handleTypeChange(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #ccc', fontSize: 16 }}
                >
                  {typeOptions.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                {errors.type && <div style={{ color: 'red', fontSize: 14, marginTop: 4 }}>{errors.type}</div>}
              </div>

              {/* Name selection */}
              <div>
                <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>Tên vật tư:</label>
                <select
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #ccc', fontSize: 16 }}
                >
                  {nameOptionsByType[type].map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                {errors.name && <div style={{ color: 'red', fontSize: 14, marginTop: 4 }}>{errors.name}</div>}
              </div>

              {/* Price */}
              <div>
                <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>Giá (VNĐ):</label>
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #ccc', fontSize: 16 }}
                  placeholder="Nhập giá vật tư"
                />
                {errors.price && <div style={{ color: 'red', fontSize: 14, marginTop: 4 }}>{errors.price}</div>}
              </div>

              {/* Storage location */}
              <div>
                <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>Vị trí lưu trữ:</label>
                <select
                  value={storage}
                  onChange={(e) => setStorage(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #ccc', fontSize: 16 }}
                >
                  {storageOptions.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                {errors.storage && <div style={{ color: 'red', fontSize: 14, marginTop: 4 }}>{errors.storage}</div>}
              </div>

              {/* Import date */}
              <div>
                <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>Ngày nhập:</label>
                <input
                  type="date"
                  value={dateImport}
                  onChange={(e) => setDateImport(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #ccc', fontSize: 16 }}
                />
                {errors.dateImport && <div style={{ color: 'red', fontSize: 14, marginTop: 4 }}>{errors.dateImport}</div>}
              </div>

              {/* Expiry date */}
              <div>
                <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>Hạn sử dụng:</label>
                <input
                  type="date"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #ccc', fontSize: 16 }}
                />
                {errors.expiry && <div style={{ color: 'red', fontSize: 14, marginTop: 4 }}>{errors.expiry}</div>}
              </div>

              {/* Stock quantity */}
              <div>
                <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>Số lượng:</label>
                <input
                  type="text"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #ccc', fontSize: 16 }}
                  placeholder="Nhập số lượng"
                />
                {errors.stock && <div style={{ color: 'red', fontSize: 14, marginTop: 4 }}>{errors.stock}</div>}
              </div>

              {/* Supplier */}
              <div>
                <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>Nhà cung cấp:</label>
                <input
                  type="text"
                  value={supplier}
                  onChange={(e) => setSupplier(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #ccc', fontSize: 16 }}
                  placeholder="Nhập tên nhà cung cấp"
                />
                {errors.supplier && <div style={{ color: 'red', fontSize: 14, marginTop: 4 }}>{errors.supplier}</div>}
              </div>

              {/* Submit buttons */}
              <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                <button
                  type="submit"
                  style={{ background: '#1ec9a4', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 32px', fontWeight: 500, fontSize: 16, cursor: 'pointer' }}
                >
                  Thêm vật tư
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/qlvattu')}
                  style={{ background: '#eee', color: '#333', border: 'none', borderRadius: 8, padding: '12px 32px', fontWeight: 500, fontSize: 16, cursor: 'pointer' }}
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateVatTu;
