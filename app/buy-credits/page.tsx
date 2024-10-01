"use client";
import dynamic from 'next/dynamic';
import React, { useContext, useEffect, useState } from 'react';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { UserDetailContext } from '../_context/UserDetailContext';
import { users } from '@/config/schema';
import { db } from '@/config/db';
import { eq } from 'drizzle-orm';
import { useRouter } from 'next/navigation';

//Dynamically import PayPalButtons with no SSR (Server-Side Rendering)
const PayPalButtons = dynamic(
  () => import('@paypal/react-paypal-js').then(mod => mod.PayPalButtons),
  { ssr: false }
);

function BuyCredits() {
  // Options for buying credits
  const Options = [
    {
      id: 1,
      price: 1.99,
      credits: 25
    },
    {
      id: 2,
      price: 2.99,
      credits: 50
    }
  ];

  const [selectedPrice,setSelectedPrice] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number>(0);
  const {userDetail,setUserDetail} = useContext(UserDetailContext);
  const router=useRouter();

  useEffect(() => {
    
    if(selectedOption!=0)
    {
        const price=Options[selectedOption-1].price;
        console.log(price)
        setSelectedPrice(price)
    }
  }, [selectedOption]);

  const OnPaymentSuccess=async()=>{
    const result=await db.update(users)
    .set({
        credits:Options[selectedOption]?.credits+userDetail?.credits
    }).where(eq(users.userEmail,userDetail.userEmail));
    if(result)
    {
        notify('credit added')
        setUserDetail((prev:any)=>({
            ...prev,
            ['credit']:Options[selectedOption]?.credits+userDetail?.credits
        }))
        router.replace('/dashboard');
    }
    else{
        notifyError('server error')
    }
  }

  return (
    // Ensure PayPalScriptProvider is only rendered on the client
      <PayPalScriptProvider options={{ "clientId":process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID??""  }}>
        <div className='min-h-screen text-center p-10 md:px-20 lg:px-40'>
          <h2 className='text-3xl font-bold text-primary'>Add More Credits</h2>
          
          <div className='grid grid-cols-1 md:grid-cols-2'>
            {Options.map((option) => (
              <div 
                key={option.id}
                className={`p-4 my-3 border bg-primary text-center 
                  rounded-lg text-white cursor-pointer
                   ${selectedOption === option.id ? 'bg-[#000000]':''}
                `}
                onClick={() => setSelectedOption(option.id)}
              >
                <h2>Get {option.credits} Credits = {option.credits} Story</h2>
                <h2 className='font-bold text-2xl'>${option.price}</h2>
              </div>
            ))}
          </div>

        <div className="flex justify-center items-center h-full">
            {selectedPrice>0&& <PayPalButtons style={{ layout: "vertical" }} 
            disabled={!selectedOption||selectedOption==0}
             // @ts-ignore
            onApprove={()=>OnPaymentSuccess()}
        // {/* pass amount to paypal */}
            createOrder={(data,actions)=>{
                // @ts-ignore
                return actions.order.create({
                    purchase_units:[
                        {
                            amount:{
                                value:selectedPrice.toFixed(2),
                                currency_code:'USD'
                            }
                        }
                    ]
                })
            }}
            />
            }
        </div>
        </div>
      </PayPalScriptProvider>
    )
}

export default BuyCredits;








function notifyError(arg0: string) {
    throw new Error('Function not implemented.');
}

function notify(arg0: string) {
    throw new Error('Function not implemented.');
}
// "use client";
// import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
// import React, { useState,useEffect } from 'react';

// function BuyCredits() {
//   const Options = [
//     { id: 1, price: 1.99, credits: 10 },
//     { id: 2, price: 2.99, credits: 30 },
//   ];

//   const [selectedOption, setSelectedOption] = useState<number>(0);
//   const [selectedPrice,setSelectedPrice] = useState<number>(0);
 
//   useEffect(() => {
    
//     if(selectedOption!=0)
//     {
//         const price=Options[selectedOption].price;
//         console.log(price)
//         setSelectedPrice(price)
//     }
//   }, [selectedOption]);
//   return (
//     <PayPalScriptProvider options={{ "clientId":process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID??"" }}>
//       <div className="min-h-screen text-center p-10 md:px-20 lg:px-40">
//         <h2 className="text-3xl font-bold text-primary">Add More Credits</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2">
//           <div>
//           {Options.map((option,index) => (
//             <div
//               key={option.id}
//               className={`p-4 my-3 border bg-primary text-center rounded-lg text-white cursor-pointer ${selectedOption === option.id ? 'bg-[#000000]' : 'bg-primary'}`}
//               onClick={() => setSelectedOption(option.id)}
//             >
//             <h2>Get {option.credits} Credits = {option.credits} Story</h2>
//             <h2 className="font-bold text-2xl">${option.price}</h2>
//             </div>
//           ))}
//           </div>
//         </div>
//         <div className="flex justify-center items-center h-full">
//             <PayPalButtons style={{ layout: "vertical" }} 
//             disabled={!selectedOption||selectedOption==0}
//              // @ts-ignore
//             onApprove={()=>console.log("Success")}
//         // {/* pass amount to paypal */}
//             createOrder={(data,actions)=>{
//                 // @ts-ignore
//                 return actions.order.create({
//                     purchase_units:[
//                         {
//                             amount:{
//                                 value:selectedPrice.toFixed(2),
//                                 currency_code:'USD'
//                             }
//                         }
//                     ]
//                 })
//             }}
//             />
//         </div>
//       </div>
//     </PayPalScriptProvider>
//   );
// }

// export default BuyCredits;



