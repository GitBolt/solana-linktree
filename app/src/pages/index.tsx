import { Button, Flex, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Text, useToast } from '@chakra-ui/react'
import { Navbar } from '@/components/Navbar'
import { useRouter } from 'next/router'
import { EditIcon, ViewIcon } from '@chakra-ui/icons'
import { useAnchorWallet } from '@solana/wallet-adapter-react'


export default function Home() {

  const router = useRouter()
  const wallet = useAnchorWallet()

  const handleSubmit = async () => {
    const id = Math.round(Number(Math.random() * 1000))
    const res = await createPoll(wallet as NodeWallet, id, title, options, +new Date(endDate))
    console.log(res)
    if (!res.error) {
      toast({
        status: "success",
        title: "Created a new poll!"
      })
      router.push(`/polls/${id}`)
    }

  };

  return (
    <>

      <Navbar />

      <Flex flexFlow="column" gap="1rem" justify="center" bg="#05070D" align="center" minH="92.5vh" h="100%" p="0 10rem">

        <Text fontSize="100px" color="white" fontWeight={800}>Welcome to Solana Linktree</Text>

        <Text color="gray.400" fontSize="40px">One link to to share all other links powered by Solana</Text>

        <Flex mt="20px" justify="space-around" w="60%" gap="1rem">

          <Input w="65%" fontSize="30px" height="70px" color="white" bg="gray.800" border="none" placeholder='your username' />
          <Button onClick={() => {

          }} mb="80px" w="30%" fontSize="30px" colorScheme='green' h="70px">Claim Username</Button>

        </Flex>

      </Flex>


    </>
  )
}
