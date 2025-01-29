"use server";

import Razorpay from "razorpay";
import Payment from "@/models/Payment";
import connectDB from "@/database/connectDB";
import User from "@/models/User";

export const initiate = async (amount, to_username, paymentform) => {
  try {
    await connectDB();

    let user = await User.findOne({username: to_username})
    const secret = user.razorpaySecret
   
    const instance = new Razorpay({
      key_id: user.razorpayId,
      key_secret: secret
    });

    // Prepare Razorpay order options
    const options = {
      amount: Number.parseInt(amount), // Convert to smallest currency unit (paise for INR)
      currency: "INR",
    };

    // Create Razorpay order
    const order = await instance.orders.create(options);

    // Create a pending payment record in the database
    await Payment.create({
      oid: order.id,
      amount: Number(amount)/100, // Amount in INR
      to_user: to_username,
      name: paymentform.name,
      message: paymentform.message,
    });

    return { ...order };
  } catch (error) {
    console.error("Error initiating payment:", error.message);
    throw new Error("Failed to initiate payment. Please try again later.");
  }
};

export const fetchuser = async (username) => {
  try {
    await connectDB();
    const user = await User.findOne({ username }).limit(10).lean();

    if (!user) {
      throw new Error("User not found.");
    }

    // Serialize the user object for Client Components
    return {
      ...user,
      _id: user._id.toString(),
      createdAt: user.createdAt ? user.createdAt.toISOString() : null,
      updatedAt: user.updatedAt ? user.updatedAt.toISOString() : null,
    };
  } catch (error) {
    console.error("Error fetching user:", error.message);
    throw new Error("Failed to fetch user. Please try again later.");
  }
};

export const fetchpayments = async (username) => {
  try {
    await connectDB();
    const payments = await Payment.find({ to_user: username ,done:true})
      .sort({ amount: -1 })
      .lean();

    // Serialize payments for Client Components
    return payments.map((payment) => ({
      ...payment,
      _id: payment._id.toString(),
      createdAt: payment.createdAt ? payment.createdAt.toISOString() : null,
      updatedAt: payment.updatedAt ? payment.updatedAt.toISOString() : null,
    }));
  } catch (error) {
    console.error("Error fetching payments:", error.message);
    throw new Error("Failed to fetch payments. Please try again later.");
  }
};

export const updateProfile = async (data, oldusername) => {
  await connectDB()
  let ndata = Object.fromEntries(data)

  // If the username is being updated, check if username is available
  if (oldusername !== ndata.username) {
      let u = await User.findOne({ username: ndata.username })
      if (u) {
          return { error: "Username already exists" }
      }   
      await User.updateOne({email: ndata.email}, ndata)
      // Now update all the usernames in the Payments table 
      await Payment.updateMany({to_user: oldusername}, {to_user: ndata.username})
      
  }
  else{

      
      await User.updateOne({email: ndata.email}, ndata)
  }


}