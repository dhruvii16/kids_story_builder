import React from 'react'
import {Textarea} from "@nextui-org/input";

function StorySubjectInput({userSelection}:any) {
  return (
    <div>
      <label className='text-primary font-bold text-2xl'>Enter Subject Of the Story</label>
      <Textarea 
      placeholder='write subject of the story that you want to generate...' 
      size='lg' 
      classNames={{
        input:"resize-y min-h-[230px] text-2xl p-5"
      }}
      className='mt-3 max-w-lg'
      onChange={(e)=>userSelection({
        fieldValue:e.target.value,
        fieldName:'storySubject'
      })}
      />
    </div>
  )
}

export default StorySubjectInput