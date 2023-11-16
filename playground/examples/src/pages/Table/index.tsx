import { useEffect, useState } from "react";
import {
  FormControl,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  Button,
} from "@chakra-ui/react";
import Network from "../../components/Network";
import { useHocuspocusProvider, HocuspocusContextProvider } from "../../provider";

export default function Page() {
  return (
    <HocuspocusContextProvider>
      <Network />
      <TableExample />
    </HocuspocusContextProvider>
  );
}

const TableExample = () => {
  const provider = useHocuspocusProvider();
  const contributorsArray = provider.document.getArray("contributors");

  const getContributors = () => {
    return contributorsArray.toJSON() || [];
  };

  const [contributors, setContributors] = useState(getContributors());

  const [name, setName] = useState("pedro");
  const [country, setCountry] = useState("china");
  const [age, setAge] = useState(18);

  useEffect(() => {
    const listener = () => {
      const contributors = getContributors();
      setContributors(contributors);
    };

    contributorsArray.observe(listener);

    return () => {
      contributorsArray.unobserve(listener);
    };
  }, []);

  return (
    <>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>Project Contributors</TableCaption>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Country</Th>
              <Th isNumeric>Age</Th>
            </Tr>
          </Thead>
          <Tbody>
            {contributors.map((contributor, index) => {
              return (
                <Tr key={index}>
                  <Td>{contributor.name}</Td>
                  <Td>{contributor.country}</Td>
                  <Td isNumeric>{contributor.age}</Td>
                  <Td>
                    <Button
                      onClick={() => {
                        contributorsArray.delete(index);
                      }}
                    >
                      -
                    </Button>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>

      <FormControl>
        <Stack spacing={3}>
          <Text>Add Contributor</Text>
          <Input
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <Input
            type="text"
            placeholder="country"
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
            }}
          />

          <NumberInput
            placeholder="age"
            min={0}
            max={100}
            value={age}
            onChange={(e) => {
              setAge(parseInt(e));
            }}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Button
            size="sm"
            onClick={() => {
              contributorsArray.push([
                {
                  name,
                  country,
                  age,
                },
              ]);
            }}
          >
            Add
          </Button>
        </Stack>
      </FormControl>
    </>
  );
};
