import React, { useState } from "react";
import {
  Modal,
  // Form,
  message,
} from "antd";
// import { Modal, useDisclosure } from "@chakra-ui/react";
import StripeCheckout from "react-stripe-checkout";
import { useAxiosInstance } from "../../../../api/axios";
import { Button, Input } from "@chakra-ui/react";
import useShowToast from "@/hooks/useShowToast";
import tokenAtom from "@/atoms/tokenAtom";
import { useRecoilValue } from "recoil";

const apiKey = import.meta.env.VITE_STRIPE_KEY;

function DepositModal({ showDepositModal, setShowDepositModal, reloadData }) {
  // const [form] = Form.useForm();
  const showToast = useShowToast();
  const [amount, setAmount] = useState();
  const axiosInstance = useAxiosInstance();
  // const token = useRecoilValue(tokenAtom);
  // const { isOpen, onOpen, onClose } = useDisclosure()

  const DepositFunds = async (payload) => {
    try {
      const { data } = await axiosInstance.post("transactions/deposit-funds", {
        token: payload,
        amount: amount,
      });
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      return error.response.data;
    }
  };

  const onToken = async (token) => {
    try {
      const response = await DepositFunds(token);
      console.log(response);
      if (response.success) {
        setShowDepositModal(false);
        showToast("Success", `${response.message}`, "success");
      } else {
        showToast("Error", `${response.message}`, "error");
      }
    } catch (error) {
      console.log(error);
      showToast("Error", `${error.message}`, "error");
    }
  };

  return (
    <Modal
      title="Deposit"
      open={showDepositModal}
      onCancel={() => setShowDepositModal(false)}
      footer={null}
    >
      <form
        layout="vertical"
        // form={form}
      >
        <div className="flex-col gap-2">
          <div className="mb-2">
            <Input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-end gap-1">
            <Button variant={"outline"} size={["sm", "md"]}>Cancel</Button>
            <StripeCheckout
              token={onToken}
              currency="USD"
              amount={parseFloat(amount) * 100}
              shippingAddress
              billingAddress
              stripeKey={apiKey}
            >
              <Button colorScheme="blue" size={["sm", "md"]}>
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
