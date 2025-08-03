import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import appIcon from '../assets/appicon.png';

const sidebarItems = [
  { label: "Trang chủ", icon: "🏠", route: "/main" },
  { label: "Giấy khám bệnh", icon: "📄", route: "/qlgkb" },
  { label: "Bệnh nhân", icon: "👤", route: "/qlbenhnhan" },
  { label: "Đơn thuốc", icon: "📝", route: "/qldonthuoc" },
  { label: "Thuốc", icon: "💊", route: "/thuoc" },
  { label: "Vật tư", icon: "🔧", route: "/qlvattu" },
  { label: "Hỗ trợ kỹ thuật", icon: "💡", route: "/hotro" },
  { 
    label: "Cài đặt", 
    icon: "⚙️", 
    route: "/caidat",
    hasSubmenu: true,
    submenu: [
      { label: "Tài khoản", route: "/caidat/taikhoan" },
      { label: "Vai trò", route: "/caidat/vaitro" }
    ]
  },
];

interface SidebarProps {
  activePage: string;
}

function Sidebar({ activePage }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState(activePage);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  useEffect(() => {
    // Update active state based on current route
    const found = sidebarItems.find(item => {
      if (item.hasSubmenu && item.submenu) {
        return item.submenu.some(sub => sub.route === location.pathname) || item.route === location.pathname;
      }
      return item.route === location.pathname;
    });
    if (found) {
      setActive(found.label);
      if (found.hasSubmenu) {
        setExpandedItem(found.label);
      }
    }
  }, [location.pathname]);

  const handleItemClick = (item: typeof sidebarItems[0]) => {
    if (item.hasSubmenu) {
      setExpandedItem(expandedItem === item.label ? null : item.label);
    } else {
      navigate(item.route);
      setActive(item.label);
    }
  };

  const handleSubmenuClick = (submenuItem: { label: string; route: string }, parentLabel: string) => {
    navigate(submenuItem.route);
    setActive(parentLabel);
    setExpandedItem(parentLabel);
  };

  return (
    <div style={{ 
      width: 250, 
      minWidth: 250, 
      background: '#5a6c8a', 
      color: '#fff', 
      display: 'flex', 
      flexDirection: 'column', 
      paddingTop: 24, 
      position: 'relative',
      height: '100vh'
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <img 
          src={appIcon} 
          alt="logo" 
          style={{ 
            width: 80, 
            height: 80, 
            borderRadius: '50%', 
            marginBottom: 12, 
            background: '#fff', 
            objectFit: 'cover' 
          }} 
        />
        <h3 style={{ 
          margin: 0, 
          fontSize: 16, 
          fontWeight: 'bold', 
          color: '#fff',
          marginBottom: 4
        }}>
          Quản lý
        </h3>
      </div>

      {/* Menu Items */}
      <div style={{ flex: 1, paddingLeft: 16, paddingRight: 16 }}>
        {sidebarItems.map(item => (
          <div key={item.label}>
            <div
              onClick={() => handleItemClick(item)}
              style={{
                width: '100%',
                padding: '12px 16px',
                marginBottom: 4,
                borderRadius: 8,
                cursor: 'pointer',
                background: active === item.label ? '#4a5568' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                fontSize: 14,
                fontWeight: 500,
                transition: 'all 0.2s ease',
                justifyContent: 'space-between'
              }}
              onMouseOver={(e) => {
                if (active !== item.label) {
                  e.currentTarget.style.background = '#4a5568';
                }
              }}
              onMouseOut={(e) => {
                if (active !== item.label) {
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 16 }}>{item.icon}</span>
                <span>{item.label}</span>
              </div>
              {item.hasSubmenu && (
                <span style={{ 
                  fontSize: 12, 
                  transform: expandedItem === item.label ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s ease'
                }}>
                  ▼
                </span>
              )}
            </div>
            
            {/* Submenu */}
            {item.hasSubmenu && item.submenu && expandedItem === item.label && (
              <div style={{ marginLeft: 28, marginBottom: 8 }}>
                {item.submenu.map(submenuItem => (
                  <div
                    key={submenuItem.label}
                    onClick={() => handleSubmenuClick(submenuItem, item.label)}
                    style={{
                      padding: '8px 16px',
                      marginBottom: 2,
                      borderRadius: 6,
                      cursor: 'pointer',
                      fontSize: 13,
                      color: '#cbd5e0',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = '#4a5568';
                      e.currentTarget.style.color = '#fff';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = '#cbd5e0';
                    }}
                  >
                    {submenuItem.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
