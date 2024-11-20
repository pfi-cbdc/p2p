import React from "react";

const BorrowerFrame=()=>{
    return(
        <>
        <div className="w-full h-screen flex text-white bg-[#000000]">
        <div className="left w-[45vw] h-[50vw] ">
            <div className="img mt-[3.5vw] w-[28vw] h-[40vw]  ml-[3vw] rounded-[5vw] border-[0.1vw] border-white">
               <img src="screen.png" alt="" className="rounded-[5vw] w-full h-full transform perspective-1000 rotate-x-8 rotate-y-4 rotate-z-3"/>
            </div>
        </div>
        <div className="right w-[55vw] h-[45vw]  text-[2.5vw]  flex flex-col gap-[4vw] mt-[12vw]">
            <h1 className="ml-[2.5vw]">Transparent flow of your money</h1>
            <h1 className="ml-[2.5vw]">Timely Repayments with your Matured Capital</h1>
            <h1 className="ml-[2.5vw]">Fixed and Highest Rerurns</h1>
            <button></button>
        </div>
        </div>
        </>
    )
}
export default BorrowerFrame;