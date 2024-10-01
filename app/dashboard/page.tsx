"use client";
import React, { useEffect, useState } from 'react';
import { db } from '@/config/db'; // Assuming you have db configured
import { storyData } from '@/config/schema'; // Assuming your schema is defined here
import Link from 'next/link'; // For linking to the story details page
import { Button } from '@nextui-org/button';

function Dashboard() {
  const [stories, setStories] = useState<any[]>([]);

  // Fetch stories from the database
  useEffect(() => {
    const fetchStories = async () => {
      try {
        // Fetch all stories from the database
        const result = await db.select().from(storyData);
        setStories(result);
      } catch (error) {
        console.error('Error fetching stories:', error);
      }
    };

    fetchStories();
  }, []);

  return (
    <div className="w-full bg-white p-7 ">
      <div className="max-w-5xl mx-auto bg-primary text-white rounded-lg p-7 py-3">
        <h2 className="font-bold text-3xl mb-6 text-center flex justify-between">My Stories
          <Link href={'/buy-credits'}>
          <Button className='font-bold'>Buy More Credits</Button>
          </Link>
        </h2>

        {/* Grid layout for stories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {stories.length > 0 ? (
            stories.map((story, index) => (
              <div key={index} className="bg-white text-black rounded-lg shadow-lg p-4">
                {/* Story Cover Image */}
                <img
                  src={story.coverImage || '/default-image.png'} // Fallback to a default image if none is provided
                  alt={story.storySubject || 'Story Image'}
                  className="w-full h-48 object-cover rounded-lg"
                />

                {/* Story Subject from the database */}
                <h3 className="mt-4 text-lg font-semibold text-center">
                  {story.storySubject || 'Untitled Story'}
                </h3>

                {/* Story Button */}
                <div className="text-center mt-4">
                  <Link href={`/view-story/${story.storyId}`}>
                    <button className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded">
                      Read Story
                    </button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full">No stories available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
