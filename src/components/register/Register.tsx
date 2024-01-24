"use client";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import style from "./Register.module.scss";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const registerSchema = z.object({
  login: z
    .string()
    .min(5, "User login is too short")
    .max(20, "User login is too long"),
  password: z.string().min(8, "User password is too short"),
  email: z.string().email(),
  name: z
    .string()
    .min(3, "User name is too short")
    .max(20, "User name is too long"),
  surname: z
    .string()
    .min(3, "User surname is too short")
    .max(20, "User surname is too long"),
});

type typeRegisterSchema = z.infer<typeof registerSchema>;

const Register = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<typeRegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<typeRegisterSchema> = async (formData) => {
    try {
      const { success } = registerSchema.safeParse(formData);
      if (!success) {
        throw "Validation failed";
      }
      fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(formData),
      }).then(async (res) => {
        const { message } = await res.json();
        if (res.status === 200) {
          toast.success(message);
          setTimeout(() => {
            router.push("/");
          }, 1500);
        } else {
          toast.error(message);
        }
      });
    } catch (error) {
      toast.error(error as string);
    }
  };

  return (
    <>
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="Login"
          className={style.form_textField}
          {...register("login")}
        />
        {errors.login && (
          <span className={style.form_errorMessage}>
            {errors.login.message}
          </span>
        )}
        <input
          placeholder="Name"
          className={style.form_textField}
          {...register("name")}
        />
        {errors.name && (
          <span className={style.form_errorMessage}>{errors.name.message}</span>
        )}
        <input
          placeholder="Surname"
          className={style.form_textField}
          {...register("surname")}
        />
        {errors.surname && (
          <span className={style.form_errorMessage}>
            {errors.surname.message}
          </span>
        )}
        <input
          placeholder="E-mail"
          className={style.form_textField}
          type="email"
          {...register("email")}
        />
        {errors.email && (
          <span className={style.form_errorMessage}>
            {errors.email.message}
          </span>
        )}
        <input
          placeholder="Password"
          className={style.form_textField}
          {...register("password")}
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
