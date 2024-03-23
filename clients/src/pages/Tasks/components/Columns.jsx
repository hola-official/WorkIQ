import { ArrowUpDown, MoreHorizontal, Pencil } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/format";
import { MdDelete } from "react-icons/md";
import { Flex } from "@chakra-ui/react";
import { ConfirmModal } from "@/components/ui/confirm-modal";
import { useAxiosInstance } from "../../../../api/axios";
import useShowToast from "@/hooks/useShowToast";

export const columns = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const title = row.getValue("title");

      return <p className="min-w-[350px] ml-4 ">{title}</p>;
    },
  },
  {
    accessorKey: "price",
    header: () => {
      return <Button variant="ghost">Price</Button>;
    },
    cell: ({ row }) => {
      const { totalPrice } = row.original;
      const price = parseFloat(row.getValue("totalPrice") || "0");
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(totalPrice);
      return (
        <div className="ml-4">{row.getValue("totalPrice") ? formatted :  formatPrice(totalPrice)}</div>
      );
    },
  },
  {
    accessorKey: "isPublished",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const isPublished = row.getValue("isPublished") || false;
      return (
        <Badge
          className={cn(
            "bg-slate-400 text-white",
            isPublished && "bg-blue-700 text-white"
          )}
        >
          {isPublished ? "Published" : "Draft"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: () => <div>Actions</div>,
    enableHiding: false,
    cell: ({ row }) => {
      const { _id } = row.original;

      const axiosInstance = useAxiosInstance();
      const showToast = useShowToast();
      const navigate = useNavigate();

      const onDelete = async () => {
        try {
          await axiosInstance.delete(`/tasks/${_id}`);
          navigate(`/clients/my-tasks`);
          showToast("Success", "Task deleted", "success");
          window.location.reload();
        } catch (error) {
          console.log(error);
          showToast("Error", "Something went wrong", "error");
        }
      };

      return (
        <div className="flex gap-2 items-center">
          <Link to={`/clients/edit-task/${_id}`}>
            <Pencil className="h-4 w-4 mr-2" />
          </Link>

          <ConfirmModal onConfirm={onDelete}>
            <MdDelete size={25} color="blue.300" cursor={"pointer"} />
          </ConfirmModal>
        </div>
      );
    },
  },
];
