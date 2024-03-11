import { Box, Button } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import SidebarWithHeader from "../../../SidebarWithHeader";

const ClientTasks = () => {
  const navigate = useNavigate();
  return (
    <SidebarWithHeader>
      <Box>
        <div>
          <Button
            onClick={() => navigate("/clients/create-tasks")}
            size={{ base: "md", md: "lg" }}
            colorScheme="blue"
          >
            Create New Task
          </Button>
        </div>
      </Box>
    </SidebarWithHeader>
  );
};

export default ClientTasks;
