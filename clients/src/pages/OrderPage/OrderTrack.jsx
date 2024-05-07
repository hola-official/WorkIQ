import React, { useEffect, useState } from "react";
import SidebarWithHeader from "@/SidebarWithHeader";
import { columns } from "../OrderPage/components/Columns";
import { DataTable } from "../OrderPage/components/DataTable";
import useShowToast from "@/hooks/useShowToast";
import { useAxiosInstance } from "../../../api/axios";

const OrderTrack = () => {
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
        console.log(error);
        showToast("Error", error.response.data.message, "error");
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, [showToast]);

  if (loading) return <p>Fetching all client tasks</p>;

  return (
    <SidebarWithHeader>
      <div>
        <h1 className="text-2xl md:text-4xl font-medium">My Orders</h1>
      </div>
      <div className="p-6">
        <DataTable columns={columns} data={tasks} />
      </div>
    </SidebarWithHeader>
  );
};

export default OrderTrack;
