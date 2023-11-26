import { useShow, IResourceComponentsProps, useTranslate } from "@refinedev/core";
import { Show, TagField, TextField, NumberField } from "@refinedev/chakra-ui";
import { Heading, HStack, Code } from "@chakra-ui/react";

export const RoomShow: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Heading as="h5" size="sm" mt={4}>
        {translate("rooms.fields.projectId")}
      </Heading>
      <TextField value={record?.["projectId"]} />
      <Heading as="h5" size="sm" mt={4}>
        {translate("rooms.fields.id")}
      </Heading>
      <TextField value={record?.["id"]} />
      <Heading as="h5" size="sm" mt={4}>
        {translate("rooms.fields.name")}
      </Heading>
      <TextField value={record?.["name"]} />
      <Heading as="h5" size="sm" mt={4}>
        {translate("rooms.fields.status")}
      </Heading>
      <TextField value={record?.["status"]} />

      <Heading as="h5" size="sm" mt={4}>
        {translate("rooms.fields.doc")}
      </Heading>
      <TextField value={record?.["doc"]} />
      <Heading as="h5" size="sm" mt={4}>
        {translate("rooms.fields.metadata")}
      </Heading>
      {/* <TextField value={record?.["metadata"]} /> */}
      <Code>{JSON.stringify(record?.["metadata"], null, 2)}</Code>
    </Show>
  );
};
