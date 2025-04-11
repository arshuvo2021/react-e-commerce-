import React from 'react';

const Toast = ({ message, onClose }) => {
  return (
    <div className="fixed bottom-4 right-4 bg-black text-white px-4 py-2 rounded shadow-lg z-50">
      {message}
      <button className="ml-3" onClick={onClose}>✖</button>
    </div>
  );
};

export default Toast;
