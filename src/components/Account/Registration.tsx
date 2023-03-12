import { useState, useRef, useEffect } from "react";
import Input from "../Reusable/Input";
import style from "../../styles/Account/Register.module.scss";
import Button from "../Reusable/Button";

const Register = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);

  const inputHandler = () => {
    console.log(dateRef.current?.value);
  };
  return (
    <section className={style.register__section}>
      <div className={style.register__inputContainer}>
        <Input
          type={"text"}
          placeholder={"Name"}
          ref={nameRef}
          className={style.register__input}
          onChange={inputHandler}
        ></Input>
        <Input
          type={"password"}
          placeholder={"Password"}
          ref={passRef}
          className={style.register__input}
          onChange={inputHandler}
        ></Input>
        <Input
          type={"email"}
          placeholder={"E-mail"}
          ref={emailRef}
          className={style.register__input}
          onChange={inputHandler}
        ></Input>
        <Input
          type={"date"}
          placeholder={"Birth date"}
          ref={dateRef}
          className={style.register__input}
          onChange={inputHandler}
        ></Input>
        <Button
          text={"Register"}
          className={style.register__button}
          onClick={inputHandler}
        ></Button>
      </div>
    </section>
  );
};

export default Register;
