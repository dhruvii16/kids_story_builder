"use client"
import React, { useState } from 'react'
import Image from "next/image";
import { OptionField } from './StoryType';

function AgeGroup({userSelection}:any) {
    
    const OptionList=[
        {
            label:'0-2 Years',
            imageUrl:'/age_0-2.jpeg',
            isFree:true
        },
        {
            label:'3-5 Years',
            imageUrl:'/age_3-5.jpeg',
            isFree:true
        },
        {
            label:'5-8 Years',
            imageUrl:'/age_5-8.jpeg',
            isFree:true
        },
    ]
    
    const [selectedOption,setSelectedOption]=useState<string>();

    const onUserSelect=(item:OptionField)=>{
        setSelectedOption(item.label)
        userSelection({
            fieldValue:item?.label,
            fieldName:'ageGroup'
        })
    }

  return (
    <div>
        <label className='text-primary font-bold text-2xl'>Age Group</label>
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

export default AgeGroup