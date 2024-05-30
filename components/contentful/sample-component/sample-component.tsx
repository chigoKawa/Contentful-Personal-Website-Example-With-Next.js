import React from 'react'

const SampleComponent = (entry: any) => {
  return (
    <div className='text-red-400'>
      component not found : {entry?.sys?.contentType?.sys?.id}
    </div>
  )
}

export default SampleComponent
