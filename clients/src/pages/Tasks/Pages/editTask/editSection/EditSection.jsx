// import React, { useEffect, useState } from "react";
// // import { useGetTutorTasksQuery } from "@/features/tasks/tasksApiSlice";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { ArrowLeft, Eye, File, LayoutDashboard, Video } from "lucide-react";
// import { IconBadge } from "@/components/ui/icon-badge";
// import { Banner } from "@/components/ui/banner";
// import { SectionActions } from "./components/SectionActions";
// import { SectionTitleForm } from "./components/SectionTitleForm";
// import { SectionDescriptionForm } from "./components/SectionDescriptionForm";
// import { SectionAccessForm } from "./components/SectionAccessForm";
// import { AttachmentForm } from "./components/AttachmentForm";
// import { SectionDurationForm } from "./components/SectionDurationForm";
// import { useAxiosInstance } from "../../../../../../api/axios";

// const EditSection = () => {
// 	const { taskId, sectionId } = useParams();
// 	const [section, setSection] = useState(null);
// 	const navigate = useNavigate();
// 	const axiosInstance = useAxiosInstance()
// 	console.log(taskId, sectionId);
// 	// const { task, isLoading, isFetching, isSuccess, isError } =
// 	// 	useGetTutorTasksQuery("tutorTasks", {
// 	// 		selectFromResult: ({
// 	// 			data,
// 	// 			isLoading,
// 	// 			isSuccess,
// 	// 			isFetching,
// 	// 			isError,
// 	// 			error,
// 	// 		}) => ({
// 	// 			task: data?.entities[taskId],
// 	// 			isLoading,
// 	// 			isSuccess,
// 	// 			isFetching,
// 	// 			error,
// 	// 			isError,
// 	// 		}),
// 	// 	});

// 	// useEffect(() => {
// 	// 	if (task) {
// 	// 		const allSections = task.sections;
// 	// 		const section = allSections.find((section) => section._id === sectionId);
// 	// 		setSection(section);
// 	// 	}
// 	// }, [isSuccess, task]);

// 	useEffect(() => {
// 		const fetchSection = async () => {
// 			try {
// 				const response = await axiosInstance.get(`/tasks/${taskId}/section/${sectionId}`);
// 				setSection(response.data);
// 			} catch (error) {
// 				console.error('Error fetching section:', error);
// 				navigate("/client/my-tasks");
// 			}
// 		};

// 		fetchSection();
// 	}, [taskId, sectionId, navigate]);

// 	// if (isLoading) {
// 	// 	return <div>Loading...</div>;
// 	// }
// 	if (isError) {
// 		navigate("/client/my-tasks");
// 	}

// 	if (isSuccess && task && section) {
// 		const requiredFields = [
// 			section.title,
// 			section.description,
// 			section.videoUrl,
// 		];
// 		const totalFields = requiredFields.length;
// 		const completedFields = requiredFields.filter(Boolean).length;
// 		const completionText = `(${completedFields}/${totalFields})`;
// 		const isComplete = requiredFields.every(Boolean);
// 		return (
// 			<>
// 				{!section.isPublished && (
// 					<Banner
// 						variant="warning"
// 						label="This task is unposted. It will not be visible in the task"
// 					/>
// 				)}
// 				<div className="p-6">
// 					<div className="flex items-center justify-between">
// 						<div className="w-full">
// 							<Link
// 								to={`/client/edit-task/${taskId}`}
// 								className="flex items-center text-sm hover:opacity-75 transition mb-6"
// 							>
// 								<ArrowLeft className="h-4 w-4 mr-2" />
// 								Back to task setup
// 							</Link>
// 							<div className="flex items-center justify-between w-full">
// 								<div className="flex flex-col gap-y-2">
// 									<h1 className="text-2xl font-medium">Section Creation</h1>
// 									<span className="text-sm text-slate-700">
// 										Complete all fields {completionText}
// 									</span>
// 								</div>
// 								<SectionActions
// 									disabled={!isComplete}
// 									taskId={taskId}
// 									sectionId={sectionId}
// 									isPublished={section.isPublished}
// 								/>
// 							</div>
// 						</div>
// 					</div>
// 					<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
// 						<div className="space-y-4">
// 							<div>
// 								<div className="flex items-center gap-x-2">
// 									<IconBadge icon={LayoutDashboard} />
// 									<h2 className="text-xl">Customize your section</h2>
// 								</div>
// 								<SectionTitleForm
// 									initialData={section}
// 									taskId={taskId}
// 									sectionId={sectionId}
// 								/>
// 								<SectionDescriptionForm
// 									initialData={section}
// 									taskId={taskId}
// 									sectionId={sectionId}
// 								/>
// 							</div>
// 							<div>
// 								<div className="flex items-center gap-x-2">
// 									<IconBadge icon={Eye} />
// 									<h2 className="text-xl">Access Settings</h2>
// 								</div>
// 								<SectionAccessForm
// 									taskPrice={task.price}
// 									initialData={section}
// 									taskId={taskId}
// 									sectionId={sectionId}
// 								/>
// 							</div>
// 						</div>

// 						<div className="space-y-4">
// 							<div>
// 								<div className="flex items-center gap-x-2">
// 									<IconBadge icon={Video} />
// 									<h2 className="text-xl">Add a video</h2>
// 								</div>
// 								<SectionVideoForm
// 									initialData={section}
// 									taskId={taskId}
// 									sectionId={sectionId}
// 								/>
// 							</div>

// 							<div>
// 								<div className="flex items-center gap-x-2">
// 									<IconBadge icon={File} />
// 									<h2 className="text-xl">Resources & Attachments</h2>
// 								</div>
// 								<AttachmentForm
// 									initialData={section}
// 									taskId={taskId}
// 									sectionId={sectionId}
// 								/>
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 			</>
// 		);
// 	}
// };

// export default EditSection;

import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CircleDollarSign,
  File,
  LayoutDashboard,
} from "lucide-react";
import { CalendarIcon } from "@chakra-ui/icons";
import { IconBadge } from "@/components/ui/icon-badge";
import { Banner } from "@/components/ui/banner";
import { SectionActions } from "./components/SectionActions";
import { SectionTitleForm } from "./components/SectionTitleForm";
import { SectionDescriptionForm } from "./components/SectionDescriptionForm";
import { SectionPriceForm } from "./components/SectionPriceForm";
import { AttachmentForm } from "./components/AttachmentForm";
import { SectionDurationForm } from "./components/SectionDurationForm";
import { useAxiosInstance } from "../../../../../../api/axios";
import { Text, Flex } from "@chakra-ui/react";
import Loading from "@/components/ui/Loading";

const EditSection = () => {
  const { taskId, sectionId } = useParams();
  const [task, setTask] = useState();
  const [section, setSection] = useState(null);
  const [refetchSection, setRefetchSection] = useState(0)
  const navigate = useNavigate();
  const axiosInstance = useAxiosInstance();
  console.log(taskId, sectionId);

  useEffect(() => {
    const fetchSection = async () => {
      try {
        const response = await axiosInstance.get(`/tasks/${taskId}`);
        const task = response.data;
        if (task) {
          const allSections = task.sections;
          const section = allSections.find(
            (section) => section._id === sectionId
          );
          setSection(section);
        }
        setTask(task);
      } catch (error) {
        console.error("Error fetching section:", error);
      }
    };
    fetchSection();
  }, [taskId, refetchSection]);

  if (!section) {
    return (
      <Flex
        justifyContent={"center"}
        flexDir={"column"}
        align={"center"}
        h={"100vh"}
      >
        <Loading />
        <Text as={"h1"}>Setting up section</Text>
      </Flex>
    );
  }

  const requiredFields = [
    section.title,
    section.description,
    section.durationDays,
    // section.price,
  ];
  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${totalFields})`;
  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {!section.isPublished && (
        <Banner
          variant="warning"
          label="This task is unposted. It will not be visible in the task"
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Link
              to={`/clients/edit-task/${taskId}`}
              className="flex items-center text-sm hover:opacity-75 transition mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to task setup
            </Link>
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium">Section Creation</h1>
                <span className="text-sm text-slate-700">
                  Complete all fields {completionText}
                </span>
              </div>
              <SectionActions
                disabled={!isComplete}
                taskId={taskId}
                sectionId={sectionId}
                isPublished={section.isPublished}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={LayoutDashboard} />
                <h2 className="text-xl">Customize your section</h2>
              </div>
              <SectionTitleForm
                initialData={section}
                taskId={taskId}
                setRefetchSection={setRefetchSection}
                sectionId={sectionId}
              />
              <SectionDescriptionForm
                initialData={section}
                setRefetchSection={setRefetchSection}
                taskId={taskId}
                sectionId={sectionId}
              />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={CircleDollarSign} />
                <h2 className="text-xl">Sell your task</h2>
              </div>
              <SectionPriceForm
                taskPrice={task.price}
                initialData={section}
                taskId={taskId}
                setRefetchSection={setRefetchSection}
                sectionId={sectionId}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={CalendarIcon} />
                <h2 className="text-xl">Add a duration</h2>
              </div>
              <SectionDurationForm
                initialData={section}
                taskId={taskId}
                setRefetchSection={setRefetchSection}
                sectionId={sectionId}
              />
            </div>

            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={File} />
                <h2 className="text-xl">Resources & Attachments</h2>
              </div>
              <AttachmentForm
                initialData={section}
                taskId={taskId}
                setRefetchSection={setRefetchSection}
                sectionId={sectionId}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditSection;
