import React from 'react'
import Image from 'next/image'
import Link from "next/link";
import { Button } from "@nextui-org/button";

function Hero() {
  return (
    // Container with responsive padding and full-screen height for the hero section
    <div className='px-5 md:px-16 lg:px-28 mt-10 h-screen'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        {/* Left section: Text content */}
        <div className='flex flex-col justify-center'>
          <h2 className='text-[32px] md:text-[40px] lg:text-[55px] text-primary font-extrabold font-serif py-6 md:py-10'>
            Craft Magical Stories for Kids in Minutes
          </h2>
          <p className='text-lg md:text-xl text-primary font-serif mb-6'>
            Create fun and personalised stories that bring your child's adventures to life and spark their passion for reading.
          </p>
          <Link href={'/create-story'}>
            <Button size='lg' className='mt-5 font-bold bg-blue-600 text-white'>
              Create Story
            </Button>
          </Link>
        </div>
        
        {/* Right section: Image */}
        <div className='flex justify-center md:justify-end'>
          <Image 
            src='/herro.png' 
            alt='hero' 
            width={500} 
            height={350}
            className='w-full h-auto max-w-md' // Responsive image with a max-width limit
            priority // Ensures the image loads quickly for better performance
          />
        </div>
      </div>
    </div>
  )
}

export default Hero;









// import React from 'react'
// import Image from 'next/image'
// import Link from "next/link";
// import {Button, ButtonGroup} from "@nextui-org/button";

// function Hero() {
//   return (
//     <div className='px-10 md:px-px-28 lg:px-44 mt-10 h-screen'>
//       <div className='grid grid-cols-1 md:grid-cols-2'>
//         <div>
//           <h2 className='text-[55px] text-primary font-extrabold font-serif py-10'>Craft Magical Stories for kids in Minutes</h2>
//           <p className='text-1xl text-primary font-serif'>Create fun and personalised stories that bring your child's adventures to life and spark their passion for reading.</p>
//           <Link href={'/create-story'}>
//           <Button size='lg' className='mt-5 font-bold bg-blue-600 text-white'>Create Story</Button>
//           </Link>
//         </div>
//         <div>
//           <Image src='/herro.png' alt='hero' width={500} height={350}/>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Hero