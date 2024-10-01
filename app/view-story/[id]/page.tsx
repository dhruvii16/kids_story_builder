"use client";
import { db } from '@/config/db';
import { storyData } from '@/config/schema';
import React, { useEffect, useRef, useState } from 'react';
import { eq } from 'drizzle-orm';
import HTMLFlipBook from 'react-pageflip';
import BookCoverPage from '../_components/BookCoverPage';
import StoryPages from '../_components/storyPages';

function ViewStory({ params }: any) {
  const [story, setStory] = useState<any>(null);
  const flipBookRef = useRef<any>(null); // Create a reference for the HTMLFlipBook component

  useEffect(() => {
    getStory();
  }, [params.id]);

  const getStory = async () => {
    try {
      const result = await db
        .select()
        .from(storyData)
        .where(eq(storyData.storyId, params.id));

      if (result.length > 0) {
        setStory(result[0]); 
      }
    } catch (error) {
      console.error('Error fetching story:', error);
    }
  };

  const goToPreviousPage = () => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flipPrev(); 
    }
  };

  const goToNextPage = () => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flipNext(); 
    }
  };

  return (
    <div className="p-10 md:px-20 lg:px-40">
      {story ? (
        <div className="flex flex-col items-center">
          <h2 className='w-full max-w-5xl bg-primary rounded-lg p-5 py-4 text-white text-center font-bold mb-4'>
            {story.storySubject}
          </h2>
          <div className="-mt-2 ">
            {/* Use ref to access the FlipBook component */}
            {/* @ts-ignore */}
            <HTMLFlipBook ref={flipBookRef} width={450} height={450} showCover={true}>
              <div>
                <BookCoverPage imageUrl={story.coverImage} />
              </div>
              
              {/* Correctly render the chapters */}
              {story.output?.story?.chapters && story.output.story.chapters.length > 0 ? (
                story.output.story.chapters.map((chapter: any, index: number) => (
                  <div key={index} className='bg-white p-10 border'>
                    <StoryPages storyChapter={chapter} />
                  </div>
                ))
              ) : (
                <div className="bg-white p-10 border">
                  <p>No chapters available.</p>
                </div>
              )}
            </HTMLFlipBook>
          </div>

          {/* Pagination Controls */}
          <div className="mt-5 flex justify-between w-full max-w-5xl">
            <button
              onClick={goToPreviousPage}
              className="btn"
            >
              Back Page
            </button>
            <button
              onClick={goToNextPage}
              className="btn"
            >
              Next Page
            </button>
          </div>
        </div>
      ) : (
        <p>Loading story title...</p>
      )}
    </div>
  );
}

export default ViewStory;







// "use client";
// import { db } from "@/config/db";
// import { storyData } from "@/config/schema";
// import React, { useEffect, useRef, useState } from "react";
// import { eq } from "drizzle-orm";
// import HTMLFlipBook from "react-pageflip";
// import BookCoverPage from "../_components/BookCoverPage";
// import StoryPages from "../_components/storyPages";

// function ViewStory({ params }: any) {
//   const [story, setStory] = useState<any>(null);
//   const flipBookRef = useRef<any>(null); // Create a reference for the HTMLFlipBook component

//   useEffect(() => {
//     getStory();
//   }, [params.id]);

//   const getStory = async () => {
//     try {
//       const result = await db
//         .select()
//         .from(storyData)
//         .where(eq(storyData.storyId, params.id));

//       if (result.length > 0) {
//         setStory(result[0]); // Make sure the story data is correctly stored in state
//       }
//     } catch (error) {
//       console.error("Error fetching story:", error);
//     }
//   };

//   const goToPreviousPage = () => {
//     if (flipBookRef.current) {
//       flipBookRef.current.pageFlip().flipPrev(); // Navigate to the previous page
//     }
//   };

//   const goToNextPage = () => {
//     if (flipBookRef.current) {
//       flipBookRef.current.pageFlip().flipNext(); // Navigate to the next page
//     }
//   };

//   return (
//     <div className="p-10 md:px-20 lg:px-40">
//       {story ? (
//         <div className="flex flex-col items-center">
//           <h2 className="w-full max-w-5xl bg-primary rounded-lg p-5 py-4 text-white text-center font-bold mb-4">
//             {story.storySubject}
//           </h2>
//           <div className="-mt-2">
//             {/* Use ref to access the FlipBook component */}
//             {/* @ts-ignore */}
//             <HTMLFlipBook
//               ref={flipBookRef}
//               width={300}
//               height={400} // Adjust height as needed for better page display
//               showCover={true}
//             >
//               <div>
//                 <BookCoverPage imageUrl={story.coverImage} />
//               </div>

//               {/* Correctly render the chapters */}
//               {story.output?.story?.chapters &&
//               story.output.story.chapters.length > 0 ? (
//                 story.output.story.chapters.map(
//                   (chapter: any, index: number) => (
//                     <div
//                       key={index}
//                       className="bg-white p-5 border overflow-hidden" // Ensure content fits in the page
//                       style={{ maxHeight: "100%", textAlign: "justify" }} // Adjust content inside the page
//                     >
//                       <StoryPages storyChapter={chapter} />
//                     </div>
//                   )
//                 )
//               ) : (
//                 <div className="bg-white p-10 border">
//                   <p>No chapters available.</p>
//                 </div>
//               )}
//             </HTMLFlipBook>
//           </div>

//           {/* Pagination Controls */}
//           <div className="mt-5 flex justify-between w-full max-w-5xl">
//             <button onClick={goToPreviousPage} className="btn">
//               Back Page
//             </button>
//             <button onClick={goToNextPage} className="btn">
//               Next Page
//             </button>
//           </div>
//         </div>
//       ) : (
//         <p>Loading story title...</p>
//       )}
//     </div>
//   );
// }

// export default ViewStory;


