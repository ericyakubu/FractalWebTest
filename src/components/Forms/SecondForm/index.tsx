import { ChangeEvent, FunctionComponent, MouseEvent, useState } from "react";
import classes from "./SecondForm.module.scss";
import Trash from "../../../assets/trash.png";
import ProgressBar from "../../ProgressBar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux";
import { SubmitHandler, useForm } from "react-hook-form";
import { handleGoBack, submitSecondForm } from "../../../redux/formStore";

interface Inputs {
  advantages: string[];
}

const SecondForm: FunctionComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { handleSubmit } = useForm<Inputs>();
  const checkRegEx = /^[A-Za-zА-Яа-я0-9\s,.!?]*$/u;
  const { currentPage, checkGroup, radioGroup } = useSelector(
    (state: RootState) => state.form
  );
  const [advantages, setAdvantages] = useState([""]);
  const [checks, setCheks] = useState([...checkGroup]);
  const [radios, setRadios] = useState([...radioGroup]);

  const handleGroups = (
    e: MouseEvent<HTMLLabelElement>,
    group: string,
    index: number
  ) => {
    e.preventDefault();
    const newChecks = [...checkGroup];
    const newRadios = [...radioGroup];

    switch (group) {
      case "check":
        newChecks[index] = !newChecks[index];
        setCheks(newChecks);
        dispatch(submitSecondForm({ category: "group", group, newChecks }));
        break;
      case "radio":
        newRadios[index] = !newRadios[index];
        setRadios(newRadios);
        dispatch(submitSecondForm({ category: "group", group, newRadios }));
        break;

      default:
        break;
    }
  };

  const onSubmit: SubmitHandler<Inputs> = () => {
    const toFilter = [...advantages];
    const newAdvantages = toFilter.filter((adv) => adv);
    dispatch(submitSecondForm({ category: "advantages", newAdvantages }));
  };

  const handleReturn = () => {
    dispatch(handleGoBack(currentPage - 1));
  };

  const handleAddAdvantage = () => {
    setAdvantages([...advantages, ""]);
  };

  const handleDeleteAdvantage = (index: number) => {
    const updatedAdvantages = [...advantages];
    updatedAdvantages.splice(index, 1);
    setAdvantages(updatedAdvantages);
  };

  // Проверка допустимых символов
  const validateAdvantage = (
    index: number,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    if (checkRegEx.test(value)) {
      const updatedAdvantages = [...advantages];
      updatedAdvantages[index] = value;
      setAdvantages(updatedAdvantages);
    }
  };

  return (
    <main className={classes.container}>
      <ProgressBar progress={2} />
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        {/* Преимущества */}
        <p className={classes.form__label}>Преимущества</p>
        <div className={classes.form__advantages}>
          {advantages.map((adv, index) => (
            <div className={classes.advantage} key={index}>
              <input
                type="text"
                className={classes.form__input}
                id={`field-advantages-${index + 1}`}
                onChange={(e) => validateAdvantage(index, e)}
                value={adv}
              />
              <button
                id={`button-remove-${index + 1}`}
                onClick={() => handleDeleteAdvantage(index)}
              >
                <img src={Trash} alt="" />
              </button>
            </div>
          ))}
        </div>
        <button
          className={classes.form__add}
          onClick={handleAddAdvantage}
          type="button"
        >
          +
        </button>
        {/* Чекбокс группа */}
        <div id="field-checkbox-group" className={classes.form__checkboxes}>
          <p className={classes.form__label}>Checkbox группа</p>
          {checks.map((item, index) => (
            <div key={index}>
              <label
                className={classes.containerCheck}
                onClick={(e) => handleGroups(e, "check", index)}
              >
                {index + 1}
                <input type="checkbox" checked={item} />
                <span className={classes.checkmark} />
              </label>
            </div>
          ))}
        </div>
        {/* Радио группа */}
        <div id="field-radio-group" className={classes.form__radiobuttons}>
          <p className={classes.form__label}>Radio группа</p>
          {radios.map((item, index) => (
            <div key={index}>
              <label
                className={classes.containerRadio}
                onClick={(e) => handleGroups(e, "radio", index)}
              >
                {index + 1}
                <input type="checkbox" checked={item} />
                <span className={classes.checkmark} />
              </label>
            </div>
          ))}
        </div>
        {/* Навигация */}
        <div className={classes.form_buttons}>
          <button
            className={classes.form_buttons__return}
            onClick={handleReturn}
          >
            Назад
          </button>
          <button className={classes.form_buttons__next}>Далее</button>
        </div>
      </form>
    </main>
  );
};

export default SecondForm;
