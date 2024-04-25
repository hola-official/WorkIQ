import React, { useEffect, useState } from "react";

import {
  Box,
  HStack,
  Stack,
  Link as ChakraLink,
  Text,
  Icon,
  Avatar,
  useColorModeValue,
} from "@chakra-ui/react";
import { getTimestamp } from "@/lib/utils";
import { useAxiosInstance } from "../../../../../api/axios";
import { formatPrice } from "@/lib/format";
import { Link } from "react-router-dom";
import { GoChevronRight } from "react-icons/go";

const Proposal = ({ task, proposal, section }) => {
  const axiosInstance = useAxiosInstance();
  const [freelancer, setFreelancer] = useState(null);

  useEffect(() => {
    handleFreelancerInfo();
  }, [task]);

  const handleFreelancerInfo = async () => {
    try {
      const res = await axiosInstance.get(`users/${proposal.freelancer}`);
      const data = await res.data;
      console.log(data);
      setFreelancer(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Stack
        direction="column"
        spacing={4}
        p={4}
        bg={useColorModeValue("gray.100", "gray.800")}
        border="1px solid"
        borderColor="blue.100"
        _hover={{
          borderColor: "blue.300",
          boxShadow: useColorModeValue(
            "0 4px 6px rgba(160, 174, 192, 0.6)",
            "0 4px 6px rgba(9, 17, 28, 0.9)"
          ),
        }}
        rounded="lg"
      >
        <Box textAlign="left">
          <ChakraLink
            fontSize="xl"
            lineheight={1.2}
            fontWeight="bold"
            w="100%"
            _hover={{
              color: "blue.400",
              textDecoration: "underline",
            }}
          >
            Section: {section.title}
          </ChakraLink>
          <Box mb={4}>
            <Text
              fontSize="md"
              color="gray.500"
              noOfLines={2}
              lineHeight="normal"
              mb={2}
            >
              Cover Letter: {proposal.coverLetter}
            </Text>
            {/* Display freelancer username */}
            {/* <Text fontSize="sm" color="gray.500">
              Freelancer:{" "}
              {freelancer
                ? freelancer.username
                : "N/A"}
            </Text>
            <Text fontSize="sm" color="gray.500">
              Assigned:{" "}
              {proposal.isAssigned ? "Yes" : "No"}
            </Text> */}
            <Text fontSize="sm" color="gray.500">
              Proposal Price: {formatPrice(proposal.sectionPrice)}
            </Text>
          </Box>
          <Box>
            <Avatar
              size="sm"
              name={freelancer ? freelancer.name : ""}
              mb={2}
              src={freelancer ? freelancer.userAvatar : ""}
            />
            <Stack
              justifyContent="space-between"
              direction={{ base: "column", sm: "row" }}
            >
              <Box>
                <Text fontSize="sm" fontWeight="bold">
                  {freelancer ? freelancer.username : "N/A"}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  {getTimestamp(proposal.createdAt)}
                </Text>
              </Box>
              <HStack
                as={Link}
                spacing={1}
                p={1}
                alignItems="center"
                height="2rem"
                to={`/messages?applicant=${freelancer?._id}`}
                w="max-content"
                margin="auto 0"
                rounded="md"
                color="blue.400"
                _hover={{
                  bg: useColorModeValue("gray.200", "gray.700"),
                }}
              >
                <Text fontSize="sm">Message</Text>
                <Icon as={GoChevronRight} w={4} h={4} />
              </HStack>
            </Stack>
          </Box>
        </Box>
        {/* Render freelancer information */}
      </Stack>
    </>
  );
};

export default Proposal;
