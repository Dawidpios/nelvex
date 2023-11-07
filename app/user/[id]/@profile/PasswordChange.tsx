"use client";
import { useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import style from "./profile.module.scss";
import { FaRectangleXmark } from "react-icons/fa6";

type FormValue = {
  oldPassword: string;
  confirmedOldPassword: string;
  newPassword: string;
};

const PasswordChangePopup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>();

  const popupRef = useRef<HTMLDivElement | null>(null);

  const handlePopup = () => {
    if (popupRef?.current) {
      popupRef.current.classList.toggle(style.showPopup);
    }
  };

  const onSubmit: SubmitHandler<FormValue> = async (data) => {
    console.log(data);
  };

  return (
    <>
      <button onClick={handlePopup} className={style.button}>
        Change password
      </button>
      <div ref={popupRef} className={style.passwordPopup}>
        <FaRectangleXmark
          className={style.passwordPopup_closeIcon}
          onClick={handlePopup}
        />
        <form
          className={style.passwordPopup_form}
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            placeholder="Old password"
            type="text"
            id="oldPass"
            className={style.passwordPopup_form_input}
            {...register("oldPassword", {
              required: { value: true, message: "User login is required" },
            })}
          />
          {errors.oldPassword && (
            <span className={style.form_errorMessage}>
              {errors.oldPassword.message}
            </span>
          )}
          <input
            placeholder="Confirm old password"
            type="text"
            id="confirmOldPass"
            className={style.passwordPopup_form_input}
            {...register("confirmedOldPassword", {
              required: { value: true, message: "Confirm your new password" },
            })}
          />
          {errors.confirmedOldPassword && (
            <span className={style.form_errorMessage}>
              {errors.confirmedOldPassword.message}
            </span>
          )}
          <input
            placeholder="New password"
            type="text"
            id="newPassword"
            className={style.passwordPopup_form_input}
            {...register("newPassword", {
              required: { value: true, message: "Type your new password" },
            })}
          />
          {errors.newPassword && (
            <span className={style.form_errorMessage}>
              {errors.newPassword.message}
            </span>
          )}
          <button className={style.button}>Set new password</button>
        </form>
      </div>
    </>
  );
};

export default PasswordChangePopup;
