'use client'

import { useRouter } from 'next/navigation'
import { useForm, SubmitHandler } from "react-hook-form";
import toast, {Toaster} from 'react-hot-toast';
import style from './Login.module.scss'
import { signIn} from 'next-auth/react'

type LoginValue = {
  email: string;
  password: string;
};

const Login = () => {

  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValue>();
  

  const onSubmit: SubmitHandler<LoginValue> = async (data) => {
    const loginStatus = await signIn("credentials", {
     ...data,
     redirect: false
    })
    if(loginStatus?.error) {
      toast.error(loginStatus.error)
    }
    router.push('/')
  };

  return (
    <>
    <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
      <input
      type='email'
      placeholder='User email'
      className={style.form_textField}
        {...register("email", { required: true, minLength: 5, maxLength: 35 })}
      />
      {errors.email && <span>{errors.email?.message}</span>}

      <input
      placeholder='Password'
      className={style.form_textField}
        {...register("password", { required: true, minLength: 8 })}
      />
      {errors.password && <span>{errors.password?.message}</span>}

      <button className={style.form_button} type="submit">
        Login
      </button>
    </form>
    <Toaster/>
    </>
  );
};

export default Login;
