'use client';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { increment, decrement } from '../store/features/counterSlice';
import { Button, HStack, Text } from '@chakra-ui/react';

export function Counter() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <HStack spacing={4}>
      <Button onClick={() => dispatch(decrement())}>-</Button>
      <Text fontSize="xl">{count}</Text>
      <Button onClick={() => dispatch(increment())}>+</Button>
    </HStack>
  );
} 