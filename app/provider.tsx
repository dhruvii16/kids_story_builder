// "use client"; // Add this line to mark the component as a Client Component

// import { NextUIProvider } from "@nextui-org/react";
// import React, { useEffect, useState } from "react";
// import dynamic from 'next/dynamic';
// import Header from "./_components/header";

// // Dynamically load PayPalScriptProvider with no SSR
// const PayPalScriptProvider = dynamic(
//   () => import('@paypal/react-paypal-js').then(mod => mod.PayPalScriptProvider),
//   { ssr: false }
// );

// function Provider({ children }: { children: React.ReactNode }) {
//   // State to track if we're in a client environment
//   const [isClient, setIsClient] = useState(false);

//   useEffect(() => {
//     // Ensure we're on the client
//     setIsClient(true);
//   }, []);

//   return (
  
//       <NextUIProvider>
//         {isClient ? (
//           // Only render PayPalScriptProvider on the client
//           <PayPalScriptProvider options={{ "clientId":process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID??""  }}>
//             <Header />
//             {children}
//           </PayPalScriptProvider>
//         ) : (
//           // Fallback for server-side rendering without PayPal
//           <>
//             <Header />
//             {children}
//           </>
//         )}
//       </NextUIProvider>
  
//   );
// }

// export default Provider;



// import { NextUIProvider } from "@nextui-org/react";
// import { ClerkProvider } from "@clerk/nextjs";
// import React from "react";
// import dynamic from 'next/dynamic';
// import Header from "./_components/header";

// const PayPalScriptProvider = dynamic(
//   () => import('@paypal/react-paypal-js').then(mod => mod.PayPalScriptProvider),
//   { ssr: false }
// );

// function Provider({ children }: { children: React.ReactNode }) {
//   return (
//     <ClerkProvider>
//       <NextUIProvider>
//         {typeof window !== 'undefined' && (
//           <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? '' }}>
//             <Header />
//             {children}
//           </PayPalScriptProvider>
//         )}
//         {typeof window === 'undefined' && (
//           <>
//             <Header />
//             {children}
//           </>
//         )}
//       </NextUIProvider>
//     </ClerkProvider>
//   );
// }

// export default Provider;

"use client"
import { NextUIProvider } from "@nextui-org/react";
import React, {useEffect, useState} from "react";
import Header from "./_components/header"
import { PayPalScriptProvider} from "@paypal/react-paypal-js";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { users } from '@/config/schema'
import { db } from "@/config/db";
import { UserDetailContext } from "./_context/UserDetailContext";

function Provider({ children }: { children: React.ReactNode }) {

  const [userDetail,setUserDetail]=useState<any>();
  const {user}=useUser();

  useEffect(()=>{
    user&&saveNewUserIfNotExist();
  },[user])

  const saveNewUserIfNotExist=async()=>{
    //use is exist or not
      const userResp=await db.select().from(users)
      .where(eq(users.userEmail,user?.primaryEmailAddress?.emailAddress??''))

      console.log("existing user",userResp);
      if(!userResp[0])
      {
        const result=await db.insert(users).values({
          userEmail:user?.primaryEmailAddress?.emailAddress,
          userImage:user?.imageUrl,
          userName:user?.fullName
        }).returning(
          {
            userEmail:users.userEmail,
            userName:users.userName,
            userImage:users.userImage,
            credits:users.credits,
          }
        )
        console.log("new user",result[0])
        setUserDetail(result[0]);
      }else{
        setUserDetail(userResp[0])
      }
    // if Not will add new user to db
  }

  return (
    <PayPalScriptProvider options={{ clientId:process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID??''}}>
      <UserDetailContext.Provider value={{userDetail,setUserDetail}}>
      <NextUIProvider>
        {/* header */}
        <Header />
        {children}
      </NextUIProvider>
      </UserDetailContext.Provider>
    </PayPalScriptProvider>
   
  );
}

export default Provider;


