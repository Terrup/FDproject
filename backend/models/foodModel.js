import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String }  // Make image optional (no `required` constraint)
}, { timestamps: true });

const foodModel = mongoose.model('Food', foodSchema);

export default foodModel;
