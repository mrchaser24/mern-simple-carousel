import { create } from "zustand"

export const useProductStore = create((set) => ({
	products: [],
	setProducts: (products) => set({ products }),
	createProduct: async (newProduct) => {
		if (!newProduct.name || !newProduct.price || !newProduct.image) {
			return { success: false, message: "Please fill all fields" }
		}
		const res = await fetch("/api/products", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(newProduct)
		})

		const data = await res.json()

		set((state) => ({
			products: [...state.products, data]
		}))
		return { success: true, message: "Product created successfully" }
	},
	fetchProducts: async (filter) => {
		const res = await fetch(`/api/products?${filter}`, {
			headers: {
				"Content-Type": 'application/json',
			},
			method: "GET"
		})
		const data = await res.json()
		set({ products: data.data, totalItems: data.totalItems })
	},
	deleteProduct: async (pid) => {
		const res = await fetch(`api/products/${pid}`, {
			method: "DELETE"
		})
		const data = await res.json()
		if(!data.success) return { success: false, message: data.message }

		set((state) => ({
			products: state.products.filter((product) => product._id !== pid)
		}))
		return { success: true, message: data.message }
	},
	updateProduct: async (pid, updatedProduct) => {
		const res = await fetch(`api/products/${pid}`, {
			headers: {
				"Content-Type": 'application/json',
			},
			method: "PUT",
			body: JSON.stringify(updatedProduct)
		})
		const data = await res.json()
		if(!data.success) return { success: false, message: data.message }

		set((state) => ({
			products: state.products.map((product) => product._id === pid? data.data : product)
		}))
		return { success: true, message: data.message }
	}

}))

