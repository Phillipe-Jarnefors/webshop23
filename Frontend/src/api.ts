export async function getProducts() {
  const res = await fetch("http://localhost:3000/products")

  if (!res.ok) {
    throw {
      message: "Failed loading data",
    }
  }

  const data = await res.json()
  return data
}
