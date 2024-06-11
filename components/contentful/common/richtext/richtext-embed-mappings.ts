import dynamic from 'next/dynamic';
import InlinePersonWrapper from '../../person/inline-person-wrapper';
import TopicDefinitionWrapper from '../../topic-definition/topic-definition-wrapper';



export const componentMap : object = {
    topicDefinition :TopicDefinitionWrapper,
    person :InlinePersonWrapper,    
    
}