import { Box, Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SidebarWithHeader from "../../../SidebarWithHeader";
import { DataTable } from "../components/DataTable";
import { useAxiosInstance } from "../../../../api/axios";
import useShowToast from "@/hooks/useShowToast";
import { columns } from "../components/Columns";

const ClientTasks = () => {
  const navigate = useNavigate();

  const axiosInstance = useAxiosInstance();
  const [tasks, setTasks] = useState();
  const [loading, setLoading] = useState(true);
  const showToast = useShowToast();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axiosInstance.get(`tasks/all-tasks`);
        const data = res.data;

        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        console.log(data);

        setTasks(data);
      } catch (error) {
        console.log(error)
        showToast("Error", error.response.data.message, "error");
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, [showToast]);

  if (loading) return <p>Fetching all client tasks</p>;

  // const allClientTasks = tasks?._id.map(id => tasks?.entities[id]);
  return (
    <SidebarWithHeader>
      <div className="p-6">
        <DataTable columns={columns} data={tasks} />
      </div>
    </SidebarWithHeader>
  );
};

export default ClientTasks;
