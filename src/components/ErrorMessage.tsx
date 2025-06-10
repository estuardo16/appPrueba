import React from 'react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div style={{ color: 'red', textAlign: 'center', marginTop: '20px', padding: '10px', backgroundColor: '#ffe6e6', border: '1px solid #ff0000', borderRadius: '5px' }}>
      <p style={{ margin: 0, fontWeight: 'bold' }}>¡Error!</p>
      <p style={{ margin: '5px 0 0 0' }}>{message}</p>
    </div>
  );
};

export default ErrorMessage;