"use client"
import React, { useState } from 'react'
import Image from "next/image";

export interface OptionField{
    label:string,
    imageUrl:string,
    isFree:boolean
}

function StoryType({userSelection}:any) {
    const OptionList=[
        {
            label:'Story Book',
            imageUrl:'/story.jpeg',
            isFree:true
        },
        {
            label:'Educational',
            imageUrl:'/educational.jpeg',
            isFree:true
        },
        {
            label:'Bed Story',
            imageUrl:'/bedtime-stories.jpg',
            isFree:true
        },
    ]
    
    const [selectedOption,setSelectedOption]=useState<string>();

    const onUserSelect=(item:OptionField)=>{
        setSelectedOption(item.label)
        userSelection({
            fieldValue:item?.label,
            fieldName:'storyType'
        })
    }

  return (
    <div>
        <label className='text-primary font-bold text-2xl'>Story Type</label>
        <div className='grid grid-cols-3 gap-4 mt-3'>
            
            
            {OptionList.map((item,index)=>(
                <div className={
                    `relative p-1 cursor-pointer
                    ${selectedOption==item.label?'border-2 rounded-3xl border-primary':'' }
                    `}
                onClick={()=>onUserSelect(item)}>
                    <h2 className='absolute bottom-5 text-black text-center w-full text-1xl text-bold'>{item.label}</h2>
                    <Image src={item.imageUrl} alt={item.label} width={500} height={500} className='object-cover h-[260px] rounded-3xl'/>
                </div>
            ))}

        </div>
    </div>
  )
}

export default StoryType