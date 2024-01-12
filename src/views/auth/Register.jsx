import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import PrimaryButton from "../../components/common/PrimaryButton";
import { useForm } from "react-hook-form"
import { useHomePageDataQuery, useLoginUserMutation, useRegisterUserMutation } from "../../api/api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const navigate = useNavigate()
  const[errorResponse, setErrorResponse] = useState('')
  const [registerUser, { data, error, isLoading, isSuccess  }] = useRegisterUserMutation();

  const onSubmit = async(cred) => {
    const result = await registerUser(cred);
    if (result.error) {
      console.error("Login failed:", result.error.data);
      setErrorResponse(result.error.data.detail)

    }
    else if (result.data) {
      console.log(result.data)
        const token = result.data.token;
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
        <div className="px-3 mb-5">
          <h2 className="text-2xl font-inter font-[600]">Register</h2>
        </div>
        {errorResponse && <div>{errorResponse}</div>}
        <form action="" className="px-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full flex gap-1 mb-8">
            <input
              className="px-4 py-3 w-full outline-none bg-[#12172D] rounded-3xl"
              type="text"
              name="username"
              placeholder="User name"
              id="username"
              required
              {...register("username",{required:true})} 
            />
          </div>
          <div className="w-full flex gap-3 mb-8">
            <input
              className="px-4 py-3 w-full outline-none bg-[#12172D] rounded-3xl"
              type="text"
              name="firstName"
              placeholder="First name"
              id="firstName"
              required
              {...register("first_name",{required:true})} 
            />
            <input
              className="px-4 py-3 w-full outline-none bg-[#12172D] rounded-3xl"
              type="text"
              name="lastname"
              placeholder="Last name"
              id="lastname"
              required
              {...register("last_name",{required:true})} 
            />
          </div>
          <div className="w-full flex gap-1 mb-8">
            <input
              className="px-4 py-3 w-full outline-none bg-[#12172D] rounded-3xl"
              type="email"
              name="email"
              placeholder="Email"
              id="email"
              required
              {...register("email",{required:true})} 
            />
          </div>
          <div className="w-full flex gap-1 mb-8">
            <input
              className="px-4 py-3 w-full outline-none bg-[#12172D] rounded-3xl"
              type="password"
              name="password"
              placeholder="password"
              id="password"
              required
              {...register("password",{required:true})} 
            />
          </div>
          <div className="w-full flex gap-1 mb-8">
            <input
              className="px-4 py-3 w-full outline-none bg-[#12172D] rounded-3xl"
              type="password"
              name="confrimPassword"
              placeholder="Confirm Password"
              id="confrimPassword"
              required
              {...register("password2",{required:true})} 
            />
          </div>
        
        <div className={`flex justify-center flex-col items-center`}>
          <div className="bg-[#000000] rounded-xl w-[360px] py-3 flex justify-center items-center gap-3 my-5 hover:bg-white hover:text-black">
            <FcGoogle size={28} />
            <h2>Sign Up With Google</h2>
          </div>
          <div className="py-3 flex justify-center items-center gap-1 my-5 font-inter font-semibold">
            <h2>Already have an account? </h2>
            <Link to={"/login"}>
              <h2 className="text-light-blue">Log in to your account.</h2>
            </Link>
          </div>
        </div>
        <div className="flex justify-center mb-2 mt-5">
          <PrimaryButton title={isLoading?(<>loading...</>):(<>Register</>)} />
        </div>
      </form>
      </div>
    </div>
  );
};

export default Register;
