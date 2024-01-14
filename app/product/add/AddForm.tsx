import action from "../../actions";
import AddImage from "./AddImage";
import styles from "./AddProduct.module.scss";

const AddForm = () => {

  async function add(data: FormData) {
    "use server";
    const product = {
      title: data.get("Title"),
      price: data.get("Price"),
      stock: data.get("Stock"),
      category: data.get("Category"),
      brand: data.get("Brand"),
      description: data.get("Description"),
      image: data.get("image"),
      id: Math.random() * 1000,
    };

    await fetch("http://localhost:3000/api/addProduct", {
      method: "POST",
      body: JSON.stringify({ ...product }),
      cache: "no-cache",
    });
    action("product");
  }

  return (
    <form className={styles.form} name="form" action={add}>
      <label htmlFor="Title">Title</label>
      <input name="Title" type="text" />
      <label htmlFor="Price">Price</label>
      <input name="Price" type="number" />
      <label htmlFor="Stock">Quantity</label>
      <input name="Stock" type="number" />
      <label htmlFor="Category">Category</label>
      <input name="Category" type="text" />
      <label htmlFor="Brand">Brand</label>
      <input name="Brand" type="text" />
      <input name="image" type="file" />
      <AddImage />
      <label htmlFor="Description">Description</label>
      <textarea name="Description" maxLength={200} />
      <button type="submit">Wyślij</button>
    </form>
  );
};

export default AddForm;
