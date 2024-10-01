"use client"; // Mark the component as a Client Component

import React, { useState, useEffect } from 'react';
import StoryType from './_components/StoryType';
import AgeGroup from './_components/AgeGroup';
import ImageStyle from './_components/ImageStyle';
import { Button } from '@nextui-org/button';
import { chatSession } from '@/config/GeminiAi';
import StorySubjectInput from './_components/StorySubjectInput';
import { db } from '@/config/db';
import { storyData } from '@/config/schema';
import CustomLoader from './_components/CustomLoader';
import { useRouter } from 'next/navigation'; // Use next/navigation for router
import axios from 'axios';
//@ts-ignore
import uuid4 from "uuid4";

const CREATE_STORY_PROMPT = process.env.NEXT_PUBLIC_CREATE_STORY_PROMPT;

export interface fieldData {
  fieldName: string;
  fieldValue: string;
}

export interface formDataType {
  storySubject: string;
  storyType: string;
  imageStyle: string;
  ageGroup: string;
}

function CreateStory() {
  const [formData, setFormData] = useState<formDataType>();
  const [loading, setLoading] = useState(false);
  const [storyId, setStoryId] = useState<string | null>(null); // To store story ID
  const router = useRouter(); // Initialize router

  // Function to handle user selection
  const onHandleUserSelection = (data: fieldData) => {
    setFormData((prev: any) => ({
      ...prev,
      [data.fieldName]: data.fieldValue,
    }));
    console.log(formData);
  };

  // Function to generate the story
  const GenerateStory = async () => {
    setLoading(true);
    const FINAL_PROMPT = CREATE_STORY_PROMPT
      ?.replace('{ageGroup}', formData?.ageGroup ?? '')
      .replace('{storyType}', formData?.storyType ?? '')
      .replace('{storySubject}', formData?.storySubject ?? '')
      .replace('{imageStyle}', formData?.imageStyle ?? '');

    try {
      // Generate AI Story
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const responseText = await result?.response.text();
      console.log('Response Text:', responseText);

      let story;
      try {
        story = JSON.parse(responseText);
      } catch (error) {
        console.error('Error parsing JSON:', error);
        return;
      }

      // Generate image
      const imageResp = await axios.post('/api/generate-image', {
        prompt:
          'Add text with title: ' +
          story?.cover_image?.title +
          " Based on title give image for kids story, " +
          story?.cover_image?.description?.style,
      });

      const AiImageUrl = imageResp?.data?.imageUrl;

      const imageResult = await axios.post('/api/save-image', {
        url: AiImageUrl,
      });

      const FirebaseStorageImageUrl = imageResult.data.imageUrl;
      const resp: any = await SaveInDB(responseText, FirebaseStorageImageUrl);

      if (resp && resp[0]?.storyId) {
        // Save the storyId to the state for redirection after generation
        setStoryId(resp[0].storyId);
      }

    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  // Function to save the story in the database
  const SaveInDB = async (output: string, imageUrl: string) => {
    const recordId = uuid4();
    setLoading(true);
    try {
      const result = await db.insert(storyData).values({
        storyId: recordId,
        ageGroup: formData?.ageGroup,
        imageStyle: formData?.imageStyle,
        storySubject: formData?.storySubject,
        storyType: formData?.storyType,
        output: JSON.parse(output),
        coverImage: imageUrl,
      }).returning({ storyId: storyData?.storyId });
      setLoading(false);
      return result;
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  //Use useEffect to handle navigation once storyId is available
  useEffect(() => {
    if (storyId) {
      router.push(`/view-story/${storyId}`);
    }
  }, [storyId, router]);

  return (
    <div className="p-6 md:p-10 lg:p-20">
      <h2 className="font-bold text-primary text-center text-3xl md:text-5xl lg:text-6xl">Create Your Story Here!</h2>
      <p className="text-lg md:text-xl font-mono text-primary text-center mb-6">
        Ignite Your Imagination With AI: Unleash Stories Like Never Before! Captivate Stories With AI-powered Creativity.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mt-5">
        {/* story subject */}
        <StorySubjectInput userSelection={onHandleUserSelection} />
        {/* story type */}
        <StoryType userSelection={onHandleUserSelection} />
        {/* age group */}
        <AgeGroup userSelection={onHandleUserSelection} />
        {/* image style */}
        <ImageStyle userSelection={onHandleUserSelection} />
      </div>

      <div className="flex justify-end mt-4">
        <Button 
          className="bg-blue-600 text-white font-bold mt-8"
          disabled={loading}
          onClick={GenerateStory}
        >
          Generate Story
        </Button>
      </div>
      <CustomLoader isLoading={loading} />
    </div>
  );
}

export default CreateStory;




// "use client"; // Mark the component as a Client Component

// import React, { useState, useEffect } from 'react';
// import StoryType from './_components/StoryType';
// import AgeGroup from './_components/AgeGroup';
// import ImageStyle from './_components/ImageStyle';
// import { Button } from '@nextui-org/button';
// import { chatSession } from '@/config/GeminiAi';
// import StorySubjectInput from './_components/StorySubjectInput';
// import { db } from '@/config/db';
// import { storyData } from '@/config/schema';
// import CustomLoader from './_components/CustomLoader';
// import { useRouter } from 'next/navigation'; // Use next/navigation for router
// import axios from 'axios';
// //@ts-ignore
// import uuid4 from "uuid4";

// const CREATE_STORY_PROMPT = process.env.NEXT_PUBLIC_CREATE_STORY_PROMPT;

// export interface fieldData {
//   fieldName: string;
//   fieldValue: string;
// }

// export interface formDataType {
//   storySubject: string;
//   storyType: string;
//   imageStyle: string;
//   ageGroup: string;
// }

// function CreateStory() {
//   const [formData, setFormData] = useState<formDataType>();
//   const [loading, setLoading] = useState(false);
//   const [storyId, setStoryId] = useState<string | null>(null); // To store story ID
//   const router = useRouter(); // Initialize router

//   // Function to handle user selection
//   const onHandleUserSelection = (data: fieldData) => {
//     setFormData((prev: any) => ({
//       ...prev,
//       [data.fieldName]: data.fieldValue,
//     }));
//     console.log(formData);
//   };

//   // Function to generate the story
//   const GenerateStory = async () => {
//     setLoading(true);
//     const FINAL_PROMPT = CREATE_STORY_PROMPT
//       ?.replace('{ageGroup}', formData?.ageGroup ?? '')
//       .replace('{storyType}', formData?.storyType ?? '')
//       .replace('{storySubject}', formData?.storySubject ?? '')
//       .replace('{imageStyle}', formData?.imageStyle ?? '');

//     try {
//       // Generate AI Story
//       const result = await chatSession.sendMessage(FINAL_PROMPT);
//       const responseText = await result?.response.text();
//       console.log('Response Text:', responseText);

//       let story;
//       try {
//         story = JSON.parse(responseText);
//       } catch (error) {
//         console.error('Error parsing JSON:', error);
//         return;
//       }

//       // Generate image
//       const imageResp = await axios.post('/api/generate-image', {
//         prompt:
//           'Add text with title: ' +
//           story?.cover_image?.title +
//           " Based on title give image for kids story, " +
//           story?.cover_image?.description?.style,
//       });

//       const AiImageUrl = imageResp?.data?.imageUrl;

//       const imageResult = await axios.post('/api/save-image', {
//         url: AiImageUrl,
//       });

//       const FirebaseStorageImageUrl = imageResult.data.imageUrl;
//       const resp: any = await SaveInDB(responseText, FirebaseStorageImageUrl);

//       if (resp && resp[0]?.storyId) {
//         // Save the storyId to the state for redirection after generation
//         setStoryId(resp[0].storyId);
//       }

//     } catch (e) {
//       console.log(e);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Function to save the story in the database
//   const SaveInDB = async (output: string, imageUrl: string) => {
//     const recordId = uuid4();
//     setLoading(true);
//     try {
//       const result = await db.insert(storyData).values({
//         storyId: recordId,
//         ageGroup: formData?.ageGroup,
//         imageStyle: formData?.imageStyle,
//         storySubject: formData?.storySubject,
//         storyType: formData?.storyType,
//         output: JSON.parse(output),
//         coverImage: imageUrl,
//       }).returning({ storyId: storyData?.storyId });
//       setLoading(false);
//       return result;
//     } catch (e) {
//       console.log(e);
//       setLoading(false);
//     }
//   };

//   // Use useEffect to handle navigation once storyId is available
//   useEffect(() => {
//     if (storyId) {
//       router.push(`/view-story/${storyId}`);
//     }
//   }, [storyId, router]);

//   return (
//     <div className="p-10 md:px-20 lg:px-40">
//       <h2 className="font-bold text-primary text-center text-[60px]">Create Your Story Here!</h2>
//       <p className="text-1xl font-mono text-primary text-center mb-10">
//         Ignite Your Imagination With AI: Unleash Stories Like Never Before! Captivate Stories With AI-powered Creativity.
//       </p>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-5">
//         {/* story subject */}
//         <StorySubjectInput userSelection={onHandleUserSelection} />
//         {/* story type */}
//         <StoryType userSelection={onHandleUserSelection} />
//         {/* age group */}
//         <AgeGroup userSelection={onHandleUserSelection} />
//         {/* image style */}
//         <ImageStyle userSelection={onHandleUserSelection} />
//       </div>

//       <div className="flex justify-end mt-2">
//         <Button className="bg-blue-600 text-white font-bold mt-8"
//           disabled={loading}
//           onClick={GenerateStory}>Generate Story</Button>
//       </div>
//       <CustomLoader isLoading={loading} />
//     </div>
//   );
// }

// export default CreateStory;


