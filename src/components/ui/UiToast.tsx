import React from 'react';
import { toast, Toaster } from 'react-hot-toast';

const CustomToast = () => {
  const showToast = () => {
    toast.success(
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ fontSize: '1.5rem', marginRight: '8px' }}>✅</span>
        <span>Operation successful!</span>
      </div>,
      {
        duration: 4000,
        position: 'top-right',
        style: {
          borderRadius: '8px',
          background: '#DBFAE0',
          color: '#026412',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
          padding: '16px',
        },
      },
    );
  };

  return (
    <div>
      <button
        onClick={showToast}
        style={{ padding: '10px 20px', fontSize: '16px' }}
      >
        Show Custom Toast
      </button>
      <Toaster />
    </div>
  );
};

export default CustomToast;
