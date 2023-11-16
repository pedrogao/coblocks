import { OrderedList, ListItem, Container, Text, Center } from "@chakra-ui/react";
import { Link, createBrowserRouter, RouterProvider } from "react-router-dom";
import Counter from "./pages/Counter";
import Form from "./pages/Form";
import Table from "./pages/Table";
import Spreadsheet from "./pages/Spreadsheet";
import RichText from "./pages/RichText";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Text fontSize="large" fontWeight="500" marginBottom="5">
          Coblocks Examples:
        </Text>
        <OrderedList>
          <ListItem>
            <Link to="/counter">Counter</Link>
          </ListItem>
          <ListItem>
            <Link to="/form">Form</Link>
          </ListItem>
          <ListItem>
            <Link to="/table">Table</Link>
          </ListItem>
          <ListItem>
            <Link to="/spreadsheet">Spreadsheet</Link>
          </ListItem>
          <ListItem>
            <Link to="/richText">RichText</Link>
          </ListItem>
        </OrderedList>
      </>
    ),
  },
  {
    path: "/counter",
    element: <Counter />,
  },
  {
    path: "/form",
    element: <Form />,
  },
  {
    path: "/table",
    element: <Table />,
  },
  {
    path: "/spreadsheet",
    element: <Spreadsheet />,
  },
  {
    path: "/richText",
    element: <RichText />,
  },
]);

function App() {
  return (
    <>
      <Center minHeight="max-content" color="black">
        <Container marginTop={10}>
          <RouterProvider router={router} />
        </Container>
      </Center>
    </>
  );
}

export default App;
