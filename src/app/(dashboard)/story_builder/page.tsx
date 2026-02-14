import StoryBuilderTabs from "@/components/story_builder/StoryBuilderTabs";
import dynamic from "next/dynamic";

const StoryBuilder = () => {
  return (
    <div className="max-w-[800px] mx-auto p-5">
      <StoryBuilderTabs />
    </div>
  );
};

export default StoryBuilder;
