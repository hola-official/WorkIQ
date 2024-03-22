import * as z from "zod";
// import axios from "axios";
import { Pencil, PlusCircle, ImageIcon } from "lucide-react";
import { useState } from "react";
import { Box, Button, Text, Flex, Input, Alert, AlertIcon, HStack, Tag, TagLabel, TagCloseButton } from "@chakra-ui/react";

// import {
// 	getStorage,
// 	ref,
// 	uploadBytesResumable,
// 	deleteObject,
// 	getDownloadURL,
// } from "firebase/storage";
import { Progress } from "@material-tailwind/react";
import { useAxiosInstance } from "../../../../../../api/axios";
import useShowToast from "@/hooks/useShowToast";
// import { useUpdateTaskMutation } from "@/features/tasks/tasksApiSlice";

export const SkillForm = ({ initialData, taskId }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [img, setImg] = useState("");
	const [imgPerc, setImgPerc] = useState(0);
	const [isUploading, setIsUploading] = useState(false);
	const [uploadTask, setUploadTask] = useState(null);
	const [skills, setSkills] = useState(initialData.skills || []);
	const [skillInputValue, setSkillInputValue] = useState("");
	const [skillError, setSkillError] = useState("");
	const axiosInstance = useAxiosInstance()
	const showToast = useShowToast()

	// const [updateTask, { isLoading, isError, isSuccess, error }] =
	// useUpdateTaskMutation();
	const toggleEdit = () => setIsEditing((current) => !current);

	// const uploadImage = async (file, inputs) => {
	// 	const storage = getStorage();
	// 	const fileName = file.name;
	// 	const folderPath = `Tasks/${taskId}/TaskImage`;

	// 	// Check if there is an existing image URL
	// 	const existingImageUrl = initialData.taskImage;

	// 	// If an existing image URL is found, delete the corresponding file from Firebase Storage
	// 	if (existingImageUrl) {
	// 		const existingImageRef = ref(storage, existingImageUrl);
	// 		try {
	// 			await deleteObject(existingImageRef);
	// 			console.log("Previous image deleted successfully");
	// 		} catch (error) {
	// 			console.error("Error deleting previous image:", error);
	// 		}
	// 	}

	// 	// Concatenate the folder path with the file name to create storage reference
	// 	const storageRef = ref(storage, `${folderPath}/${fileName}`);
	// 	const uploadTask = uploadBytesResumable(storageRef, file);
	// 	setUploadTask(uploadTask);

	// 	return new Promise((resolve, reject) => {
	// 		uploadTask.on(
	// 			"state_changed",
	// 			(snapshot) => {
	// 				const progress =
	// 					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
	// 				setImgPerc(Math.round(progress));
	// 				switch (snapshot.state) {
	// 					case "paused":
	// 						console.log("Upload is paused");
	// 						break;
	// 					case "running":
	// 						console.log("Upload is running");
	// 						break;
	// 					default:
	// 						break;
	// 				}
	// 			},
	// 			(error) => {
	// 				reject(error); // Reject promise if there's an upload error
	// 			},
	// 			async () => {
	// 				try {
	// 					const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
	// 					// Update inputs state with the new image URL
	// 					// setInputs((prev) => ({ ...prev, taskImage: downloadURL }));
	// 					resolve(downloadURL); // Resolve promise with the download URL
	// 				} catch (error) {
	// 					reject(error); // Reject promise if there's an error getting the download URL
	// 				}
	// 			}
	// 		);
	// 	});
	// };

	const handleSkillInputChange = (e) => {
		setSkillInputValue(e.target.value);
	};

	const handleSkillAdd = () => {
		if (skillInputValue.trim() === "") {
			setSkillError("Skill cannot be empty");
			return;
		}
		if (skills.includes(skillInputValue)) {
			setSkillError("Skill already exists");
			return;
		}
		setSkills([...skills, skillInputValue]);
		setSkillInputValue("");
		setSkillError("");
	};

	const handleSkillRemove = (skillToRemove) => {
		const updatedSkills = skills.filter((skill) => skill !== skillToRemove);
		setSkills(updatedSkills);
	};



	// const router = useRouter();
	const onSubmit = async (values) => {

		try {
			const response = await axiosInstance.put(`/tasks/edit-task/${taskId}`, values);
			console.log("Task updated successfully:", response.data);
			toggleEdit();
		} catch (error) {
			console.error("Error updating task:", error);
		}

		// try {
		// 	// await axios.patch(`/api/tasks/${taskId}`, values);
		// 	setIsUploading(true);
		// 	const url = await uploadImage(img, values);
		// 	// console.log(url);
		// 	await updateTask({ id: taskId, taskImage: url }).unwrap();
		// 	// toast.success("Task updated");
		// 	toggleEdit();
		// 	// router.refresh();
		// } catch (error) {
		// 	// console.log(error.code);
		// 	if (error?.code === "storage/canceled") {
		// 		return toast.error("Upload Cancelled");
		// 	}
		// 	// toast.error("Something went wrong");
		// } finally {
		// 	setImg("");
		// 	setImgPerc(0);
		// 	setIsUploading(false);
		// 	setUploadTask(null);
		// }
	};

	// const handleCancel = () => {
	// 	if (uploadTask) {
	// 		uploadTask.cancel();
	// 		setUploadTask(null);
	// 		setImg("");
	// 		setImgPerc(0);
	// 		setIsUploading(false);
	// 	}
	// };

	return (
		<div className="mt-6 border border-solid border-1 border-blue-300 rounded-md p-4">
			<div className="font-medium flex items-center justify-between">
				Skills
				<Button onClick={toggleEdit} variant="ghost">
					{isEditing ? (
						<>Cancel</>
					) : (
						<>
							<Pencil className="h-4 w-4 mr-2" />
							Edit Skill
						</>
					)}
				</Button>
			</div>
			{!isEditing &&
				// (!initialData.taskImage ? (
				// 	<div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
				// 		<ImageIcon className="h-10 w-10 text-slate-500" />
				// 	</div>
				// ) :
				(
					<div className="relative aspect-video mt-2">
						<HStack spacing={2}>
							{skills.map((skill, index) => (
								<Tag
									key={index}
									borderRadius="lg"
									color="white"
									bg="blue.500"
								>
									<TagLabel>{skill}</TagLabel>
								</Tag>
							))}
						</HStack>
					</div>
				)}
			{isEditing && (
				// <div>
				// 	<input
				// 		disabled={isUploading}
				// 		type="file"
				// 		name="taskImage"
				// 		accept="image/*"
				// 		onChange={(e) => setImg(e.target.files[0])}
				// 		className="file-input file-input-bordered w-full "
				// 	/>
				// 	<div className="text-xs text-muted-foreground mt-4">
				// 		16:9 aspect ratio recommended
				// 	</div>
				// 	<div className="flex justify-center mt-5 mb-5">
				// 		{!isUploading && img && (
				// 			<Button onClick={onSubmit} className="mx-auto">
				// 				Upload Image
				// 			</Button>
				// 		)}
				// 		{isUploading && (
				// 			<Button
				// 				onClick={handleCancel}
				// 				variant="destructive"
				// 				className="mx-auto"
				// 			>
				// 				Cancel
				// 			</Button>
				// 		)}
				// 	</div>
				// 	{isUploading && <Progress value={imgPerc} color="green" label=" " />}
				// </div>

				<Box gap={10} mt={4}>
					<Text
						as={"h2"}
						fontSize={{ base: "md", md: "1xl" }}
						fontWeight={600}
					>
						Skills
					</Text>

					<Flex flexDir="column" gap={2} mt={2}>
						<Input
							value={skillInputValue}
							onChange={handleSkillInputChange}
							onKeyPress={(e) => {
								if (e.key === "Enter") {
									handleSkillAdd();
								}
							}}
						/>
						{skillError && (
							<Alert status="error">
								<AlertIcon />
								{skillError}
							</Alert>
						)}
						<HStack spacing={2}>
							{skills.map((skill, index) => (
								<Tag
									key={index}
									borderRadius="lg"
									color="white"
									bg="blue.500"
								>
									<TagLabel>{skill}</TagLabel>
									<TagCloseButton
										onClick={() => handleSkillRemove(skill)}
									/>
								</Tag>
							))}
						</HStack>
					</Flex>
					<Button mt={2} onClick={onSubmit} colorScheme="blue">
						Save Skills
					</Button>
				</Box>
			)}
		</div>
	);
};
