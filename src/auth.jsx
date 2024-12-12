import React, { useState } from 'react';
import { collection, getDocs, query, where,addDoc } from 'firebase/firestore';
import { db } from './firebase';
import { v4 as uuidv4 } from 'uuid';
import "./auth.css";
import {  useNavigate } from 'react-router-dom';


const AuthPage = () => {
    const navigate=useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [signupData, setSignupData] = useState({
    id: uuidv4(),
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
    age: '',
    gender: '',
  });

  const handleChange = (e, formType) => {
    const { name, value } = e.target;
    if (formType === 'login') {
      setLoginData({ ...loginData, [name]: value });
    } else {
      setSignupData({ ...signupData, [name]: value });
    }
  };

  const handleSubmit = async (e, formType) => {
    e.preventDefault();
    if (formType === 'login') {
      const { email, password } = loginData;

      try {
        // Vérification de l'email dans Firestore
        const userQuery = query(collection(db, 'people'), where('email', '==', email));
        const userSnapshot = await getDocs(userQuery);

        if (userSnapshot.empty) {
          alert('Error: Email or password is incorrect.');
          return;
        }

        // Vérification du mot de passe
        const user = userSnapshot.docs[0].data();
        if (user.password === password) {
          const ID = userSnapshot.docs[0].id;
          localStorage.setItem("userId", ID);
          const userId = localStorage.getItem("userId");
          navigate('/home');
          console.log('Login successful!',userId);
          
          
        } else {
          alert('Error: Email or password is incorrect.');
        }
      } catch (error) {
        console.error('Login error:', error);
        alert('An error occurred during login. Please try again.');
      }
    } else {
      const { email, password, confirmPassword } = signupData;

      if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
      }

      try {
        const emailQuery = query(collection(db, 'people'), where('email', '==', email));
        const emailSnapshot = await getDocs(emailQuery);

        if (!emailSnapshot.empty) {
          alert('This email is already in use.');
          return;
        }

        const passwordQuery = query(collection(db, 'people'), where('password', '==', password));
        const passwordSnapshot = await getDocs(passwordQuery);

        if (!passwordSnapshot.empty) {
          alert('This password is already in use. Please choose a different one.');
          return;
        }

        const { firstName, lastName, phone, address, age, gender } = signupData;
        const docRef = await addDoc(collection(db, 'people'), {
          firstName,
          lastName,
          email,
          password,
          phone,
          address,
          age,
          gender,
        });

        console.log('Person added with ID:', docRef.id);
        alert('Signup successful!');
      } catch (error) {
        console.error('Signup error:', error);
        alert('An error occurred during signup. Please try again.');
      }
    }
  };

  return (
    <div className='all'style={{
        backgroundImage: `url(/pictures/auth.jpeg)`,
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        height: '150vh',
        width: '100vw', // Full width of the viewport
        overflowX: 'hidden', // Prevent horizontal scrolling
        overflowY: 'auto', // Allow vertical scrolling (optional)
        margin: '0', // Remove potential margins causing overflow
        padding: '0', // Remove potential paddings causing overflow
      }}>
        
    <div className="auth-container">
        
      <div className="auth-toggle-buttons">
        <button onClick={() => setIsLogin(true)} className={isLogin ? 'active' : ''}>
          Login
        </button>
        <button onClick={() => setIsLogin(false)} className={!isLogin ? 'active' : ''}>
          Sign Up
        </button>
      </div>
      <div
      className="logo-container"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '20px',
      }}
    >
      <img
        src="/pictures/logo.png"
        alt="Logo"
        onClick={() => navigate('/')}
        style={{
          width: '150px',
          height: 'auto',
          cursor: 'pointer',
        }}
      />
    </div>
      {isLogin ? (
        <div className="login-form">
          <center><h2>Login</h2></center>
          <form onSubmit={(e) => handleSubmit(e, 'login')}>
            <div>
              <label>Email: </label>
              <input
                type="email"
                name="email"
                value={loginData.email}
                onChange={(e) => handleChange(e, 'login')}
                required
              />
            </div>
            <div>
              <label>Password: </label>
              <input
                type="password"
                name="password"
                value={loginData.password}
                onChange={(e) => handleChange(e, 'login')}
                required
              />
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      ) : (
        <div className="signup-form">
          <center><h2>Sign Up</h2></center>
          <form onSubmit={(e) => handleSubmit(e, 'signup')}>
            <div>
              <label>First Name: </label>
              <input
                type="text"
                name="firstName"
                value={signupData.firstName}
                onChange={(e) => handleChange(e, 'signup')}
                required
              />
            </div>
            <div>
              <label>Last Name: </label>
              <input
                type="text"
                name="lastName"
                value={signupData.lastName}
                onChange={(e) => handleChange(e, 'signup')}
                required
              />
            </div>
            <div>
              <label>Email: </label>
              <input
                type="email"
                name="email"
                value={signupData.email}
                onChange={(e) => handleChange(e, 'signup')}
                required
              />
            </div>
            <div>
              <label>Password: </label>
              <input
                type="password"
                name="password"
                value={signupData.password}
                onChange={(e) => handleChange(e, 'signup')}
                required
              />
            </div>
            <div>
              <label>Confirm Password: </label>
              <input
                type="password"
                name="confirmPassword"
                value={signupData.confirmPassword}
                onChange={(e) => handleChange(e, 'signup')}
                required
              />
            </div>
            <div>
              <label>Phone: </label>
              <input
                type="tel"
                name="phone"
                value={signupData.phone}
                onChange={(e) => handleChange(e, 'signup')}
                required
              />
            </div>
            <div>
              <label>Address: </label>
              <input
                type="text"
                name="address"
                value={signupData.address}
                onChange={(e) => handleChange(e, 'signup')}
                required
              />
            </div>
            <div>
              <label>Age: </label>
              <input
                type="number"
                name="age"
                value={signupData.age}
                onChange={(e) => handleChange(e, 'signup')}
                required
              />
            </div>
            <div>
              <label>Gender: </label>
              <select
                name="gender"
                value={signupData.gender}
                onChange={(e) => handleChange(e, 'signup')}
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <button type="submit" style={{ marginTop: '10px' }}>
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
    </div>
  );
};

export default AuthPage;
