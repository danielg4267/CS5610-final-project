import axios from "axios";
const OL_SEARCH_API = "https://openlibrary.org/search.json?";
const OL_THUMBNAIL_BASE = "https://covers.openlibrary.org/b/id/";
const OL_BOOKS_API = "https://openlibrary.org/works";
const OL_SUBJECTS_API = "https://openlibrary.org/subjects";
const OL_AUTHORS_API = "https://openlibrary.org/authors";

export const searchByTitle = async (title) =>{

    const response = await axios.get(
        `${OL_SEARCH_API}title=${title}`)
    return response.data.docs.slice(0, 10);
};

export const searchBySubject = async (subject) =>{
    const response = await axios.get(
        `${OL_SUBJECTS_API}/${subject}`)
    return response.data["works"].slice(0,10)//.docs.slice(0, 10);
};
export const searchByAuthor = async (author) =>{
    const response = await axios.get(
        `${OL_SEARCH_API}author=${author}`)
    return response.data.docs.slice(0, 10);
};

export const searchByTitleAndAuthor = async (title, author) =>{
    const response = await axios.get(
        `${OL_SEARCH_API}title=${title}&author=${author}`)
    return response.data.works.slice(0, 10);
};

export const getBookDetailsByID = async (bid) => {
    const response = await axios.get(`${OL_BOOKS_API}/${bid}.json`)
    return response.data;
}

export const getAuthorDetailsByID = async (aid) => {

    try{
        const response = await axios.get(`${OL_AUTHORS_API}/${aid}.json`)
        return response.data;
    }
    catch (e) {
        return {};
    }

}