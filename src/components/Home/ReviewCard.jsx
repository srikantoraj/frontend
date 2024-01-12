import React, {useId} from "react";
import { IoIosArrowDown } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import ReviewUser from "./ReviewUser";
import { useSelector,useDispatch } from "react-redux";
import { Button, Modal } from 'flowbite-react';
import { useState } from 'react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import PrimaryButton from "../common/PrimaryButton";
import { useForm } from "react-hook-form"
import { anonymous_reviews,connect_reviews } from "../../store/Reducers/profileReducer";
const ReviewCard = ({ title }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const dispath = useDispatch()
  const [openModal, setOpenModal] = useState(false);
  const [reviewStatus, setReviewStatus] = useState("");
  let data;
  let user = useSelector((state)=>state.profile.user)
  let token = useSelector((state)=>state.profile.token)

  if(title !='Anonymous'){
    data = useSelector((state) => state.profile.connect_reviews)
    data = data?.slice(0,2)
    
  } else {
    data = useSelector((state) => state.profile.anonymous_reviews)
    data = data?.slice(0,2)
  }

  const onSubmit =async(data)=>{
    let reviewObj = data;
    if(title != "Anonymous")  reviewObj.anonymous=""
    else reviewObj.anonymous=title;

    
    const queryObject = {
      url:`https://trytales.com/review/${user.username}/`,
      headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json', 
      },
  };

  try {
      const response = await fetch(queryObject.url, {
          method: 'POST',
          headers: queryObject.headers,
          body:JSON.stringify(reviewObj),
      });

      if (response.ok) {
          const data = await response.json();
          dispath(anonymous_reviews(data.anonymous_reviews))
          dispath(connect_reviews(data.reviews))
          
          console.log('Success:', data);
      } else {
          console.error('Error:', response.status, response.statusText);
      }
  } catch (error) {
      console.error('Error:', error.message);
  }  
    
    setOpenModal(false)
  }


  return (
    <div className="max-w-[580px] text-[#ffffff] bg-white-rgba p-4  rounded-3xl shadow-3xl">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-inter font-[600]">{`${title} Reviews`}</h2>
        <h2 className="text-xl font-inter font-[600] text-[#BBB]">{`5k`}</h2>
      </div>
      {data?.map((item, index)=>(<ReviewUser data={item} key={index} />))}
      
      <div className="flex justify-center">
        <div className="pr-6" >
        <IoIosArrowDown color="white"  />
        </div>
        <FaPlus  color="white"  onClick={()=>setOpenModal(true)}/>
      </div>
      
      <Modal show={openModal} size="lg" onClose={() => setOpenModal(false)} popup  className="bg-black">
        <Modal.Header className="bg-slate-700 "/>
        <Modal.Body className="bg-slate-700 p-10 pt-0 rounded-b-md">
        <form  onSubmit={handleSubmit(onSubmit)} className="">
          <div className="text-center bg-slate-700">
            <img src={user?.image} className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            <input
              className="px-4 py-3 w-full outline-none bg-[#12172D] rounded-2xl"
              type="text"
              name="review"
              placeholder="Review"
              id="review"
              {...register("review",{required:true})}
            />
            </h3>
            <div className="flex justify-center gap-4">
              <button className="bg-[#36A6C4] px-10 py-3 rounded-[15px] font-[600] tracking-[0.48px] font-inter absolute text-white" type="submit"> Submit</button>
            </div>
          </div>
          </form>
        </Modal.Body>
      </Modal>
      
    </div>
  );
};

export default ReviewCard;
