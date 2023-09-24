import React, { useEffect, useState } from 'react';
import { Flex, Input, Button, Text, useToast } from '@chakra-ui/react';
import NodeWallet from '@coral-xyz/anchor/dist/cjs/nodewallet';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/router';
import { Navbar } from '@/components/Navbar';
import { addLink } from '@/util/program/addLink';
import { getAccount } from '@/util/program/getAccount';
import { CopyIcon, PlusSquareIcon } from '@chakra-ui/icons';

const Admin: React.FC = () => {
  const wallet = useAnchorWallet();

  const [account, setAccount] = useState<any>()
  const [linkName, setLinkName] = useState<string>("")
  const [linkUrl, setLinkUrl] = useState<string>("")

  const toast = useToast()
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAccount(wallet as NodeWallet)
      setAccount(data.sig)
    }
    fetchData()
  }, [])


  const handleAddLink = async () => {
    const id = Math.round(Number(Math.random() * 1000))
    const res = await addLink(wallet as NodeWallet, account.account.id, linkName, linkUrl)
    console.log(res)
    if (!res.error) {
      toast({
        status: "success",
        title: "Created a new poll!"
      })
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`${window.location.hostname}/${account.account.profileLink}`)
    toast({
      status: "success",
      title: "Copied Linktree"
    })
  }

  return (

    <>
      <Navbar />
      <Flex flexFlow="column" gap="1rem" bg="#05070D" minH="100vh" h="100%" p="0 10rem">

        <Flex justify="space-between" w="100%" h="60px" bg="gray.700" borderRadius="10px" mt="1rem" align="center" p="0 1rem">
          <Flex align="center" justify="center" gap="10px">
            <Text color="white" fontSize="20px">Your Linktree is Live: </Text>
            {account && <a href={`/${account.account.profileLink}`} target="_blank" style={{ cursor: "pointer", color: "white", fontSize: "20px", textDecoration: "underline" }}>@{account.account.profileLink}</a>}
          </Flex>


          <Flex gap="2rem" justify="center" align="center">
            <Text color="white" fontSize="20px">Share your Linktree</Text>
            <Button onClick={handleCopy} leftIcon={<CopyIcon />}>Copy</Button>
          </Flex>

        </Flex>

        <Flex w="100%" align="center" justify="center">
          <Button leftIcon={<PlusSquareIcon />} h="50px" fontSize="20px" borderRadius="100px" w="50%" colorScheme='purple'>Add Link</Button>
        </Flex>
      </Flex>
    </>

  );
};

export default Admin;
