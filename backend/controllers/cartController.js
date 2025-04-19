import userModel from "../models/userModel.js";

// Add items to user cart
const addToCart = async (req, res) => {
    try {
        // Find user by userId
        const userData = await userModel.findById(req.body.userId);
        
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Initialize cartData if not exists
        if (!userData.cartData) {
            userData.cartData = {};  // Initialize as an empty object
        }

        // Update the cart with the itemId and quantity
        const { itemId } = req.body;

        if (!userData.cartData[itemId]) {
            userData.cartData[itemId] = 1; // Add the item if not present
        } else {
            userData.cartData[itemId] += 1; // Increment quantity if item is already in the cart
        }

        // Save the updated cartData to the database
        await userData.save();

        // Respond with success
        res.json({ success: true, message: "Added to cart", cartData: userData.cartData });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error adding to cart", error: error.message });
    }
};

// Remove items from user cart
const removeFromCart = async (req, res) => {
    try {
        // Find user by userId
        const userData = await userModel.findById(req.body.userId);
        
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Initialize cartData if not exists
        if (!userData.cartData) {
            userData.cartData = {}; // Initialize as an empty object if not exists
        }

        // Decrement the item quantity in the cart
        const { itemId } = req.body;

        if (userData.cartData[itemId] > 0) {
            userData.cartData[itemId] -= 1; // Decrease the quantity by 1
        }

        // Save the updated cartData to the database
        await userData.save();

        // Respond with success
        res.json({ success: true, message: "Removed from cart", cartData: userData.cartData });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error removing from cart", error: error.message });
    }
};

// Fetch user cart data
const getCart = async (req, res) => {
    try {
        // Find user by userId
        const userData = await userModel.findById(req.body.userId);
        
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Initialize cartData if not exists
        if (!userData.cartData) {
            userData.cartData = {};  // Initialize as an empty object if not exists
        }

        // Respond with the cart data
        res.json({ success: true, cartData: userData.cartData });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error fetching cart data", error: error.message });
    }
};

export { addToCart, removeFromCart, getCart };
