import React, { useEffect, useState } from "react";
import {
  Box,
  Stack,
  Text,
  Icon,
  Avatar,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Button,
  HStack,
  useDisclosure,
} from "@chakra-ui/react";
import { getTimestamp } from "@/lib/utils";
import { useAxiosInstance } from "../../../../../api/axios";
import { formatPrice } from "@/lib/format";
import { Link, useNavigate } from "react-router-dom";
import { GoChevronRight } from "react-icons/go";
import useShowToast from "@/hooks/useShowToast";
// import { ConfirmModal } from "@/components/ui/confirm-modal";

const Proposal = ({ task, proposal, section }) => {
  const axiosInstance = useAxiosInstance();
  const [freelancer, setFreelancer] = useState(null);
  const [input, setInput] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const navigate = useNavigate();
  const showToast = useShowToast();

  useEffect(() => {
    handleFreelancerInfo();
  }, [task]);

  const handleFreelancerInfo = async () => {
    try {
      const res = await axiosInstance.get(`users/${proposal.freelancer}`);
      const data = await res.data;
      setFreelancer(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateOrder = async () => {
    try {
      const res = await axiosInstance.post(
        `order/create-order/${section._id}`,
        {
          freelancerId: freelancer._id,
        }
      );

      const data = await res.data;
      console.log(data);
      navigate(`/track/order/${data._id}`)

      showToast("Success", data.message, "success");
    } catch (error) {
      console.log(error);
      showToast("Error", error.response.data.message, "error");
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
          <Link
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
          </Link>
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

            <Box>
              <ConfirmModal onConfirm={handleCreateOrder}>
                <Button
                  // onClick={onOpen}
                  colorScheme={"blue"}
                  size={"md"}
                  float={"right"}
                >
                  Assign
                </Button>
              </ConfirmModal>
              {/* <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Assign Task</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <FormControl mb={4}>
                      <FormLabel>Cover Letter</FormLabel>
                      <Input placeholder="Enter cover letter" />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Attachment</FormLabel>
                      <input
                        type="file"
                        className="block w-full mb-5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                      />
                      <FormHelperText>Upload file here</FormHelperText>
                    </FormControl>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      colorScheme="blue"
                      onClick={handleCreateOrder}
                      mr={3}
                    >
                      Assign
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal> */}
            </Box>
          </Box>
        </Box>
      </Stack>
    </>
  );
};

export default Proposal;
