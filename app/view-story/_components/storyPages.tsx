import React from 'react';

function StoryPages({ storyChapter }: any) {
  return (
    <div>
      {/* Chapter Title */}
      <h2 className='text-2xl font-bold text-primary'>
        {storyChapter.title || 'Untitled Chapter'}
      </h2>

      {/* Chapter Description */}
      <p className='text-xl p-10 mt-3 rounded-lg bg-slate-100'>
        {storyChapter.description || 'No description available.'}
      </p>

      {/* Chapter Image */}
      {/* {storyChapter.image ? (
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-primary">Image Description</h3>
          <p className="text-md p-5 mt-2 rounded-lg bg-slate-50">
            {storyChapter.image.description || 'No image description available.'}
          </p>
        </div>
      ) : (
        <p>No image available for this chapter.</p>
      )} */}
    </div>
  );
}

export default StoryPages;
