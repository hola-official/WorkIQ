import {
  Avatar,
  Box,
  Flex,
  HStack,
  Icon,
  Input,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  Wrap,
  WrapItem,
  Alert,
  AlertIcon,
  useDisclosure,
  Button,
  Textarea,
  Grid,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Heading,
  Stack,
  Center,
  Hide,
  Show,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { MdLocationOn } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import useShowToast from "../../../hooks/useShowToast";
// import userAtom from "../../../atoms/userAtom";
// import { useRecoilState } from "recoil";
import usePreviewImg from "../../../hooks/usePreviewImg";
import useGetUserProfile from "../../../hooks/useGetProfile";
import { useAxiosInstance } from "../../../../api/axios";
import useErrorHandler from "../../../hooks/useErrorHandler";
import { useParams } from "react-router-dom";
import Loading from "@/components/ui/Loading";
import useAuth from "@/hooks/useAuth";

const Profile = () => {
  const [skillInputValue, setSkillInputValue] = useState("");
  const { _id, username } = useAuth();
  console.log(_id)
  // const [user, setUser] = useRecoilState(userAtom);
  const [user, setUser] = useState(null);
  const [inputs, setInputs] = useState({
    name: user.name,
    email: user.email,
    username: user.username,
    password: "",
    bio: user.bio,
    location: user.location,
    website: user.website,
    skills: user.skills,
    category: user.category,
    avatar: "", // If you allow users to update their avatar
    socialMedia: user.socialMedia,
  });

  const axiosInstance = useAxiosInstance();
  const { loading, users } = useGetUserProfile();
  const fileRef = useRef(null);
  const { handleImageChange, imgUrl } = usePreviewImg();
  const { userId } = useParams();
  const [updating, setUpdating] = useState(false);
  const [socialMedia, setSocialMedia] = useState({});
  const [skills, setSkills] = useState([]);
  const [skillError, setSkillError] = useState("");
  const [bioError, setBioError] = useState("");

  console.log(user);
  console.log(users);
  const errorHandler = useErrorHandler();
  const {
    isOpen: isBioOpen,
    onOpen: onBioOpen,
    onClose: onBioClose,
  } = useDisclosure();
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();
  const showToast = useShowToast();

  const handleSkillAdd = () => {
    if (skillInputValue.trim() !== "") {
      setSkills([...skills, skillInputValue]);
      setSkillInputValue("");
    }
  };

  const handleSkillRemove = (skill) => {
    setSkills(skills.filter((sk) => sk !== skill));
  };

  const handleSkillInputChange = (event) => {
    const inputValue = event.target.value;
    if (inputValue.length <= 15) {
      setSkillInputValue(inputValue);
      setSkillError("");
    } else {
      setSkillError("Skill should not exceed 15 characters");
    }
  };

  const handleBioChange = (event) => {
    setBio(event.target.value);
  };

  console.log(user);
  const handleSocialMediaInput = (property, value) => {
    setSocialMedia((prevSocialMedia) => {
      return {
        ...prevSocialMedia,
        [property]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (updating) return;
    setUpdating(true);

    try {
      const res = await axiosInstance.put(
        `/users/update/${_id}`,
        JSON.stringify({
          ...inputs,
          profilePic: imgUrl,
          socialMedia: socialMedia,
        })
      );
      const data = res.data;

      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
      // if (error?.response?.status === 404) {

      showToast("Success", "Profile updated successfully", "success");

      // Update user state or perform any necessary actions
      setUser(data);
      console.log(data);
      localStorage.setItem("user-workiq", JSON.stringify(data));
    } catch (error) {
      // showToast("Error", error.message, "error");
      if (error.response.message) {
        showToast("Error", error.response.message, "error");
      } else {
        errorHandler(error);
      }

      // if (error.response.status === 400) {
      //   showToast("Error", error.response.data.error, "error");
      // }
      console.log(error);
    } finally {
      setUpdating(false);
    }
  };

  if (!users && loading) {
    return (
      <Flex justifyContent={"center"} flexDir={"column"} align={"center"}>
        <Loading />
        <Text as={"h1"}>Setting up profile</Text>
      </Flex>
    );
  }

  if (user) {
    return (
      <HStack align={"center"}>
        <Flex justify={"space-between"} flexDir={{ base: "column", md: "row" }}>
          <Flex flexDir={"column"} gap={6} w={{ base: "full", md: "50%" }}>
            <Flex
              border={"solid #D1D5DB 1px"}
              borderRadius={"md"}
              justify={"center"}
              align={"center"}
              py={4}
              px={6}
            >
              <Flex
                align={"center"}
                borderRadius={"md"}
                flexDir={"column"}
                border={"solid #D1D5DB 1px"}
                px={8}
                py={2}
                w={"full"}
              >
                <Wrap>
                  <WrapItem>
                    <Avatar
                      src={users?.avatar}
                      size={{ base: "xl", lg: "2xl" }}
                      name={users?.name}
                    />
                  </WrapItem>
                </Wrap>
                <Text as={"h2"} fontSize={"md"}>
                  {users?.username}
                </Text>
                <Box>
                  <Text as={"h1"} fontWeight={600} fontSize={"lg"}>
                    {users?.name}
                  </Text>
                  <Text
                    as={"h1"}
                    color={"#4B5563"}
                    fontWeight={400}
                    fontSize={"md"}
                  >
                    300+ point earned
                  </Text>
                </Box>

                <Flex flexDir={"column"} gap={2} w={"full"}>
                  <Flex justify={"space-between"} align={"center"}>
                    <Box gap={1} display={"flex"} alignItems={"center"}>
                      <MdLocationOn size={20} />
                      <Text fontSize={{ base: "sm", md: "md" }}>From</Text>
                    </Box>
                    <Text fontSize={"lg"}>Nigeria</Text>
                  </Flex>

                  <Flex justify={"space-between"} align={"center"}>
                    <Box gap={1} display={"flex"} alignItems={"center"}>
                      <FaUser size={20} />
                      <Text fontSize={{ base: "sm", md: "md" }}>
                        Member since
                      </Text>
                    </Box>
                    <Text fontSize={{ base: "md", md: "lg" }}>
                      {new Date(users?.createdAt).toLocaleString("default", {
                        month: "long",
                        year: "numeric",
                      })}
                    </Text>
                  </Flex>
                  {/* <Box display={!user?.username != users.username ?'none' : 'block'} > */}
                  <Button
                    color="white"
                    size={{ base: "md", md: "lg" }}
                    bg="blue.500"
                    _hover={{ bg: "blue.400" }}
                    cursor="pointer"
                    rightIcon={<EditIcon />}
                    onClick={onModalOpen}
                  >
                    Edit my data
                  </Button>
                  {/* </Box> */}

                  <Modal isOpen={isModalOpen} onClose={onModalClose}>
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>User Profile Edit</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                        {/* <form onSubmit={handleSubmit}> */}
                        <Flex align={"center"} justify={"center"} my={6}>
                          <Stack
                            spacing={4}
                            w={"full"}
                            maxW={"md"}
                            // bg={useColorModeValue('white', 'gray.dark')}
                            rounded={"xl"}
                            boxShadow={"lg"}
                            p={6}
                          >
                            <Heading
                              lineHeight={1.1}
                              fontSize={{ base: "2xl", sm: "3xl" }}
                            >
                              User Profile Edit
                            </Heading>
                            <FormControl>
                              <Stack direction={["column", "row"]} spacing={6}>
                                <Center>
                                  <Avatar
                                    size="xl"
                                    boxShadow={"md"}
                                    src={imgUrl || user.avatar}
                                  />
                                </Center>
                                <Center w="full">
                                  <Button
                                    onClick={() => fileRef.current.click()}
                                    w="full"
                                  >
                                    Change Avatar
                                  </Button>
                                  <Input
                                    type="file"
                                    hidden
                                    ref={fileRef}
                                    onChange={handleImageChange}
                                  />
                                </Center>
                              </Stack>
                            </FormControl>
                            <FormControl>
                              <FormLabel>Full name</FormLabel>
                              <Input
                                placeholder="your fullname"
                                _placeholder={{ color: "gray.500" }}
                                type="text"
                                onChange={(e) =>
                                  setInputs({ ...inputs, name: e.target.value })
                                }
                                value={inputs.name}
                              />
                            </FormControl>
                            <FormControl>
                              <FormLabel>Username</FormLabel>
                              <Input
                                disabled
                                placeholder="UserName"
                                _placeholder={{ color: "gray.500" }}
                                type="text"
                                onChange={(e) =>
                                  setInputs({
                                    ...inputs,
                                    username: e.target.value,
                                  })
                                }
                                value={inputs.username}
                              />
                            </FormControl>
                            <FormControl>
                              <FormLabel>Email address</FormLabel>
                              <Input
                                placeholder="your-email@example.com"
                                _placeholder={{ color: "gray.500" }}
                                type="email"
                                onChange={(e) =>
                                  setInputs({
                                    ...inputs,
                                    email: e.target.value,
                                  })
                                }
                                value={inputs.email}
                              />
                            </FormControl>
                            <FormControl>
                              <FormLabel>Bio</FormLabel>
                              <Textarea
                                placeholder="Your bio..."
                                _placeholder={{ color: "gray.500" }}
                                size={"lg"}
                                onChange={(e) =>
                                  setInputs({
                                    ...inputs,
                                    bio: e.target.value,
                                  })
                                }
                                value={inputs.bio}
                                // maxLength={350} // Set the maximum character length
                              />
                              {/* <Box>
                                <Text
                                  as="span"
                                  fontSize="sm"
                                  color={inputs.bio.length > 350 ? "red.500" : "gray.500"} // Change color if exceeded max length
                                >
                                  {inputs.bio.length}/350 characters
                                </Text>
                              </Box> */}
                            </FormControl>
                            <FormControl>
                              <FormLabel>Password</FormLabel>
                              <Input
                                placeholder="password"
                                _placeholder={{ color: "gray.500" }}
                                type="password"
                                onChange={(e) =>
                                  setInputs({
                                    ...inputs,
                                    password: e.target.value,
                                  })
                                }
                                value={inputs.password}
                              />
                            </FormControl>
                            <Flex flexDir={"column"} gap={2} mt={2}>
                              <Input
                                value={socialMedia.twitter}
                                onChange={(e) =>
                                  handleSocialMediaInput(
                                    "twitter",
                                    e.target.value
                                  )
                                }
                                placeholder="Twitter link"
                              />
                              <Input
                                value={socialMedia.linkedin}
                                onChange={(e) =>
                                  handleSocialMediaInput(
                                    "linkedin",
                                    e.target.value
                                  )
                                }
                                placeholder="LinkedIn link"
                              />
                              <Input
                                value={socialMedia.github}
                                onChange={(e) =>
                                  handleSocialMediaInput(
                                    "github",
                                    e.target.value
                                  )
                                }
                                placeholder="GitHub link"
                              />
                            </Flex>
                          </Stack>
                        </Flex>
                        {/* </form> */}
                      </ModalBody>
                      <Stack px={5} direction={["column", "row"]}>
                        <Button
                          bg={"red.500"}
                          color={"white"}
                          w="80%"
                          size={{ base: "md", md: "md" }}
                          onClick={onModalClose}
                          _hover={{
                            bg: "red.400",
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          bg={"blue.500"}
                          color={"white"}
                          w="full"
                          size={{ base: "md", md: "md" }}
                          _hover={{
                            bg: "blue.400",
                          }}
                          onClick={handleSubmit}
                          type="submit"
                          isLoading={updating}
                        >
                          Submit
                        </Button>
                      </Stack>
                      <ModalFooter gap={2}></ModalFooter>
                    </ModalContent>
                  </Modal>
                </Flex>
              </Flex>
            </Flex>

            <Flex
              border={"solid #D1D5DB 1px"}
              borderRadius={"md"}
              justify={"center"}
              flexDir={"column"}
              w={"full"}
              py={4}
              px={6}
            >
              <Flex
                align={"center"}
                borderRadius={"md"}
                flexDir={"column"}
                border={"solid #D1D5DB 1px"}
                w={"full"}
                px={8}
                py={2}
              >
                <Flex
                  justify="space-between"
                  // align="center"
                  flexDir={"row"}
                  w="full"
                  mb={4}
                >
                  <Text
                    as="h2"
                    fontSize={{ base: "md", md: "1xl" }}
                    fontWeight={600}
                  >
                    Description
                  </Text>
                </Flex>

                <Text textAlign={"start"} as="h2" color="#6B7280" fontSize="md">
                  {users.bio || "No bio provided."}
                </Text>
              </Flex>

              {/* <Box gap={10}>
              <Text
                as={"h2"}
                fontSize={{ base: "md", md: "1xl" }}
                fontWeight={600}
              >
                Languages you know
              </Text>

              <Flex flexDir="column" gap={2} mt={2}>
                <Input
                  value={languageInputValue}
                  onChange={handleLanguageInputChange}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleLanguageAdd();
                    }
                  }}
                />
                {languageError && (
                  <Alert status="error">
                    <AlertIcon />
                    {languageError}
                  </Alert>
                )}
                <HStack spacing={2}>
                  {languages.map((language, index) => (
                    <Tag
                      key={index}
                      borderRadius="full"
                      color="white"
                      bg="blue.500"
                    >
                      <TagLabel>{language}</TagLabel>
                      <TagCloseButton
                        onClick={() => handleLanguageRemove(language)}
                      />
                    </Tag>
                  ))}
                </HStack>
              </Flex>
            </Box> */}

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
                        borderRadius="full"
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
              </Box>

              <Box gap={10} mt={4}>
                {/* <form onSubmit={handleSubmit}> */}
                <Text
                  as={"h2"}
                  fontSize={{ base: "md", md: "1xl" }}
                  fontWeight={600}
                >
                  Linked accounts
                </Text>

                <Flex flexDir={"column"} gap={2} mt={2}>
                  <Input
                    value={socialMedia.twitter}
                    onChange={(e) =>
                      handleSocialMediaInput("twitter", e.target.value)
                    }
                    placeholder="Twitter link"
                  />
                  <Input
                    value={socialMedia.linkedin}
                    onChange={(e) =>
                      handleSocialMediaInput("linkedin", e.target.value)
                    }
                    placeholder="LinkedIn link"
                  />
                  <Input
                    value={socialMedia.github}
                    onChange={(e) =>
                      handleSocialMediaInput("github", e.target.value)
                    }
                    placeholder="GitHub link"
                  />
                </Flex>
                <Button bg={"blue.300"} type="submit">
                  Submit
                </Button>
                {/* </form> */}
              </Box>
            </Flex>
          </Flex>

          <Grid px={20}>
            <Image src="/portrait.jpg" />
          </Grid>
        </Flex>
      </HStack>
    );
  }
};

export default Profile;
