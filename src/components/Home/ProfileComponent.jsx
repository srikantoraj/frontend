import React from "react";
import { useSelector } from "react-redux";

const ProfileComponent = () => {
  const data = useSelector((state) => state.profile.user)

  return (
    <div className="max-w-[580px] text-[#ffffff] bg-white-rgba p-6 pb-5 rounded-3xl shadow-3xl">
      <div className="flex justify-between items-center">
        <div className="flex flex-col  items-center justify-center space-y-5 ">
          <div>
            <img src={data?.image} alt="Profile Picture" className="w-[90px]"  />
          </div>
          <div className="text-center">
            <h1 className="text-[20px] font-[600]">{data?.first_name} {data?.last_name}</h1>
            <p className="text-[#BBB] text-[14px] font-[400]">
              {data?.email}
            </p>
          </div>
        </div>
        <div>
          <div className="flex text-center">
            <div className="mr-6 ">
              <h1 className="text-[32px] font-[500] tracking-[0.96px]  text-center">
                {data?.people_visit}
              </h1>
              <p className="text-[#BBB] text-[16px] font-[400]">People Visit</p>
            </div>
            <div className="mr-6">
              <h1 className="text-[32px] font-[500] tracking-[0.96px]  text-center">
                {data?.connects}
              </h1>
              <p className="text-[#BBB] text-[16px] font-[400]">Connects</p>
            </div>
            <div>
              <h1 className="text-[32px] font-[500] tracking-[0.96px] text-[#BBB] text-center">
                {data?.total_reviews}
              </h1>
              <p className="text-[#BBB] text-[16px] font-[400]">Reviews</p>
            </div>
          </div>
          <div className="flex justify-end mt-12">
            <button className="bg-[#36A6C4] px-10 py-3 rounded-[15px] font-[600]">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;
