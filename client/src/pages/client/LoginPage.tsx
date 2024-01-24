import { useState } from 'react';
import '../../components/client/styles/LoginScreen.scss';
import { GoDash } from 'react-icons/go';
import AuthApi from '../../apis/authApi'; 
import { ApiResponse } from '../../apis/ApiResponse';
import { Link, useNavigate } from 'react-router-dom';
import { screenUrl } from '../../constants/screenUrls';
import ProductCarousel from "../../components/client/ProductCarousel ";

const LoginPage = (): JSX.Element => {
  const [forgotPassword, setForgotPassword] = useState(false);
  const [submitButtonText, setSubmitButtonText] = useState('Đăng nhập');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  
  const navigate = useNavigate();
 

  const handleForgotPasswordClick = () => {
    setForgotPassword(true);
    setSubmitButtonText('Gửi');
  };

  const handleBackToLoginClick = () => {
    setForgotPassword(false);
    setSubmitButtonText('Đăng nhập');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (forgotPassword) {
      // Xử lý gửi mã khôi phục mật khẩu
      // ...
    } else {
      if (!email || !password) {
        setEmailError(!email); // Đặt emailError thành true nếu email rỗng
        setPasswordError(!password); // Đặt passwordError thành true nếu password rỗng
        setLoginError('Vui lòng nhập đầy đủ email và password.');
        return;
      }
      try {
        
        const response: ApiResponse = await AuthApi.login(email, password);
        if (response.userId && response.token) {
          alert('Đăng nhập thành công ');
          localStorage.setItem('userId', response.userId);
          localStorage.setItem('token', response.token);
          navigate('/');
 
          
        } else {
          // alert( response.message );
          console.log( response.message);
         
        }
      } catch (error: unknown) {
        if (typeof error === 'object' && error !== null) {
          // Nếu error là một object không phải là null hoặc undefined
          const typedError = error as { response?: { status?: number } };
          if (typedError.response && typedError.response.status === 401) {
            // Lỗi 401 - Unauthorized (mật khẩu không đúng)
            setLoginError('Vui lòng kiểm tra lại email hoặc password.');
            // alert('Đăng nhập không thành công. kiểm tra lại email hoặc password');
            // Hiển thị thông báo lỗi cho người dùng
            // Ví dụ: setState để hiển thị thông báo lỗi trên giao diện
            // Ví dụ: this.setState({ errorMessage: 'Mật khẩu không đúng' });
          } else {
            console.error('Lỗi khi gửi yêu cầu đăng nhập:', error);
          }
        } else {
          console.error('Lỗi khi gửi yêu cầu đăng nhập:', error);
        }
      }
    }
  };

  return (
    <div>
    <div className="login-screen">
      <div className="left-section">
        <h2> Đăng nhập</h2>
        <div style={{ marginLeft: '15%' }}>
          <GoDash fontSize={60} />
        </div>
      </div>
      <div className="right-section">
        <form onSubmit={handleSubmit}>
          <label htmlFor="email"></label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setLoginError('');
              setEmailError(false); // Đặt emailError về false khi người dùng nhập
            }}
            className={emailError ? 'error' : ''}
            placeholder="Email"
          />

          {forgotPassword ? (
            <>
              <div className="additional-options">
                <p style={{ color: 'red' }}>Nhập lại email để gửi mã khôi phục mật khẩu.</p>
                <button onClick={()=>{
                  alert('Gửi thành công')
                }}type="submit">Gửi</button>
                <a onClick={handleBackToLoginClick}> huỷ</a>
              </div>
            </>
          ) : (
            <>
              <label htmlFor="password"></label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setLoginError('');
                  setPasswordError(false); // Đặt passwordError về false khi người dùng nhập
                }}
                className={passwordError ? 'error' : ''}
                placeholder="Mật khẩu"
              />
              <div className="error-message">{loginError}</div>
              <div className="row">
                <button type="submit">{submitButtonText}</button>
                <div className="additional-options">
                  <span onClick={handleForgotPasswordClick}>Quên mật khẩu?</span>
                  <p>hoặc <Link to={screenUrl.REGISTER} > <span>Đăng ký</span></Link></p>
                </div>
              </div>
            </>
          )}
        </form>
      </div>
      
    </div>
    <ProductCarousel />
    </div>
  );
};

export default LoginPage;
