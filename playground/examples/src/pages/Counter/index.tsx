import { useState, useEffect } from "react";
import { Button, ButtonGroup, Text } from "@chakra-ui/react";
import Network from "../../components/Network";
import { useHocuspocusProvider, HocuspocusContextProvider } from "../../provider";

export default function Page() {
  return (
    <HocuspocusContextProvider>
      <Network />
      <Counter />
    </HocuspocusContextProvider>
  );
}

const Counter = () => {
  const provider = useHocuspocusProvider();
  const counterMap = provider.document.getMap("counter");

  const getCount = () => {
    return (counterMap.get("count") as number) || 0;
  };

  const counter = getCount();
  const [count, setCount] = useState(counter);

  useEffect(() => {
    const listener = () => {
      const counter = getCount();
      setCount(counter);
    };

    counterMap.observe(listener);

    return () => {
      counterMap.unobserve(listener);
    };
  }, []);

  return (
    <>
      <Text fontSize="medium" fontWeight="300" color="red" marginBottom="5">
        Warning: not current safe
      </Text>

      <Text fontSize="large" marginBottom="5">
        Counter: {count}
      </Text>

      <ButtonGroup>
        <Button
          onClick={() => {
            setCount(count + 1);
            counterMap.set("count", count + 1);
          }}
        >
          +
        </Button>
        <Button
          onClick={() => {
            setCount(count - 1);
            counterMap.set("count", count - 1);
          }}
        >
          -
        </Button>
      </ButtonGroup>
    </>
  );
};
