import TopicService from "../../services/topic.service";
import Topic from "./Topic";
import { useEffect, useState } from "react";

type Props = {
  topics: any;
};

const TopicContainer = ({ topics }: Props) => {
  return (
    <div
      className="flex flex-col overscroll-contain overflow-scroll overflow-x-hidden"
      style={{ maxHeight: "100vh" }}
    >
      {topics?.map((topic: any) => (
        <Topic key={topic.id} title={topic.name} slug={topic.slug} />
      ))}
    </div>
  );
};

export default TopicContainer;
