'use client'
import { useRouter } from 'next/navigation'
import { useForm, SubmitHandler } from "react-hook-form";
import TextField from "@mui/material/TextField";
import toast, {Toaster} from 'react-hot-toast';
import Button from "@mui/material/Button";
import style from './Login.module.scss'
import { useGlobalContext } from '../../../app/Context/store';


type LoginValue = {
  login: string;
  password: string;
};

const Login = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValue>();
  const { setIsLogged } = useGlobalContext()
  
  const onSubmit: SubmitHandler<LoginValue> = (data) => {
    fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(data)
    }).then(async (res) => {
      const {message} = await res.json()
      if(res.status === 200) {
        toast.success(message)
        sessionStorage.setItem(`Logged`, `${data.login}`)
        setIsLogged(true)
        
      } else {
        toast.error(message)
      }
    })
  };

  return (
    <>
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
    <Toaster/>
    </>
  );
};

export default Login;
