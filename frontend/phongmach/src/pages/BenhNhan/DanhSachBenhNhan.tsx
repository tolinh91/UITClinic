import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from '../../components/Sidebar';

interface BenhNhan {
  id: string;
  maBenhNhan: string;
  tenBenhNhan: string;
  gioiTinh: string;
  soDienThoai: string;
  ngaySinh: string;
  diaChi: string;
}

const initialBenhNhanList: BenhNhan[] = [
  {
    id: "1",
    maBenhNhan: "BN000001",
    tenBenhNhan: "Lê Mạnh",
    gioiTinh: "Nam",
    soDienThoai: "0338056274",
    ngaySinh: "1/1/2002",
    diaChi: "Thủ Đức"
  },
  {
    id: "2", 
    maBenhNhan: "BN000002",
    tenBenhNhan: "Tô Linh",
    gioiTinh: "Nữ",
    soDienThoai: "",
    ngaySinh: "",
    diaChi: "Hậu Giang"
  }
];

function DanhSachBenhNhan() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [benhNhanList, setBenhNhanList] = useState<BenhNhan[]>(initialBenhNhanList);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<BenhNhan | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<BenhNhan | null>(null);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
  const [deletedPatientInfo, setDeletedPatientInfo] = useState<string>('');
  const [showAddSuccess, setShowAddSuccess] = useState(false);
  const [addedPatientInfo, setAddedPatientInfo] = useState<string>('');

  // Load patients from localStorage on mount and check for new patient
  useEffect(() => {
    const savedPatients = JSON.parse(localStorage.getItem('benhNhanList') || '[]');
    if (savedPatients.length > 0) {
      setBenhNhanList(prev => {
        const existingIds = prev.map(p => p.id);
        const newPatients = savedPatients.filter((p: BenhNhan) => !existingIds.includes(p.id));
        
        if (newPatients.length > 0) {
          const latestPatient = newPatients[newPatients.length - 1];
          setAddedPatientInfo(`${latestPatient.maBenhNhan} ${latestPatient.tenBenhNhan}`);
          setShowAddSuccess(true);
          setTimeout(() => setShowAddSuccess(false), 4000);
          
          // Clear the localStorage flag
          localStorage.removeItem('newPatientAdded');
          
          return [...prev, ...newPatients];
        }
        return prev;
      });
    }
  }, []);

  const validateDate = (dateString: string): boolean => {
    if (!dateString) return true; // Allow empty date
    
    // Parse date in dd/mm/yyyy or dd/mm/yy format
    const dateRegex = /^(\d{1,2})\/(\d{1,2})\/(\d{2,4})$/;
    const match = dateString.match(dateRegex);
    
    if (!match) return false;
    
    let day = parseInt(match[1], 10);
    let month = parseInt(match[2], 10);
    let year = parseInt(match[3], 10);
    
    // Convert 2-digit year to 4-digit year
    if (year < 100) {
      year += year < 50 ? 2000 : 1900;
    }
    
    // Check if date is valid
    const date = new Date(year, month - 1, day);
    if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
      return false;
    }
    
    // Check date range: 1/1/1900 to current date
    const minDate = new Date(1900, 0, 1);
    const maxDate = new Date();
    
    return date >= minDate && date <= maxDate;
  };

  const handleSearch = () => {
    if (!search.trim()) return benhNhanList;
    return benhNhanList.filter(bn => 
      bn.tenBenhNhan.toLowerCase().includes(search.toLowerCase()) ||
      bn.maBenhNhan.toLowerCase().includes(search.toLowerCase()) ||
      bn.soDienThoai.includes(search)
    );
  };

  const handleEdit = (benhNhan: BenhNhan) => {
    setEditingId(benhNhan.id);
    setEditFormData({ ...benhNhan });
  };

  const handleSave = () => {
    if (editFormData && editingId) {
      // Validate birth date before saving
      if (editFormData.ngaySinh && !validateDate(editFormData.ngaySinh)) {
        alert("Ngày sinh không hợp lệ. Vui lòng nhập ngày sinh theo định dạng dd/mm/yyyy và trong khoảng từ 1/1/1900 đến ngày hiện tại");
        return;
      }
      
      setBenhNhanList(prev => 
        prev.map(bn => bn.id === editingId ? editFormData : bn)
      );
      setEditingId(null);
      setEditFormData(null);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditFormData(null);
  };

  const handleInputChange = (field: keyof BenhNhan, value: string) => {
    if (editFormData) {
      setEditFormData(prev => prev ? { ...prev, [field]: value } : null);
    }
  };

  const handleDeleteClick = (benhNhan: BenhNhan) => {
    setDeleteTarget(benhNhan);
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = () => {
    if (deleteTarget) {
      setBenhNhanList(prev => prev.filter(bn => bn.id !== deleteTarget.id));
      setDeletedPatientInfo(`${deleteTarget.maBenhNhan} ${deleteTarget.tenBenhNhan}`);
      setShowDeleteSuccess(true);
      setTimeout(() => setShowDeleteSuccess(false), 4000);
    }
    setShowDeleteConfirm(false);
    setDeleteTarget(null);
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
    setDeleteTarget(null);
  };

  const handleMenuSelect = (option: string) => {
    setMenuOpen(false);
    if (option === "Thông tin cá nhân") navigate("/profile");
    else if (option === "Đổi mật khẩu") navigate("/changepassword");
    else if (option === "Thoát") navigate("/login");
  };

  return (
    <div style={{ minHeight: '100vh', width: '100vw', display: 'flex', background: '#f5f6fa', position: 'relative' }}>
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000
        }}>
          <div style={{
            background: '#fff',
            borderRadius: '12px',
            padding: '32px',
            boxShadow: '0 20px 25px rgba(0,0,0,0.1)',
            maxWidth: '400px',
            width: '90%'
          }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: '600', color: '#374151' }}>
              Xác nhận xóa
            </h3>
            <p style={{ margin: '0 0 24px 0', fontSize: '14px', color: '#6b7280', lineHeight: '1.5' }}>
              Bạn có muốn xóa thông tin bệnh nhân <strong>{deleteTarget?.tenBenhNhan}</strong>?
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                onClick={handleDeleteCancel}
                style={{
                  padding: '10px 20px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  background: '#fff',
                  color: '#374151',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = '#f9fafb';
                  e.currentTarget.style.borderColor = '#9ca3af';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = '#fff';
                  e.currentTarget.style.borderColor = '#d1d5db';
                }}
              >
                Không
              </button>
              <button
                onClick={handleDeleteConfirm}
                style={{
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '8px',
                  background: '#ef4444',
                  color: '#fff',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = '#dc2626'}
                onMouseOut={(e) => e.currentTarget.style.background = '#ef4444'}
              >
                Có
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Success Notification */}
      {showAddSuccess && (
        <div style={{
          position: 'fixed',
          top: 20,
          right: 20,
          zIndex: 1000,
          background: '#10b981',
          color: 'white',
          padding: '16px 24px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          fontSize: '14px',
          fontWeight: '500',
          maxWidth: '400px'
        }}>
          Thông tin bệnh nhân {addedPatientInfo} đã thêm thành công
        </div>
      )}

      {/* Delete Success Notification */}
      {showDeleteSuccess && (
        <div style={{
          position: 'fixed',
          top: 20,
          right: 20,
          zIndex: 1000,
          background: '#ef4444',
          color: 'white',
          padding: '16px 24px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          fontSize: '14px',
          fontWeight: '500',
          maxWidth: '400px'
        }}>
          Thông tin bệnh nhân {deletedPatientInfo} đã xóa thành công
        </div>
      )}
      {/* Sidebar */}
      <Sidebar activePage="Bệnh nhân" />

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '24px 32px' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 28, fontWeight: 'bold', color: '#1e293b', marginBottom: 8 }}>
              Danh sách bệnh nhân
            </h1>
          </div>
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                background: '#fff',
                border: '1px solid #e2e8f0',
                borderRadius: '50%',
                width: 48,
                height: 48,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: 'bold',
                color: '#1e293b'
              }}
            >
              Mạnh
            </button>
            {menuOpen && (
              <div style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                marginTop: 8,
                background: '#fff',
                border: '1px solid #e2e8f0',
                borderRadius: 8,
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                zIndex: 1000,
                minWidth: 160
              }}>
                {["Thông tin cá nhân", "Đổi mật khẩu", "Thoát"].map(option => (
                  <div
                    key={option}
                    onClick={() => handleMenuSelect(option)}
                    style={{
                      padding: '12px 16px',
                      cursor: 'pointer',
                      fontSize: 14,
                      color: '#374151',
                      borderBottom: option !== "Thoát" ? '1px solid #f3f4f6' : 'none'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.background = '#f9fafb'}
                    onMouseOut={(e) => e.currentTarget.style.background = '#fff'}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Search and Add Button */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="Nhập tên bệnh nhân"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  padding: '12px 16px 12px 48px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none',
                  width: '300px',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              />
              <span style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#9ca3af',
                fontSize: '18px'
              }}>
                🔍
              </span>
            </div>
            <button
              style={{
                padding: '12px 24px',
                background: '#1ec9a4',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = '#17a085'}
              onMouseOut={(e) => e.currentTarget.style.background = '#1ec9a4'}
            >
              Tìm kiếm
            </button>
          </div>
          <button
            onClick={() => navigate('/qlbenhnhan/tao')}
            style={{
              padding: '12px 24px',
              background: '#1ec9a4',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = '#17a085'}
            onMouseOut={(e) => e.currentTarget.style.background = '#1ec9a4'}
          >
            + Thêm bệnh nhân
          </button>
        </div>

        {/* Table */}
        <div style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8fafc' }}>
                  <th style={{ padding: '16px 12px', border: '1px solid #e2e8f0', textAlign: 'left', fontWeight: '600', color: '#374151', fontSize: '14px' }}>STT</th>
                  <th style={{ padding: '16px 12px', border: '1px solid #e2e8f0', textAlign: 'left', fontWeight: '600', color: '#374151', fontSize: '14px' }}>Mã bệnh nhân</th>
                  <th style={{ padding: '16px 12px', border: '1px solid #e2e8f0', textAlign: 'left', fontWeight: '600', color: '#374151', fontSize: '14px' }}>Tên bệnh nhân</th>
                  <th style={{ padding: '16px 12px', border: '1px solid #e2e8f0', textAlign: 'left', fontWeight: '600', color: '#374151', fontSize: '14px' }}>Giới tính</th>
                  <th style={{ padding: '16px 12px', border: '1px solid #e2e8f0', textAlign: 'left', fontWeight: '600', color: '#374151', fontSize: '14px' }}>Số điện thoại</th>
                  <th style={{ padding: '16px 12px', border: '1px solid #e2e8f0', textAlign: 'left', fontWeight: '600', color: '#374151', fontSize: '14px' }}>Ngày sinh</th>
                  <th style={{ padding: '16px 12px', border: '1px solid #e2e8f0', textAlign: 'left', fontWeight: '600', color: '#374151', fontSize: '14px' }}>Địa chỉ</th>
                  <th style={{ padding: '16px 12px', border: '1px solid #e2e8f0', textAlign: 'center', fontWeight: '600', color: '#374151', fontSize: '14px' }}>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {handleSearch().map((benhNhan, idx) => {
                  const isEditing = editingId === benhNhan.id;
                  const displayData = isEditing ? editFormData : benhNhan;
                  
                  return (
                    <tr key={benhNhan.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '16px 12px', border: '1px solid #e2e8f0', fontSize: '14px', color: '#374151' }}>{idx + 1}</td>
                      <td style={{ padding: '16px 12px', border: '1px solid #e2e8f0', fontSize: '14px', color: '#374151' }}>{benhNhan.maBenhNhan}</td>
                      <td style={{ padding: '16px 12px', border: '1px solid #e2e8f0', fontSize: '14px', color: '#374151', fontWeight: '500' }}>
                        {isEditing ? (
                          <input
                            type="text"
                            value={displayData?.tenBenhNhan || ''}
                            onChange={(e) => handleInputChange('tenBenhNhan', e.target.value)}
                            style={{
                              width: '100%',
                              padding: '4px 8px',
                              border: '1px solid #d1d5db',
                              borderRadius: '4px',
                              fontSize: '14px',
                              outline: 'none'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                            onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                          />
                        ) : (
                          benhNhan.tenBenhNhan
                        )}
                      </td>
                      <td style={{ padding: '16px 12px', border: '1px solid #e2e8f0', fontSize: '14px', color: '#374151' }}>
                        {isEditing ? (
                          <select
                            value={displayData?.gioiTinh || ''}
                            onChange={(e) => handleInputChange('gioiTinh', e.target.value)}
                            style={{
                              width: '100%',
                              padding: '4px 8px',
                              border: '1px solid #d1d5db',
                              borderRadius: '4px',
                              fontSize: '14px',
                              outline: 'none',
                              background: '#fff'
                            }}
                          >
                            <option value="">Chọn</option>
                            <option value="Nam">Nam</option>
                            <option value="Nữ">Nữ</option>
                          </select>
                        ) : (
                          benhNhan.gioiTinh
                        )}
                      </td>
                      <td style={{ padding: '16px 12px', border: '1px solid #e2e8f0', fontSize: '14px', color: '#374151' }}>
                        {isEditing ? (
                          <input
                            type="text"
                            value={displayData?.soDienThoai || ''}
                            onChange={(e) => handleInputChange('soDienThoai', e.target.value)}
                            placeholder="Nhập số điện thoại"
                            style={{
                              width: '100%',
                              padding: '4px 8px',
                              border: '1px solid #d1d5db',
                              borderRadius: '4px',
                              fontSize: '14px',
                              outline: 'none'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                            onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                          />
                        ) : (
                          benhNhan.soDienThoai
                        )}
                      </td>
                      <td style={{ padding: '16px 12px', border: '1px solid #e2e8f0', fontSize: '14px', color: '#374151' }}>
                        {isEditing ? (
                          <input
                            type="text"
                            value={displayData?.ngaySinh || ''}
                            onChange={(e) => handleInputChange('ngaySinh', e.target.value)}
                            placeholder="dd/mm/yyyy"
                            title="Ngày sinh từ 1/1/1900 đến hiện tại"
                            style={{
                              width: '100%',
                              padding: '4px 8px',
                              border: '1px solid #d1d5db',
                              borderRadius: '4px',
                              fontSize: '14px',
                              outline: 'none'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                            onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                          />
                        ) : (
                          benhNhan.ngaySinh
                        )}
                      </td>
                      <td style={{ padding: '16px 12px', border: '1px solid #e2e8f0', fontSize: '14px', color: '#374151' }}>
                        {isEditing ? (
                          <input
                            type="text"
                            value={displayData?.diaChi || ''}
                            onChange={(e) => handleInputChange('diaChi', e.target.value)}
                            placeholder="Nhập địa chỉ"
                            style={{
                              width: '100%',
                              padding: '4px 8px',
                              border: '1px solid #d1d5db',
                              borderRadius: '4px',
                              fontSize: '14px',
                              outline: 'none'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                            onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                          />
                        ) : (
                          benhNhan.diaChi
                        )}
                      </td>
                      <td style={{ padding: '16px 12px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                          {isEditing ? (
                            <>
                              <button 
                                onClick={handleSave}
                                style={{ 
                                  background: 'none', 
                                  border: 'none', 
                                  cursor: 'pointer', 
                                  color: '#1ec9a4', 
                                  fontSize: 18,
                                  padding: '4px'
                                }} 
                                title="Lưu"
                              >
                                💾
                              </button>
                              <button 
                                onClick={handleCancel}
                                style={{ 
                                  background: 'none', 
                                  border: 'none', 
                                  cursor: 'pointer', 
                                  color: '#6b7280', 
                                  fontSize: 18,
                                  padding: '4px'
                                }} 
                                title="Hủy"
                              >
                                ❌
                              </button>
                            </>
                          ) : (
                            <>
                              <button 
                                onClick={() => handleEdit(benhNhan)}
                                style={{ 
                                  background: 'none', 
                                  border: 'none', 
                                  cursor: 'pointer', 
                                  color: '#1ec9a4', 
                                  fontSize: 18,
                                  padding: '4px'
                                }} 
                                title="Sửa"
                              >
                                ✏️
                              </button>
                              <button 
                                onClick={() => handleDeleteClick(benhNhan)}
                                style={{ 
                                  background: 'none', 
                                  border: 'none', 
                                  cursor: 'pointer', 
                                  color: 'red', 
                                  fontSize: 18,
                                  padding: '4px'
                                }} 
                                title="Xóa"
                              >
                                🗑️
                              </button>
                              <button 
                                onClick={() => navigate('/qlgkb/tao', { 
                                  state: { 
                                    patientInfo: {
                                      id: benhNhan.id,
                                      maBenhNhan: benhNhan.maBenhNhan,
                                      tenBenhNhan: benhNhan.tenBenhNhan,
                                      gioiTinh: benhNhan.gioiTinh,
                                      soDienThoai: benhNhan.soDienThoai,
                                      ngaySinh: benhNhan.ngaySinh,
                                      diaChi: benhNhan.diaChi
                                    }
                                  }
                                })}
                                style={{ 
                                  background: 'none', 
                                  border: 'none', 
                                  cursor: 'pointer', 
                                  color: '#3b82f6', 
                                  fontSize: 18,
                                  padding: '4px'
                                }} 
                                title="Tạo giấy khám bệnh"
                              >
                                📄
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DanhSachBenhNhan;
