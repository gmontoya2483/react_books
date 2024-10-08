import {useState, } from "react";
import BookEdit from "./BookEdit";
import useBooksContext from "../hooks/use-books-context";


function BookShow({ book }) {

    // const {deleteBookById} = useContext(BooksContext);
    const {deleteBookById} = useBooksContext();

    const [showEdit, setShowEdit] = useState(false);

    const handleEditClick = () => {
        setShowEdit(!showEdit);
    }

    const handleSubmit = () => {
      setShowEdit(false);
      // onEdit(id, newTitle);
    };
    const handleDeleteClick = (event) => {
        deleteBookById(book.id);
    }

    let content = <h3>{book.title}</h3>;
    if (showEdit) {
        content = <BookEdit book={book} onSubmit={handleSubmit}/>;
    }

    return <div className={"book-show"}>
        <img src={`https://picsum.photos/seed/${book.id}/300/200`} alt={`${book.title} book`}/>
        <div>{content}</div>
        <div className="actions">
            <button className="edit" onClick={handleEditClick}>
                Edit
            </button>
            <button className="delete" onClick={handleDeleteClick}>
                Delete
            </button>
        </div>
    </div>
}

export default BookShow;
