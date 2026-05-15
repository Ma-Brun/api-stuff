import * as mongoose from 'mongoose';

export const mongooseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true }
});

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
}

