import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Toast from "../LoadingError/Toast.js";

import Message from "../LoadingError/Error.js"; 
import Loading from "../LoadingError/Loading.js";
import { toast } from "react-toastify";
const ProfileTabs = () => {

  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const[phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const toastId = React.useRef(null);

  const dispatch = useDispatch();

  const userDetails = useSelector((state)=> state.userDetails);
  const {loading, error, user} = userDetails;


    useEffect(()=>{
      if (user) {
        setFirstName(user.firstName);
        setMiddleName(user.middleName);
        setLastName(user.lastName);
        setPhone(user.phone);
        setEmail(user.email);
      }
    }, [dispatch.user]);

 const submitHandler = (e) =>{
      e.preventDefault();
      //  check the password match first.

      if (password !== confirmPassword) {
        if (!toast.isActive(toastId.current)){
          toastId.current = toast.error("Password does not match", ToastObjects);
        }
         
      }
      else 
      {
        // update profile.
         
      }

 }

 const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
 }

  return (
    <>
    <Toast />
    {error && <Message variant="alert-danger">{error}</Message>}
    {loading && <Loading/>}
      <form className="row  form-container" onSubmit={submitHandler}>
       
       {/* firstName */}
        <div className="col-md-6">
          <div className="form">
            <label for="account-fn">First Name</label>
            <input className="form-control" 
                  type="text" 
                  required 
                  value={firstName}
                  onChange={(e)=> 
                    setFirstName(e.target.value)}
                  />
          </div>
        </div>


        {/* middleName */}
        <div className="col-md-6">
          <div className="form">
            <label for="account-fn">Middle Name</label>
            <input className="form-control" 
                   type="text" 
                   required 
                   value={middleName}
                   onChange={(e)=> 
                    setMiddleName(e.target.value)}
                   />
          </div>
        </div>

        {/* lastName */}
        <div className="col-md-6">
          <div className="form">
            <label for="account-fn">Last Name</label>
            <input className="form-control" 
                   type="text" 
                   required 
                   value={lastName}
                   onChange={(e)=> 
                    setLastName(e.target.value)}
                   />
          </div>
        </div>

          {/* phone */}

          <div className="col-md-6">
          <div className="form">
            <label for="account-fn">phone</label>
            <input className="form-control" 
                   type="number" 
                   required 
                   value={phone}
                  onChange={(e)=> 
                    setPhone(e.target.value)}
                   />
          </div>
        </div>

          {/* email */}
        <div className="col-md-6">
          <div className="form">
            <label for="account-email">E-mail Address</label>
            <input className="form-control" 
                  type="email" 
                  required 
                  value={email}
                  onChange={(e)=> 
                    setEmail(e.target.value)}
                  />
          </div>
        </div>

        {/* new password */}
        <div className="col-md-6">
          <div className="form">
            <label for="account-pass">New Password</label>
            <input className="form-control" 
                   type="password"
                   required
                   value={password}
                  onChange={(e)=> 
                    setPassword(e.target.value)}
                   />
          </div>
        </div>

        {/* confirm password */}
        <div className="col-md-6">
          <div className="form">
            <label for="account-confirm-pass">Confirm Password</label>
            <input className="form-control" 
                   type="password" 
                   required
                   value={confirmPassword}
                  onChange={(e)=> 
                    setConfirmPassword(e.target.value)}
                   />
          </div>
        </div>

        <button type="submit">Update Profile</button>
      </form>
    </>
  );
};

export default ProfileTabs;
