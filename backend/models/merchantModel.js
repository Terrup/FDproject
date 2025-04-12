import mongoose from 'mongoose';

const merchantSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },  // Link to user (if needed)
    businessName: { type: String, required: true },
    businessEmail: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    registrationNumber: { type: String, required: true },
    password: { type: String, required: true },  // Merchant's password (hashed)
}, { timestamps: true });

const Merchant = mongoose.model('Merchant', merchantSchema);
export default Merchant;
