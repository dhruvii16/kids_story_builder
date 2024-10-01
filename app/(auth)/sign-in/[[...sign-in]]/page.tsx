import { SignIn } from '@clerk/nextjs';
import Image from 'next/image';

export default function Page() {
  return (
    <div className="flex flex-col-reverse md:flex-row items-center justify-center min-h-screen">
      {/* Sign In Section */}
      <div className="flex justify-center w-full md:w-1/2 p-6 md:p-10">
        <SignIn />
      </div>

      {/* Image Section */}
      <div className="w-full md:w-1/2 p-4 flex justify-center">
        <Image
          src={'/login.jpg'}
          alt="login"
          width={500}
          height={500}
          className="rounded-lg object-cover max-w-full h-auto"
        />
      </div>
    </div>
  );
}




// import { SignIn } from '@clerk/nextjs'
// import Image from 'next/image'

// export default function Page() {
//   return (
//     <div className='grid grid-cols-1 md:grid-cols-2'>
//       <div>
//         <Image src={'/login.jpg'} alt='login' width={550} height={550} className='rounded-lg p-20'/>
//       </div>
//       <div className='flex justify-center p-10 order-first md:order-last'>
//         <SignIn/>
//       </div>
//     </div>
//   )
// }