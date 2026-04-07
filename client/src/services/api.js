const BASE_URL = "https://svtraders-q5t6.onrender.com";

export const getProducts = async (search = "", category = "All") => {
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  if (category && category !== "All") params.append("category", category);

  const res = await fetch(`${BASE_URL}/products?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
};

export const getCategories = async () => {
  const res = await fetch(`${BASE_URL}/categories`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
};

export const getProductById = async (id) => {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  if (!res.ok) throw new Error("Product not found");
  return res.json();
};
