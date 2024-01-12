import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import PrimaryButton from "../../components/common/PrimaryButton";
import { useForm } from "react-hook-form"
import { useHomePageDataQuery, useLoginUserMutation } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {userToken, user, anonymous_reviews, connect_reviews } from "../../store/Reducers/profileReducer";
const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const[errorResponse, setErrorResponse] = useState('')
  const [loginUser, { data, error, isLoading, isSuccess  }] = useLoginUserMutation();

  const onSubmit = async(cred) => {
    const result = await loginUser(cred);
    if (result.error) {
      console.error("Login failed:", result.error.data);
      setErrorResponse(result.error.data.detail)

    }
    else if (result.data) {
      console.log(result.data)
        const token = result.data.token;
        dispatch(userToken(token))
        localStorage.setItem('token', token);
        navigate('')   
    }   
  }

  return (
    <div
      className={`min-w-screen min-h-screen bg-[#12172D] flex justify-center items-center `}
    >
      <div
        className={`w-[715px] text-[#ffffff] bg-white-rgba p-5 rounded-3xl shadow-3xl`}
      >
        <div className="px-3 mb-32">
          <h2 className="text-2xl font-inter font-[600]">Login</h2>
        </div>
        {errorResponse && <div>{errorResponse}</div>}
        <form  onSubmit={handleSubmit(onSubmit)} className="px-5">
          <div className="w-full flex flex-col gap-1 mb-8">
            <input
              className="px-4 py-3 w-full outline-none bg-[#12172D] rounded-3xl "
              type="text"
              name="username"
              placeholder="User name"
              id="username"
             
              {...register("username",{required:true})} 
            />
            {errors.username && <div>User name is required.</div>}
          </div>
       
          <div className="w-full flex flex-col gap-1 mb-8">
            <input
              className="px-4 py-3 w-full outline-none bg-[#12172D] rounded-3xl"
              type="password"
              name="password"
              placeholder="password"
              id="password"
             
              {...register("password",{required:true})} 
            />
            {errors.password && <div>Password is required.</div>}
          </div>
          
      
        <div className={`flex justify-center flex-col items-center`}>
          <div className="bg-[#000000] rounded-xl w-[360px] py-3 flex justify-center items-center gap-3 my-5 transition duration-200 hover:delay-50 hover:bg-gray-200 ease-in-out hover:text-black">
            <FcGoogle size={28} />
            <h2>login With Google</h2>
          </div>
          <div className="py-3 flex justify-center items-center gap-1 my-5 font-inter font-semibold">
            <h2>{`Don't have an account?`} </h2>
            <Link to={"/register"}>
              <h2 className="text-light-blue">Sign up here.</h2>
            </Link>
          </div>
        </div>
        <div className="flex justify-center mb-2 mt-5">

          <button className="bg-[#31C0D1] px-16 py-4 rounded-xl font-[600] tracking-[0.48px] font-inter absolute active:border-2 border-white" type='submit'>
            {isLoading?(<>loading...</>):(<>Login</>)}
          </button>
        </div>
        </form>
      </div>
    </div>
  );
};

export default Login;