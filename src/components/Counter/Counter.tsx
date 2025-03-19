'use client';

import { Box, Button, HStack, Text } from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { decrement, increment } from './counterSlice';

export const Counter = () => {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <Box p={4} borderWidth="1px" borderRadius="lg">
      <Text fontSize="xl" mb={4}>
        Count: {count}
      </Text>
      <HStack spacing={4}>
        <Button onClick={() => dispatch(increment())}>Increment</Button>
        <Button onClick={() => dispatch(decrement())}>Decrement</Button>
      </HStack>
    </Box>
  );
}; 