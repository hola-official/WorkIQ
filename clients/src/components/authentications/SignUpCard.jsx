import {
	Button,
	Flex,
	Text,
	FormControl,
	Heading,
	Input,
	Stack,
	Link,
	Box,
	InputGroup,
	InputRightElement,
	HStack,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon, CheckIcon } from "@chakra-ui/icons";
import { FcGoogle } from "react-icons/fc";
import { useSetRecoilState } from "recoil";
import authScreenAtom from "../../atoms/authAtom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAxiosInstance } from "../../../api/axios";
import userAtom from "../../atoms/userAtom";
import useShowToast from "../../hooks/useShowToast";

export default function SplitScreen() {
	const setAuthScreen = useSetRecoilState(authScreenAtom);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [username, setUsername] = useState("");
	const setUser = useSetRecoilState(userAtom);
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const navigate = useNavigate();
	const showToast = useShowToast();
	const [loading, setLoading] = useState(false);
	const axiosInstance = useAxiosInstance();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			return showToast("Error", "password does not correspond", "error");
		}
		setLoading(true);
		try {
			const response = await axiosInstance.post(
				"/auth/signup",
				JSON.stringify({ name, username, email, password, confirmPassword })
			);
			// const loggedUser = response.data.loggedInUser;
			const data = response.data;

			if (data.message) {
				showToast("Success", data.message, "success");
			}

			navigate("/activate-verify");
		} catch (error) {
			console.log(error);
			showToast("Error", error.response.data.error, "error");
		} finally {
			setLoading(false);
		}
	};

	const handleGoogleAuth = async () => {
		try {
			const response = await axiosInstance.get("/auth/google");
			const data = response.data;
			navigate("/auth/google-verify");
		} catch (error) {
			console.log(error);
		}
		// window.location.href =
		// 	"https://quickbill-2oy7.onrender.com/auth/googleauth";
	};

	return (
		<Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
			<Flex p={8} flex={1} align={"center"} justify={"center"} bg={"#f6f6f6"}>
				<Stack spacing={4} w={"full"} maxW={"md"}>
					<Heading>
						<Text fontSize={"4xl"}>Sign up</Text>
						<Text fontSize={"lg"} color={"#969696"}>
							Sign up to enjoy the feature of WorkIQ.
						</Text>
					</Heading>
					<form onSubmit={handleSubmit}>
						<Stack spacing={4}>
							<Box
								// w={{ base: "100%" }}
								maxW="500px"
								mx="auto"
							>
								<HStack>
									<Box>
										<FormControl isRequired>
											<Input
												type="text"
												onChange={(e) => setUsername(e.target.value)}
												placeholder="Username"
												value={username}
												pattern="^(?!\s+$).{3,}$"
												color={"black"}
												border={"1px solid black"}
												required
											/>
											<span className="regex-error">
												Username must be at least 3 characters long{" "}
											</span>
										</FormControl>
									</Box>
									<Box>
										<FormControl>
											<Input
												type="text"
												onChange={(e) => setName(e.target.value)}
												placeholder="Full name"
												value={name}
												color={"black"}
												border={"1px solid black"}
												pattern="^(?!\s+$).{5,}$"
												required
											/>
											<span className="regex-error">
												Full name must be at least 5 characters long
											</span>
										</FormControl>
									</Box>
								</HStack>

								<FormControl isRequired my={5}>
									<Input
										type="email"
										onChange={(e) => setEmail(e.target.value)}
										value={email}
										placeholder="Email address"
										border={"1px solid black"}
										pattern="[a-z0-9._+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
										required
									/>
									<span className="regex-error">
										Please enter a valid email address.{" "}
									</span>
								</FormControl>

								<FormControl isRequired my={5}>
									<InputGroup>
										<Input
											type={showPassword ? "text" : "password"}
											onChange={(e) => setPassword(e.target.value)}
											value={password}
											placeholder="Password"
											// pattern="[0-9a-zA-Z]{8,}"
											border={"1px solid black"}
											required
										/>
										<InputRightElement h={"full"}>
											<Button
												variant={"ghost"}
												onClick={() =>
													setShowPassword((showPassword) => !showPassword)
												}
											>
												{showPassword ? <ViewIcon /> : <ViewOffIcon />}
											</Button>
										</InputRightElement>
									</InputGroup>
									<span className="regex-error">
									Password must be at least 8 characters.{" "}
								</span>
								</FormControl>

								<FormControl isRequired my={5}>
									<InputGroup>
										<Input
											type={showConfirmPassword ? "text" : "password"}
											onChange={(e) => setConfirmPassword(e.target.value)}
											value={confirmPassword}
											placeholder="Confirm password"
											// pattern="[0-9a-zA-Z]{8,}"
											border={"1px solid black"}
											required
										/>
										<InputRightElement h={"full"}>
											<Button
												variant={"ghost"}
												onClick={() =>
													setShowConfirmPassword(
														(showConfirmPassword) => !showConfirmPassword
													)
												}
											>
												{showConfirmPassword ? <ViewIcon /> : <ViewOffIcon />}
											</Button>
										</InputRightElement>
									</InputGroup>
								</FormControl>

								<Stack spacing={10} pt={2}>
									<Button
										loadingText="Signing you up"
										size={{ base: "lg", md: "md" }}
										bg={"blue.400"}
										color={"white"}
										_hover={{
											bg: "blue.500",
										}}
										type="submit"
										isLoading={loading}
									>
										Sign up
									</Button>
								</Stack>
							</Box>
							<Stack pt={6}>
								<Text align={"center"}>
									Already a user?{" "}
									<Link
										color={"blue.400"}
										onClick={() => setAuthScreen("login")}
									>
										Login
									</Link>
								</Text>
							</Stack>
						</Stack>
					</form>
					<Flex align={"center"} flexDir={"column"} gap={2}>
						<Button
							// bg={"#3B82F6"}
							border={"1px solid black"}
							_hover={{ bg: "white" }}
							size={{ base: "sm", md: "md" }}
							leftIcon={<FcGoogle size={24} />}
							color={"black"}
							onClick={handleGoogleAuth}
						>
							Continue with Google
						</Button>
					</Flex>
				</Stack>
			</Flex>
			<Flex
				flexDir={{ base: "column-reverse", md: "column" }}
				w={{ base: "full", md: "40%" }}
			>
				<Box
					position="relative"
					bgImage="url('/authImg.png')"
					bgPosition="center"
					bgRepeat="no-repeat"
					bgSize="cover"
					// h={"100vh"}
					minH={"100vh"}
					display={{ base: "none", md: "block" }}
				>
					<Box
						pos={"absolute"}
						fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
						fontWeight={{ base: "3xl", md: "4xl", lg: "5xl" }}
						color="#fff"
						py={3}
						px={{ base: 4, md: 18 }}
						display={{ base: "none", md: "block" }}
					>
						<Text
							as={"h2"}
							fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}
							fontWeight={{ base: "3xl", md: "4xl", lg: "5xl" }}
						>
							Success starts here
						</Text>
						<Flex gap={1} alignItems={"center"}>
							<CheckIcon boxSize={4} />
							<Text as={"h2"}>Pay per project, not per hour</Text>
						</Flex>
						<Flex gap={1} alignItems={"center"}>
							<CheckIcon boxSize={4} />
							<Text as={"h2"}>Access to talent and businesses</Text>
						</Flex>
						<Text as={"h2"} textAlign={"center"}>
							across the global
						</Text>
					</Box>
				</Box>
			</Flex>
		</Stack>
	);
}
