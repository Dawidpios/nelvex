'use client'

import Image from 'next/image';
import { useRouter } from 'next/navigation'
import { useForm, SubmitHandler } from "react-hook-form";
import toast, {Toaster} from 'react-hot-toast';
import style from './Login.module.scss'
import { signIn} from 'next-auth/react'
import {z} from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import loginHero from '../../../public/images/login/loginHero.svg'
import Button from '../button/Button';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
})

type typeLoginSchema = z.infer<typeof loginSchema>

const Login = () => {

  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<typeLoginSchema>({
    resolver: zodResolver(loginSchema)
  });
  

  const onSubmit: SubmitHandler<typeLoginSchema> = async (data) => {
    try {
      const { success } = loginSchema.safeParse(data)
      if(!success) {
        throw 'Validation failed, try again'
      }
      const loginStatus = await signIn("credentials", {
        ...data,
        redirect: false
       })
       if(loginStatus?.error) {
         toast.error(loginStatus.error)
       } else {
         router.push('/')
       }  
    }
    catch(error) {
      toast.error(error as string)
    }
  };

  return (
    <section className={style.login_section}>
    <div className={style.imageContainer}>
      <Image src={loginHero} fill quality={100} style={{borderRadius: '15px'}} alt="Login hero"></Image>
    </div>
    <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
      <input
      type='email'
      placeholder='User email'
      className={style.form_textField}
        {...register("email")}
      />
      {errors.email && <span>{errors.email?.message}</span>}

      <input
      type='password'
      placeholder='Password'
      className={style.form_textField}
        {...register("password")}
      />
      {errors.password && <span>{errors.password?.message}</span>}

      <Button disabled={isSubmitting} className='form_button' type="submit">
        {!isSubmitting ? "Login" : "Logging..."}
      </Button>
    </form>
    <Toaster/>
    </section>
  );
};

export default Login;
