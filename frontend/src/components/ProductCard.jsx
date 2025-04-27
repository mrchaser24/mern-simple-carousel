import { useState, useEffect, useRef } from 'react'
import { FaEdit } from "react-icons/fa"
import { MdDelete } from "react-icons/md"
import {
  Button,
  Box,
  Image,
  Heading,
  Text,
  HStack,
  IconButton,
  useColorModeValue,
  useToast,
  VStack,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
	Fade
} from '@chakra-ui/react'
import { useProductStore } from '../store/product'

export const ProductCard = ({ product }) => {
  const toast = useToast()
  const textColor = useColorModeValue('gray.600', 'gray.200')
  const bg = useColorModeValue('white', 'gray.800')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { deleteProduct, updateProduct } = useProductStore()
  const [updatedProduct, setUpdatedProduct] = useState(product)
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef(null)

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid)
    if (success) {
      toast({
        title: "Product Deleted",
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
  }

  const handleProductUpdate = async (pid, updatedProduct) => {
    const { success, message } = await updateProduct(pid, updatedProduct)
    if (success) {
      toast({
        title: "Product Updated",
        description: message,
        status: "success",
        isClosable: true,
      })
      onClose()
    } else {
      toast({
        title: "Error",
        description: message,
        status: "error",
        isClosable: true,
      })
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting)
        })
      },
      { threshold: 0 }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current)
      }
    }
  }, [])

  return (
    <Box
      ref={cardRef}
      shadow={'lg'}
      rounded={'lg'}
      overflow={'hidden'}
      transition={'all .3s'}
      _hover={{
        transform: 'translateY(-5px)',
        shadow: 'xl',
      }}
      bg={bg}
    >
      {isVisible && (
        <Fade in={isVisible} transition={{ enter: { duration: 0.5 } }}>
          <Image src={product.image} alt={product.name} h={'48'} w="full" objectFit={'cover'} />
          <Box p={4}>
            <Heading as="h3" size="md" mb={2}>
              {product.name}
            </Heading>

            <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
              ${product.price}
            </Text>

            <HStack spacing={2}>
              <IconButton icon={<FaEdit />} onClick={onOpen} colorScheme="blue" />
              <IconButton icon={<MdDelete />} onClick={() => handleDeleteProduct(product._id)} colorScheme="red" />
            </HStack>
          </Box>
        </Fade>
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack>
              <Input
                placeholder="Product Name"
                name="name"
                value={updatedProduct.name}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
              />
              <Input
                placeholder="Price"
                name="price"
                value={updatedProduct.price}
                type="number"
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
              />
              <Input
                placeholder="Image URL"
                name="image"
                value={updatedProduct.image}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={() => handleProductUpdate(product._id, updatedProduct)}>
              Update
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}
