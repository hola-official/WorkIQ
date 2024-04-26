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
    console.log(amount);
    console.log(token);
    // create a customer
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });
    // create a charge
    const charge = await stripe.charges.create(
      {
        amount: amount,
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
        description: `Deposited to WorkIQ`,
      },
      {
        idempotencyKey: uuid(),
      }
    );

    // save the transaction
    if (charge.status === "succeeded") {
      // Get user's current balance
      const user = await userModel.findById(userId);
      // Check if user exists
      if (!user) {
        return res.status(404).json({
          message: "User not found",
          success: false,
        });
      }

      const currentBalance = user.balance;

      // Calculate new balance
      const newBalance = Number(currentBalance) + Number(amount);

      // Update user's balance
      await userModel.findByIdAndUpdate(userId, {
        balance: newBalance,
      });

      // Create new transaction
      const newTransaction = new TransactionModel({
        buyer: userId,
        seller: userId,
        amount: amount,
        type: "deposit",
        reference: "stripe deposit",
        status: "success",
      });

      // Save new transaction
      await newTransaction.save();
      // Send logout confirmation email
      const userData = {
        name: user.name,
        email: user.email,
        location: user.location, // You can customize this based on your user model
        timestamp: new Date().toLocaleString("default", {
          month: "long",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
        }),
        // Add more relevant data if needed
      };

      // Send email
      try {
        await sendMail({
          email: userData.email,
          subject: "Deposit Successful",
          template: "deposit-mail.ejs",
          data: {
            user: { username: user.username },
            amount: amount,
            time: { timestamp: userData.timestamp },
          },
        });
      } catch (error) {
        console.log("Error sending deposit email:", error);
        // Handle error if needed
      }

      // Send response
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
