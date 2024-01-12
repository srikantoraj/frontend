import React, { useEffect, useState }from "react";
import Man2 from "../../assets/icons/Ellipse 8 (1).png";
import Man3 from "../../assets/icons/Ellipse 8 (2).png";
import Man4 from "../../assets/icons/Ellipse 8 (3).png";
import Man5 from "../../assets/icons/Ellipse 8 (4).png";
import Man6 from "../../assets/icons/Ellipse 8 (5).png";
import PrimaryButton from "../common/PrimaryButton";
import UserCard from "./UserCard";
import { MdChat } from "react-icons/md";
const UserContainer = () => {
  const[allUsers, setAllUsers] = useState({});
  const[connectTitle, setConnectTitle] = useState('See More')
  const[randomTitle, setRandomTitle] = useState('See More')
  const[randoms, setRandoms] = useState([]);
  const[connects, setConnets] = useState([]);

  const socketConnection2 =()=>{
    const socket = new WebSocket(`ws://trytales.com:8001/ws/bucket/admin/`);
   
    socket.onopen = (event) => {
      console.log('WebSocket is open now from bucket.');
    };

    let initial=0;
    socket.onmessage = (event) => {
     
        if(event?.data){
          let tempUsers = JSON.parse(event?.data);
          if(!initial){
            initial = 0;
            if(connectTitle =='See More'){
              setConnets(tempUsers.bucket_users.slice(0, 3));
              
            } else{
              setConnets(tempUsers.bucket_users);
            }
            if(randomTitle =='See More'){
              function getRandomThreeFromArray(arr) {
                if (arr.length < 3) return arr;
                return arr.slice().sort(() => Math.random() - 0.5).slice(0, 3);
              } 
              setRandoms(getRandomThreeFromArray(tempUsers.random_users));
            } else{
              setRandoms(tempUsers.random_users);
            }
          }
          setAllUsers(tempUsers)
        }
    };
    socket.onerror = (error) => {
      console.error('WebSocket error: ', error);
    };
    return () => {
      socket.close();
    };
  }
   
  useEffect(()=>{
    socketConnection2()
  },[])


  const showMore = (title,bucketChecker) =>{
   
    console.log('clicked')
    if(title == 'See More' &&bucketChecker =='connects'){
      setConnets(allUsers.bucket_users);
      setConnectTitle('See Less');

    } else if(title == 'See More' &&bucketChecker =='randoms'){
    
      setRandoms(allUsers.random_users);
      setRandomTitle('See Less');

    } else if(title == 'See Less' &&bucketChecker =='connects'){
    
      setConnets(allUsers.bucket_users.slice(0, 3));
      setConnectTitle('See More');

    } else if(title == 'See Less' &&bucketChecker =='randoms'){
      setRandoms(allUsers.random_users.slice(0, 3));
      setRandomTitle('See More');

    }



    
  }


  return (
    <>
      <div className="flex-1 m-6 mb-10 mt-0">
        <div className="w-[400px] text-[#ffffff] bg-white-rgba py-5 pl-5 rounded-3xl shadow-3xl h-full flex flex-col ">
          <h2 className="text-2xl font-inter font-[600]">Connects</h2>
            <div className="flex-1">
              {
                connects.map((user,index)=>(<UserCard username={user?.username} img={user?.image} name={`${user?.first_name} ${user?.last_name}`} email={user?.email} key={index} title={'connects'} />))
              }
            </div>

          <div className="flex justify-center mb-2 mt-12">
            <span  className="flex justify-center " > 
              <button onClick={()=>showMore(connectTitle,'connects')} className="bg-[#36A6C4] px-10 py-3 rounded-[15px] font-[600] tracking-[0.48px] font-inter absolute" type={'submit'}>{connectTitle}</button>
            </span> 
          </div>
        </div>
      </div>

      <div className=" flex-1 m-6 mb-10">
        <div className="w-[400px] text-[#ffffff] bg-white-rgba py-5 pl-5 rounded-3xl shadow-3xl h-full flex flex-col ">
          <h2 className="text-2xl font-inter font-[600]">Randoms</h2>
            <div className="flex-1">
              {
                randoms.map((user,index)=>(<UserCard username={user?.username}  img={user?.image} name={`${user?.first_name} ${user?.last_name}`} email={user?.email} key={index} title={'randoms'}/>))
              }
            </div>
          <div className="flex justify-center mb-2 mt-12">
            <span  className="flex justify-center " > 
              <button onClick={()=>showMore(randomTitle,'randoms')} className="bg-[#36A6C4] px-10 py-3 rounded-[15px] font-[600] tracking-[0.48px] font-inter absolute" type={'submit'}>{randomTitle}</button>
            </span> 
          </div>
        </div>
      </div>


    </>
  );
};

export default UserContainer;
