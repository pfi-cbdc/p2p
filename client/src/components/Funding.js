import React from "react";

const Funding=()=>{
    return(
        <>
        <div>
        <div className="w-full h-screen  flex bg-[#000000]">
        <div className="left w-[55vw] h-[45vw] text-[2.5vw] text-white  flex flex-col gap-[4vw] mt-[4vw] ">
            <h1 className="ml-[3vw]">Manage your Working Capital and <br />grow your business exponentially </h1>
            <h1 className="ml-[3vw]">Upload Your Fund Requirements <br />and get Funded next day at lowet rate.</h1>
            <h1 className="ml-[3vw]">Fixed and highest Returns.</h1>
            <button></button>
        </div>
        <div className="right w-[45vw] h-[50vw] ml-[5vw]  ">
        <div className="img w-[28vw] h-[40vw]  ml-[2vw] rounded-[5vw] border-[0.1vw] border-white">
        <img src="screen.png" alt="" className="rounded-[5vw] w-full h-[45vw]"/>
        </div>
        </div>
        </div>
        </div>
        </>
    )
}

export default Funding;