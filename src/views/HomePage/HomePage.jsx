import React, { useState, useEffect } from "react";
import Settings from "../../assets/icons/settings.png";
import ChatsComponent from "../../components/Home/ChatsComponent";
import ProfileComponent from "../../components/Home/ProfileComponent";
import ReviewCard from "../../components/Home/ReviewCard";
import SearchComponent from "../../components/Home/SearchComponent";
import UserContainer from "../../components/Home/UserContainer";
import { useNavigate } from "react-router-dom";
import { useHomePageDataQuery } from "../../api/api";
import { useDispatch, useSelector } from "react-redux";
import {user, anonymous_reviews, connect_reviews } from "../../store/Reducers/profileReducer";
import { ColorRing, Circles } from 'react-loader-spinner'


const HomePage = () => {
  
  const navigate = useNavigate()
  const dispatch = useDispatch()
  let token  = useSelector((state) => state.profile.token)
  const { data, error, isLoading } = useHomePageDataQuery(token)
  useEffect(() => {
   dispatch(user(data?.user))
   dispatch(connect_reviews(data?.reviews))
   dispatch(anonymous_reviews(data?.anonymous_reviews))
  }, [data]);
  
  if(isLoading) return <div className="h-screen flex justify-center items-center bg-slate-900"><Circles
  height="70"
  width="70"
  color="#36A6C4"
  ariaLabel="circles-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  /></div>;

  return (
    <div
      className={`min-w-screen min-h-screen bg-[#12172D] flex pt-2 gap-5 justify-center `}
    >
      <div className="text-white font-inter flex flex-col min-h-screen ">
        <UserContainer />
      </div>
      <div>
        <div className="mb-[20px]">
          <SearchComponent />
        </div>
        <div className="mb-[20px]">
          <ProfileComponent />
        </div>
        <div className="mb-[20px]">
          <ReviewCard title={"Connects"} />
        </div>
        <div className="mb-[20px]">
          <ReviewCard title={"Anonymous"} />
        </div>
      </div>
      <div className="text-white w-[350px] lg:hidden xl:block">
        <div className="flex justify-end cursor-pointer">
          <img src={Settings} alt="" className="w-[55px]"  onClick={()=>(localStorage.clear('token'),navigate('/'))}/>
        </div>
        <div className="mt-8 ml-2 mr-6">
          <ChatsComponent/>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

