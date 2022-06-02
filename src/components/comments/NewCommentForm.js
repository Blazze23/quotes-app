import { useEffect, useRef } from "react";
import useHttp from "../../hooks/use-http";
import { addComment } from "../../lib/api";
import LoadingSpinner from "../ui/LoadingSpinner";
import classes from "./NewCommentForm.module.css";

const NewCommentForm = (props) => {
  const commentTextRef = useRef();
  const { sendRequest, status, error } = useHttp(addComment);

  const { onAddedComment } = props;

  useEffect(() => {
    if (status === "completed" && !error) {
      onAddedComment();
    }
  }, [status, error, onAddedComment]);

  const submitCommentHandler = (event) => {
    event.preventDefault();

    const enteredCommentText = commentTextRef.current.value;

    // TODO: BETTER VALIDATION with useState
    if (enteredCommentText === "") {
      commentTextRef.current.value = "Enter your comment here";
      return;
    }

    sendRequest({
      commentData: { text: enteredCommentText },
      quoteId: props.quoteId,
    });

    commentTextRef.current.value = "";
  };

  return (
    <form className={classes.form} onSubmit={submitCommentHandler}>
      {status === "pending" && (
        <div className="centered">
          <LoadingSpinner />
        </div>
      )}
      <div className={classes.control}>
        <label htmlFor="comment">Your Comment</label>
        <textarea id="comment" rows="5" ref={commentTextRef} />
      </div>
      <div className={classes.actions}>
        <button className="btn">Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
