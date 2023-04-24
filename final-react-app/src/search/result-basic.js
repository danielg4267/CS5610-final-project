import {Link} from "react-router-dom";

const COVER_SOURCE = "https://covers.openlibrary.org/b/id"
const resultBasic = ({work}) => {

    let img_src = "https://openlibrary.org/images/icons/avatar_book.png";
    if(work.cover_i){
        img_src = `${COVER_SOURCE}/${work.cover_i}-M.jpg`
    }
    //console.log(work.cover_i);
    if(!work.author_name || !work.first_publish_year || !work.title){
        return(<></>)
    }

    return(
        <Link to={`/details${work.key}`} className="text-decoration-none text-dark">
            <div className="list-group-item">
                <div className="row m-2">
                    <div className="col-4">
                        <img src={img_src}/>
                    </div>
                    <div className="col-6">
                        <h4>{work.title}</h4>
                        <h6><i>{work.author_name && work.author_name.map(
                            author => <div>{author}</div>
                        )}</i></h6>

                        <h6>Published {work.first_publish_year}</h6>
                    </div>
                </div>
            </div>
        </Link>
    )

}

export default resultBasic;