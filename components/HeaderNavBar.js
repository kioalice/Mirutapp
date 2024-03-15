"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from 'next/link';
import React, { useEffect, useState } from "react";

function HeaderNavBar() {
  const {data:session}=useSession();
  const [profileClick,setProfileClick]=useState(false);

  useEffect(()=>{
    setTimeout(()=>{
      setProfileClick(false)
    },6000)
  },[profileClick==true])

  return session?.user&&(
   <div
      className="flex items-center
    justify-between p-2 shadow-md bg-amber-400"
    >
      <div className="flex gap-7 items-center">
        <Image  src="/logo.png" alt="logo" width={80} height={80} />
        <a href="#" ><h2  className="cursor-pointer hover:text-blue-500">Inicio</h2></a>
        
      </div>
      
      <div>
        {session?.user ? (
          <> 
            <Image
              src={session.user.image}
              alt="user"
              width={40}
              height={40}
              onClick={()=>setProfileClick(!profileClick)}
              className="rounded-full cursor-pointer 
              hover:border-[2px] border-blue-500"
            />
           {profileClick? <div className="absolute bg-amber-400 p-3
            shadow-md border-[1px] mt-2 z-30
            right-4 ">
              <h2 className=" cursor-pointer
               hover:text-blue-500 hover:font-bold"
               onClick={()=>signOut()}>Cerrar Sesión</h2>
            </div>:null}
          </>
        ) : null}
      </div>
    </div>
  );
}

export default HeaderNavBar;
