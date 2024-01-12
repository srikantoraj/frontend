import React,{ useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
// import { FaAngleLeft } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";
import Man1 from "../../assets/icons/Ellipse 12.png";
import Man2 from "../../assets/icons/Ellipse 8 (3).png";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaAllergies } from 'react-icons/fa';

const ChatsComponent = () => {
  let chatUser  = useSelector((state) => state.profile.chatUser);
  let token  = useSelector((state) => state.profile.token)
  let user  = useSelector((state) => state.profile.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [webSocket, setWebSocket] = useState(null);
  const [allMessages, setMessages] = useState([]);
  const [receiver, setReceiver] = useState({});
  const [text, setText] = useState('');


    // Create WebSocket connection.
  const socketConnection =()=>{
    if(webSocket){
      webSocket.close()
    }
    
    const socket = new WebSocket(`ws://trytales.com:8001/ws/chat/?token=${token}&receiver=${chatUser}`);
    setWebSocket(socket);

    // Connection opened
    socket.onopen = (event) => {
      console.log('WebSocket is open now.');
    };

    // Listen for messages
    socket.onmessage = (event) => {
      let message= JSON.parse(event?.data)

      if(message?.chats){
        setReceiver(message?.receiver)
        console.log(message)
        let messages = message?.chats;
        let messageArray=[]
        for(let message of messages){
          let tempMessage = {}
          tempMessage.message = message.content
          tempMessage.username= message.sender.username 
          messageArray.push(tempMessage)
        }
        setMessages(messageArray)
        

      } else {
        console.log(JSON.parse(event.data))
        console.log(allMessages)
        setMessages(prevMessages=>[...prevMessages, JSON.parse(event.data)])
        console.log(allMessages)
        

      }

    };

    // Listen for possible errors
    socket.onerror = (error) => {
      console.error('WebSocket error: ', error);
    };

    // Set up clean-up function
    return () => {
      socket.close();
    };
  }
   
  useEffect(()=>{
    socketConnection()
  },[token, chatUser])
  
  const sendMessage = () => {
    // if (webSocket && webSocket.readyState === WebSocket.OPEN) {
      webSocket.send(text);
      setText(''); 
    // }
  };

  return (
    <div className="w-[350px] text-[#ffffff] bg-[#142245] px-7 py-5 rounded-3xl shadow-xl">
      <h2 className="text-2xl font-inter font-[600]">{"Chats"}</h2>
      <div className="py-5 flex mb-1 justify-center">
        <div className="flex items-center mr-2">
          <FaChevronLeft fontSize={20} />
        </div>
        <div className="flex items-start mr-5">
          <img src={Man1} alt="" className="w-[40px]" />
        </div>
        <div className="flex items-center mr-5">
          {/* <img src={receiver?.image}alt="" className="w-[80px]" /> */}
          <div className='rounded-full overflow-hidden w-[80px]'>
            <img src={receiver?.image} alt="" className="rounded-full object-cover w-full h-full" />
          </div>
        </div>
        <div className="flex items-start">
          <img src={Man1} alt="" className="w-[40px]" />
        </div>
        <div className="flex items-center ml-2">
          <FaChevronRight fontSize={20} />
        </div>
      </div>
      <h3 className="text-[18px] font-[600] font-inter text-center">
        {receiver?.first_name} {receiver?.last_name}
      </h3>

      <div className="bg-white-rgba rounded-3xl w-[290px] h-[420px] py-3 px-4 mt-4 flex flex-col justify-between">
        
      <div>
        {
          allMessages.map((text,index)=>((text.username != user?.username)?( 

          <div
            className="w-[180px] bg-slate-200 py-2 pl-5 mb-4"
            style={{ borderRadius: "0px 10px 10px 10px" }}
            key={index}
          >
            <p className="text-[12px] font-[400] text-black">
              {text?.message} 
            </p>
          </div>

          ):( 
            
            <div className="flex justify-end" key={index}>
              <div
                className="w-[180px] bg-[#8D17A9] py-2 pl-5 mb-4"
                style={{ borderRadius: "10px 10px 0px 10px" }}
              >
                <p className="text-[12px] font-[400]">
                  {text?.message} 
                </p>
              </div>
            </div>
          ))) 
        } 
      </div>
       
        
        
      <div className={`bg-[#11162C] p-1.5  flex rounded-3xl shadow-sm`}>
        <input
          className="px-4 py-2 w-full  bg-[#11162C] text-[#999999] mr-2 border-none outline-none"
          type="text"
          name="text"
          placeholder="Enter Text"
          id="text"
          value={text} 
          onChange={(e) => setText(e.target.value)} 
        />
        <button onClick={sendMessage} className="bg-gradient-to-r from-[#36A6C4] to-[#9110A8] p-3 rounded-3xl font-[600] tracking-[0.48px] font-inter">
          <IoSend />
        </button>
      </div>
      </div>
    </div>
  );
};

export default ChatsComponent;
