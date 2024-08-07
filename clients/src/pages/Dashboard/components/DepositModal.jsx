import React, { useState } from "react";
import { Modal, message } from "antd";
import StripeCheckout from "react-stripe-checkout";
import { useAxiosInstance } from "../../../../api/axios";
import { Button, Input, InputGroup, InputLeftElement, InputRightElement, Stack } from "@chakra-ui/react";
import useShowToast from "@/hooks/useShowToast";
import { useSetRecoilState, useRecoilState, useRecoilValue } from "recoil";
import userAtom from "@/atoms/userAtom";
import { prevPathAtom } from "@/atoms/prevPathAtom";
import { useNavigate } from "react-router-dom";
import { CheckIcon } from "@chakra-ui/icons";

const apiKey = import.meta.env.VITE_STRIPE_KEY;

function DepositModal({ showDepositModal, setShowDepositModal, reloadData }) {
  const showToast = useShowToast();
  const [amount, setAmount] = useState("");
  const axiosInstance = useAxiosInstance();
  const user = useRecoilValue(userAtom)
  const setUser = useSetRecoilState(userAtom);
  // const navigate = useNavigate();

  const DepositFunds = async (payload) => {
    try {
      const { data } = await axiosInstance.post("transactions/deposit-funds", {
        token: payload,
        amount: parseFloat(amount),
      });
      if (data.status === "success") {
        setShowDepositModal(false);
        showToast("Success", `${data.message}`, "success");
        console.log(data)

        const newBalance = user.balance + data.data.depositAmount
        console.log(newBalance)


        const updatedUser = { ...user, balance: newBalance };
        console.log(updatedUser)



      }
      return data;
    } catch (error) {
      console.log("Backend error:", error);
      return error.response.data;
    }
  };

  const onToken = async (token) => {
    try {
      console.log("Token received:", token);
      console.log("Amount to deposit (dollars):", amount);
      const response = await DepositFunds(token);

      const newBalance = user.balance + response.data.amount;
      if (response.success) {
        setShowDepositModal(false);
        showToast("Success", `${response.message}`, "success");
        const updatedUser = { ...user, balance: newBalance };
        setUser(updatedUser);
      } else {
        showToast("Error", `${response.message}`, "error");
      }
    } catch (error) {
      console.log("Error in onToken:", error);
      showToast("Error", `${error.message}`, "error");
    }
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (isNaN(value) || value <= 0) {
      showToast("Error", "Please enter a valid amount greater than $0.50", "error");
      setAmount("");
    } else {
      setAmount(value);
    }
  };

  return (
    <Modal
      title="Deposit"
      open={showDepositModal}
      onCancel={() => setShowDepositModal(false)}
      footer={null}
    >
      <form layout="vertical">
        <div className="flex-col gap-2">
          <div className="mb-2">

            <Stack spacing={4}>
              <InputGroup>
                <InputLeftElement pointerEvents='none' color='gray.300' fontSize='1.2em'>
                  $
                </InputLeftElement>
                <Input
                  placeholder='Enter amount' type="number"
                  id="amount"
                  value={amount}
                  onChange={handleAmountChange}
                  required
                />
                <InputRightElement>
                  <CheckIcon color='green.500' />
                </InputRightElement>
              </InputGroup>
            </Stack>
          </div>

          <div className="flex justify-end gap-1">
            <Button
              variant={"outline"}
              size={["sm", "md"]}
              onClick={() => setShowDepositModal(false)}
            >
              Cancel
            </Button>
            <StripeCheckout
              token={onToken}
              currency="USD"
              amount={parseFloat(amount) * 100} // Convert the amount to cents for Stripe
              shippingAddress
              billingAddress
              stripeKey={apiKey}
            >
              <Button colorScheme="blue" size={["sm", "md"]} disabled={!amount}>
                Deposit
              </Button>
            </StripeCheckout>
          </div>
        </div>
      </form>
    </Modal>
  );
}

export default DepositModal;
