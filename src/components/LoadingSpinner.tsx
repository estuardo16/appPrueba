import React from 'react';
import { ClipLoader } from 'react-spinners';

 
const LoadingSpinner: React.FC = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px', margin: '20px 0', marginTop:'300px'}}>
      
      <ClipLoader color="#007bff" size={200}/>
    </div>
  );
};

export default LoadingSpinner;