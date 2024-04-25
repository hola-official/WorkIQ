import React from "react";
import { Modal, Form, message } from "antd";
import StripeCheckout from "react-stripe-checkout";
import { useAxiosInstance } from "../../../../api/axios";
import { Button } from "@chakra-ui/react";

const apiKey = import.meta.env.VITE_STRIPE_KEY;

function DepositModal({ showDepositModal, setShowDepositModal, reloadData }) {
  const [form] = Form.useForm();
  // const dispatch = useDispatch();
  const axiosInstance = useAxiosInstance();

  const DepositFunds = async (payload) => {
    try {
      const { data } = await axiosInstance.post(
        "transactions/deposit-funds",
        payload
      );
      return data;
    } catch (error) {
      return error.response.data;
    }
  };

  const onToken = async (token) => {
    try {
      const response = await DepositFunds({
        token,
        amount: form.getFieldValue("amount"),
      });
      // dispatch(HideLoading());
      if (response.success) {
        reloadData();
        setShowDepositModal(false);
        message.success(response.message);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      // dispatch(HideLoading());
      message.error(error.message);
    }
  };

  return (
    <Modal
      title="Deposit"
      open={showDepositModal}
      onCancel={() => setShowDepositModal(false)}
      footer={null}
    >
      <div className="flex-col gap-1">
        <Form layout="vertical" form={form}>
          <Form.Item
            label="Amount"
            name="amount"
            rules={[
              {
                required: true,
                message: "Please input amount",
              },
            ]}
          >
            <input type="number" />
          </Form.Item>

          <div className="flex justify-end gap-1">
            <Button variant={'outline'}>Cancel</Button>
            <StripeCheckout
              token={onToken}
              currency="USD"
              amount={form.getFieldValue("amount") * 100}
              shippingAddress
              stripeKey={apiKey}
            >
              <Button colorScheme='blue' size={['lg', 'md', 'sm']}>Deposit</Button>
            </StripeCheckout>
          </div>
        </Form>
      </div>
    </Modal>
  );
}

export default DepositModal;
