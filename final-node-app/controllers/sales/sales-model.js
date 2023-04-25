import mongoose from 'mongoose';
import salesSchema from './sales-schema.js'
const salesModel = mongoose
    .model('SalesModel', salesSchema);
export default salesModel;