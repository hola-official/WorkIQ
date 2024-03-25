import React from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { formatPrice } from "@/lib/format";
import { useRecoilValue } from "recoil";
import userAtom from "@/atoms/userAtom";

const Dashboard = () => {
  const user = useRecoilValue(userAtom);
  return (
    <div className="flex flex-col px-4 py-4 gap-4">
      <div>
        <h2 className="text-2xl text-gray-600">Hello {user.username} 👋</h2>
        <p className="text-sm text-gray-600 font-semibold">
          Let’s learn something new today!
        </p>
      </div>
      <div className="flex justify-between items-center ">
        <div className="flex justify-center py-8 items-center gap-2 w-[250px] rounded-md shadow-lg px-4">
          <div className="flex flex-col gap-1">
            <p className="text-xl"> {formatPrice(user.balance)}</p>
            <p className="text-sm text-gray-600 font-semibold">Balance</p>
          </div>
          <IoMdCheckmarkCircleOutline className="w-12 h-12 text-blue-500" />
        </div>

        <div className="flex justify-center py-8 items-center w-[250px] rounded-md shadow-lg px-4">
          <div className="flex flex-col gap-1">
            <p className="text-xl">10</p>
            <p className="text-sm text-gray-600 font-semibold">Balance</p>
          </div>
          <IoMdCheckmarkCircleOutline className="w-12 h-12 text-blue-500" />
        </div>

        <div className="flex justify-center py-8 items-center w-[250px] rounded-md shadow-lg px-4">
          <div className="flex flex-col gap-1">
            <p className="text-xl">10</p>
            <p className="text-sm text-gray-600 font-semibold">Balance</p>
          </div>
          <IoMdCheckmarkCircleOutline className="w-12 h-12 text-blue-500" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
