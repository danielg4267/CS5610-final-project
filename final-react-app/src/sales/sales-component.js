import {useSelector} from "react-redux"
import React, {useEffect, useState} from "react";
import {findSalesByBookID, findSalesByUserID, createSale} from "../services/sales-services";
import SalesComponentItem from "./sales-component-item";
const SalesComponent = ({id, isUserID}) => {

    const {currentUser} = useSelector((state) => state.userData);
    const [sales, setSales] = useState([]);
    const [isSelling, setIsSelling] = useState(false);


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




    useEffect(() => {
        fetchSales();
    }, [id])

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