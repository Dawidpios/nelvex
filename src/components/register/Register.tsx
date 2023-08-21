import { useForm, SubmitHandler } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import style from "./Register.module.scss";

type RegisterValue = {
  login: string;
  password: string;
  email: string;
  date: string;
  gender: string;
  name: string;
  surname: string;
};

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterValue>();

  const onSubmit: SubmitHandler<RegisterValue> = (data) => console.log(data);

  return (
    <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
      <TextField
        className={style.form_textField}
        label="User login"
        {...register("login", {
          required: { value: true, message: "User login is required" },
          minLength: { value: 5, message: "User login is too short" },
          maxLength: { value: 20, message: "User login is too long" },
        })}
      />
      {errors.login && (
        <span className={style.form_errorMessage}>{errors.login.message}</span>
      )}
      <TextField
        className={style.form_textField}
        label="User name"
        {...register("name", {
          required: { value: true, message: "User name is required" },
          minLength: { value: 3, message: "User name is too short" },
          maxLength: { value: 20, message: "User name is too long" },
        })}
      />
      {errors.name && (
        <span className={style.form_errorMessage}>{errors.name.message}</span>
      )}
      <TextField
        className={style.form_textField}
        label="User surname"
        {...register("surname", {
          required: { value: true, message: "User surname is required" },
          minLength: { value: 3, message: "User surname is too short" },
          maxLength: { value: 20, message: "User surname is too long" },
        })}
      />
      {errors.surname && (
        <span className={style.form_errorMessage}>
          {errors.surname.message}
        </span>
      )}
      <TextField
        className={style.form_textField}
        label="Email"
        type="email"
        {...register("email", {
          required: { value: true, message: "User email is required" },
          minLength: { value: 5, message: "User email is too short" },
        })}
      />
      {errors.email && (
        <span className={style.form_errorMessage}>{errors.email.message}</span>
      )}
      <TextField
        className={style.form_textField}
        label="Password"
        {...register("password", {
          required: { value: true, message: "User password is required" },
          minLength: { value: 8, message: "User password is too short" },
        })}
      />
      {errors.password && (
        <span className={style.form_errorMessage}>
          {errors.password.message}
        </span>
      )}
      <Button className={style.form_button} variant="outlined" type="submit">
        Register
      </Button>
    </form>
  );
};

export default Register;
