import authScreenAtom from "@/atoms/authAtom";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { FaFireAlt } from "react-icons/fa";
import { useSetRecoilState } from "recoil";

const HeroSection = () => {
  const setAuthScreen = useSetRecoilState(authScreenAtom);
  const navigate = useNavigate();

  const handleRegister = () => {
    setAuthScreen("signup");
    navigate("/auth");
  };
  return (
    <div className="bg-[#134848] flex justify-between items-center bg-[left_top_-14rem] ">
      <div className="grid grid-cols-2 items-center py-8 px-8">
        <div className="flex flex-col gap-3">
          <div className=" flex flex-col gap-2 lg:gap-[20px] text-5xl font-bold text-white">
            <h2>WORKIQ</h2>
            <h4>FUTURE OF FREELANCING IS DECENTRALIZED</h4>
          </div>
          <div className="text-xl text-gray-400">
            <p>Hire an Expert or Be an Expert.</p>
            <p>
              In the ever-evolving landscape of skills and knowledge, the choice
              between hiring an expert or becoming one yourself is a pivotal
              decision.
            </p>
          </div>

          <div>
            <Button
              onClick={handleRegister}
              colorScheme={"blue"}
              leftIcon={<FaFireAlt />}
              size={["sm", "md", "lg"]}
            >
              Get Started
            </Button>
          </div>
        </div>
        <div className="flex items-center flex-col justify-end">
          <img src="/heroImg.png" alt="freelance" />
          <div className="flex gap-2">
            <img src="/heroImg.png" alt="freelance" />
            <img src="/heroImg2.png" alt="freelance" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
