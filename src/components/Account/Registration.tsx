import { useState, useRef, useEffect } from "react";
import Input from "../Reusable/Input";
import style from '../../styles/Account/Register.module.scss'

const Register = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);

  const inputHandler = () => {
    console.log(nameRef.current?.value);
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
      </div>
        
    </section>
  );
};

export default Register;
