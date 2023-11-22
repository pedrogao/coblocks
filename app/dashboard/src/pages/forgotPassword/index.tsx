import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useTranslate } from "@refinedev/core";
import { useNavigate } from "react-router-dom";

type ForgotPasswordFormInputs = {
  email: string;
};

export const ForgotPassword = () => {
  const translate = useTranslate();
  const navigate = useNavigate();

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "xl", md: "xl" }}>
          {translate("pages.forgotPassword.title")}
        </Heading>
        <FormControl id="email">
          <Input
            placeholder={translate("pages.forgotPassword.fields.email")}
            _placeholder={{ color: "gray.500" }}
            type="email"
          />
        </FormControl>
        <Stack spacing={6}>
          <Button
            bg={"blue.400"}
            color={"white"}
            _hover={{
              bg: "blue.500",
            }}
          >
            {translate("pages.forgotPassword.buttons.submit")}
          </Button>
        </Stack>
        <Stack spacing={6}>
          <Text
            sx={{
              color: "blue.500",
              _hover: {
                color: "blue.700",
              },
            }}
            align={"center"}
            onClick={() => {
              navigate("/login");
            }}
          >
            {translate("pages.register.buttons.haveAccount")}
          </Text>
        </Stack>
      </Stack>
    </Flex>
  );
};
