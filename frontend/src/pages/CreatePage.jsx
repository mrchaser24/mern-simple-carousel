import { useState } from 'react'
import { Container, VStack, Heading, useColorModeValue, Box, Input, Button, useToast  } from '@chakra-ui/react'
import { useProductStore } from '../store/product'

const CreatePage = () => {
	const toast = useToast()
	const [newProduct, setNewProduct] = useState({
		name: "",
		price: "",
		image: "",
	})
	const { createProduct } = useProductStore()

	const handleAddProduct = async () => {
		const {success, message} = await createProduct(newProduct)
		console.log("Success:",success);
		console.log("Message:",message);
		if (success) {
			toast({
				title: "Product Created",
				description: message,
				status: "success",
				isClosable: true,
			})
		} else {
			toast({
				title: "Error",
				description: message,
				status: "error",
				isClosable: true,
			})
		}
		setNewProduct({
			name: "",
			price: "",
			image: "",
		})
	}
	return (
		<Container maxW={"container.sm"}>
			<VStack
				spacing={8}
			>
				<Heading as="h1" size="2xl" textAlign={"center"} mb={8}>
					Create New Product
				</Heading>

				<Box
					w={"full"}
					bg={useColorModeValue("white", "gray.800")}
					rounded={"lg"}
					p={6}
					shadow={"md"}
				>
					<VStack spacing={4}>
						<Input
							placeholder="Product Name"
							name="name"
							value={newProduct.name}
							onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
						/>
						<Input
							placeholder="Price"
							name="price"
							value={newProduct.price}
							onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
						/>
						<Input
							placeholder="Image URL"
							name="image"
							value={newProduct.image}
							onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
						/>

						<Button colorScheme='blue' onClick={handleAddProduct} w={"full"}>Add Product</Button>
					</VStack>
				</Box>
			</VStack>
		</Container>
	)
}

export default CreatePage