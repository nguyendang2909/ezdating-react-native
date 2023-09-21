import { Box, Spinner } from 'native-base';
import React from 'react';

type FCProps = {
  isFetching: boolean;
  onRefetch: () => void;
};

export const FetchControl: React.FC<FCProps> = ({ isFetching, onRefetch }) => {
  return (
    <Box>
      <Spinner />
    </Box>
  );
};
