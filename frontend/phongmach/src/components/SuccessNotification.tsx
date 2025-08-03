import React from 'react';

interface SuccessNotificationProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

const SuccessNotification: React.FC<SuccessNotificationProps> = ({ message, isVisible, onClose }) => {
  React.useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // Tự động đóng sau 3 giây

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 20,
        right: 20,
        zIndex: 1000,
        background: '#4caf50',
        color: 'white',
        padding: '16px 24px',
        borderRadius: 8,
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        fontSize: 16,
        fontWeight: 500,
        animation: 'slideIn 0.3s ease-out'
      }}
    >
      <span style={{ fontSize: 20 }}>✓</span>
      <span>{message}</span>
      <button
        onClick={onClose}
        style={{
          background: 'none',
          border: 'none',
          color: 'white',
          fontSize: 18,
          cursor: 'pointer',
          marginLeft: 8,
          padding: 4
        }}
      >
        ×
      </button>
      <style>
        {`
          @keyframes slideIn {
            from {
              transform: translateX(100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
};

export default SuccessNotification;
