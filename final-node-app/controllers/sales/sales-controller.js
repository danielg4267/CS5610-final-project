import * as salesDao from "./sales-dao.js";

const findAllSales = async (req, res) => {
    const sales = await salesDao.findAllSales();
    res.json(sales);
}

const findSaleBySaleID = async (req, res) => {

    const sid = req.params.sid;
    try{
        const sale = await salesDao.findSaleBySaleID(sid);
        res.json(sale);
    }
    catch(e){
        res.sendStatus(404)
    }

}

const findSalesByUserID = async (req, res) => {
    const uid = req.params.uid;
    try{
        const sales = await salesDao.findSalesByUserID(uid);
        res.json(sales);
    }
    catch(e){
        res.sendStatus(404);
    }
}

const findSalesByBookID = async (req, res) => {

    const bid = req.params.bid;
    try{
        const sales = await salesDao.findSalesByBookID(bid);
        res.json(sales);
    }
    catch(e){
        res.sendStatus(404);
    }

}

const createSale = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if(!currentUser || currentUser.isBuyer || currentUser.role === "guest"){
        res.sendStatus(403);
        return;
    }
    const response = await salesDao.createSale(req.body);
    res.send(response);
}

const updateSale = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if(!currentUser){
        res.sendStatus(403);
        return;
    }
    try{

        const updatedSale = await salesDao.updateSale(req.body);
        res.json(updatedSale)
    }
    catch(e){
        res.sendStatus(404);
    }

}

const purchaseSale = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if(!currentUser){
        res.sendStatus(403);
        return;
    }
    const sid = req.params.sid;
    try{
        const sale = await salesDao.findSaleBySaleID(sid);
        sale.quantity -= 1;
        if(sale.quantity <= 0){
            const status = await salesDao.deleteSale(sid);
            res.send(status);
        }
        else{
            const status = await salesDao.updateSale(sale);
            res.send(status);
        }
    }
    catch(e){
        res.sendStatus(404);
    }


}

const deleteSale = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if(!currentUser || (currentUser.isBuyer && !currentUser.isAdmin) || currentUser.role === "guest"){
        res.sendStatus(403);
        return;
    }
    const sid = req.params.sid;

    if(!currentUser.isAdmin){
        try{
            const sale = await salesDao.findSaleBySaleID(sid);
            if(!sale.uid.equals(currentUser._id)){
                res.sendStatus(403);
                return;
            }
        }
        catch(e){
            res.sendStatus(404);
            return;
        }
    }

    try{
        const result = await salesDao.deleteSale(sid);
        res.send(result);
    }
    catch(e){
        res.sendStatus(404);
    }

}

export default (app) => {

    app.get('/api/sales', findAllSales);
    app.get('/api/sales/:sid', findSaleBySaleID);
    app.get('/api/sales/user/:uid', findSalesByUserID);
    app.get('/api/sales/book/:bid', findSalesByBookID);
    app.post('/api/sales', createSale);
    app.put('/api/sales', updateSale);
    app.put('/api/sales/purchase/:sid', purchaseSale);
    app.delete('/api/sales/:sid', deleteSale);

}