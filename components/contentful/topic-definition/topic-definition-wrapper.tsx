
import { ITopicDefinition } from "@/lib/contentful/interfaces/topics";
import { Tooltip } from "@nextui-org/react";



const TopicDefinitionBody = ({ content }: any) => {
  return <div className="w-80 h-full p-2">{content}</div>;
};

const TopicDefinitionWrapper = (entry: ITopicDefinition) => {
  const body = entry?.fields?.definition;
  const topic = entry?.fields?.topic;

  return (
    <span>
      <Tooltip placement="top" showArrow={true} content={<TopicDefinitionBody content={body} />}>
        <span className="font-bold underline">{topic}</span>
      </Tooltip>
    </span>
  );
};

export default TopicDefinitionWrapper;
