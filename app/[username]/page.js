import React from 'react'
import Paymentpage from '@/components/Paymentpage'
import { notFound } from 'next/navigation';
import User from '@/models/User';


const Page = async({params}) => { 

  const { username } = await params;
  
    let u = await User.findOne({username:username})
    if(!u){
      return notFound()
    }
    
  
  
    return (
      <> 
       <Paymentpage username={username}/>
      </>
    )
  }

  export default Page

  export async function meta({ params }) {
    return {title:`${params.username} - Get Me A Chai`}
  }  