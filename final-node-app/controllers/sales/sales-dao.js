import salesModel from "./sales-model.js";

export const findAllSales = async () => {return await salesModel.find();}

export const findSaleBySaleID = async (sid) => {return await salesModel.findById(sid)}

export const findSalesByUserID = async (uid) => {return await salesModel.find({uid: uid})}

export const findSalesByBookID = async (bid) => {return await salesModel.find({bid: bid})}

export const createSale = async (sale) => {return await salesModel.create(sale)}

export const updateSale = async (sale) => {return await salesModel.findOneAndUpdate({_id:sale._id}, sale, {new: true})}

export const deleteSale = async (sid) => {return await salesModel.deleteOne({_id: sid})}


