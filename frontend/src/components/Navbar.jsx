import { Button, Container, Flex, Text, HStack, useColorMode } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
// import { CiSquarePlus } from '@chakra-ui/icons'
import { CiSquarePlus } from "react-icons/ci";
import { IoMoon, IoSunnyOutline } from "react-icons/io5";
import React from 'react'

const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode()

    return (
        <Container maxW={"1140px"} px={4}>
            <Flex
                h={16}
                alignItems={"center"}
                justifyContent={"space-between"}
                flexDir={{
                    base: "column",
                    sm: "row"
                }}
            >
                <Text
                    fontSize={{base: "22", sm: "28"}}
                    fontWeight={"bold"}
                    textTransform={"uppercase"}
                    textAlign={"center"}
                    bgGradient={"linear(to-r, cyan.400, blue.500)"}
                    bgClip={"text"}
                >
                    <Link to={"/"}>Product Store 🛒</Link>
                </Text>

                <HStack spacing={2} alignItems={"center"}>
                    <Link to={"/create"}>
                        <Button>
                            <CiSquarePlus fontSize={20} />
                        </Button>
                    </Link>
                        <Button onClick={toggleColorMode}>
                            {colorMode === "light" ? <IoMoon/> : <IoSunnyOutline/>}
                        </Button>
                </HStack>
            </Flex>
        </Container>
    )
}

export default Navbar