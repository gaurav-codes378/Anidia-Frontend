import { useSelector } from "react-redux";
import ThreeVerticalDot from "../assets/img/svgs/ThreeVerticalDot";
import { useEffect, useRef, useState } from "react";
import CoverPhotoModal from "./CoverPhotoModal";
import { getFIlePath } from "../helpers/FileHelper";

const LeftCard = ()=>{
    const dropdownRef = useRef(null);
    const [showDropdown,setShowDropdown] = useState(false);
    const [showModal,setShowModal] = useState(false);

    useEffect(()=>{
      document.addEventListener('mousedown',(e)=>{
        if(showDropdown && !dropdownRef.current.contains(e.target)){
            setShowDropdown(false);
        }
  })
    },[]);

    const user = useSelector((store) => {
        return store.user.user;
      });

      const handleClick=()=>{
        setShowDropdown(true);
        
      }
      const handleCoverPhotoOpen=()=>{
        setShowModal(true);
        setShowDropdown(false);
      }
      const handleCoverPhotoCLose=()=>{
        setShowModal(false);
      }
      
    
   return (
        <div className="h-96 bg-[var(--color-light-black)] rounded-3xl overflow-hidden ">
          {showModal && <CoverPhotoModal closeModal ={handleCoverPhotoCLose} />}
        <div className="h-32 relative flex justify-center items-center" ref={dropdownRef}>
          <img
            className="w-full h-full"
            src={
              user?.coverPhoto
                ? user.coverPhoto
                : "https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w600/2023/10/free-images.jpg"
            }
          />
          <div className="absolute right-4 top-4 text-right flex flex-col justify-end items-end">
          <div  className=" w-6 bg-[var(--color-dark-black)] rounded-md p-1" onClick={handleClick} >
               <ThreeVerticalDot />
          </div>
          {
                showDropdown && <div className=" bg-slate-700 text-sm p-2" >
                <div  className="hover:bg-black p-1" onClick={handleCoverPhotoOpen} >Update Cover Photo </div>
                <div className="hover:bg-black p-1">Update Profile Photo </div>
              </div>
          }
          
          </div>
          
        </div>
        <div className="flex justify-around">
          <div>1000 Followers</div>
          <div className="grow mx-2"> {user?.name?.firstName} </div>
          <div>100 Following</div>
        </div>
      </div>
    );
}

export default LeftCard;