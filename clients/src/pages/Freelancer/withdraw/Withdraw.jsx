import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@chakra-ui/react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { DollarSign, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { useAxiosInstance } from "../../../../api/axios";
import useShowToast from "@/hooks/useShowToast";
import { useRecoilValue, useSetRecoilState } from "recoil";
import userAtom from "@/atoms/userAtom";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Withdraw = ({ showModal, setShowModal }) => {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [payoutDetails, setPayoutDetails] = useState(null);
  const axiosInstance = useAxiosInstance();
  const showToast = useShowToast();
  const user = useRecoilValue(userAtom);
  const setUser = useSetRecoilState(userAtom);

  const fetchPayoutDetails = async () => {
    setIsLoading(true);
    try {
      const { data } = await axiosInstance.get("transactions/payout-details");
      setPayoutDetails(data);
    } catch (error) {
      console.error("Failed to fetch payout details:", error);
      setError("Failed to fetch payout details. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchPayoutDetails();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    if (parseFloat(amount) > payoutDetails.availableBalance) {
      setError("Withdrawal amount exceeds available balance");
      return;
    }

    try {
      const { data } = await axiosInstance.post("transactions/withdraw", {
        amount: parseFloat(amount),
      });
      setSuccess("Withdrawal initiated successfully!");
      showToast("Success", "Withdrawal initiated successfully!", "success");
      setAmount("");

      // Update user balance
      const newBalance = user.balance - parseFloat(amount);
      const updatedUser = { ...user, balance: newBalance };
      setUser(updatedUser);

      // Refresh payout details
      fetchPayoutDetails();
    } catch (error) {
      console.error("Failed to initiate withdrawal:", error);
      setError("Failed to initiate withdrawal. Please try again later.");
      showToast("Error", "Failed to initiate withdrawal", "error");
    }
  };

  // const handleCloseModal = () => {
  //   setSuccess(""); // Reset success message when closing modal
  //   setShowModal(false);
  // };

  let buttonText = "Initiate Withdrawal";
  if (isLoading) {
    buttonText = (
      <>
        <Loader2 key="loader" className="mr-2 h-4 w-4 animate-spin" /> Please
        wait
      </>
    );
  }

  if (isLoading && !payoutDetails) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading payout details...
      </div>
    );
  }

  return (
    <>
      <motion.p
        onClick={() => setShowModal(true)}
        whilehover={{ scale: 1.05 }}
        // whiletap={{ scale: 0.95 }}
        className="cursor-pointer"
      >
        Withdraw
      </motion.p>
      <AlertDialog
        open={showModal}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setSuccess(""); // Reset success message when closing modal
            setShowModal(false);
          }
        }}
      >
        <AlertDialogContent
          as={motion.div}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          <Card
            className="w-full max-w-md"
            as={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Initiate Withdrawal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    Available Balance:
                  </span>
                  <motion.span
                    className="text-lg font-semibold"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    ${payoutDetails?.availableBalance.toFixed(2)}
                  </motion.span>
                </div>
                {payoutDetails?.bankAccount ? (
                  <motion.div
                    className="text-sm text-gray-600"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    Bank Account: **** {payoutDetails?.bankAccount.last4} (
                    {payoutDetails.bankAccount.bank_name})
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        No bank account set up. Please set up a bank account in
                        your Stripe dashboard.
                      </AlertDescription>
                    </Alert>

                    <div className="mt-2">
                      <Link to={'/stripe-connect/refresh'}>
                        <Button className={'w-full'}>
                          Connect to stripe
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                )}
                <motion.form
                  onSubmit={handleSubmit}
                  className="space-y-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="space-y-2">
                    <Label htmlFor="amount">Withdrawal Amount</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400" />
                      <Input
                        type="number"
                        id="amount"
                        disabled={!payoutDetails?.availableBalance}
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        step="0.01"
                        min="0.01"
                        max={payoutDetails?.availableBalance}
                        className="pl-10"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    colorScheme={'blue'}
                    borderRadius={'md'}
                    disabled={
                      !payoutDetails?.bankAccount ||
                      isLoading ||
                      !payoutDetails?.availableBalance ||
                      payoutDetails?.availableBalance < amount
                    }
                    as={motion.button}
                    whilehover={{ scale: 1.05 }}
                    whiletap={{ scale: 0.95 }}
                  >
                    {!payoutDetails?.availableBalance ||
                      payoutDetails?.availableBalance < amount
                      ? "Insufficient Balance"
                      : buttonText}
                  </Button>
                </motion.form>
              </motion.div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                </motion.div>
              )}
              {success && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <Alert
                    variant="success"
                    className="bg-green-50 text-green-700 border-green-200"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    <AlertDescription>{success}</AlertDescription>
                  </Alert>
                </motion.div>
              )}
            </CardFooter>
          </Card>
          <AlertDialogFooter
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <AlertDialogCancel onClick={() => setShowModal(false)}>
              Close
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Withdraw;
