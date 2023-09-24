import { Button, Flex, Input, Text, useToast } from '@chakra-ui/react'
import { Navbar } from '@/components/Navbar'
import { useRouter } from 'next/router'
import { useAnchorWallet } from '@solana/wallet-adapter-react'
import { createAccount } from '@/util/program/createAccount'
import NodeWallet from '@coral-xyz/anchor/dist/cjs/nodewallet'
import { useState } from 'react'


export default function Home() {

  const [profileLink, setProfileLink] = useState<string>("")

  const router = useRouter()
  const wallet = useAnchorWallet()
  const toast = useToast()

  const handleSubmit = async () => {
    const id = Math.round(Number(Math.random() * 1000))
    const res = await createAccount(wallet as NodeWallet, id, profileLink)
    console.log(res)
    if (!res.error) {
      toast({
        status: "success",
        title: "Created Linktree profile!"
      })
      router.push(`/admin`)
    } else {
      toast({
        status: "error",
        title: res.error
      })
    }

  };

  return (
    <>

      <Navbar />

      <Flex flexFlow="column" gap="1rem" justify="center" bg="#05070D" align="center" minH="92.5vh" h="100%" p="0 10rem">

        <Text fontSize="100px" color="white" fontWeight={800}>Welcome to Solana Linktree</Text>

        <Text color="gray.400" fontSize="40px">One link to to share all other links powered by Solana</Text>

        <Flex mt="20px" justify="space-around" w="60%" gap="1rem">

          <Input
            onChange={(e) => setProfileLink(e.target.value)}
            w="65%"
            fontSize="30px"
            height="70px"
            color="white"
            bg="gray.800"
            border="none"
            placeholder='your username' />
          <Button onClick={handleSubmit} mb="80px" w="30%" fontSize="30px" colorScheme='green' h="70px">Claim Username</Button>

        </Flex>

      </Flex>


    </>
  )
}
