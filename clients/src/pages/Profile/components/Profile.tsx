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
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { MdLocationOn } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import React, { useState } from "react";
import useShowToast from "../../../hooks/useShowToast";

const Profile = () => {
  const [languageInputValue, setLanguageInputValue] = useState("");
  const [languages, setLanguages] = useState([]);
  const [skillInputValue, setSkillInputValue] = useState("");
  const [skills, setSkills] = useState([]);
  const [languageError, setLanguageError] = useState("");
  const [skillError, setSkillError] = useState("");
  const [bioError, setBioError] = useState("");
  const [bio, setBio] = useState(
    "As a UX designer, I specialize in crafting seamless user experiences that align with your brand and resonate with your audience. My services encompass comprehensive user research, wireframing, prototyping, and interface design. I focus on understanding user behaviors, pain points, and preferences to create intuitive and engaging digital products. Whether it's improving existing interfaces or creating new ones from scratch, I ensure designs that are user-centric, visually appealing, and optimized for usability across devices and platforms"
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const showToast = useShowToast()

  const handleLanguageAdd = () => {
    if (languageInputValue.trim() !== "") {
      setLanguages([...languages, languageInputValue]);
      setLanguageInputValue("");
    }
  };

  const handleLanguageRemove = (language) => {
    setLanguages(languages.filter((lang) => lang !== language));
  };

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

  const handleLanguageInputChange = (event) => {
    const inputValue = event.target.value;
    if (inputValue.length <= 15) {
      setLanguageInputValue(inputValue);
      setLanguageError("");
    } else {
      setLanguageError("Language should not exceed 15 characters");
    }
  };


  const handleBioChange = (event) => {
    setBio(event.target.value);
  };

  const handleEditClick = () => {
    onOpen();
  };

  const handleCancelClick = () => {
    setBio(
      "As a UX designer, I specialize in crafting seamless user experiences that align with your brand and resonate with your audience. My services encompass comprehensive user research, wireframing, prototyping, and interface design. I focus on understanding user behaviors, pain points, and preferences to create intuitive and engaging digital products. Whether it's improving existing interfaces or creating new ones from scratch, I ensure designs that are user-centric, visually appealing, and optimized for usability across devices and platforms"
    );
    onClose();
  };

  const handleSaveClick = () => {
    if (bio.length > 200) {
      setBioError('')
    } else {
      setBioError("Bio should not exeed 200 characters")
    }
    // Save bio changes here (e.g., update database)
    onClose();
  };
  return (
    <HStack align={"center"}>
      <Flex justify={'space-between'}>
      <Flex flexDir={"column"} gap={6}>
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
                <Avatar src="/portrait.jpg" size={{ base: "xl", lg: "2xl" }} name="Muhammed Musa" />
              </WrapItem>
            </Wrap>
            <Text as={"h2"} fontSize={"md"}>
              holayimika
            </Text>
            <Box>
              <Text as={"h1"} fontWeight={600} fontSize={"lg"}>
                Muhammed Musa
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
                  <Text fontSize={{ base: "sm", md: "md" }}>Member since</Text>
                </Box>
                <Text fontSize={{ base: "md", md: "lg" }}>Jan 2024</Text>
              </Flex>
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
              align="center"
              flexDir={'row'}
              w="full"
              mb={4}
              display={isOpen ? "none" : "flex"}
            >
              <Text
                as="h2"
                fontSize={{ base: "md", md: "1xl" }}
                fontWeight={600}
              >
                Description
              </Text>
              <Icon
                cursor="pointer"
                as={EditIcon}
                color="blue.500"
                onClick={handleEditClick}
              />
            </Flex>
            {isOpen ? (
              <>
                <Flex flexDir={'column'} gap={4} w={'full'}>
                  <Textarea maxLength={200} size={'lg'} value={bio} onChange={handleBioChange} />
                  {bioError && (
                    <Alert status="error">
                      <AlertIcon />
                      {bioError}
                    </Alert>
                  )}
                  <Flex justify="space-between">
                    <Button colorScheme="gray" onClick={handleCancelClick}>
                      Cancel
                    </Button>
                    <Button colorScheme="blue" onClick={handleSaveClick}>
                      Save
                    </Button>
                  </Flex>
                </Flex>
              </>
            ) : (
              <Text as="h2" color="#6B7280" fontSize="md">
                {bio}
              </Text>
            )}
          </Flex>


          <Box gap={10}>
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
          </Box>

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
                    <TagCloseButton onClick={() => handleSkillRemove(skill)} />
                  </Tag>
                ))}
              </HStack>
            </Flex>
          </Box>

          <Box gap={10} mt={4}>
            <Text
              as={"h2"}
              fontSize={{ base: "md", md: "1xl" }}
              fontWeight={600}
            >
              Linked accounts
            </Text>

            <Flex flexDir={"column"} gap={2} mt={2}>
              <Input placeholder="Twitter link" />
              <Input placeholder="LinkedIn link" />
              <Input placeholder="GitHub link" />
            </Flex>
          </Box>
        </Flex>
      </Flex>

      <Grid >
        <Image src="/portrait.jpg" />
      </Grid>
      </Flex>
    </HStack>
  );
};

export default Profile;
