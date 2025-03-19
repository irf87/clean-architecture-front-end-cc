'use client';

import { Box, Button, Flex, Heading, Spacer } from '@chakra-ui/react';
import Link from 'next/link';
import { useAppSelector } from '../store/hooks';
import { LogoutButton } from '@/domains/auth/ui/LogoutButton';

export const Navigation = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <Box bg="blue.500" px={4} py={2}>
      <Flex align="center">
        <Link href="/" passHref>
          <Heading as="h1" size="md" color="white" cursor="pointer">
            App {isAuthenticated}
          </Heading>
        </Link>
        <Spacer />
        {isAuthenticated ? (
          <LogoutButton />
        ) : (
          <Box>
            <Link href="/login" passHref>
              <Button as="a" colorScheme="whiteAlpha" mr={2}>
                Login
              </Button>
            </Link>
            <Link href="/register" passHref>
              <Button as="a" colorScheme="whiteAlpha">
                Register
              </Button>
            </Link>
          </Box>
        )}
      </Flex>
    </Box>
  );
}; 