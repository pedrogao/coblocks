import { useEffect, useState } from "react";
import { FormControl, FormLabel, Input, Radio, RadioGroup, Stack } from "@chakra-ui/react";
import Network from "../../components/Network";
import { useHocuspocusProvider, HocuspocusContextProvider } from "../../provider";

export default function Page() {
  return (
    <HocuspocusContextProvider>
      <Network />
      <Form />
    </HocuspocusContextProvider>
  );
}

export const Form = () => {
  const provider = useHocuspocusProvider();
  const formMap = provider.document.getMap("form");

  const getName = () => {
    return (formMap.get("name") as string) || "";
  };

  const getRadio = () => {
    return (formMap.get("radio") as string) || "";
  };

  const getEmail = () => {
    return (formMap.get("email") as string) || "";
  };

  const [name, setName] = useState(getName());
  const [radio, setRadio] = useState(getRadio());
  const [email, setEmail] = useState(getEmail());

  useEffect(() => {
    const listener = () => {
      const name = getName();
      setName(name);

      const radio = getRadio();
      setRadio(radio);

      const email = getEmail();
      setEmail(email);
    };

    formMap.observe(listener);

    return () => {
      formMap.unobserve(listener);
    };
  }, []);

  return (
    <div
      style={{
        border: "2px solid #d0d0d0",
        padding: 5,
      }}
    >
      <FormControl>
        <FormLabel>Name:</FormLabel>
        <Input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            formMap.set("name", e.target.value);
          }}
        />
      </FormControl>

      <RadioGroup
        marginTop={5}
        onChange={(radio) => {
          setRadio(radio);
          formMap.set("radio", radio);
        }}
        value={radio}
      >
        <FormLabel>Gender:</FormLabel>
        <Stack direction="row">
          <Radio value="male">Male</Radio>
          <Radio value="female">Female</Radio>
        </Stack>
      </RadioGroup>

      <FormControl marginTop={5}>
        <FormLabel>Email:</FormLabel>
        <Input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            formMap.set("email", e.target.value);
          }}
        />
      </FormControl>
    </div>
  );
};
