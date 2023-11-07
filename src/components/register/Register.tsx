'use client'
import { useRouter } from 'next/navigation'
import { useForm, SubmitHandler } from "react-hook-form";
import toast, {Toaster} from 'react-hot-toast';
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
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterValue>();

  const onSubmit: SubmitHandler<RegisterValue> = async (data) => {
    fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify(data)
    }).then(async (res) => {
      const {message} = await res.json()
      if(res.status === 200) {
        toast.success(message)
        setTimeout(() => {
          router.push('/')
        }, 1500)
      } else {
        toast.error(message)
      }
    }).catch(error => { throw new Error(error) })
  };

  return (
    <>
    <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
      <input
        placeholder='Login'
        className={style.form_textField}
        {...register("login", {
          required: { value: true, message: "User login is required" },
          minLength: { value: 5, message: "User login is too short" },
          maxLength: { value: 20, message: "User login is too long" },
        })}
      />
      {errors.login && (
        <span className={style.form_errorMessage}>{errors.login.message}</span>
      )}
      <input
        placeholder='Name'
        className={style.form_textField}
        {...register("name", {
          required: { value: true, message: "User name is required" },
          minLength: { value: 3, message: "User name is too short" },
          maxLength: { value: 20, message: "User name is too long" },
        })}
      />
      {errors.name && (
        <span className={style.form_errorMessage}>{errors.name.message}</span>
      )}
      <input
        placeholder='Surname'
        className={style.form_textField}
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
      <input
        placeholder='E-mail'
        className={style.form_textField}
        type="email"
        {...register("email", {
          required: { value: true, message: "User email is required" },
          minLength: { value: 5, message: "User email is too short" },
        })}
      />
      {errors.email && (
        <span className={style.form_errorMessage}>{errors.email.message}</span>
      )}
      <input
        placeholder='Password'
        className={style.form_textField}
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
      <button className={style.form_button} type="submit">
        Register
      </button>
    </form>
    <Toaster />
    </>
  );
};

export default Register;
