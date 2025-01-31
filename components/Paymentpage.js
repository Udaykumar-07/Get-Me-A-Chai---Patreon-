"use client"
import React from "react"
import Script from "next/script"
import { useState, useEffect } from "react"
import { fetchuser,fetchpayments, initiate } from "@/actions/useractions"
import { ToastContainer, toast } from 'react-toastify';
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { Bounce } from "react-toastify"
import { useSession} from "next-auth/react"

const Paymentpage = ({username}) => {
    const [paymentform,setpaymentform] = useState({name:"",message:"",amount:""})
    const [currentUser, setcurrentUser] = useState({})
    const [payments, setpayments] = useState([])
    const searchParams = useSearchParams()
    const router = useRouter()
    const { data: session,status} = useSession() 

    
    if(status==='loading'){
      return <div>Loading...</div>
      }
    useEffect(() => {
      getData()
      }, [])
      
    useEffect(() => {
      if(searchParams.get('paymentdone')=="true"){
        toast('Thankyou for the donation', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
          });
          }
        router.push(`/${username}`)
        }, [searchParams, router, username])
        
        const handleChange = (e)=>{
          setpaymentform({...paymentform,[e.target.name] : e.target.value })
      }
        
    const getData = async () => {
      let u = await fetchuser(username)
      setcurrentUser(u)
      let dbpayments = await fetchpayments(username)
      setpayments(dbpayments) 
  }

    const pay = async (amount) =>{
        let a = await initiate(amount,username, paymentform)
        const orderId = a.id

        var options = {
            "key": currentUser.razorpayId, // Enter the Key ID generated from the Dashboard
            "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "get me a chai", //your business name
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                "name": currentUser.name || "", //your customer's name
                "email": currentUser.email || "",
                //Provide the customer's phone number for better conversion rates 
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        const Razorpay = window.Razorpay;
        if (!Razorpay) {
          alert("Razorpay SDK failed to load. Are you online?");
          return;
        }
    var rzp1 = new Razorpay(options);
    rzp1.open();
}
return (
    <> 
    <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition={Bounce}
/>
     <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
      <div className="coverImg flex-col justify-center">
        <img className="w-full object-fill h-80" src={currentUser.coverPic}/>
        <div className="profile-pic w-full flex justify-center relative bottom-10 ">
        <img className="rounded-full w-20 h-20 border-2 border-red-800"         
        //src="https://images8.alphacoders.com/134/thumbbig-1342990.webp"/>
        src={currentUser.profilePic}/>
        </div>
        <div className="p-username text-center relative bottom-10 "> {username}</div>
        <div className="p-email text-center relative bottom-10 text-slate-600">@  Lets help {username} get a chai!</div>
      <div className='text-slate-400 text-center relative bottom-10'>
                  {payments.length} Payments .  ₹{payments.reduce((a, b) => a + b.amount, 0)} raised
                </div>
      </div>

      <div className=" flex md:flex-row flex-col w-[80%] items-center mx-auto md:gap-64 gap-10 my-10">
      <div className="flex-col w-[90vw] md:w-[50%] h-fit bg-slate-900 p-4 rounded-lg">
      <div className="text-xl">Top 10 Supporters:</div>
           <ul className="my-2">
            {payments.map((p,i) => {
            return <li key={i} className="flex items-center gap-2">
            <span className="material-symbols-outlined">account_circle</span>
            {p.name} donated with a message -<span>{p.message}</span><span>  ₹{(p.amount)}</span>
            </li>
            
            })}
           </ul>
      </div>
      
      <div className="flex-col w-[90vw] md:w-[50%] h-fit bg-slate-900 p-4 rounded-lg">
        <div className="text-xl">Make a Payment</div>
        <input type="text" onChange={handleChange} value={paymentform.name} name="name" className="my-2 h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your name" required />
        <input type="text" onChange={handleChange} value={paymentform.message} name="message" className="my-2 h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your message" required />
        <input type="number" onChange={handleChange} value={paymentform.amount} name="amount" className="my-2 h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your amount" required />
        <div className="flex gap-2">
        <button className="bg-slate-700 p-1 w-12 rounded-lg " onClick={()=> pay(1000)}>Pay ₹10</button>
          <button className="bg-slate-700 p-1 w-12 rounded-lg " onClick={()=> pay(2000)}>Pay ₹20</button>
          <button className="bg-slate-700 p-1 w-12 rounded-lg " onClick={()=> pay(3000)}>Pay ₹30</button>
        </div>
        <button type="button" className="w-full my-2 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 disabled:from-purple-400" disabled={paymentform.name?.length<3 || paymentform.message?.length<4 || paymentform.amount?.length<1} onClick={()=> pay(Number.parseInt(paymentform.amount)*100)}>Pay</button>
      </div>
      </div>
      
 
   
    </>
  )
    }

  export default Paymentpage;