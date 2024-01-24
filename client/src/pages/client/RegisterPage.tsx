import { useState } from "react";
import "../../components/client/styles/RegisterPage.scss";
import { GoArrowLeft, GoDash } from "react-icons/go";
import { screenUrl } from "../../constants/screenUrls";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import userApi from "../../apis/userApi";
import { ApiRegisterResponse } from '../../apis/ApiRegisterResponse';
import axios from 'axios';
import ProductCarousel from "../../components/client/ProductCarousel ";
const RegisterPage = (): JSX.Element => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [errorMessages, setErrorMessages] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    phoneNumber: "",
    birthdate: "",
    address: "",
    email: "",
    password: "",
  });
  const handleBlur = (fieldName: string, value: string) => {
    if (!value.trim()) {
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        [fieldName]: "Không được để trống.,"
      }));
    }
  };
  const handleInputChange = (fieldName: string, value: string) => {
    setErrorMessages((prevErrors) => ({
      ...prevErrors,
      [fieldName]: "",
    }));

    switch (fieldName) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "gender":
        setGender(value);
        break;
      case "phoneNumber":
        setPhoneNumber(value);
        break;
      case "birthdate":
        setBirthdate(value);
        break;
      case "address":
        setAddress(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const handleSignUp = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const isValid = validateForm();

    if (isValid) {
      try {
        const response: ApiRegisterResponse = await userApi.create({
          firstName,
          lastName,
          gender,
          dob: new Date(birthdate),
          email,
          password,
          phoneNumber,
          address,

        });
        if (response.message === "Create Success!") {
          console.log(response.message);
          setRegistrationSuccess(true);
          console.log(response);
          alert("Đăng ký thành công");
          navigate(screenUrl.LOGIN);

        } else {

          console.error("Lỗi khi tạo người dùng. Không nhận được response từ API.");
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response && error.response.status === 409) {
          alert("Đăng kí thất bại. Email đã tồn tại!");

        } else {
          console.error("Error creating user:", error);
        }
      }
    }
  };

  const validateForm = () => {
    setErrorMessages({
      firstName: "",
      lastName: "",
      gender: "",
      phoneNumber: "",
      birthdate: "",
      address: "",
      email: "",
      password: "",
    });

    let isValid = true;

    if (!firstName.trim()) {
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        firstName: "Họ không được để trống.",
      }));
      isValid = false;
    }

    if (!lastName.trim()) {
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        lastName: "Tên không được để trống.",
      }));
      isValid = false;
    }

    if (gender !== "male" && gender !== "female") {
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        gender: "Vui lòng chọn giới tính.",
      }));
      isValid = false;
    }

    if (!phoneNumber.trim()) {
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        phoneNumber: "Số điện thoại không được để trống.",
      }));
      isValid = false;
    }

    if (!birthdate.trim()) {
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        birthdate: "Ngày sinh không được để trống.",
      }));
      isValid = false;
    }

    if (!address.trim()) {
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        address: "Địa chỉ không được để trống.",
      }));
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        email: "Email không hợp lệ.",
      }));
      isValid = false;
    }
    if (password.length < 6) {
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        password: "Mật khẩu phải chứa ít nhất 6 ký tự.",
      }));
      isValid = false;
    }

    return isValid;
  };

  return (
    <div>
    <div className="register-screen">
      <div className="register-left-section">
        <h2> Đăng ký</h2>
        <div style={{ marginLeft: "15%" }}>
          <GoDash fontSize={60} />
        </div>
      </div>

      <div className="register-right-section">
        <form onSubmit={handleSignUp}>
          <label htmlFor="firstName"></label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            onBlur={(e) => handleBlur("firstName", e.target.value)}
            placeholder="Họ"
          />
          {errorMessages.firstName && (
            <p className="error-message">{errorMessages.firstName}</p>
          )}
          <label htmlFor="lastName"></label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            onBlur={(e) => handleBlur("lastName", e.target.value)}
            placeholder="Tên"
          />
          {errorMessages.lastName && (
            <p className="error-message">{errorMessages.lastName}</p>
          )}
          <div className="gender-options">
            <input
              className="male"
              type="radio"
              id="male"
              name="gender"
              value="male"
              checked={gender === "male"}
              onChange={(e) => handleInputChange("gender", e.target.value)}
              onBlur={(e) => handleBlur("gender", e.target.value)}
            />
            <label htmlFor="male">Nam</label>

            <input
              className="female"
              type="radio"
              id="female"
              name="gender"
              value="female"
              checked={gender === "female"}
              onChange={(e) => handleInputChange("gender", e.target.value)}
              onBlur={(e) => handleBlur("gender", e.target.value)}
            />
            <label htmlFor="female">Nữ</label>
          </div>
          {errorMessages.gender && (
            <p className="error-message">{errorMessages.gender}</p>
          )}
          <label htmlFor="phoneNumber"></label>
          <input
            type="tl"
            id="phoneNumber"
            name="phoneNumber"
            onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
            onBlur={(e) => handleBlur("phoneNumber", e.target.value)}
            placeholder="Số điện thoại"
          />
          {errorMessages.phoneNumber && (
            <p className="error-message">{errorMessages.phoneNumber}</p>
          )}
          <label htmlFor="birthdate"></label>
          <input
            type="date"
            id="birthdate"
            name="birthdate"
            value={birthdate}
            onChange={(e) => handleInputChange("birthdate", e.target.value)}
            onBlur={(e) => handleBlur("birthdate", e.target.value)}
          />
          {errorMessages.birthdate && (
            <p className="error-message">{errorMessages.birthdate}</p>
          )}
          <label htmlFor="address"></label>
          <input
            type="text"
            id="address"
            name="address"
            value={address}
            onChange={(e) => handleInputChange("address", e.target.value)}
            onBlur={(e) => handleBlur("address", e.target.value)}
            placeholder="Địa chỉ"
          />
          {errorMessages.address && (
            <p className="error-message">{errorMessages.address}</p>
          )}
          <label htmlFor="email"></label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            onBlur={(e) => handleBlur("email", e.target.value)}
            placeholder="Email"
          />
          {errorMessages.email && (
            <p className="error-message">{errorMessages.email}</p>
          )}
          <label htmlFor="password"></label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            onBlur={(e) => handleBlur("password", e.target.value)}
            placeholder="Mật khẩu"
          />
          {errorMessages.password && (
            <p className="error-message">{errorMessages.password}</p>
          )}
          <button className="register-submit" type="submit">

            Đăng ký
          </button>

          {registrationSuccess && (
            <div className="modal-overlay">
              <div className="registration-modal"></div>
            </div>
          )}
          <div className="additional-options">
            <div className="icon-back" style={{}}>
              <Link to={screenUrl.HOME}>
                <GoArrowLeft fontSize={25} />
                <span className="back-home">Quay lại trang chủ</span>{" "}
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
    <ProductCarousel />
    </div>
  );
};

export default RegisterPage;