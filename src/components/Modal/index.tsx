import { FunctionComponent, useRef } from "react";
import classes from "./Modal.module.scss";
import Check from "../../assets/check.svg";
import Error from "../../assets/error.png";
import Close from "../../assets/close.png";
import { AppDispatch } from "../../redux";
import { useDispatch } from "react-redux";
import { handleShowModal } from "../../redux/formStore";

interface Props {
  type: "success" | "error";
}

const Modal: FunctionComponent<Props> = ({ type }) => {
  const containerRef = useRef(null);
  const dispatch = useDispatch<AppDispatch>();

  const hideModal = () => {
    dispatch(handleShowModal("false"));
  };

  const handleOutsideClick = (e) => {
    if (!containerRef.current) return;
    if (e.target === containerRef.current) hideModal();
  };

  return (
    <div
      className={`${classes.container}`}
      ref={containerRef}
      onClick={handleOutsideClick}
    >
      {type === "success" && (
        <div className={classes.modal}>
          <div
            className={`${classes.modal_head} ${classes.modal_head__success}`}
          >
            <h3>Форма успешно отправлена</h3>
          </div>
          <div
            className={`${classes.markContainer} ${classes.markContainer_success}`}
          >
            <img src={Check} alt={"success"} />
          </div>
          <button
            id="button-to-main"
            className={`${classes.button} ${classes.button_success}`}
          >
            На главную
          </button>
        </div>
      )}
      {type === "error" && (
        <div className={classes.modal}>
          <div className={`${classes.modal_head} ${classes.modal_head__error}`}>
            <h3>Ошибка</h3>
            <button onClick={hideModal}>
              <img src={Close} alt="" />
            </button>
          </div>
          <div
            className={`${classes.markContainer} ${classes.markContainer_error}`}
          >
            <img src={Error} alt={"success"} />
          </div>
          <button
            id="button-close"
            className={`${classes.button} ${classes.button_error}`}
            onClick={hideModal}
          >
            Закрыть
          </button>
        </div>
      )}
    </div>
  );
};

export default Modal;
