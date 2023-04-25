import {useParams} from "react-router-dom";
import {getBookDetailsByID} from "../services/openlib-services";
import {useSelector} from "react-redux"
import React, {useEffect, useState} from "react";
import {findSalesByBookID, findSalesByUserID, createSale} from "../services/sales-services";
import SalesComponentItem from "./sales-component-item";
const SalesComponent = ({id, isUserID}) => {

    const {currentUser} = useSelector((state) => state.userData);
    const [book, setBook] = useState(null)
    const [sales, setSales] = useState([]);
    const [isSelling, setIsSelling] = useState(false);
    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0)
    const [isValidQuantity, setIsValidQuantity] = useState('is-invalid');
    const [isValidPrice, setIsValidPrice] = useState('is-invalid');
//!followers.find((follow) => follow.follower._id === currentUser._id)

    const fetchBook = async (bid) => {
        const book = await getBookDetailsByID(bid);
        setBook(book);
    }
    const updateQuantity = (input) => {
        setQuantity(input)
        if(input < 1){
            setIsValidQuantity('is-invalid')
        }
        else{
            setIsValidQuantity('is-valid')
        }
    }

    const updatePrice = (input) => {
        setPrice(input)
        if(input <= 0){
            setIsValidPrice('is-invalid')
        }
        else{
            setIsValidPrice('is-valid')
        }
    }
    const fetchSales = async () => {
        if(isUserID){
            const userSales = await findSalesByUserID(id);
            setSales(userSales);
        }
        else{
            const bookSales = await findSalesByBookID(id);
            setSales(bookSales);
        }
    }

    const sell = async () => {
        if(isValidQuantity === "is-invalid" || isValidPrice === "is-invalid" || isUserID){
            return;
        }

        const sale = {
                        uid: currentUser._id,
                        bid: id,
                        quantity: quantity,
                        price: price
                        };

        const sales = await createSale(sale);

        setSales(sales);

    }



    useEffect(() => {
        fetchSales();
    }, [id])
//{currentUser.isBuyer ? <h6>hi</h6> : <h6>Bye</h6> }
    return(
        <>
            {sales && <>
            {!isUserID && <h3>Sellers With This Book:</h3> }
            {currentUser && !isUserID && currentUser.role !=="guest" && !currentUser.isBuyer && sales && !sales.find((sale) => sale.uid === currentUser._id) &&
                <>
                    <h5>Have Copies to Sell?</h5>
                    {!isSelling ?
                        <button className="btn btn-outline-success m-2" onClick={() => setIsSelling(true)}>Start Selling</button>
                        :
                        <button className="btn btn-outline-danger m-2" onClick={() => setIsSelling(false)}>Cancel</button>

                    }
                </>}
                {sales.length > 0  || isSelling ?
            <div style={{"max-height": "clamp(20em, 10vh, 10px)", "overflow": "auto"}}>
                <table className="table table-hover table-responsive">
                    <thead>
                    <tr>
                        <th scope="col">Seller</th>
                        <th scope="col">Book</th>
                        <th scope="col">Copies</th>
                        <th scope="col">Price (USD)</th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {isSelling && !isUserID &&
                        <SalesComponentItem sale={{uid : currentUser._id, bid: id, quantity: 1, price: .01}} editing={true}/>
                    }
                    {sales &&
                        sales.map((sale) => <SalesComponentItem sale={sale} editing={false}/>)

                    }
                    </tbody>
                </table>
            </div> :
                    <>{!isUserID ?
                        <h5>Currently out of stock.</h5> : <h5>Nothing for sale.</h5>}</>
                }
            </>}
        </>
    )

}

export default SalesComponent;

/*
<tr>
                            <th scope="row">{currentUser.username}</th>
                            <td>{id}</td>
                            <td>
                                <input value={quantity} onChange={(e) => updateQuantity(Math.round(Number(e.target.value)))}
                                                        className={`form-control ${isValidQuantity}`}
                                                        min={0} type="number" id="quantity" name="quantity"/>
                            </td>
                            <td>
                                <input value={price}
                                       onChange={(e) => updatePrice(Math.round(Number(e.target.value) * 100)/100)}
                                       className={`form-control ${isValidPrice}`}
                                       min={0} type="number" id="price" name="price"/>
                            </td>
                            <td><button className="btn btn-outline-success m-2" onClick={() => sell()}>Submit</button></td>
                        </tr>
 */