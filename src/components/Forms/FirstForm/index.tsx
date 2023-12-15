import { FunctionComponent } from "react";
import classes from "./FristForm.module.scss";
import ProgressBar from "../../ProgressBar";

import { useForm, SubmitHandler } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux";
import {
  handleGoBack,
  handleShowModal,
  submitFirstForm,
} from "../../../redux/formStore";

interface Inputs {
  nickname: string;
  name: string;
  surname: string;
  sex: string;
}

const FirstForm: FunctionComponent = () => {
  const alphanumericRegExp = /^[a-zA-Zа-яА-Я0-9]+$/;
  const alphaRegExp = /^[a-zA-Zа-яА-Я]+$/;
  const allowedSexes = ["man", "woman"];
  const dispatch = useDispatch<AppDispatch>();
  const { currentPage } = useSelector((state: RootState) => state.form);

  const validationSchema = Yup.object().shape({
    nickname: Yup.string()
      .required("Nickname is required")
      .matches(alphanumericRegExp, "Invalid nickname")
      .max(30, "Maximal length is 30 characters"),
    name: Yup.string()
      .required("Name is required")
      .matches(alphaRegExp, "Invalid name")
      .max(50, "Maximal length is 50 characters"),
    surname: Yup.string()
      .required("Phone number is required")
      .matches(alphaRegExp, "Invalid name")
      .max(50, "Maximal length is 50 characters"),
    sex: Yup.string()
      .required("Phone number is required")
      .oneOf(allowedSexes, "Invalid sex"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch(submitFirstForm(data));
  };

  const errorCheck = () => {
    if (errors.nickname || errors.name || errors.surname || errors.sex)
      dispatch(handleShowModal("error"));
  };

  const handleReturn = () => {
    dispatch(handleGoBack(currentPage - 1));
  };

  return (
    <main className={classes.container}>
      <ProgressBar progress={1} />
      <form
        action=""
        onSubmit={handleSubmit(onSubmit)}
        className={classes.form}
      >
        <label htmlFor="nickname" className={classes.form_label}>
          Никнейм
        </label>
        <input
          type="text"
          placeholder="Placeholder"
          {...register("nickname")}
          id="field-nickname"
          className={classes.form_input}
        />
        <p>{errors.nickname ? errors.nickname.message : ""}</p>
        <label htmlFor="name" className={classes.form_label}>
          Имя
        </label>
        <input
          type="text"
          placeholder="Placeholder"
          {...register("name")}
          id="field-name"
          className={classes.form_input}
        />
        <p>{errors.name ? errors.name.message : ""}</p>
        <label htmlFor="lastname" className={classes.form_label}>
          Фамилия
        </label>
        <input
          type="text"
          placeholder="Placeholder"
          {...register("surname")}
          id="field-surname"
          className={classes.form_input}
        />
        <p>{errors.surname ? errors.surname.message : ""}</p>
        <label htmlFor="sex" className={classes.form_label}>
          Пол
        </label>
        <select
          {...register("sex")}
          id="field-sex"
          className={classes.form_select}
        >
          <option hidden>Не выбрано</option>
          <option value="man" id="field-sex-option-man">
            мужской
          </option>
          <option value="woman" id="field-sex-option-woman">
            женсий
          </option>
        </select>
        <p>{errors.sex ? errors.sex.message : ""}</p>
        <div className={classes.form_buttons}>
          <button
            className={classes.form_buttons__return}
            type="button"
            onClick={handleReturn}
          >
            Назад
          </button>
          <button
            className={classes.form_buttons__next}
            type="submit"
            onClick={errorCheck}
          >
            Далее
          </button>
        </div>
      </form>
    </main>
  );
};

export default FirstForm;
