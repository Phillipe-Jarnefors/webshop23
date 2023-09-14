import { AddProduct, Product } from "./Utilities/Interfaces";

export async function getProducts() {
  const res = await fetch("http://localhost:3000/products");

  if (!res.ok) {
    throw {
      message: "Failed loading data",
    };
  }

  const data = await res.json();
  return data;
}

export async function removeProduct(id: string) {
  const settings = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      isDeleted: true,
    }),
  };
  try {
    const res = await fetch(
      `http://localhost:3000/products/delete/${id}`,
      settings
    );
    const data = await res.json();

    console.log(data);

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getProductById(productId: string) {
  try {
    const res = await fetch(`http://localhost:3000/products/${productId}`);

    if (!res.ok) {
      throw new Error("Failed loading data");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Ett fel uppstod vid hämtning av produkt:", error);
    throw error;
  }
}

export async function updateAvailability(
  productId: string,
  available: boolean
) {
  const settings = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      isAvailable: available,
    }),
  };
  try {
    const res = await fetch(
      `http://localhost:3000/products/available/${productId}`,
      settings
    );
    const data = await res.json();
      console.log(data.message);
      
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function addNewProduct(product: AddProduct) {
  const settings = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "name": product.productName,
      "image": product.image,
      "shortDesc": product.shortDesc,
      "description":  product.description,
      "price":  product.price,
      "quantity":  product.quantity,
      "isAvailable":  product.isAvailable,
      "isDeleted": false
    })
  }
  try {
    const res = await fetch('http://localhost:3000/products/add', settings)
    const data = await res.json()
    return data
  } catch(error) {
    console.error(error)
  }
}

export async function updateProduct(product: AddProduct) {
  const settings = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "_id": product.productId,
      "name": product.productName,
      "image": product.image,
      "shortDesc": product.shortDesc,
      "description":  product.description,
      "price":  product.price,
      "quantity":  product.quantity,
      "isAvailable":  product.isAvailable,
      "isDeleted": false
    })
  }
  try {
    const res = await fetch('http://localhost:3000/products/update/', settings)
    const data = await res.json()
    return data
  } catch(error) {
    console.error(error)
  }
}
