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

    if(!res.ok) {
      throw new Error("Failed loading data");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Ett fel uppstod vid hämtning av produkt:", error);
    throw error;
  }
}
