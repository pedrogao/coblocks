import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { useTranslate, useNotification } from "@refinedev/core";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { register } from "../../api/auth";

export const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const translate = useTranslate();
  const navigate = useNavigate();
  const { open, close } = useNotification();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            {translate("pages.register.title")}
          </Heading>
        </Stack>
        <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} boxShadow={"lg"} p={8}>
          <Stack spacing={4}>
            <FormControl id="name" isRequired>
              <FormLabel>{translate("pages.register.fields.name")}</FormLabel>
              <Input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>{translate("pages.register.fields.password")}</FormLabel>
              <InputGroup>
                <Input
                  value={password}
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() => setShowPassword((showPassword) => !showPassword)}
                  >
                    {showPassword ? <IconEye /> : <IconEyeOff />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={() => {
                  register(name, password)
                    .then(() => {
                      navigate("/login");
                    })
                    .catch((err) => {
                      console.error(err);
                      open?.({
                        type: "error",
                        message: translate("pages.register.errors.registerFailed"),
                        description: translate("pages.register.errors.registerFailedMsg"),
                      });
                    });
                }}
              >
                {translate("pages.register.buttons.submit")}
              </Button>
            </Stack>
            <Stack pt={6}>
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
        </Box>
      </Stack>
    </Flex>
  );
};
