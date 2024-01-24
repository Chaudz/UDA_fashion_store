import React from 'react';

import AuthApi from '../../apis/authApi';
import { useNavigate } from 'react-router-dom';
interface LogoutProps {
  onLogout: () => void;
}

const Logout: React.FC<LogoutProps> = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        await AuthApi.logout(token);
        localStorage.removeItem('token');
        localStorage.removeItem('userId');

        onLogout(); 
       alert("Dang xuat thanh cong");
       navigate('/');
      } catch (error) {
        navigate('/login');
        console.error('Error logging out:', error);
        // alert('Đăng xuất thất bại')
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
      }
    }
  };

  return (
    <a onClick={handleLogout} style={{ cursor: 'pointer' }}>
      Đăng Xuất
    </a>
  );
};

export default Logout;
