import foodModel from '../models/foodModel.js';

// Add food item
const addFood = async (req, res) => {
    try {
        // Extracting food details from the body of the request
        const { name, description, price, category } = req.body;

        // Validate that all required fields are provided
        if (!name || !description || !price || !category) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        // Create new food item
        const food = new foodModel({
            name,
            description,
            price,
            category,
        });

        // Save the food item to the database
        await food.save();

        // Respond with a success message
        res.json({ success: true, message: "Food Added" });
    } catch (error) {
        console.log(error);
        // Respond with an error message if something goes wrong
        res.status(500).json({ success: false, message: "Error" });
    }
}

// List all food items
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error" });
    }
}

// Remove food item
const removeFood = async (req, res) => {
    try {
        console.log("Received food id:", req.body.id);  // Log the received ID

        const food = await foodModel.findById(req.body.id);
        
        if (!food) {
            return res.status(404).json({ success: false, message: "Food not found" });
        }

        console.log("Food found:", food);  // Log the found food item

        // Remove the food item from the database
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Food Removed" });

    } catch (error) {
        console.log("Error while removing food:", error);
        res.status(500).json({ success: false, message: "Error" });
    }
}


export { addFood, listFood, removeFood };
