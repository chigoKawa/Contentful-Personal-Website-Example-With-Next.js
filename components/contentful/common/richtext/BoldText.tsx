import React from 'react'

type Props = {
    children: any
}

const BoldText = ({children}: Props) => {
  return (
    <span className=" font-semi ">{children}</span>
  )
}

export default BoldText