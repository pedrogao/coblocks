import { Badge, Box, Flex, Spacer, Text } from "@chakra-ui/react";
import { useHocuspocusProvider } from "../provider";
import { useEffect, useState } from "react";
import { WebSocketStatus } from "@hocuspocus/provider";

export default function Network() {
  const provider = useHocuspocusProvider();
  const online = provider.status === WebSocketStatus.Connected;

  const [onlineRef, setOnline] = useState(online);

  function listener({ status }: { status: WebSocketStatus }) {
    if (status === WebSocketStatus.Connected) {
      setOnline(true);
    } else {
      setOnline(false);
    }
  }

  provider.on("status", listener);

  useEffect(() => {
    return () => {
      provider.off("status", listener);
    };
  }, []);

  return (
    <Flex width="40" border="2px solid #d0d0d0" marginBottom="3">
      <Box>
        <Text fontSize="medium" fontWeight="300" marginLeft="5" marginRight="2">
          Network:
        </Text>
      </Box>
      <Spacer />
      <Box marginRight="2">
        {onlineRef ? (
          <Badge colorScheme="green">Online</Badge>
        ) : (
          <Badge colorScheme="red">Offline</Badge>
        )}
      </Box>
    </Flex>
  );
}
