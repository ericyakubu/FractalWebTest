import { FunctionComponent } from "react";
import { useDispatch } from "react-redux";
import { useForm, SubmitHandler } from "react-hook-form";
import InputMask from "react-input-mask";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaFolder } from "react-icons/fa";
import * as Yup from "yup";

import classes from "./Landing.module.scss";
import { handleShowModal, submitLanding } from "../../redux/formStore";

interface Inputs {
  phone: string;
  email: string;
}

const Landing: FunctionComponent = () => {
  const links = ["Telegram", "GitHub", "Резюме"];
  const dispatch = useDispatch();

  const phoneRegExp = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
  const emailRegExp = /^[A-Z0-9._-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email")
      .required("Email adress is required")
      .matches(emailRegExp, "Invalid email"),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(phoneRegExp, "Invalid phone number"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch(submitLanding(data));
  };

  const errorCheck = () => {
    if (errors.email || errors.phone) dispatch(handleShowModal("error"));
  };

  return (
    <main className={classes.container}>
      <section className={classes.user}>
        <div className={classes.user__avatar}>
          <span>ЭЯ</span>
        </div>
        <div className={classes.user__info}>
          <h3 className={classes.user__info_name}>Эрик Якубу</h3>
          <div className={classes.user__info_links}>
            {links.map((link, index) => (
              <div key={index} className={classes.user__info_links__link}>
                <FaFolder />
                <span>{link}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
          <label htmlFor="phone" className={classes.form__label}>
            Номер телефона
          </label>
          <InputMask
            mask="+7 (999) 999-99-99"
            type="text"
            {...register("phone", {
              pattern: {
                value: /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
                message: "Invalid phone number format",
              },
            })}
            className={classes.form__input}
            placeholder="+7 (999)-999-99-99"
          />
          <p>{errors.phone ? errors.phone.message : ""}</p>
          <label htmlFor="email" className={classes.form__label}>
            Email
          </label>
          <input
            type="text"
            {...register("email")}
            className={classes.form__input}
            placeholder="webstudio.fractal@example.com"
          />
          <p>{errors.email ? errors.email.message : ""}</p>
          <button
            className={classes.form__btn}
            type="submit"
            onClick={errorCheck}
          >
            Начать
          </button>
        </form>
      </section>
    </main>
  );
};

export default Landing;
