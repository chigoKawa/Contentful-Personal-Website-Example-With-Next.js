import React from 'react'
import { BLOCKS, INLINES, MARKS, NodeData } from '@contentful/rich-text-types'

import { componentMap } from '../richtext-embed-mappings'
import dynamic from 'next/dynamic'
import TopicDefinitionWrapper from '@/components/contentful/topic-definition/topic-definition-wrapper'
import InlinePersonWrapper from '@/components/contentful/person/inline-person-wrapper'

import ComponentResolver from '../../component-resolver'


const AllowedInlineEntriesLookup: any = {
  person: InlinePersonWrapper,
  topicDefinition: TopicDefinitionWrapper
}
type Props = {
  items: any
  node: any;
  props: any
}

const InlineEmbed = ({ node, items, props }: Props) => {
  const entry = node?.data?.target

  const entryId = entry?.sys?.id
  const contentType: string = entry?.sys?.contentType?.sys?.id
  const Component = AllowedInlineEntriesLookup[contentType];



  if (!Component) {
    return <span>!{contentType}</span>;
  }

  return <Component {...entry} {...props}  />
  return <Component key={entry?.sys?.id} isInline={true} entry={entry} />

  return (
   
      <ComponentResolver id={props?.id} key={entryId} field={entry} />
 
  )
}

const InlineEmbed2 = ({ node, items }: Props) => {
  const entry = node?.data?.target


  const contentType: string = entry?.sys?.contentType?.sys?.id
  const Component = AllowedInlineEntriesLookup[
    contentType as keyof typeof componentMap
  ] as React.ElementType

 
  if (contentType === undefined || entry.sys === undefined) {
    return <></>

    return <span>a line {contentType}</span>
  }
  return <ComponentResolver key={entry?.sys?.id} entry={entry} />
 
  return  <Component {...entry} />

  return <Component key={entry?.sys?.id} isInline={true} entry={entry} />

  return <ComponentResolver key={entry?.sys?.id} entry={entry} />
}

export default InlineEmbed
