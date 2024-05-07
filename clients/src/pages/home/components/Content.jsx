import React from "react";
import ContentCard from "./ContentCard";

const Content = () => {
  return (
    <div className="py-20 px-20">
      <div className="text-center  gap-2 px-10">
        <h2 className="text-3xl text-[#BE5272]">
          SMART TOOLS FOR SMART BUSINESSES
        </h2>
        <h2 className="text-5xl font-bold text-center">
          Boost every part of your business - from proposal to payment
        </h2>
      </div>

      <div className="flex justify-between items-center py-8 px-12">
        <div className="px-8 flex flex-col gap-1">
          <h1 className="text-5xl font-bold">On-point proposals</h1>
          <p className="text-xl text-gray-500">
            Use smart proposals that also seamlessly generate contracts, collect
            deposits, and so much more.
          </p>
        </div>
        <img src="/proposalImg.png" alt="proposal" />
      </div>
      <div className="flex justify-between items-center py-8 px-12">
        <img src="/timeImg.png" alt="Automated Timestamp" />
        <div className="px-8 flex flex-col gap-1">
          <h1 className="text-5xl font-bold">
            Automated time & task management
          </h1>
          <p className="text-xl text-gray-500">
            Stay organized with time tracking tools that offer “set and forget”
            ease-of-use and automated task prioritization.
          </p>
        </div>
      </div>
      <div className="flex justify-between items-center py-8 px-12">
        <div className="px-8 flex flex-col gap-1">
          <h1 className="text-5xl font-bold">
            Automated time & task management
          </h1>
          <p className="text-xl text-gray-500">
            Stay organized with time tracking tools that offer “set and forget”
            ease-of-use and automated task prioritization.
          </p>
        </div>
        <img src="/proposalImg.png" alt="proposal" />
      </div>
    </div>
  );
};

export default Content;
