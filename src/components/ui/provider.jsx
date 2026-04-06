import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

export const Provider = (props) => {
  return (
    <ChakraProvider value={defaultSystem}>{props.children}</ChakraProvider>
  );
};
