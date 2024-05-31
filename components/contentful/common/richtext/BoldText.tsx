import React from 'react'

type Props = {
    children: any
}

const BoldText = ({children}: Props) => {
  return (
    <span className="font-bold">{children}</span>
  )
}

export default BoldText