import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Image,
  Spinner,
  Button,
} from "@chakra-ui/react";
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { FiMenu, FiBell, FiChevronDown } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";
import { AiFillGift } from "react-icons/ai";
import { BsGearFill } from "react-icons/bs";
import useLogout from "./hooks/useLogout";
import { ImArrowDownLeft2, ImArrowUpRight2 } from "react-icons/im";
import { MdHome } from "react-icons/md";
import { PiSuitcase } from "react-icons/pi";
import { useRecoilValue } from "recoil";
import userAtom from "./atoms/userAtom";
import { HiLogout } from "react-icons/hi";
import useGetUserProfile from "./hooks/useGetProfile";

const SidebarContent = ({ onClose, ...rest }) => {
  return (
      <Box
        transition="3s ease"
        bg={"gray.200"}
        boxShadow="1px 0px 2px 1px rgba(0,0,0,0.6)"
        zIndex={99}
        w={{ base: "full", md: 60 }}
        pos="fixed"
        h="full"
        color={"#000"} ///////////////////////////////////////////////////For the sidebar
        {...rest}
      >
        <Flex h="20" alignItems="center" mx="6" justifyContent="space-between">
          {/* <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
						Logo
					</Text> */}
          <Image src="/SidebarLogo.svg" />

          <CloseButton
            display={{ base: "flex", md: "none" }}
            onClick={onClose}
          />
        </Flex>

        <NavItem
          as={NavLink}
          to={"/dashboard"}
          style={({ isActive }) => ({
            color: isActive ? "#1F2937" : "",
            background: isActive ? "#FFFFFF" : "",
          })}
          icon={MdHome}
        >
          Dashboard
        </NavItem>

        <NavItem
          as={NavLink}
          to={"/projects"}
          style={({ isActive }) => ({
            color: isActive ? "#1F2937" : "",
            background: isActive ? "#FFFFFF" : "",
          })}
          icon={PiSuitcase}
        >
          Project
        </NavItem>

        <Accordion allowToggle>
          <AccordionItem>
            <AccordionButton>
              <Flex
                align="center"
                p="4"
                // mx="4"
                borderRadius="lg"
                role="group"
                cursor="pointer"
              >
                <Icon mr="4" fontSize="16" as={ImArrowDownLeft2} />
                Tasks
              </Flex>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <NavItem
                as={NavLink}
                to={"/clients/my-tasks"}
                style={({ isActive }) => ({
                  color: isActive ? "#1F2937" : "",
                  background: isActive ? "#FFFFFF" : "",
                })}
                pl="10"
                py="2"
              >
                My Tasks
              </NavItem>
              <NavItem
                as={NavLink}
                to={"/tasks/sent"}
                style={({ isActive }) => ({
                  color: isActive ? "#1F2937" : "",
                  background: isActive ? "#FFFFFF" : "",
                })}
                pl="10"
                py="2"
              >
                All Tasks
              </NavItem>
              <NavItem
                as={NavLink}
                to={"/clients"}
                style={({ isActive }) => ({
                  color: isActive ? "#1F2937" : "",
                  background: isActive ? "#FFFFFF" : "",
                })}
                pl="10"
                py="2"
              >
                Sent proposal
              </NavItem>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionButton>
              <Flex
                align="center"
                p="4"
                // mx="4"
                borderRadius="lg"
                role="group"
                cursor="pointer"
              >
                <Icon mr="4" fontSize="16" as={ImArrowUpRight2} />
                Pay
              </Flex>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <NavItem
                as={NavLink}
                to={"/bills"}
                style={({ isActive }) => ({
                  color: isActive ? "#1F2937" : "",
                  background: isActive ? "#FFFFFF" : "",
                })}
                pl="10"
                py="2"
              >
                Bills
              </NavItem>
              <NavItem
                as={NavLink}
                to={"/payrolls"}
                style={({ isActive }) => ({
                  color: isActive ? "#1F2937" : "",
                  background: isActive ? "#FFFFFF" : "",
                })}
                pl="10"
                py="2"
              >
                Payroll
              </NavItem>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>

        <NavItem
          as={NavLink}
          to={"/invoice-me"}
          style={({ isActive }) => ({
            color: isActive ? "#1F2937" : "",
            background: isActive ? "#FFFFFF" : "",
          })}
          icon={AiFillGift}
        >
          InvoiceMe
        </NavItem>
        <NavItem
          as={NavLink}
          to={"/employees"}
          style={({ isActive }) => ({
            color: isActive ? "#1F2937" : "",
            background: isActive ? "#FFFFFF" : "",
          })}
          icon={BsGearFill}
        >
          Employees
        </NavItem>
        <div className="flex w-[80%] items-center mx-auto">
          <Button
            cursor={"pointer"}
            leftIcon={<HiLogout />}
            colorScheme={"gray"}
            variant="outline"
          >
            Logout
          </Button>
        </div>
      </Box>
  );
};

const NavItem = ({ icon, children, ...rest }) => {
  return (
    <Box>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "blue.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && <Icon mr="4" fontSize="16" as={icon} />}
        {children}
      </Flex>
    </Box>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  const logout = useLogout();
  const user = useRecoilValue(userAtom);
  const navigate = useNavigate();

  return (
    <Flex
      pos={"sticky"}
      top={0}
      zIndex={9}
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={"#ECF1F6"}
      boxShadow="base"
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Image display={{ base: "flex", md: "none" }} src="/QBLogo.png" />

      <HStack spacing={{ base: "0", md: "6" }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          color="gray.600"
          icon={<FiBell />}
        />
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar size={"sm"} src={user.avatar} />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm" color="gray.600">
                    {user.name}
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem onClick={() => navigate(`/profile/${user.username}`)}>
                Profile
              </MenuItem>
              <MenuDivider />
              <MenuItem onClick={logout}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

const SidebarWithHeader = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      minH="100vh"
      bg={"#fff"} ///////////////////////////////////////////////////////////For the whole box
    >
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} minH={"100%"} p="2">
        {children}
      </Box>
    </Box>
  );
};

export default SidebarWithHeader;
