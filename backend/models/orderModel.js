import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  items: {
    type: Array,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipcode: String,
    phone: String,
    email: String,
    firstName: String,
    lastName: String
  },
  status: {
    type: String,
    default: "Food Processing"
  },
  payment: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

const orderModel = mongoose.model("orders", orderSchema);

export default orderModel;
