import React from 'react'
import { BLOCKS, INLINES, MARKS, NodeData } from '@contentful/rich-text-types'

import { componentMap } from '../richtext-embed-mappings'
import dynamic from 'next/dynamic'

import ComponentResolver from '../../component-resolver'

const AllowedInlineEntriesLookup: any = {
  // person: dynamic(() => import("@/cms-components/Person/Person")),
}
type Props = {
  items: any
  node: any
}

const InlineEmbed = ({ node, items }: Props) => {
  const entry = node?.data?.target

  const contentType: string = entry?.sys?.contentType?.sys?.id
  const Component = AllowedInlineEntriesLookup[
    contentType as keyof typeof componentMap
  ] as React.ElementType

  if (contentType === undefined || entry.sys === undefined) {
    return <></>
  }

  return <Component key={entry?.sys?.id} isInline={true} entry={entry} />

  return <ComponentResolver key={entry?.sys?.id} entry={entry} />
}

export default InlineEmbed
