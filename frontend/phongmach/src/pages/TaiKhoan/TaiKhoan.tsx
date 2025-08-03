import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from '../../components/Sidebar';
import { useAccountContext } from '../../contexts/AccountContext';
import appIcon from '../../assets/appicon.png';

function TaiKhoan() {
  const navigate = useNavigate();
  const { accounts, updateAccount, deleteAccount } = useAccountContext();
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredAccounts, setFilteredAccounts] = useState(accounts);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<any>({});
  
  // Delete confirmation states
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteAccountId, setDeleteAccountId] = useState<number | null>(null);
  const [deleteAccountName, setDeleteAccountName] = useState("");
  
  // Password verification states
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  
  // Success notification
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Update filtered accounts when accounts change
  React.useEffect(() => {
    setFilteredAccounts(accounts);
  }, [accounts]);

  const handleSearch = () => {
    const s = search.trim().toLowerCase();
    if (!s) {
      setFilteredAccounts(accounts);
    } else {
      setFilteredAccounts(accounts.filter(acc => 
        acc.hoVaTen.toLowerCase().includes(s) || 
        acc.ma.toLowerCase().includes(s)
      ));
    }
  };

  const handleEdit = (account: any) => {
    setEditingId(account.id);
    setEditData({ ...account });
  };

  const handleSave = (id: number) => {
    updateAccount(id, editData);
    setEditingId(null);
    setEditData({});
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData({});
  };

  const handleInputChange = (field: string, value: string) => {
    setEditData({ ...editData, [field]: value });
  };

  // Delete functionality
  const handleDeleteClick = (account: any) => {
    setDeleteAccountId(account.id);
    setDeleteAccountName(account.hoVaTen);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    setShowDeleteConfirm(false);
    setShowPasswordModal(true);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setDeleteAccountId(null);
    setDeleteAccountName("");
  };

  const verifyPasswordAndDelete = () => {
    // Use the current admin password for verification
    const currentUserPassword = "1234"; // admin@gmail.com password
    
    if (password === currentUserPassword) {
      // Delete the account
      if (deleteAccountId) {
        deleteAccount(deleteAccountId);
      }
      
      // Show success message
      setSuccessMessage(`Xóa thành công tài khoản người dùng ${deleteAccountName}`);
      setDeleteSuccess(true);
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setDeleteSuccess(false);
        setSuccessMessage("");
      }, 5000);
      
      // Reset states
      setShowPasswordModal(false);
      setPassword("");
      setPasswordError("");
      setDeleteAccountId(null);
      setDeleteAccountName("");
    } else {
      setPasswordError("Vui lòng nhập lại mật khẩu");
    }
  };

  const cancelPasswordModal = () => {
    setShowPasswordModal(false);
    setPassword("");
    setPasswordError("");
    setDeleteAccountId(null);
    setDeleteAccountName("");
  };

  return (
    <div style={{ minHeight: '100vh', width: '100vw', display: 'flex', background: '#f5f6fa' }}>
      {/* Success notification */}
      {deleteSuccess && (
        <div style={{ position: 'fixed', top: 24, right: 24, zIndex: 1000 }}>
          <div style={{ background: '#1ec9a4', color: '#fff', padding: '14px 32px', borderRadius: 8, fontWeight: 500, fontSize: 16, boxShadow: '0 2px 8px #0002' }}>
            {successMessage}
          </div>
        </div>
      )}

      {/* Sidebar */}
      <Sidebar activePage="Cài đặt" />
      
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

        {/* Title & search */}
        <div style={{ background: '#fff', borderRadius: 16, margin: '0 32px', padding: '32px 32px 24px 32px', boxShadow: '0 2px 12px #0001', maxWidth: 1400, alignSelf: 'center', width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
            <div style={{ fontSize: '2rem', fontWeight: 600 }}>Danh sách tài khoản</div>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
              <div style={{ position: 'relative', width: 320, marginRight: 12 }}>
                <span style={{ position: 'absolute', left: 12, top: 10, fontSize: 18, color: '#888' }}>🔍</span>
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Nhập họ và tên"
                  style={{ width: '100%', padding: '10px 14px 10px 40px', borderRadius: 8, border: '1px solid #ccc', fontSize: 16 }}
                />
              </div>
              <button 
                type="button" 
                style={{ background: '#1ec9a4', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 500, fontSize: 16, cursor: 'pointer' }} 
                onClick={handleSearch}
              >
                Tìm kiếm
              </button>
            </div>
            <button 
              type="button" 
              style={{ background: '#1ec9a4', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 32px', fontWeight: 500, fontSize: 18, cursor: 'pointer' }}
              onClick={() => navigate('/caidat/taikhoan/them')}
            >
              + Thêm tài khoản
            </button>
          </div>

          {/* Table */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ background: '#f4f4f4' }}>
                  <th style={{ padding: '12px 8px', fontWeight: 600, textAlign: 'center' }}>STT</th>
                  <th style={{ padding: '12px 8px', fontWeight: 600, textAlign: 'center' }}>Mã</th>
                  <th style={{ padding: '12px 8px', fontWeight: 600, textAlign: 'left' }}>Họ và tên</th>
                  <th style={{ padding: '12px 8px', fontWeight: 600, textAlign: 'center' }}>Ảnh đại diện</th>
                  <th style={{ padding: '12px 8px', fontWeight: 600, textAlign: 'center' }}>Vai trò</th>
                  <th style={{ padding: '12px 8px', fontWeight: 600, textAlign: 'center' }}>CCCD</th>
                  <th style={{ padding: '12px 8px', fontWeight: 600, textAlign: 'center' }}>Email</th>
                  <th style={{ padding: '12px 8px', fontWeight: 600, textAlign: 'center' }}>Giới tính</th>
                  <th style={{ padding: '12px 8px', fontWeight: 600, textAlign: 'center' }}>Số điện thoại</th>
                  <th style={{ padding: '12px 8px', fontWeight: 600, textAlign: 'center' }}>Ngày sinh</th>
                  <th style={{ padding: '12px 8px', fontWeight: 600, textAlign: 'center' }}>Địa chỉ</th>
                  <th style={{ padding: '12px 8px', fontWeight: 600, textAlign: 'center' }}>Trường đại học - chuyên ngành</th>
                  <th style={{ padding: '12px 8px', fontWeight: 600, textAlign: 'center' }}>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {filteredAccounts.map((account, idx) => (
                  <tr key={account.id} style={{ background: '#fff', borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '10px 8px', textAlign: 'center' }}>{idx + 1}</td>
                    <td style={{ padding: '10px 8px', textAlign: 'center' }}>
                      {editingId === account.id ? (
                        <input
                          type="text"
                          value={editData.ma || ''}
                          onChange={(e) => handleInputChange('ma', e.target.value)}
                          style={{ width: '80px', padding: '4px', border: '1px solid #ccc', borderRadius: '4px' }}
                        />
                      ) : (
                        account.ma
                      )}
                    </td>
                    <td style={{ padding: '10px 8px' }}>
                      {editingId === account.id ? (
                        <input
                          type="text"
                          value={editData.hoVaTen || ''}
                          onChange={(e) => handleInputChange('hoVaTen', e.target.value)}
                          style={{ width: '150px', padding: '4px', border: '1px solid #ccc', borderRadius: '4px' }}
                        />
                      ) : (
                        account.hoVaTen
                      )}
                    </td>
                    <td style={{ padding: '10px 8px', textAlign: 'center' }}>
                      <img src={appIcon} alt="avatar" style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }} />
                    </td>
                    <td style={{ padding: '10px 8px', textAlign: 'center' }}>
                      {editingId === account.id ? (
                        <select
                          value={editData.vaiTro || ''}
                          onChange={(e) => handleInputChange('vaiTro', e.target.value)}
                          style={{ padding: '4px', border: '1px solid #ccc', borderRadius: '4px' }}
                        >
                          <option value="">Chọn vai trò</option>
                          <option value="TPK">TPK</option>
                          <option value="Bác sĩ">Bác sĩ</option>
                          <option value="Y tá">Y tá</option>
                          <option value="Lễ tân">Lễ tân</option>
                        </select>
                      ) : (
                        account.vaiTro
                      )}
                    </td>
                    <td style={{ padding: '10px 8px', textAlign: 'center' }}>
                      {editingId === account.id ? (
                        <input
                          type="text"
                          value={editData.cccd || ''}
                          onChange={(e) => handleInputChange('cccd', e.target.value)}
                          style={{ width: '120px', padding: '4px', border: '1px solid #ccc', borderRadius: '4px' }}
                        />
                      ) : (
                        account.cccd
                      )}
                    </td>
                    <td style={{ padding: '10px 8px', textAlign: 'center' }}>
                      {editingId === account.id ? (
                        <input
                          type="email"
                          value={editData.email || ''}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          style={{ width: '150px', padding: '4px', border: '1px solid #ccc', borderRadius: '4px' }}
                        />
                      ) : (
                        account.email
                      )}
                    </td>
                    <td style={{ padding: '10px 8px', textAlign: 'center' }}>
                      {editingId === account.id ? (
                        <select
                          value={editData.gioiTinh || ''}
                          onChange={(e) => handleInputChange('gioiTinh', e.target.value)}
                          style={{ padding: '4px', border: '1px solid #ccc', borderRadius: '4px' }}
                        >
                          <option value="">Chọn giới tính</option>
                          <option value="Nam">Nam</option>
                          <option value="Nữ">Nữ</option>
                        </select>
                      ) : (
                        account.gioiTinh
                      )}
                    </td>
                    <td style={{ padding: '10px 8px', textAlign: 'center' }}>
                      {editingId === account.id ? (
                        <input
                          type="text"
                          value={editData.soDienThoai || ''}
                          onChange={(e) => handleInputChange('soDienThoai', e.target.value)}
                          style={{ width: '120px', padding: '4px', border: '1px solid #ccc', borderRadius: '4px' }}
                        />
                      ) : (
                        account.soDienThoai
                      )}
                    </td>
                    <td style={{ padding: '10px 8px', textAlign: 'center' }}>
                      {editingId === account.id ? (
                        <input
                          type="date"
                          value={editData.ngaySinh || ''}
                          onChange={(e) => handleInputChange('ngaySinh', e.target.value)}
                          style={{ padding: '4px', border: '1px solid #ccc', borderRadius: '4px' }}
                        />
                      ) : (
                        account.ngaySinh
                      )}
                    </td>
                    <td style={{ padding: '10px 8px', textAlign: 'center' }}>
                      {editingId === account.id ? (
                        <input
                          type="text"
                          value={editData.diaChi || ''}
                          onChange={(e) => handleInputChange('diaChi', e.target.value)}
                          style={{ width: '120px', padding: '4px', border: '1px solid #ccc', borderRadius: '4px' }}
                        />
                      ) : (
                        account.diaChi
                      )}
                    </td>
                    <td style={{ padding: '10px 8px', textAlign: 'center' }}>
                      {editingId === account.id ? (
                        <input
                          type="text"
                          value={editData.truongDaiHoc || ''}
                          onChange={(e) => handleInputChange('truongDaiHoc', e.target.value)}
                          placeholder="Trường - Chuyên ngành"
                          style={{ width: '180px', padding: '4px', border: '1px solid #ccc', borderRadius: '4px' }}
                        />
                      ) : (
                        `${account.truongDaiHoc} ${account.chuyenNganh}`
                      )}
                    </td>
                    <td style={{ padding: '10px 8px', textAlign: 'center' }}>
                      {editingId === account.id ? (
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                          <button 
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#1ec9a4', fontSize: 20 }} 
                            title="Lưu"
                            onClick={() => handleSave(account.id)}
                          >
                            💾
                          </button>
                          <button 
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#e53935', fontSize: 20 }} 
                            title="Hủy"
                            onClick={handleCancel}
                          >
                            ❌
                          </button>
                        </div>
                      ) : (
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                          <button 
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#1ec9a4', fontSize: 20 }} 
                            title="Sửa"
                            onClick={() => handleEdit(account)}
                          >
                            ✏️
                          </button>
                          <button 
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#e53935', fontSize: 20 }} 
                            title="Xóa"
                            onClick={() => handleDeleteClick(account)}
                          >
                            🗑️
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: '#0006', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', borderRadius: 12, padding: 32, minWidth: 400, boxShadow: '0 2px 12px #0003', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 8 }}>Xác nhận xóa tài khoản</div>
            <div style={{ fontSize: 15, marginBottom: 16 }}>
              Bạn có muốn xóa tài khoản người dùng <strong>{deleteAccountName}</strong> không?
            </div>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
              <button
                style={{ background: '#ccc', color: '#333', border: 'none', borderRadius: 8, padding: '10px 20px', fontWeight: 500, cursor: 'pointer' }}
                onClick={cancelDelete}
              >
                Không
              </button>
              <button
                style={{ background: '#e53935', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 20px', fontWeight: 500, cursor: 'pointer' }}
                onClick={confirmDelete}
              >
                Có
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Password Verification Modal */}
      {showPasswordModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: '#0006', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', borderRadius: 12, padding: 32, minWidth: 400, boxShadow: '0 2px 12px #0003', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 8 }}>Xác nhận mật khẩu</div>
            <div style={{ fontSize: 15, marginBottom: 16 }}>
              Vui lòng nhập mật khẩu tài khoản hiện tại để xác nhận xóa tài khoản <strong>{deleteAccountName}</strong>.
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError(""); // Clear error when user types
              }}
              placeholder="Nhập mật khẩu"
              style={{ 
                padding: '12px', 
                border: passwordError ? '2px solid #e53935' : '1px solid #ccc', 
                borderRadius: 8, 
                fontSize: 16,
                marginBottom: 8
              }}
            />
            {passwordError && (
              <div style={{ color: '#e53935', fontSize: 14, marginBottom: 8 }}>
                {passwordError}
              </div>
            )}
            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
              <button
                style={{ background: '#ccc', color: '#333', border: 'none', borderRadius: 8, padding: '10px 20px', fontWeight: 500, cursor: 'pointer' }}
                onClick={cancelPasswordModal}
              >
                Hủy
              </button>
              <button
                style={{ background: '#1ec9a4', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 20px', fontWeight: 500, cursor: 'pointer' }}
                onClick={verifyPasswordAndDelete}
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaiKhoan;
