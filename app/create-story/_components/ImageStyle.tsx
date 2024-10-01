"use cliet"
import React, { useState } from 'react'
import Image from "next/image";
import { OptionField } from './StoryType';

function ImageStyle({userSelection}:any) {
    
    const OptionList=[
        {
            label:'3D Cartoon',
            imageUrl:'/3D.jpeg',
            isFree:true
        },
        {
            label:'Paper Cut',
            imageUrl:'/papercut.jpeg',
            isFree:true
        },
        {
            label:'Water Color',
            imageUrl:'/watercolor.jpeg',
            isFree:true
        },
        {
            label:'Pixel Style',
            imageUrl:'/pixel.jpeg',
            isFree:true
        },
    ]
    
    const [selectedOption,setSelectedOption]=useState<string>();

    const onUserSelect=(item:OptionField)=>{
        setSelectedOption(item.label)
        userSelection({
            fieldValue:item?.label,
            fieldName:'imageStyle'
        })
    }

  return (
    <div>
        <label className='text-primary font-bold text-2xl'>Image Style</label>
        <div className='grid grid-cols-3 gap-4 mt-3'>
            
            
            {OptionList.map((item,index)=>(
                <div className={
                    `relative p-1 cursor-pointer
                    ${selectedOption==item.label?'border-2 rounded-3xl border-primary':'' }
                    `}
                onClick={()=>onUserSelect(item)}>
                    <h2 className='absolute bottom-5 text-black text-center w-full text-1xl '>{item.label}</h2>
                    <Image src={item.imageUrl} alt={item.label} width={500} height={500} className='object-cover h-[120px] rounded-3xl'/>
                </div>
            ))}


        </div>
    </div>
  )
}

export default ImageStyle