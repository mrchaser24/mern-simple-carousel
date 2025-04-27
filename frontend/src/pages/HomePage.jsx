import { useEffect, useState } from 'react'
import { Container, VStack, Text, SimpleGrid, HStack, Spacer } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useProductStore } from '../store/product'
import { ProductCard } from '../components/ProductCard'
import Pagination from '@/components/Pagination'

const HomePage = () => {
  const {fetchProducts, products, totalItems} = useProductStore()
  const [currentPage, setCurrentPage] = useState(1)
  const filter = `name=${1}&page=${currentPage}`

  useEffect(() => {
    fetchProducts(filter)
  }, [fetchProducts, currentPage, filter])


  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8}>
        <Text
          fontSize="4xl"
          fontWeight="bold"
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
          textAlign="center"
        >
          Current Product 🚀
        </Text>

        <SimpleGrid 
          columns={{ base: 1, md: 2, lg: 3 }} 
          spacing={10}
          width={"full"}
        >
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </SimpleGrid>

        {products.length < 1 && <Text fontSize={'xl'} textAlign={'center'} fontWeight={'bold'} color={'gray.500'}>
          No product found 😓
          <Link to={"/create"}>
            <Text as={'span'} color={'blue.500'} _hover={{ textDecoration: 'underline'}}>
              Create a product
            </Text>
          </Link>
        </Text>}

        <HStack 
          spacing={2} 
          alignItems={"center"}
          width={"full"}
        >
          <Pagination totalPages={totalItems} currentPage={currentPage} onChange={setCurrentPage}/>

          <Spacer />
          
          <Text
            fontSize="12"
            textAlign="start"
          >
            Total Result: {totalItems} 
          </Text>
        </HStack>
      </VStack>
    </Container>
  )
}

export default HomePage