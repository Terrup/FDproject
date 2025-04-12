import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Place a new order from frontend
const placeOrder = async (req, res) => {
    const frontend_url = "http://localhost:5173"; // frontend URL

    try {
        // Log the incoming request body to ensure it’s correct
        console.log('Request Body:', req.body);

        const { userId, items, amount, address } = req.body;

        // Validate that all required fields are provided
        if (!userId || !items || !amount || !address) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        // Ensure user exists in the database
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Create the order
        const newOrder = new orderModel({
            userId,      // MongoDB ObjectId type
            items,
            amount,
            address,
            status: "Food Processing", // Default status
            payment: false            // Default payment status
        });

        await newOrder.save();
        console.log('Order Saved:', newOrder); // Log to verify the order is saved

        // Optionally clear the user's cart after order placement
        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        // Prepare items for Stripe checkout session
        const line_items = items.map(item => ({
            price_data: {
                currency: "usd", // Currency for Stripe
                product_data: { name: item.name },
                unit_amount: item.price * 100 // Convert to smallest unit (e.g., cents)
            },
            quantity: item.quantity
        }));

        // Add delivery charges
        line_items.push({
            price_data: {
                currency: "usd",
                product_data: { name: "Delivery Charges" },
                unit_amount: 2 * 100 // Delivery charge amount
            },
            quantity: 1
        });

        // Create a Stripe checkout session for payment
        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        });

        // Send response with the Stripe session URL
        res.json({ success: true, session_url: session.url });
    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// Verify order payment
const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        const order = await orderModel.findById(orderId); // Find the order by its ID

        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" }); // If no order found
        }

        if (success === "true") {
            // If payment was successful, mark the order as paid
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.json({ success: true, message: "Paid" });
        } else {
            // If payment failed, delete the order
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false, message: "Not Paid" });
        }
    } catch (error) {
        console.error("Error verifying order:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};


// Get all orders for a user
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ success: false, message: "Error" });
    }
};

// Get all orders (admin access)
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, data: orders });
    } catch (error) {
        console.error("Error listing orders:", error);
        res.status(500).json({ success: false, message: "Error" });
    }
};

// Update order status (admin access)
const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        res.json({ success: true, message: "Status Updated" });
    } catch (error) {
        console.error("Error updating status:", error);
        res.status(500).json({ success: false, message: "Error" });
    }
};

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };
