import { IconBuilding } from "@tabler/icons-react";
import { Text, Center } from "@chakra-ui/react";

export const Title: React.FC<{ collapsed: boolean }> = ({ collapsed }) => {
  return (
    <Center>
      <IconBuilding />
      {!collapsed && (
        <Text size="sm" marginLeft={1} fontWeight="bold">
          Coblocks
        </Text>
      )}
    </Center>
  );
};
