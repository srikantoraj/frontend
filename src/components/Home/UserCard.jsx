import React from 'react';
import Add from "../../assets/icons/add.png";
import Bucket from "../../assets/icons/bucket.png";
import Chat from "../../assets/icons/chat.png";
import { MdChat } from "react-icons/md";
import { MdPersonAdd } from "react-icons/md";
import { FaBucket } from "react-icons/fa6";
import { TbBucketOff } from "react-icons/tb";
import { BsBucketFill } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { userChatHandler } from '../../store/Reducers/profileReducer';
import { useAddToBucketMutation, useRemoveFromBucketQuery } from '../../api/api';


import { IconContext } from "react-icons";

const UserCard = ({img,name,email,title, username}) => {
    let dispatch = useDispatch();
    let token  = useSelector((state) => state.profile.token);
    
    const chatHandler = (username)=>{
        console.log(username)
        dispatch(userChatHandler(username))

    }

    const addOrRemoveFromBucket =async(username,key)=>{
        
        const queryObject = {
            url:`https://trytales.com/${key}/${username}/`,
            headers: {
                Authorization: `Token ${token}`,
            },
        };
    
        try {
            const response = await fetch(queryObject.url, {
                method: 'GET',
                headers: queryObject.headers,
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log('Success:', data);
            } else {
                console.error('Error:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error:', error.message);
        }  

    }

    return (

        <div className='flex justify-between items-center' >
            <div className='flex items-center my-3 '>
                <div className=' overflow-hidden w-14 max-h-14  pr-3 '>
                    <img src={img} alt="" className="rounded-full object-fill  w-full h-full" />
                </div>
                <div className="col-span-3 pr-10">
                    <h3 className="text-[14px] tracking-[0.54px] font-[600]">{name}</h3>
                    <p className="text-[12px] text-[#CCC] tracking-[0.40px] font-[600]">@{username}</p>
                </div> 
            </div>

            <div className='flex justify-evenly'>
                <div className="pr-3" onClick={()=>chatHandler(username)}>
                    <IconContext.Provider value={{size:26, className: "global-class-name" }}>
                        <div><MdChat /></div>
                    </IconContext.Provider>
                </div> 
                <div className="pr-3 ">
                    <IconContext.Provider value={{size:30, className: "global-class-name" }}>
                        <div><MdPersonAdd /></div>
                    </IconContext.Provider>
                </div> 
                {title =='randoms' && <div className="pr-5 " onClick={()=>addOrRemoveFromBucket(username,'add_to_bucket')}>
                    <IconContext.Provider value={{size:26, className: "global-class-name" }}>
                    <BsBucketFill />
                    </IconContext.Provider>
                </div>} 
                {title =='connects' && <div className="pr-5" onClick={()=>addOrRemoveFromBucket(username,'remove_from_bucket')}>
                    <IconContext.Provider value={{size:26, className: "global-class-name", color:'#FF681E' }}>
                    <TbBucketOff />
                    </IconContext.Provider>
                </div>} 
               
            </div>
        </div>
    );
};

export default UserCard;