const stripe = require("stripe")(process.env.STRIPE_KEY);
const { uuid } = require("uuidv4");
const TransactionModel = require("../Model/TransactionModel");
const userModel = require("../Model/userModel");

const depositFunds = async (req, res) => {
  try {
    const { token, amount } = req.body;
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
      const newTransaction = new TransactionModel({
        buyer: req.body.userId,
        seller: req.body.userId,
        amount: amount,
        type: "deposit",
        reference: "stripe deposit",
        status: "success",
      });
      await newTransaction.save();

      // increase the user's balance
      await userModel.findByIdAndUpdate(req.body.userId, {
        $inc: { balance: amount },
      });
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
