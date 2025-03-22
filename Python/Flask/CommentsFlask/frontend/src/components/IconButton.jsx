import React from 'react'

const IconButton = ({callback, children}) => {
  return (
    <button onClick={callback} className='cursor-pointer p-2 rounded-lg border-2 border-neutral-900 bg-neutral-800 hover:bg-neutral-700'>
        {children}
    </button>
  )
}

export default IconButton