import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {findUserByID} from "../services/users-services";
import {getBookDetailsByID} from "../services/openlib-services";
import {deleteReview, updateReview} from "../services/reviews-services";
import {useSelector} from "react-redux";

const COVER_SOURCE = "https://covers.openlibrary.org/b/id"
const ReviewItemComponent = ({review, isUserList}) => {
    const {currentUser} = useSelector((state) => state.userData);
    const [user, setUser] = useState(null)
    const [book, setBook] = useState(null);
    const [editing, setEditing] = useState(false);
    const [newReview, setNewReview] = useState(review.text);

    const fetchUser = async () => {
        const response = await findUserByID(review.uid)
        setUser(response);
    }
    const fetchBook = async () => {
        const response = await getBookDetailsByID(review.bid);
        setBook(response);
    }

    const delReview = async () => {
        const response = deleteReview(review)
        window.location.reload(false);
    }

    const finishEdits = async (isCanceled) => {
        if(newReview.length > 0 && !isCanceled){
            const updatedReview = {...review, text:newReview};
            try{
                review = await updateReview(updatedReview);
            }
            catch(e){
                console.log("Could not save");
            }
        }
        setNewReview(review.text);
        setEditing(false);

    }

    useEffect( () => {
            fetchUser();
            fetchBook();
        }, [])

    return(
        <>
        {user &&
            <>


                <div className="list-group-item bg-light flex-column align-items-start">
                    <div className="row">
                        <div className="col-4 col-xl-3">
                            {isUserList && book ?
                                <Link to={`/details/works/${review.bid}`} className="text-decoration-none text-dark">
                                    <img className="m-2" src={`${COVER_SOURCE}/${book.covers[0]}-M.jpg`} width={64} height={96}/></Link> :
                                <Link to={`/profile/${user._id}`}
                                      className="text-decoration-none text-dark">
                                    <img style={{"border": "3px solid"}}
                                        className="rounded-circle m-2 p-1" src={`${user.profilePic}`} width={96} height={96}/></Link>}

                        </div>
                        <div className="col-8 col-xl-9">
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1 col-10">
                                    <Link to={`/profile/${user._id}`}
                                          className="text-decoration-none text-dark">{user.username}</Link>'s review of
                                    {book &&
                                        <b><i><Link to={`/details/works/${review.bid}`} className="text-decoration-none text-dark">{" " + book.title}</Link></i></b>}
                                </h5>
                                {currentUser && (currentUser._id === review.uid || currentUser.isAdmin) ?
                                    <small>
                                    {editing ? <><span onClick={() => finishEdits(false)}>Save</span> | <span
                                            onClick={() => finishEdits(true)}>Cancel</span></> :
                                        <><span onClick={() => setEditing(true)}>Edit</span> | <span onClick={() => delReview()}>Delete</span></>}
                                    </small> : <></>}
                            </div>
                            {editing ?
                                <textarea className="form-control" rows={4}
                                          value={newReview} placeholder="Editing review..."
                                          onChange={(e) => setNewReview(e.target.value)}>
                                </textarea>
                                : <p className="mb-1">{newReview}</p>}
                            <small>
                                {
                                    new Date(review.reviewDate.slice(0, 10)).toLocaleDateString('en-us', {year:"numeric", month:"short", day:"numeric"})
                                }
                            </small>
                        </div>

                    </div>
                </div>
            </>
        }
        </>


    )
}

export default ReviewItemComponent;