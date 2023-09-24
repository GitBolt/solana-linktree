import React, { useState } from 'react';
import { Flex, Input, Button, Text, useToast } from '@chakra-ui/react';
import { createPoll } from '@/util/program/createPoll';
import NodeWallet from '@coral-xyz/anchor/dist/cjs/nodewallet';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/router';
import { Navbar } from '@/components/Navbar';

const PollBuilder: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [options, setOptions] = useState<string[]>(['', '', '', '']);
  const [endDate, setEndDate] = useState<string>('');
  const router = useRouter()
  const toast = useToast()

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

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
      <Flex flexFlow="column" gap="1rem" bg="#05070D" align="center" minH="100vh" h="100%" p="0 10rem">
        <Flex direction="column" w="50%" mt="100px" bg="gray.900" borderRadius="1rem" p="1rem">
          <Text fontSize="3xl" mb="1rem" textAlign="center" color="white">Create Poll</Text>

          <Text fontSize="sm" color="gray.300">{title.length}/70</Text>

          <Input
            fontSize="1.5rem"
            placeholder="Poll Question"
            value={title}
            height="3rem"
            color="white"
            onChange={(e) => setTitle(e.target.value)}
            mb="1rem"
            border="1px solid"
            borderColor="gray.700"
            bg="gray.800"
            maxLength={70}
          />

          {options.map((option, index) => (
            <Flex direction="column" mb="1rem" key={index}>
              <Text fontSize="sm" color="gray.300">{option.length}/50</Text>
              <Input
                fontSize="1.5rem"
                bg="gray.800"
                border="1px solid"
                borderColor="gray.700"
                height="3rem"
                placeholder={`Option ${index + 1}`}
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                color="white"
                maxLength={50}
              />
            </Flex>
          ))}

          <Input
            mt="1rem"
            fontSize="1.5rem"
            bg="gray.800"
            border="1px solid"
            type="date"
            placeholder="End Date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            mb="1rem"
            height="3rem"
            borderColor="gray.700"
            color="white"
          />

          <Button colorScheme="blue" w="60%" h="3rem" fontSize="1.5rem" mt="1rem" alignSelf="center" onClick={handleSubmit}>
            Submit
          </Button>
        </Flex>
      </Flex>
    </>

  );
};

export default PollBuilder;
