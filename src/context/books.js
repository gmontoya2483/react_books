import {createContext, useCallback, useState} from "react";
import axios from "axios";


const BooksContext = createContext();

function Provider({children}) {

    const [books, setBooks] = useState([]);

    const fetchBooks = useCallback(async () => {
        try{
            const response = await axios.get('http://localhost:3001/books');
            setBooks(response.data);
        } catch (err){
            console.error(`Error while trying to create a new book, ${err}`)
        }
    },[]);

    // const stableFetchBooks = useCallback(fetchBooks, []);

    const deleteBookById = (id) => {

        axios.delete(`http://localhost:3001/books/${id}`)
            .then((response) => {
                setBooks(books.filter((book) => book.id !== id));
            })
            .catch((err) => {console.error(`Error while trying to delete book with id ${id}, ${err}`)})


    }

    const createBook =  (title) => {
        axios.post('http://localhost:3001/books', {title})
            .then((response) => {
                const {id, title} = response.data
                setBooks([...books,{id, title}]);
            })
            .catch((err) => {console.error(`Error while trying to create a new book, ${err}`)})

    };

    const editBookById = (id, newTitle) => {

        axios.put(`http://localhost:3001/books/${id}`, {title: newTitle})
            .then((response) => {
                setBooks(books.map((book) => {
                    if(book.id === response.data.id) {
                        return {
                            ...book,
                            ...response.data
                        }
                    }
                    return book;
                }));

            })
            .catch((err) => {console.error(`Error while trying to edit book with id ${id}, ${err}`)})
    }


    const valueToShare = {
        books,
        fetchBooks,
        deleteBookById,
        editBookById,
        createBook
    }


    return <BooksContext.Provider value={valueToShare}>
        {children}
    </BooksContext.Provider>

}

export {Provider};
export default BooksContext;

