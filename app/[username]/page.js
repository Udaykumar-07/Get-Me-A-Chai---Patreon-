"use client"
import React from 'react'
import Paymentpage from '@/components/Paymentpage'
import { notFound } from 'next/navigation';
import User from '@/models/User';
import ConnectDB from '@/database/connectDB';
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'

const Page = async ({ params }) => { 
  await ConnectDB(); // ✅ Ensure database connection before querying

  const { username } = params;  
  let u = await User.findOne({ username }); // ✅ No need for `await` in destructuring
  const { data: session} = useSession()
    const router = useRouter();
    
  if (!u) {
    return notFound();
  }

  
      useEffect(() => {
        if (!session) {
          router.push('/Login'); // Redirect to Login if not authenticated
          }
      }, [])

  return (
    <> 
      <Paymentpage username={username} />
    </>
  );
};

export default Page;

export async function meta({ params }) {
  return { title: `${params.username} - Get Me A Chai` };
}
