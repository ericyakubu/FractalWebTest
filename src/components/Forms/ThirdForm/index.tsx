import { FormEvent, FunctionComponent, useRef, useState } from "react";
import classes from "./ThirdForm.module.scss";
import ProgressBar from "../../ProgressBar";
import { AppDispatch, RootState } from "../../../redux";
import { useDispatch, useSelector } from "react-redux";
import {
  handleFinish,
  handleGoBack,
  handleShowModal,
  postForm,
  submitThirdForm,
} from "../../../redux/formStore";

const ThirdForm: FunctionComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentPage } = useSelector((state: RootState) => state.form);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [count, setCount] = useState(0);

  const handleWordCount = () => {
    if (!textRef.current) return;
    setCount(textRef.current.value.replace(/\s/g, "").length);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!textRef.current) return;
    const aboutMe = textRef.current.value;
    if (count <= 200) {
      dispatch(submitThirdForm({ aboutMe }));
      dispatch(handleShowModal("success"));
      dispatch(postForm());

      setTimeout(() => dispatch(handleFinish()), 2000);
    }
  };

  const handleReturn = () => {
    dispatch(handleGoBack(currentPage - 1));
  };

  return (
    <main className={classes.container}>
      <ProgressBar progress={3} />

      <form className={classes.form} onSubmit={handleSubmit}>
        <label htmlFor="Placeholder" className={classes.form__label}>
          О себе
        </label>
        <textarea
          id="field-about"
          placeholder="Placeholder"
          className={classes.form__input}
          rows={5}
          ref={textRef}
          onChange={handleWordCount}
        />
        <p className={classes.form__tips}>
          <span>{count > 200 ? "Макс. кол-во символов: 200" : ""}</span>
          <span>Символов {count}/200</span>
        </p>
        <div className={classes.form_buttons}>
          <button
            className={classes.form_buttons__return}
            type="button"
            onClick={handleReturn}
          >
            Назад
          </button>
          <button className={classes.form_buttons__next} type="submit">
            Далее
          </button>
        </div>
      </form>
    </main>
  );
};

export default ThirdForm;
