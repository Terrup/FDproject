import mongoose from "mongoose";
import dotenv from "dotenv";
import FoodModel from "./models/FoodModel.js";

dotenv.config();

const foodItems = [
  { name: "Greek Salad", description: "Food provides essential nutrients for overall health and well-being", price: 12, category: "Salad", image: "/images/food_1.png" },
  { name: "Veg Salad", description: "Food provides essential nutrients for overall health and well-being", price: 18, category: "Salad", image: "/images/food_2.png" },
  { name: "Clover Salad", description: "Food provides essential nutrients for overall health and well-being", price: 16, category: "Salad", image: "/images/food_3.png" },
  { name: "Chicken Salad", description: "Food provides essential nutrients for overall health and well-being", price: 24, category: "Salad", image: "/images/food_4.png" },
  { name: "Lasagna Rolls", description: "Food provides essential nutrients for overall health and well-being", price: 14, category: "Rolls", image: "/images/food_5.png" },
  { name: "Peri Peri Rolls", description: "Food provides essential nutrients for overall health and well-being", price: 12, category: "Rolls", image: "/images/food_6.png" },
  { name: "Chicken Rolls", description: "Food provides essential nutrients for overall health and well-being", price: 20, category: "Rolls", image: "/images/food_7.png" },
  { name: "Veg Rolls", description: "Food provides essential nutrients for overall health and well-being", price: 15, category: "Rolls", image: "/images/food_8.png" },
  { name: "Ripple Ice Cream", description: "Food provides essential nutrients for overall health and well-being", price: 14, category: "Deserts", image: "/images/food_9.png" },
  { name: "Fruit Ice Cream", description: "Food provides essential nutrients for overall health and well-being", price: 22, category: "Deserts", image: "/images/food_10.png" },
  { name: "Jar Ice Cream", description: "Food provides essential nutrients for overall health and well-being", price: 10, category: "Deserts", image: "/images/food_11.png" },
  { name: "Vanilla Ice Cream", description: "Food provides essential nutrients for overall health and well-being", price: 12, category: "Deserts", image: "/images/food_12.png" },
  { name: "Chicken Sandwich", description: "Food provides essential nutrients for overall health and well-being", price: 12, category: "Sandwich", image: "/images/food_13.png" },
  { name: "Vegan Sandwich", description: "Food provides essential nutrients for overall health and well-being", price: 18, category: "Sandwich", image: "/images/food_14.png" },
  { name: "Grilled Sandwich", description: "Food provides essential nutrients for overall health and well-being", price: 16, category: "Sandwich", image: "/images/food_15.png" },
  { name: "Bread Sandwich", description: "Food provides essential nutrients for overall health and well-being", price: 24, category: "Sandwich", image: "/images/food_16.png" },
  { name: "Cup Cake", description: "Food provides essential nutrients for overall health and well-being", price: 14, category: "Cake", image: "/images/food_17.png" },
  { name: "Vegan Cake", description: "Food provides essential nutrients for overall health and well-being", price: 12, category: "Cake", image: "/images/food_18.png" },
  { name: "Butterscotch Cake", description: "Food provides essential nutrients for overall health and well-being", price: 20, category: "Cake", image: "/images/food_19.png" },
  { name: "Sliced Cake", description: "Food provides essential nutrients for overall health and well-being", price: 15, category: "Cake", image: "/images/food_20.png" },
  { name: "Garlic Mushroom", description: "Food provides essential nutrients for overall health and well-being", price: 14, category: "Pure Veg", image: "/images/food_21.png" },
  { name: "Fried Cauliflower", description: "Food provides essential nutrients for overall health and well-being", price: 22, category: "Pure Veg", image: "/images/food_22.png" },
  { name: "Mix Veg Pulao", description: "Food provides essential nutrients for overall health and well-being", price: 10, category: "Pure Veg", image: "/images/food_23.png" },
  { name: "Rice Zucchini", description: "Food provides essential nutrients for overall health and well-being", price: 12, category: "Pure Veg", image: "/images/food_24.png" },
  { name: "Cheese Pasta", description: "Food provides essential nutrients for overall health and well-being", price: 12, category: "Pasta", image: "/images/food_25.png" },
  { name: "Tomato Pasta", description: "Food provides essential nutrients for overall health and well-being", price: 18, category: "Pasta", image: "/images/food_26.png" },
  { name: "Creamy Pasta", description: "Food provides essential nutrients for overall health and well-being", price: 16, category: "Pasta", image: "/images/food_27.png" },
  { name: "Chicken Pasta", description: "Food provides essential nutrients for overall health and well-being", price: 24, category: "Pasta", image: "/images/food_28.png" },
  { name: "Butter Noodles", description: "Food provides essential nutrients for overall health and well-being", price: 14, category: "Noodles", image: "/images/food_29.png" },
  { name: "Veg Noodles", description: "Food provides essential nutrients for overall health and well-being", price: 12, category: "Noodles", image: "/images/food_30.png" },
  { name: "Somen Noodles", description: "Food provides essential nutrients for overall health and well-being", price: 20, category: "Noodles", image: "/images/food_31.png" },
  { name: "Cooked Noodles", description: "Food provides essential nutrients for overall health and well-being", price: 15, category: "Noodles", image: "/images/food_32.png" }
];

const seedFoods = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await FoodModel.deleteMany();
    await FoodModel.insertMany(foodItems);
    console.log("✅ Real food items inserted!");
    process.exit();
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }
};

seedFoods();
