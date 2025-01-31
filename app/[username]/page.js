import React from 'react'
import Paymentpage from '@/components/Paymentpage'
import { notFound } from 'next/navigation';
import User from '@/models/User';
import ConnectDB from '@/database/connectDB'; // ✅ Import your DB connection

const Page = async ({ params }) => { 
  await ConnectDB(); // ✅ Ensure database connection before querying

  const { username } = params;  
  let u = await User.findOne({ username }); // ✅ No need for `await` in destructuring

  if (!u) {
    return notFound();
  }

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
