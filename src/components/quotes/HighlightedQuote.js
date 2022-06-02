import classess from "./HighlightedQuote.module.css";

const HighlightedQuote = (props) => {
  return (
    <figure className={classess.quote}>
      <p>{props.text}</p>
      <figcaption>{props.author}</figcaption>
    </figure>
  );
};

export default HighlightedQuote;
