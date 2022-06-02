import { useRef } from "react";
import Card from "../ui/Card";
import LoadingSpinner from "../ui/LoadingSpinner";
import classes from "./QuoteForm.module.css";

const QuoteForm = (props) => {
  const authorInputRef = useRef();
  const qouteInputRef = useRef();

  const submitQuoteHandler = (event) => {
    event.preventDefault();

    const enteredAuthor = authorInputRef.current.value;
    const enteredQuote = qouteInputRef.current.value;

    // TODO: ADD BETTER FORM VALIDATION using useState

    if (enteredAuthor === "") {
      authorInputRef.current.value = "Please enter Author...";
      return;
    }

    if (enteredQuote === "") {
      qouteInputRef.current.value = "Please enter Quote...";
      return;
    }

    props.onAddQuote({ author: enteredAuthor, text: enteredQuote });
  };

  return (
    <Card>
      <form className={classes.form} onSubmit={submitQuoteHandler}>
        {props.isLoading && (
          <div className={classes.loading}>
            <LoadingSpinner />
          </div>
        )}
        <div className={classes.control}>
          <label htmlFor="author">Author</label>
          <input type="text" id="author" ref={authorInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="quote">Quote</label>
          <textarea type="text" id="quote" rows="5" ref={qouteInputRef} />
        </div>
        <div className={classes.actions}>
          <button className="btn">Add Quote</button>
        </div>
      </form>
    </Card>
  );
};

export default QuoteForm;
