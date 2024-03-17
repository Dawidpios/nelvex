"use client";

import Image from "next/image";
import action from "../../actions";
import AddImage from "../../utilities/AddImage/AddImage";
import styles from "./AddProduct.module.scss";
import AddProductImage from "../../../public/images/addProduct/pexels-photo-5650023.webp";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import Button from "@/components/button/Button";

const formSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be 5 characters at least")
    .max(15, "Maximum title length equals 15 characters"),
  price: z.number().gt(0, "Price must be greater than 0"),
  stock: z.number().gt(0, "Quantity must be greater than 0"),
  category: z.enum([
    "Jewelery",
    "Electronics",
    "Women's clothing",
    "Men's clothing",
    "Other",
  ]),
  description: z
    .string()
    .min(10, "Description must be longer than 10 characters")
    .max(200, "Description must be shorter than 200 characters"),
  image: z.string().optional(),
});

type typeFormSchema = z.infer<typeof formSchema>;

const AddProductForm = () => {
  const [imageUrl, setImage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading, isSubmitting },
    reset,
    setError,
  } = useForm<typeFormSchema>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<typeFormSchema> = async (
    data: typeFormSchema
  ) => {
    try {
      if (imageUrl) {
        data.image = imageUrl as string;
      }
      const { success } = formSchema.safeParse({ ...data });
      if (!success) {
        throw Error();
      }
      await fetch("http://localhost:3000/api/addProduct", {
        method: "POST",
        body: JSON.stringify({ ...data }),
        cache: "no-cache",
      });
      action("getProducts");
      reset();
    } catch (error: any) {
      toast.error(error);
    }
  };
  return (
    <section className={styles.addProductContainer}>
      <form
        className={styles.form}
        name="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input placeholder="Product title" {...register("title")} type="text" />
        {errors.title && <p>{errors.title.message}</p>}
        <input
          placeholder="Product price"
          {...register("price", { valueAsNumber: true })}
        />
        {errors.price && <p>{errors.price.message}</p>}
        <input
          placeholder="Product quantity"
          {...register("stock", { valueAsNumber: true })}
          type="number"
        />
        {errors.stock && <p>{errors.stock.message}</p>}
        <label htmlFor="Category">Category</label>
        <select defaultValue={"Other"} {...register("category")}>
          <option
            style={{ color: "red", fontWeight: "bold", textAlign: "center" }}
            value="Jewelery"
          >
            Jewelery
          </option>
          <option
            style={{ color: "red", fontWeight: "bold", textAlign: "center" }}
            value="Men's clothing"
          >
            Men's clothing
          </option>
          <option
            style={{ color: "red", fontWeight: "bold", textAlign: "center" }}
            value="Women's clothing"
          >
            Women's clothing
          </option>
          <option
            style={{ color: "red", fontWeight: "bold", textAlign: "center" }}
            value="Electronics"
          >
            Electronics
          </option>
          <option
            style={{ color: "red", fontWeight: "bold", textAlign: "center" }}
            value="Other"
          >
            Other
          </option>
        </select>
        <textarea
          placeholder="Product description..."
          {...register("description")}
          maxLength={200}
        />
        {errors.description && <p>{errors.description.message}</p>}
        <AddImage setImage={setImage} text={"Set product picture"} />
        <Button
          disabled={isSubmitting}
          isLoading={isSubmitting}
          className={"addProductButton"}
          type="submit"
        >
          {isSubmitting ? "Pending..." : "Add product"}
        </Button>
      </form>
      <div className={styles.imageContainer}>
        <Image
          src={AddProductImage}
          alt={"Add product image"}
          fill={true}
        ></Image>
      </div>
      <Toaster />
    </section>
  );
};

export default AddProductForm;
