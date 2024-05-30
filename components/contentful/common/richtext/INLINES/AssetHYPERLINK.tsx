import React from 'react'
import Link from 'next/link'

type Props = {
  children: any
  node: any
}
const AssetHYPERLINK = ({ node, children }: Props) => {
  let href = `https:${node?.data?.target?.fields?.file?.url}`
  return (
    <Link target='_blank' href={href}>
      <span className='underline text-blue-500'>
        {children.map((line: any, lx: number) => {
          if (!line) {
            return <br key={lx} />
          } else {
            return line
          }
        })}
      </span>
    </Link>
  )
}

export default AssetHYPERLINK
