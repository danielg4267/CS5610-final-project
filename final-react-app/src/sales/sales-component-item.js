import {useSelector} from "react-redux"
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {findUserByID} from "../services/users-services";
import {
    findSalesByBookID,
    findSalesByUserID,
    createSale,
    updateSale,
    deleteSale,
    purchaseSale
} from "../services/sales-services";
import {getBookDetailsByID} from "../services/openlib-services";

const SalesComponentItem = ({sale, editing}) => {
    const {currentUser} = useSelector((state) => state.userData);
    const [user, setUser] = useState(null)
    const [book, setBook] = useState(null)
    const [quantity, setQuantity] = useState(sale.quantity);
    const [price, setPrice] = useState(sale.price);
    const [isValidQuantity, setIsValidQuantity] = useState('is-valid');
    const [isValidPrice, setIsValidPrice] = useState('is-valid');
    const [isEditing, setIsEditing] = useState(editing);

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

    const finishEdits = async (isSaved) => {
        //I feel the need to apologize for this terribly nested code
        //There must be a better way lol, but it's midnight and I'm just doing it
        //step by step in my head

        if(isSaved && isValidPrice && isValidQuantity){
            try{
                    const newSale = {
                        uid: user._id,
                        bid: sale.bid,
                        quantity: quantity,
                        price: price
                    }
                    var updatedSale = null;
                    if(sale._id){
                        newSale._id = sale._id;
                        updatedSale = await updateSale(newSale);
                    }
                    else{
                        updatedSale = await createSale(newSale);
                        window.location.reload(false);
                    }
                    setQuantity(updatedSale.quantity);
                    setPrice(updatedSale.price)
            }
            catch(e){
                setQuantity(sale.quantity);
                setPrice(sale.price)
            }
        }
        else{
            setQuantity(sale.quantity);
            setPrice(sale.price)
        }
        setIsValidQuantity('is-valid')
        setIsValidPrice('is-valid')
        setIsEditing(false);
    }

    const delSale = async () => {
        const response = await deleteSale(sale._id);
        window.location.reload(false);
    }

    const buyItem = async () => {
        const response = await purchaseSale(sale._id);
        if(response.quantity){
            setQuantity(response.quantity)
        }
        else{
            window.location.reload(false);
        }
    }


    const fetchUser = async () => {
        const user = await findUserByID(sale.uid);
        setUser(user);
    }

    const fetchBook = async () => {
        const book = await getBookDetailsByID(sale.bid);
        setBook(book);
    }

    useEffect(() => {
        fetchUser();
        fetchBook();
    }, [])

    return(
        <tr>
            <th scope="row">{user &&
                <Link className="text-decoration-none text-dark" to={`/profile/${user._id}`}>{user.username}</Link>}</th>
            <td><i>{book &&
                <Link className="text-decoration-none text-dark" to={`/details/works/${sale.bid}`}>{book.title}</Link>}</i></td>
            <td>{isEditing ?
                <input value={quantity} onChange={(e) => updateQuantity(Math.round(Number(e.target.value)))}
                       className={`form-control ${isValidQuantity}`}
                       min={0} type="number" id="quantity" name="quantity"/>
                :
                <>{quantity}</>}</td>
            <td>{isEditing ?
                <input value={price}
                       onChange={(e) => updatePrice(Math.round(Number(e.target.value) * 100)/100)}
                       className={`form-control ${isValidPrice}`}
                       min={0} type="number" id="price" name="price"/>
                        :
                <>${price}</>}</td>
            <td>
                {currentUser && user && currentUser._id !== user._id &&
                    <button className="btn btn-outline-primary m-2" onClick={() => buyItem()}>Buy</button>
                }
                {currentUser && user && currentUser._id === user._id &&
                    <>{isEditing ?
                        <>
                            <button className="btn btn-outline-primary m-2" onClick={() => finishEdits(true)}>Save</button>
                            {sale._id &&
                            <button className="btn btn-outline-danger m-2" onClick={() => finishEdits(false)}>Cancel</button>}
                        </>
                        :
                        <button className="btn btn-outline-success m-2" onClick={() => setIsEditing(true)}>Edit</button>
                    }</>
                }
                {currentUser && user && (currentUser._id === user._id || currentUser.isAdmin) && !isEditing &&
                    <button onClick={() => delSale()} className="btn btn-outline-danger m-2">Delete</button>
                }

            </td>
        </tr>
    )
}

export default SalesComponentItem;