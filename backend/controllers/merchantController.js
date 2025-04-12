import bcrypt from 'bcrypt';  // Ensure bcrypt is imported
import jwt from 'jsonwebtoken';
import Merchant from '../models/merchantModel.js';
import User from '../models/userModel.js';  // Import User model
import dotenv from 'dotenv';

dotenv.config();

// Register a merchant (no need for a new user creation, just link to existing user)
const registerMerchant = async (req, res) => {
  try {
    const { businessName, businessEmail, phone, address, registrationNumber, password } = req.body;

    // Check if all required fields are provided
    if (!businessName || !businessEmail || !phone || !address || !registrationNumber || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // Check if the merchant already exists
    const existingMerchant = await Merchant.findOne({ businessEmail });
    if (existingMerchant) {
      return res.status(400).json({ success: false, message: 'Merchant already exists' });
    }

    // Find the user by businessEmail to associate the merchant with
    const user = await User.findOne({ email: businessEmail });
    if (!user) {
      return res.status(400).json({ success: false, message: 'User with this email does not exist' });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the merchant profile linked to the existing user
    const merchantProfile = new Merchant({
      userId: user._id,  // Link to the existing user
      businessName,
      businessEmail,
      phone,
      address,
      registrationNumber,
      password: hashedPassword  // Save the hashed password
    });

    // Save the merchant profile to the database
    await merchantProfile.save();

    res.json({ success: true, message: 'Merchant profile created successfully' });
  } catch (error) {
    console.error('Error registering merchant:', error);
    res.status(500).json({ success: false, message: 'Error registering merchant', error: error.message });
  }
};

// Login as a merchant (use email and password)
const loginMerchant = async (req, res) => {
    const { businessEmail, password } = req.body;

    try {
        // Check if merchant exists by businessEmail
        const merchant = await Merchant.findOne({ businessEmail });

        if (!merchant) {
            return res.status(400).json({ success: false, message: "Merchant not found" });
        }

        // Make sure password is being passed correctly
        if (!password) {
            return res.status(400).json({ success: false, message: "Password is required" });
        }

        // Compare the hashed password from the database with the plain password provided
        const match = await bcrypt.compare(password, merchant.password);

        if (!match) {
            return res.status(400).json({ success: false, message: "Invalid password" });
        }

        // Generate a token if login is successful
        const token = jwt.sign(
            { id: merchant._id }, // payload containing the merchant's id
            process.env.JWT_SECRET, // Secret key for signing the token
            { expiresIn: '1h' } // Token expiry time (optional)
        );

        // Return the token to the client
        res.json({ success: true, message: "Login successful", token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

// Get the merchant profile (protected route)
const getMerchantProfile = async (req, res) => {
  try {
    // Get the merchant's profile by their user ID (assumes req.user is populated)
    const userId = req.user.id;
    const merchantProfile = await Merchant.findOne({ userId });

    if (!merchantProfile) {
      return res.status(404).json({ success: false, message: 'Merchant profile not found' });
    }

    res.json({ success: true, data: merchantProfile });

  } catch (error) {
    console.error('Error fetching merchant profile:', error);
    res.status(500).json({ success: false, message: 'Error fetching merchant profile' });
  }
};

export { registerMerchant, loginMerchant, getMerchantProfile };
