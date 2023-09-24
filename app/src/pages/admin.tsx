import React, { useEffect, useState } from 'react';
import { Flex, Input, Button, Text, useToast } from '@chakra-ui/react';
import NodeWallet from '@coral-xyz/anchor/dist/cjs/nodewallet';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/router';
import { Navbar } from '@/components/Navbar';
import { addLink } from '@/util/program/addLink';
import { getAccount } from '@/util/program/getAccount';
import { CopyIcon, DeleteIcon, PlusSquareIcon } from '@chakra-ui/icons';
import { AddLinkModal } from '@/components/AddLinkModal';
import { getLinks } from '@/util/program/getLinks';
import { removeLink } from '@/util/program/removeLink';

const Admin: React.FC = () => {
  const wallet = useAnchorWallet();

  const [account, setAccount] = useState<any>()
  const [links, setLinks] = useState<any[]>([])
  const [showModal, setShowModal] = useState<boolean>(false)

  const [reload, setReload] = useState<number>(+new Date())
  const toast = useToast()
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAccount(wallet as NodeWallet)
      setAccount(data.sig)

      const links = await getLinks(wallet as NodeWallet, data.sig.account.id)
      setLinks(links.sig.map((l: any) => { return { address: l.publicKey.toBase58(), name: l.account.linkName, url: l.account.linkUrl } }))
    }
    fetchData()
  }, [reload])



  const handleRemoveLink = async (linkName: string) => {

    const res = await removeLink(wallet as NodeWallet, account.account.id, linkName)
    console.log(res)
    if (!res.error) {
      toast({
        status: "success",
        title: "Remove a link!"
      })
      setReload(+new Date())

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

      {showModal ? <AddLinkModal setReload={setReload} account={account} isOpen={showModal} onClose={setShowModal} /> : null}
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
          {account && <Button onClick={() => setShowModal(true)} leftIcon={<PlusSquareIcon />} h="50px" fontSize="20px" borderRadius="100px" w="50%" colorScheme='purple'>Add Link</Button>}
        </Flex>

        <Flex flexFlow="column" align="center" justify="center">
          {links.map((l) => (
            <Flex justify="space-between" align="center" p="0 10px" bg="gray.700" w="50%" h="80px" borderRadius="10px" key={l.address}>
              <Flex align="start" justify="center" flexFlow="column">
                <Text color="white" fontSize="30px">{l.name}</Text>
                <Text color="white" fontSize="20px">https://{l.url}</Text>
              </Flex>
              <DeleteIcon onClick={() => handleRemoveLink(l.name)} cursor="pointer" color="red" width="20px" height="20px" />
            </Flex>
          ))}
        </Flex>
      </Flex>
    </>

  );
};

export default Admin;
