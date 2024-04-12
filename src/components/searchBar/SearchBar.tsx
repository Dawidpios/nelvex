'use client'
import Button from "../button/Button";
import { useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";

const SearchBar = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const submitForm = (e:any) => {
    e.preventDefault()
    console.log(router)
    console.log(searchParams)
    // fn(`konsoluje ${formData.get('jewellery')}`)
  };

  return (
    <form onSubmit={submitForm}>
      <label htmlFor="jewellery">Jewellery</label>
      <input
        value="jewellery"
        type="checkbox"
        id="jewellery"
        name="checkbox"
      ></input>
      <label htmlFor="women's clothing">Women's clothing</label>
      <input
        value="women's clothing"
        type="checkbox"
        id="women's clothing"
        name="checkbox"
      ></input>
      <label htmlFor="men's clothing">Men's clothing</label>
      <input
        value="men's clothing"
        type="checkbox"
        id="men's clothing"
        name="checkbox"
      ></input>
      <label htmlFor="electronics">Electronics</label>
      <input
        value="electronics"
        type="checkbox"
        id="electronics"
        name="checkbox"
      ></input>
      <label htmlFor="other">Other</label>
      <input
        value="electronics"
        type="checkbox"
        id="other"
        name="checkbox"
      ></input>
      <Button>Filter products</Button>
    </form>
  );
};

export default SearchBar;
