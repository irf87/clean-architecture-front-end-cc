'use client';

import { Box, Container, Heading, VStack, Button, Text } from '@chakra-ui/react';
import { useAppSelector } from '../store/hooks';
import Link from 'next/link';
import { Counter } from '../components/Counter';

export default function Home() {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  return (
    <Container maxW="container.sm" py={10}>
      <VStack spacing={8}>
        <Heading>Welcome to the App</Heading>
        {isAuthenticated ? (
          <>
            <Text>Welcome back, {user?.email}!</Text>
            <Counter />
          </>
        ) : (
          <VStack spacing={4}>
            <Text>Please login or register to continue</Text>
            <Box>
              <Link href="/login" passHref>
                <Button as="a" colorScheme="blue" mr={4}>
                  Login
                </Button>
              </Link>
              <Link href="/register" passHref>
                <Button as="a" colorScheme="green">
                  Register
                </Button>
              </Link>
            </Box>
          </VStack>
        )}
      </VStack>
    </Container>
  );
}
