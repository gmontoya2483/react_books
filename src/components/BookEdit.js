import {useState, useContext} from "react";
import BooksContext from "../context/books";


function BookEdit({book, onSubmit}) {

    const {editBookById}= useContext(BooksContext);

    const [title, setTitle] = useState(book.title);

    const handleChange = (event) => {
        setTitle(event.target.value)
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        editBookById(book.id, title);
        onSubmit();
    }



    return <form className="book-edit" onSubmit={handleSubmit}>
        <label htmlFor="">Title</label>
        <input value={title} className="input" onChange={handleChange}/>
        <button className="button is-primary">Save</button>
    </form>;
}

export default BookEdit;
