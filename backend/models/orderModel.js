import mongoose from "mongoose";

// Define the order schema
const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Use ObjectId for userId
        ref: "User", // Reference to the User model
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
        type: Object, 
        required: true
    },
    status: {
        type: String,
        default: "Food Processing"
    },
    date: {
        type: Date, 
        default: Date.now
    },
    payment: {
        type: Boolean, 
        default: false
    }
});

// Define the model
const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);

// Export the model
export default orderModel;
