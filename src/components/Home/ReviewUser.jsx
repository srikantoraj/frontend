import React from 'react';
import Man from "../../assets/icons/Ellipse 8.png";
import Star from "../../assets/icons/kid_star.png";

const ReviewUser = ({data}) => {
    console.log(data)
    return (
        <div className="flex justify-between items-center mb-5">
        <div className="flex items-center">
          <img src={Man} alt="" className="w-[40px] mr-4" />
          <div>
            {!data?.anonymous&& <h3 className="text-[16px] font-[500]">{data?.review_user?.first_name} {data?.review_user?.last_name}</h3>}
            {data?.anonymous&& <h3 className="text-[16px] font-[500]">{'Anonymous User'}</h3>}
            <p className="text-[12px] text-[#CCC] font-[400]">
              {data?.review}
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <img src={Star} alt="" className="w-[24px] mr-4" />
          <p className="text-[14px] text-[#CCC] font-[500]">{`29k`}</p>
        </div>
      </div>
    );
};

export default ReviewUser;