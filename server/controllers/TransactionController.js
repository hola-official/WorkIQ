const stripe = require("stripe")(process.env.STRIPE_KEY);
const { uuid } = require("uuidv4");
const { sendMail } = require("../utils/sendMail.js");
const TransactionModel = require("../Model/TransactionModel");
const userModel = require("../Model/userModel");

const clientUrl = process.env.CLIENT_URL;

const depositFunds = async (req, res) => {
  try {
    const userId = req.userId;
    const { token, amount } = req.body;

    const parsedAmount = parseFloat(amount);

    // Validate the amount
    if (isNaN(parsedAmount) || parsedAmount < 0.5) {
      return res.status(400).json({
        message: "Transaction failed",
        data: "Amount must be at least $0.50 USD",
        success: false,
      });
    }

    // Convert amount to cents for Stripe
    const amountInCents = Math.round(parsedAmount * 100);
    console.log("Amount in cents:", amountInCents); // Log amount in cents

    // Create a customer
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });
    console.log("Customer created:", customer.id); // Log customer ID

    // Create a charge
    const charge = await stripe.charges.create(
      {
        amount: amountInCents,
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
        description: `Deposited to WorkIQ`,
      },
      {
        idempotencyKey: uuid(),
      }
    );
    console.log("Charge created:", charge.status); // Log charge status

    // Save the transaction
    if (charge.status === "succeeded") {
      const user = await userModel.findById(userId);
      if (!user) {
        return res.status(404).json({
          message: "User not found",
          success: false,
        });
      }

      const currentBalance = user.balance;
      const newBalance = Number(currentBalance) + parsedAmount;

      await userModel.findByIdAndUpdate(userId, {
        balance: newBalance,
      });

      const newTransaction = new TransactionModel({
        buyer: userId,
        seller: userId,
        amount: parsedAmount,
        depositAmount: amount,
        type: "deposit",
        reference: "stripe deposit",
        status: "success",
      });

      await newTransaction.save();

      const userData = {
        name: user.name,
        email: user.email,
        location: user.location,
        timestamp: new Date().toLocaleString("default", {
          month: "long",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
        }),
      };

      try {
        await sendMail({
          email: userData.email,
          subject: "Deposit Successful",
          template: "deposit-mail.ejs",
          data: {
            user: { username: user.username },
            amount: parsedAmount,
            time: { timestamp: userData.timestamp },
          },
        });
      } catch (error) {
        console.log("Error sending deposit email:", error);
      }

      res.send({
        message: "Transaction successful",
        data: newTransaction,
        success: true,
      });
    } else {
      res.send({
        message: "Transaction failed",
        data: charge,
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
    res.send({
      message: "Transaction failed",
      data: error.message,
      success: false,
    });
  }
};

module.exports = {
  depositFunds,
};
