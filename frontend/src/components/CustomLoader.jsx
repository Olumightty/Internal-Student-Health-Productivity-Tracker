import { Loader2 } from 'lucide-react'
import React from 'react'

const CustomLoader = () => {
  return (
    <div className='flex items-center justify-center w-full h-screen'>
        <Loader2 size={50} className='animate-spin'/>
    </div>
  )
}

export default CustomLoader