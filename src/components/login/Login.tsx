import { useForm, SubmitHandler } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import style from './Login.module.scss'

type LoginValue = {
  login: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginValue>();

  const onSubmit: SubmitHandler<LoginValue> = (data) => console.log(data);

  return (
    <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
      <TextField
      className={style.form_textField}
        label="User login"
        {...register("login", { required: true, minLength: 5, maxLength: 35 })}
      />
      {errors.login && <span>{errors.login?.message}</span>}

      <TextField
      className={style.form_textField}
        label="Password"
        {...register("password", { required: true, minLength: 8 })}
      />
      {errors.password && <span>{errors.password?.message}</span>}

      <Button className={style.form_button} variant="outlined" type="submit">
        Login
      </Button>
    </form>
  );
};

export default Login;
