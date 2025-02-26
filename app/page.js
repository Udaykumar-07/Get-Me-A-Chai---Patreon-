import React from "react";
import Link from "next/link";

const page = () => {
  return (
    <>
      <div className="container mx-auto flex-col py-10">
        <div className="flex flex-col justify-center items-center py-2">
        <div className="text-2xl py-2">Buy Me a Chai</div>
        <p className="pb-3 text-center">
          A crowdfunding platforms for creators. Get funded by your fans and
          followers. Start now!
        </p>
        </div>
        <div className="flex justify-center items-center">
          <Link href='/Login'>
        <button  className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Start Here
          </span>
        </button>
        </Link>
        <Link href='/about'>
        <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Read More
          </span>
        </button>
        </Link>
          </div>
      </div>

      <div className="bg-slate-700 h-[0.2vh] w-full"></div>
    </>
  );
};

export default page;

export const metadata = {
  title: 'Get Me a Chai',
  }