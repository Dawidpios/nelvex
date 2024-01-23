"use client";

import action from "../../actions";
import AddImage from "./AddImage";
import styles from "./AddProduct.module.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGlobalContext } from "../../Context/store";

const formSchema = z.object({
  title: z.string().min(5, "Title must be 5 characters at least").max(15, "Maximum title length equals 15 characters"),
  price: z.number().gt(0, "Price must be greater than 0"),
  stock: z.number().gt(0, "Quantity must be greater than 0"),
  category: z.enum(["Jewelery", "Electronics", "Women's clothing", "Men's clothing", "Other"]),
  description: z.string().min(10, "Description must be longer than 10 characters").max(200, "Description must be shorter than 200 characters"),
  image: z.object({}).optional()
});

type typeFormSchema = z.infer<typeof formSchema>;

const AddForm = () => {
  const { productImageUrl } = useGlobalContext()
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
    reset,
    setError,
  } = useForm<typeFormSchema>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<typeFormSchema> = async (
    data: typeFormSchema
  ) => {
    console.log(data)
    try {
      const {success} = formSchema.safeParse({ ...data, image: productImageUrl });
      if(!success) {
        throw Error()
      }
      // await fetch("http://localhost:3000/api/addProduct", {
      //   method: "POST",
      //   body: JSON.stringify({ ...data }),
      //   cache: "no-cache",
      // });
      action("product");
      reset();
    } catch (error: any) {
      console.log("tu", error);
    }
  };
  return (
    <form className={styles.form} name="form" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="Title">Title</label>
      <input {...register("title")} type="text" />
      {errors.title && <p>{errors.title.message}</p>}
      <label htmlFor="Price">Price</label>
      <input {...register("price", { valueAsNumber: true })} />
      {errors.price && <p>{errors.price.message}</p>}
      <label htmlFor="Stock">Quantity</label>
      <input {...register("stock", { valueAsNumber: true })} type="number" />
      {errors.stock && <p>{errors.stock.message}</p>}
      <label htmlFor="Category">Category</label>
      <select {...register('category')} >
      <option value="Jewelery">Jewelery</option>
      </select>
      <input type="file" id="avatar" {...register('image')} accept="image/png, image/jpeg" onChange={(e:any) => console.log(e.target.value)}/>
      <label htmlFor="Description">Description</label>
      <textarea {...register("description")} maxLength={200} />
      {errors.description && <p>{errors.description.message}</p>}
      <button type="submit">Wyślij</button>
    </form>
  );
};

export default AddForm;
