import { Star } from 'lucide-react';
import React from 'react'

const StarRating: React.FC<{rating:number}> = ({rating}) => {
    // console.log(rating);
    
    const totalRating:number = 5

  return (
    <div className='flex flex-row m-1'>
        {Array.from({length:totalRating},(_,index)=>(
            <span key={index} className="pr-1"><Star color="#D68240" fill={index<rating? "#D68240" : "#121A1D"} size={20}/></span>
        ))}
    </div>
  )
}

export default StarRating
