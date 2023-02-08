import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../Redux/Actions/userActions";
import Header from "./../components/Header";
import Message from "../components/LoadingError/Error.js"; 
import Loading from "../components/LoadingError/Loading.js";

const Register = ({location, history}) => {
  window.scrollTo(0, 0);

  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const redirect = location.search ? location.search.split("=") [1]: "/";

  const userRegister = useSelector((state)=> state.userRegister);
  const { error, loading, userInfo} = userRegister;

  useEffect(()=>{
    if(userInfo){
      history.push(redirect);
    }
  }, [userInfo, history, redirect]);

  const submitHandler = (e) =>{
    e.preventDefault();
    dispatch(register(
      firstName,
      middleName,
      lastName,
      phone,
      email,
      password
    ));
  }




  return (
    <>
      <Header />
      <div className="container d-flex flex-column justify-content-center align-items-center login-center">
       {error && <Message variant="alert-danger">{error}</Message>}
       {loading && <Loading />}
        <form className="Login col-md-8 col-lg-4 col-11" onSubmit={submitHandler}>
          {/* first name */}
          <input 
                type="text" 
                required="true"
                placeholder="firstName"
                value={firstName}
                onChange={(e) => setFirstName (e.target.value)} 
                />
                {/* middle name */}
          <input 
                type="text" 
                placeholder="middleName"
                required="true"
                value={middleName}
                onChange={(e) => setMiddleName (e.target.value)} 
                />
              {/* last name */}
          <input 
               type="text" 
               required="true"
               placeholder="lastName" 
               value={lastName}
               onChange={(e) => setLastName (e.target.value)} 
               />
               {/* phone number */}
          <input 
                type="number" 
                required="true"
                placeholder="phone" 
                value={phone}
                onChange={(e) => setPhone (e.target.value)} 
                />
                {/* email */}
          <input 
                type="email"
                required="true"
                 placeholder="Email" 
                 value={email}
                 onChange={(e) => setEmail (e.target.value)} 
                 />
                 {/* password */}
          <input 
                type="password" 
                required="true"
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword (e.target.value)} 
                />

          <button type="submit">Register</button>
          <p>
          <Link to={redirect ? `/login?redirect${redirect}`: "/login "}>
              I Have Account <strong>Login</strong>
              </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;
