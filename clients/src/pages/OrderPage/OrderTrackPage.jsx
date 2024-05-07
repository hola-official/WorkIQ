import React, { useState, useEffect } from "react";
import SidebarWithHeader from "@/SidebarWithHeader";
import { Breadcrumbs, Tooltip } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { Avatar, Card, Typography } from "@material-tailwind/react";
import { Button, Divider } from "@chakra-ui/react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

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
    days: 15,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Function to update countdown every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => {
        // Calculate new countdown values
        const newSeconds = prevCountdown.seconds - 1;
        const newMinutes = prevCountdown.minutes - (newSeconds < 0 ? 1 : 0);
        const newHours = prevCountdown.hours - (newMinutes < 0 ? 1 : 0);
        const newDays = prevCountdown.days - (newHours < 0 ? 1 : 0);

        // Update countdown
        return {
          days: newDays,
          hours: newHours < 0 ? 23 : newHours,
          minutes: newMinutes < 0 ? 59 : newMinutes,
          seconds: newSeconds < 0 ? 59 : newSeconds,
        };
      });
    }, 1000);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []); // Empty dependency array to run effect only once on mount

  return (
    <SidebarWithHeader>
      <div className="flex px-10 sm:px-24 md:px-20 lg:px-0 lg:py-4 lg:flex-row flex-col  justify-around">
        <div className="flex flex-col items-center gap-2 py-8 px-4">
          <div class="flex w-full justify-center bg-gray-200 rounded-md shadow-inner">
            <div className="px-4 py-4">
              <div>
                <div className="flex gap-2 items-center justify-center">
                  <Avatar
                    src={"/portrait.jpg"}
                    alt="freelancer"
                    size={"xl"}
                    // className="rounded-full h-[74px] w-[74px]"
                  />
                  <h1 className="text-lg lg:text-xl">
                    timestamp as input and returns a formatted
                  </h1>
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
                  <p className="text-gray-500 text-sm">May 25, 2025</p>
                </div>

                <Card className="h-full w-full shadow mt-2">
                  <table className=" w-full table-auto text-left">
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
                      {TABLE_ROWS.map(({ title, date, amount }, index) => {
                        const isLast = index === TABLE_ROWS.length - 1;
                        const classes = isLast
                          ? "p-4"
                          : "p-4 border-b border-blue-gray-50";
                        const display = "hidden md:block";

                        return (
                          <tr key={title}>
                            <td className={classes}>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal text-sm lg:text-base"
                              >
                                {title}
                              </Typography>
                            </td>
                            <td className={classes}>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {date}
                              </Typography>
                            </td>
                            <td className={classes}>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {amount}
                              </Typography>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </Card>
              </div>
            </div>
          </div>

          <div class="flex w-full justify-center bg-gray-200 rounded-md shadow-inner">
            <div className="px-4 py-4">
              <div className="grid grid-flow-col gap-5 text-center auto-cols-max text-blue-500">
                <div className="flex flex-col p-2 bg-neutral rounded-box ">
                  <span className="countdown font-mono text-5xl">
                    <span style={{ "--value": countdown.days }}></span>
                  </span>
                  days
                </div>
                <div className="flex flex-col p-2 bg-neutral rounded-box ">
                  <span className="countdown font-mono text-5xl">
                    <span style={{ "--value": countdown.hours }}></span>
                  </span>
                  hours
                </div>
                <div className="flex flex-col p-2 bg-neutral rounded-box ">
                  <span className="countdown font-mono text-5xl">
                    <span style={{ "--value": countdown.minutes }}></span>
                  </span>
                  min
                </div>
                <div className="flex flex-col p-2 bg-neutral rounded-box ">
                  <span className="countdown font-mono text-5xl">
                    <span style={{ "--value": countdown.seconds }}></span>
                  </span>
                  sec
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-center md:justify-between items-center">
            <Button colorScheme={"blue"} size={["lg", "md"]}>
              Approve Delivery
            </Button>
            <Button variant={"ghost"} size={["lg", "md"]}>
              Cancel Order
            </Button>
          </div>
        </div>

        <div class="flex w-full lg:w-[60%] justify-center bg-gray-200 rounded-md  shadow-inner">
          <div className="px-4 py-4 w-full">
            <div className="w-full">
              <div className="flex justify-between items-center">
                <p className="text-gray-500">order status</p>
                <Badge
                  className={cn(
                    "bg-blue-400 text-white hover:none"
                    // isPublished && "bg-green-700 text-white"
                  )}
                >
                  <Tooltip
                    placement="top"
                    animate={{
                      mount: { scale: 1, y: 0 },
                      unmount: { scale: 0, y: 25 },
                    }}
                    className="hidden md:block"
                    content="The seller started working on the order."
                  >
                    in-progress
                  </Tooltip>
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-500">order Price</p>
                <p>$50</p>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1">
                  <p className="text-gray-500">Due In</p>
                  <Tooltip
                    placement="bottom"
                    animate={{
                      mount: { scale: 1, y: 0 },
                      unmount: { scale: 0, y: 25 },
                    }}
                    className="border border-blue-gray-50 bg-white px-4 py-3 shadow-inner"
                    content={
                      <div>
                        <Typography color="blue-gray" className="text-xs">
                          This is the amount of time the freelancer has left to
                          complete the order.
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal text-xs opacity-80"
                        >
                          Did you know that you can cancel overdue orders and
                          receive an instant refund? <br /> You can also wait
                          for the seller to finish an overdue order. <br />
                          WorkIQ doesn't cancel overdue orders automatically.
                        </Typography>
                      </div>
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      className="h-4 w-4 cursor-pointer text-blue-gray-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                      />
                    </svg>
                  </Tooltip>
                </div>
                <p>2 d 14 h</p>
              </div>
            </div>

            <Divider variant={'solid'} size={'xl'} />

            <div className="flex justify-between mt-2">
              
              <p>freelancer</p>
              <div className="flex items-center justify-center">
                <div>
                  <h3>hishola</h3>
                  <h3>Muhammed Musa</h3>
                </div>
                <Avatar
                  src={"/portrait.jpg"}
                  alt="freelancer"
                  size={"lg"}
                  // className="rounded-full h-[74px] w-[74px]"
                />
              </div>

            </div>

          </div>
        </div>
      </div>
    </SidebarWithHeader>
  );
};

export default OrderTrackPage;
