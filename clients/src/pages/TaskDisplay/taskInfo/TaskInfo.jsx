import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Avatar, Breadcrumbs } from "@material-tailwind/react";
import parse from "html-react-parser";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { formatDistanceToNow } from "date-fns";
import { useAxiosInstance } from "../../../../api/axios";
import SectionCard from "./SectionCard";
import { getTimestamp } from "@/lib/utils";
import useAuth from "@/hooks/useAuth";

const TaskInfo = () => {
  const { taskId } = useParams();
  const axiosInstance = useAxiosInstance();
  const [isLoading, setIsLoading] = useState(false);
  const [task, setTask] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const {username} = useAuth()

  useEffect(() => {
    handleGetTaskInfo();
  }, []);

  const handleGetTaskInfo = async () => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.get(`tasks/${taskId}`);
      const data = await res.data;
      setTask(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <p>Loading Client Task</p>;
  }

  if (!task) {
    return <p>Task not found</p>;
  }
  console.log(task)

  return (
    <>
      <div className="px-6 pt-6">
        <Breadcrumbs separator=">">
          <Link to="/dashboard" className="opacity-60">
            Dashboard
          </Link>
          <Link to="/projects" className="opacity-60">
            All Tasks
          </Link>
          <Link href="#">Task Info</Link>
        </Breadcrumbs>
      </div>
      <div className="flex overflow-hidden">
        <div className="w-full xl:w-3/5 h-full overflow-y-auto p-6 pr-8 z-9">
          <div className="h-full">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {task.title}
            </h2>
            <div className="space-y-2 mb-8">
              <div className="flex items-center gap-2">
                <p className="text-md font-bold ">{username}</p>
              </div>
              <p className="text-md text-gray-600">
                <strong>Category: </strong>
                {task.categoryId}
              </p>
              <p className="text-md text-gray-600">
                <strong>Posted: </strong>
                {getTimestamp(new Date(task.createdAt), {
                  addSuffix: true,
                })}
              </p>
            </div>
            <hr className="border-gray-400 mb-8" />
            <div>
              <Tabs id="custom-animation" value={activeTab}>
                <TabsHeader>
                  <Tab
                    value="overview"
                    onClick={() => setActiveTab("overview")}
                    className={
                      activeTab === "overview"
                        ? "text-gray-900"
                        : "text-gray-600"
                    }
                  >
                    Overview
                  </Tab>
                  <Tab
                    value="sections"
                    onClick={() => setActiveTab("sections")}
                    className={
                      activeTab === "sections"
                        ? "text-gray-900"
                        : "text-gray-600"
                    }
                  >
                    Sections
                  </Tab>
                </TabsHeader>
                <TabsBody>
                  <TabPanel value="overview">
                    <div className="no-tailwindcss-base">
                      {parse(task.description)}
                    </div>
                  </TabPanel>
                  <TabPanel value="sections">
                    <div className="flex gap-2 flex-col">
                      <h4>
                        These sections have been published within this task.
                        Only those marked as 'free' are accessible without
                        purchase. To gain access to all sections, purchase the
                        task.
                      </h4>
                      {task.sections.map((section) => (
                        <SectionCard key={section._id} section={section} />
                      ))}
                    </div>
                  </TabPanel>
                
                </TabsBody>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskInfo;
