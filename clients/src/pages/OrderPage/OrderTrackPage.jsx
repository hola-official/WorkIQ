// import React, { useState, useEffect } from "react";
// import SidebarWithHeader from "@/SidebarWithHeader";
// import { Breadcrumbs, Tooltip } from "@material-tailwind/react";
// import { Link, useParams } from "react-router-dom";
// import { Avatar, Card, Typography } from "@material-tailwind/react";
// import {
//   Button,
//   Divider,
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalFooter,
//   ModalBody,
//   ModalCloseButton,
// } from "@chakra-ui/react";
// import { Badge } from "@/components/ui/badge";
// import { cn } from "@/lib/utils";
// import { useAxiosInstance } from "../../../api/axios";
// import useShowToast from "@/hooks/useShowToast";
// import { formatPrice } from "@/lib/format";
// import useAuth from "@/hooks/useAuth";
// import { ConfirmModal } from "@/ui/confirm-modal";

// const TABLE_HEAD = ["Section", "Delivery", "Amount"];

// const TABLE_ROWS = [
//   {
//     title: "timestamp as input and returns a formatted",
//     date: "5d",
//     amount: "$50",
//   },
// ];

// const OrderTrackPage = () => {
//   // State to store countdown values
//   const [countdown, setCountdown] = useState({
//     days: 0,
//     hours: 0,
//     minutes: 0,
//     seconds: 0,
//   });
//   const { orderId } = useParams();

//   const axiosInstance = useAxiosInstance();
//   const { _id } = useAuth();
//   const [order, setOrder] = useState({});
//   const [section, setSection] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [isCountdownComplete, setIsCountdownComplete] = useState(false);
//   const showToast = useShowToast();

//   useEffect(() => {
//     const getOrders = async () => {
//       try {
//         const res = await axiosInstance.get(`order/track/${orderId}`);
//         const data = res.data;

//         if (data.error) {
//           showToast("Error", data.error, "error");
//           return;
//         }

//         setOrder(data.order);
//         setSection(data.section);
//       } catch (error) {
//         console.log(error);
//         showToast("Error", error.response.data.message, "error");
//       } finally {
//         setLoading(false);
//       }
//     };

//     getOrders();
//   }, [showToast, orderId]);

//   useEffect(() => {
//     const calculateCountdown = () => {
//       if (!order.createdAt) return;

//       const createdAtDate = new Date(order.createdAt);
//       const currentDate = new Date();

//       const difference = currentDate - createdAtDate;

//       let remaining = section.durationDays * 24 * 60 * 60 * 1000 - difference;

//       const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
//       remaining -= days * 1000 * 60 * 60 * 24;
//       const hours = Math.floor(remaining / (1000 * 60 * 60));
//       remaining -= hours * 1000 * 60 * 60;
//       const minutes = Math.floor(remaining / (1000 * 60));
//       remaining -= minutes * 1000 * 60;
//       const seconds = Math.floor(remaining / 1000);

//       if (days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0) {
//         clearInterval(interval);
//         setIsCountdownComplete(true);
//         if (_id === order.freelancer) {
//           setErrorMessage("Time's up! The section duration has ended.");
//         }
//       } else {
//         setIsCountdownComplete(false);
//         setCountdown({ days, hours, minutes, seconds });
//       }
//     };

//     calculateCountdown();

//     const interval = setInterval(calculateCountdown, 1000);

//     return () => clearInterval(interval);
//   }, [order, section, _id]);

//   const handleMarkCompleted = async () => {
//     // Implement mark as completed functionality
//     try {
//       const res = await axiosInstance.put(`order/${orderId}/approve`);
//       const data = await res.data;
//       if (data.error) {
//         showToast("Error", data.error, "error");
//         return;
//       }

//       showToast("Success", data.message, "success");
//       console.log(data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // const handleDeliver = async () => {
//   //   try {
//   //     const res = await axiosInstance.put(`order/${orderId}/deliver`);
//   //     const data = await res.data;
//   //     console.log(data);
//   //   } catch (error) {
//   //     console.log(error);
//   //   }
//   // };

//   const handleCancelOrder = async () => {
//     // Implement cancel order functionality
//     try {
//       const res = await axiosInstance.put(`order/cancel/${orderId}`);
//       const data = await res.data;
//       if (data.error) {
//         showToast("Error", data.error, "error");
//         return;
//       }

//       showToast("Success", data.message, "success");
//       console.log(data);

//       setShowModal(false)
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleConfirmDelivery = async () => {
//     // Implement delivery confirmation functionality
//     // Close the modal
//     try {
//       const res = await axiosInstance.put(`order/${orderId}/deliver`);
//       const data = await res.data;
//       if (data.error) {
//         showToast("Error", data.error, "error");
//         return;
//       }

//       showToast("Success", data.message, "success");
//       console.log(data);

//       setShowModal(false)
//     } catch (error) {
//       console.log(error);
//     }
//   };



//   const handleCloseModal = () => {
//     setShowModal(false)
//   }

//   const handleOpenModal = () => {
//     setShowModal(true)
//   }

//   if (loading) return <p>Fetching all client tasks</p>;

//   const countdownClass = isCountdownComplete ? "text-red-500" : "text-blue-500";
//   const classes = "p-4 border-b border-blue-gray-50";

//   return (
//     <SidebarWithHeader>
//       <div className="flex px-10 sm:px-24 md:px-20 lg:px-0 lg:py-4 lg:flex-row flex-col  justify-center">
//         <div className="flex flex-col items-center gap-2 py-8 px-4">
//           <div class="flex w-full justify-center bg-gray-200 rounded-md shadow-inner">
//             <div className="px-4 py-4">
//               <div>
//                 <div className="flex gap-2 items-center justify-center">
//                   <Avatar
//                     src={"/mm avatar.jpg"}
//                     alt="freelancer"
//                     size={"xl"}
//                   // className="rounded-full h-[74px] w-[74px]"
//                   />
//                   <h1 className="text-lg lg:text-xl">{section?.title}</h1>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <div className="hidden md:block">
//                     <Breadcrumbs separator=">">
//                       <Link to="/dashboard" className="opacity-60">
//                         Dashboard
//                       </Link>
//                       <Link to="/manage-orders" className="opacity-60">
//                         My Orders
//                       </Link>
//                     </Breadcrumbs>
//                   </div>
//                   <p className="text-gray-500 text-sm">
//                     {new Date(order?.createdAt).toLocaleString()}
//                   </p>
//                 </div>

//                 <Card className="h-full w-full shadow mt-2">
//                   <table className=" w-full table-auto text-left">
//                     <thead>
//                       <tr>
//                         {TABLE_HEAD.map((head) => (
//                           <th
//                             key={head}
//                             className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
//                           >
//                             <Typography
//                               variant="small"
//                               color="blue-gray"
//                               className="font-normal leading-none opacity-70"
//                             >
//                               {head}
//                             </Typography>
//                           </th>
//                         ))}
//                       </tr>
//                     </thead>
//                     <tbody>
//                       <tr>
//                         <td className={classes}>
//                           <Typography
//                             variant="small"
//                             color="blue-gray"
//                             className="font-normal text-sm lg:text-base"
//                           >
//                             {section.title}
//                           </Typography>
//                         </td>
//                         <td className={classes}>
//                           <Typography
//                             variant="small"
//                             color="blue-gray"
//                             className="font-normal"
//                           >
//                             {section.durationDays}d
//                           </Typography>
//                         </td>
//                         <td className={classes}>
//                           <Typography
//                             variant="small"
//                             color="blue-gray"
//                             className="font-normal"
//                           >
//                             {formatPrice(order.sectionPrice)}
//                           </Typography>
//                         </td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </Card>
//               </div>
//             </div>
//           </div>

//           <div class="flex w-full justify-center bg-gray-200 rounded-md shadow-inner">
//             <div className="px-4 py-4">
//               <div className={`grid grid-flow-col gap-5 text-center auto-cols-max ${countdownClass}`}>
//                 <div className="flex flex-col p-2 bg-neutral rounded-box">
//                   <span className="countdown font-mono text-5xl">
//                     <span style={{ "--value": countdown.days }}></span>
//                   </span>
//                   days
//                 </div>
//                 <div className="flex flex-col p-2 bg-neutral rounded-box">
//                   <span className="countdown font-mono text-5xl">
//                     <span style={{ "--value": countdown.hours }}></span>
//                   </span>
//                   hours
//                 </div>
//                 <div className="flex flex-col p-2 bg-neutral rounded-box">
//                   <span className="countdown font-mono text-5xl">
//                     <span style={{ "--value": countdown.minutes }}></span>
//                   </span>
//                   min
//                 </div>
//                 <div className="flex flex-col p-2 bg-neutral rounded-box">
//                   <span className="countdown font-mono text-5xl">
//                     <span style={{ "--value": countdown.seconds }}></span>
//                   </span>
//                   sec
//                 </div>
//               </div>

//               {errorMessage && _id === order.freelancer && (
//                 <p className="text-red-500 mt-4">{errorMessage}</p>
//               )}

//             </div>
//           </div>
//           <div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-4">
//             {_id === order.client ? (

//               order.status === "completed" ? (
//                 <Button
//                   id="markCompletedButton"
//                   isDisabled
//                   colorScheme={"blue"}
//                   size={["lg", "md"]}
//                 >
//                   Order Completed
//                 </Button>
//               ) : (
//                 <ConfirmModal onConfirm={handleMarkCompleted}>
//                   <Button
//                     id="markCompletedButton"
//                     colorScheme={"blue"}
//                     size={["lg", "md", 'sm']}
//                   // onClick={handleMarkCompleted}
//                   >
//                     Mark as Completed
//                   </Button>
//                 </ConfirmModal>

//               )
//             ) : (

//               order.status === "delivered" ? (
//                 <Button
//                   id="deliverButton"
//                   float={"right"}
//                   colorScheme={"blue"}
//                   size={["lg", "md"]}
//                   isDisabled
//                 >
//                   Delivered
//                 </Button>
//               )
//                 : (
//                   <Button
//                     id="deliverButton"
//                     float={"right"}
//                     colorScheme={"blue"}
//                     size={["lg", "md", 'sm']}
//                     onClick={handleOpenModal}
//                   >
//                     Deliver
//                   </Button>
//                 )
//             )}
//             {_id === order.client && (
//               order.status === "completed" ? (
//                 <Button
//                   id="cancelOrderButton"
//                   variant={"ghost"}
//                   size={["lg", "md"]}
//                   isDisabled
//                 >
//                   Cancel Order
//                 </Button>
//               ) : (
//                 <ConfirmModal onConfirm={handleCancelOrder}>
//                   <Button
//                     id="cancelOrderButton"
//                     variant={"ghost"}
//                     size={["lg", "md", 'sm']}
//                   >
//                     Cancel Order
//                   </Button>
//                 </ConfirmModal>

//               )
//             )}
//           </div>

//         </div>

//         <div class="flex w-full lg:w-[60%] justify-center bg-gray-200 rounded-md  shadow-inner">
//           <div className="px-4 py-4 w-full">
//             <div className="w-full">
//               <div className="flex justify-between items-center">
//                 <p className="text-gray-500">order status</p>
//                 <Badge
//                   className={cn(
//                     "bg-blue-400 text-white hover:none"
//                     // isPublished && "bg-green-700 text-white"
//                   )}
//                 >
//                   <Tooltip
//                     placement="top"
//                     animate={{
//                       mount: { scale: 1, y: 0 },
//                       unmount: { scale: 0, y: 25 },
//                     }}
//                     className="hidden md:block"
//                     content="The seller started working on the order."
//                   >
//                     {order.status}
//                   </Tooltip>
//                 </Badge>
//               </div>
//               <div className="flex justify-between items-center">
//                 <p className="text-gray-500">order Price</p>
//                 <p>{formatPrice(order.sectionPrice)}</p>
//               </div>

//               <div className="flex justify-between items-center">
//                 <div className="flex items-center gap-1">
//                   <p className="text-gray-500">Due In</p>
//                   <Tooltip
//                     placement="bottom"
//                     animate={{
//                       mount: { scale: 1, y: 0 },
//                       unmount: { scale: 0, y: 25 },
//                     }}
//                     className=" border-blue-gray-50 bg-white px-4 py-3 shadow-inner"
//                     content={
//                       <div>
//                         <Typography color="blue-gray" className="text-xs">
//                           This is the amount of time the freelancer has left to
//                           complete the order.
//                         </Typography>
//                         <Typography
//                           variant="small"
//                           color="blue-gray"
//                           className="font-normal text-xs opacity-80"
//                         >
//                           Did you know that you can cancel overdue orders and
//                           receive an instant refund? <br /> You can also wait
//                           for the seller to finish an overdue order. <br />
//                           WorkIQ doesn't cancel overdue orders automatically.
//                         </Typography>
//                       </div>
//                     }
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                       strokeWidth={2}
//                       className="h-4 w-4 cursor-pointer text-blue-gray-500"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
//                       />
//                     </svg>
//                   </Tooltip>
//                 </div>
//                 <p className={isCountdownComplete ? "text-red-500" : ""}>{countdown.days}d {countdown.hours} h</p>
//               </div>
//             </div>

//             <Divider variant={"solid"} size={"xl"} />

//             <div className="flex justify-between mt-2">
//               <p>freelancer</p>
//               <div className="flex items-center justify-center">
//                 <div>
//                   <h3>hishola</h3>
//                   <h3>Muhammed Musa</h3>
//                 </div>
//                 <Avatar
//                   src={"/mm avatar.jpg"}
//                   alt="freelancer"
//                   size={"lg"}
//                 // className="rounded-full h-[74px] w-[74px]"
//                 />
//               </div>
//             </div>

//             <div className="flex justify-between mt-2">
//               <p>client</p>
//               <div className="flex items-center justify-center">
//                 <div>
//                   <h3>hishola</h3>
//                   <h3>Muhammed Olayinka</h3>
//                 </div>
//                 <Avatar
//                   src={"/mm avatar.jpg"}
//                   alt="freelancer"
//                   size={"lg"}
//                 // className="rounded-full h-[74px] w-[74px]"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div >

//       {/* Modal */}

//       < Modal isOpen={showModal} onClose={handleCloseModal} >
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader>Confirm Delivery</ModalHeader>
//           <ModalCloseButton />
//           <ModalBody>Are you sure you want to deliver this order?</ModalBody>
//           <ModalFooter>
//             <Button colorScheme="blue" mr={3} onClick={handleConfirmDelivery}>
//               Confirm
//             </Button>
//             <Button variant="ghost" onClick={handleCloseModal}>
//               Cancel
//             </Button>
//           </ModalFooter>
//         </ModalContent>
//       </ Modal>
//     </SidebarWithHeader >
//   );
// };

// export default OrderTrackPage;


import React, { useState, useEffect } from "react";
import SidebarWithHeader from "@/SidebarWithHeader";
import { Breadcrumbs, Tooltip } from "@material-tailwind/react";
import { Link, useParams } from "react-router-dom";
import { Avatar, Card, Typography } from "@material-tailwind/react";
import {
  Button,
  Divider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useAxiosInstance } from "../../../api/axios";
import useShowToast from "@/hooks/useShowToast";
import { formatPrice } from "@/lib/format";
import useAuth from "@/hooks/useAuth";
import { ConfirmModal } from "@/ui/confirm-modal";

const TABLE_HEAD = ["Section", "Delivery", "Amount"];

const TABLE_ROWS = [
  {
    title: "timestamp as input and returns a formatted",
    date: "5d",
    amount: "$50",
  },
];

const OrderTrackPage = () => {
  // State to store countdown values
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const { orderId } = useParams();

  const axiosInstance = useAxiosInstance();
  const { _id } = useAuth();
  const [order, setOrder] = useState({});
  const [section, setSection] = useState({});
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isCountdownComplete, setIsCountdownComplete] = useState(false);
  const showToast = useShowToast();

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await axiosInstance.get(`order/track/${orderId}`);
        const data = res.data;

        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }

        setOrder(data.order);
        setSection(data.section);
      } catch (error) {
        console.log(error);
        showToast("Error", error.response.data.message, "error");
      } finally {
        setLoading(false);
      }
    };

    getOrders();
  }, [showToast, orderId]);

  useEffect(() => {
    const calculateCountdown = () => {
      if (!order.createdAt || order.status === "completed") return;

      const createdAtDate = new Date(order.createdAt);
      const currentDate = new Date();

      const difference = currentDate - createdAtDate;

      let remaining = section.durationDays * 24 * 60 * 60 * 1000 - difference;

      const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
      remaining -= days * 1000 * 60 * 60 * 24;
      const hours = Math.floor(remaining / (1000 * 60 * 60));
      remaining -= hours * 1000 * 60 * 60;
      const minutes = Math.floor(remaining / (1000 * 60));
      remaining -= minutes * 1000 * 60;
      const seconds = Math.floor(remaining / 1000);

      if (days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0) {
        clearInterval(interval);
        setIsCountdownComplete(true);
        if (_id === order.freelancer) {
          setErrorMessage("Time's up! The section duration has ended.");
        }
      } else {
        setIsCountdownComplete(false);
        setCountdown({ days, hours, minutes, seconds });
      }
    };

    const interval = setInterval(calculateCountdown, 1000);

    if (order.status === "completed") {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [order, section, _id]);

  const handleMarkCompleted = async () => {
    // Implement mark as completed functionality
    try {
      const res = await axiosInstance.put(`order/${orderId}/approve`);
      const data = await res.data;
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }

      showToast("Success", data.message, "success");
      setOrder({ ...order, status: "completed" });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelOrder = async () => {
    // Implement cancel order functionality
    try {
      const res = await axiosInstance.put(`order/cancel/${orderId}`);
      const data = await res.data;
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }

      showToast("Success", data.message, "success");
      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleConfirmDelivery = async () => {
    // Implement delivery confirmation functionality
    try {
      const res = await axiosInstance.put(`order/${orderId}/deliver`);
      const data = await res.data;
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }

      showToast("Success", data.message, "success");
      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenModal = (action) => {
    setModalAction(action);
    setShowModal(true);
  };

  if (loading) return <p>Fetching all client tasks</p>;

  const countdownClass = isCountdownComplete ? "text-red-500" : "text-blue-500";
  const classes = "p-4 border-b border-blue-gray-50";

  const status = order.status;
  let statusColor = "text-[#E0BF00]";
  switch (status) {
    case "delivered":
      statusColor = "text-[#7d85f5]";
      break;
    case "completed":
      statusColor = "text-green-700";
      break;
    case "cancelled":
      statusColor = "text-red-700";
      break;
    case "Overdue":
      statusColor = "text-[#E40DC4]";
      break;
  }

  return (
    <SidebarWithHeader>
      <div className="flex px-10 sm:px-24 md:px-20 lg:px-0 lg:py-4 lg:flex-row flex-col justify-center">
        <div className="flex flex-col items-center gap-2 py-8 px-4">
          <div className="flex w-full justify-center bg-gray-200 rounded-md shadow-inner">
            <div className="px-4 py-4">
              <div>
                <div className="flex gap-2 items-center justify-center">
                  <Avatar src={"/mm avatar.jpg"} alt="freelancer" size={"xl"} />
                  <h1 className="text-lg lg:text-xl">{section?.title}</h1>
                </div>
                <div className="flex justify-between items-center">
                  <div className="hidden md:block">
                    <Breadcrumbs separator=">">
                      <Link to="/dashboard" className="opacity-60">
                        Dashboard
                      </Link>
                      <Link to="/manage-orders" className="opacity-60">
                        My Orders
                      </Link>
                    </Breadcrumbs>
                  </div>
                  <p className="text-gray-500 text-sm">
                    {new Date(order?.createdAt).toLocaleString()}
                  </p>
                </div>

                <Card className="h-full w-full shadow mt-2">
                  <table className="w-full table-auto text-left">
                    <thead>
                      <tr>
                        {TABLE_HEAD.map((head) => (
                          <th
                            key={head}
                            className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                          >
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal leading-none opacity-70"
                            >
                              {head}
                            </Typography>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal text-sm lg:text-base"
                          >
                            {section.title}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {section.durationDays}d
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {formatPrice(order.sectionPrice)}
                          </Typography>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Card>
              </div>
            </div>
          </div>

          <div className="flex w-full justify-center bg-gray-200 rounded-md shadow-inner">
            <div className="px-4 py-4">
              <div
                className={`grid grid-flow-col gap-5 text-center auto-cols-max ${countdownClass}`}
              >
                <div className="flex flex-col p-2 bg-neutral rounded-box">
                  <span className="countdown font-mono text-5xl">
                    <span style={{ "--value": countdown.days }}></span>
                  </span>
                  days
                </div>
                <div className="flex flex-col p-2 bg-neutral rounded-box">
                  <span className="countdown font-mono text-5xl">
                    <span style={{ "--value": countdown.hours }}></span>
                  </span>
                  hours
                </div>
                <div className="flex flex-col p-2 bg-neutral rounded-box">
                  <span className="countdown font-mono text-5xl">
                    <span style={{ "--value": countdown.minutes }}></span>
                  </span>
                  min
                </div>
                <div className="flex flex-col p-2 bg-neutral rounded-box">
                  <span className="countdown font-mono text-5xl">
                    <span style={{ "--value": countdown.seconds }}></span>
                  </span>
                  sec
                </div>
              </div>

              <div className="flex items-center justify-center mt-4 gap-2">
                <Badge className={`${statusColor} uppercase`} variant="outline">
                  {order.status}
                </Badge>
              </div>

              <div className="flex items-center justify-center mt-4 gap-2">
                {_id === order.client ? (
                  <>
                    <Button
                      variant="solid"
                      colorScheme="green"
                      onClick={handleMarkCompleted}
                      isDisabled={order.status === "completed"}
                    >
                      Mark Completed
                    </Button>

                    <Button
                      variant="solid"
                      colorScheme="red"
                      onClick={() => handleOpenModal("cancel")}
                      isDisabled={order.status === "completed"}
                    >
                      Cancel Order
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="solid"
                    colorScheme="blue"
                    onClick={() => handleOpenModal("deliver")}
                    isDisabled={order.status === "completed"}
                  >
                    Deliver
                  </Button>
                )}

              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={showModal} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Action</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to{" "}
            {modalAction === "deliver" ? "deliver this order" : "cancel this order"}?
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleCloseModal}>
              Close
            </Button>
            <Button
              colorScheme="red"
              onClick={modalAction === "deliver" ? handleConfirmDelivery : handleCancelOrder}
            >
              {modalAction === "deliver" ? "Deliver Order" : "Cancel Order"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </SidebarWithHeader>
  );
};

export default OrderTrackPage;
