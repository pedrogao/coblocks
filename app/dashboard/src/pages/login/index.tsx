import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useTranslate, useLogin } from "@refinedev/core";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const translate = useTranslate();

  const { mutate: login } = useLogin();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const navigate = useNavigate();

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Coblocks</Heading>
          <Heading fontSize={"xl"}>{translate("pages.login.title")}</Heading>
        </Stack>
        <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} boxShadow={"lg"} p={8}>
          <Stack spacing={4}>
            <FormControl id="name">
              <FormLabel>{translate("pages.login.fields.name")}</FormLabel>
              <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>{translate("pages.login.fields.password")}</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Stack spacing={6}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox
                  fontSize="sm"
                  isChecked={remember}
                  onChange={(e) => {
                    // @ts-ignore
                    setRemember(e.target.checked);
                  }}
                >
                  {translate("pages.login.buttons.rememberMe")}
                </Checkbox>
                <Text
                  color={"blue.400"}
                  _hover={{
                    color: "blue.700",
                  }}
                  onClick={() => {
                    navigate("/forgot-password");
                  }}
                >
                  {translate("pages.login.buttons.forgotPassword")}
                </Text>
              </Stack>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.700",
                }}
                onClick={(e) => {
                  e.preventDefault();

                  // get form data
                  const form = {
                    name,
                    password,
                    remember,
                  };
                  login(form);

                  setName("");
                  setPassword("");
                  setRemember(false);
                }}
              >
                {translate("pages.login.signin")}
              </Button>
              <Stack>
                <Text
                  color={"blue.500"}
                  _hover={{
                    color: "blue.600",
                  }}
                  onClick={() => {
                    navigate("/register");
                  }}
                >
                  {translate("pages.login.buttons.noAccount")}
                </Text>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};
