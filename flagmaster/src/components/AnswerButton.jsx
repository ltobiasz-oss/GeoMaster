export default function AnswerButton({
  country,
  onClick,
  isDisabled,
  isSelectedWrong,
  isSelectedCorrect,
  isShowCorrect,
  showFlag,
}) {
  let className = "answer-btn";
  if (isSelectedCorrect) className += " selected-correct";
  else if (isSelectedWrong) className += " selected-wrong";
  else if (isShowCorrect) className += " show-correct";
  if (showFlag) className += " answer-btn--with-flag";

  return (
    <button
      className={className}
      onClick={() => onClick(country.cca2)}
      disabled={isDisabled || isSelectedWrong || isSelectedCorrect || isShowCorrect}
    >
      <span className="answer-btn__label">{country.name.common}</span>
      {showFlag && (
        <img
          className="answer-btn__flag"
          src={country.flags.svg}
          alt=""
          aria-hidden="true"
        />
      )}
    </button>
  );
}
