import { useShow, IResourceComponentsProps, useTranslate } from "@refinedev/core";
import { Show, TagField, TextField, NumberField } from "@refinedev/chakra-ui";
import { Heading, HStack } from "@chakra-ui/react";

export const ProjectApiKeyShow: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Heading as="h5" size="sm" mt={4}>
        {translate("project-api-keys.fields.id")}
      </Heading>
      <TextField value={record?.["id"]} />

      <Heading as="h5" size="sm" mt={4}>
        {translate("project-api-keys.fields.projectId")}
      </Heading>
      <TextField value={record?.["projectId"]} />

      <Heading as="h5" size="sm" mt={4}>
        {translate("project-api-keys.fields.permission")}
      </Heading>
      <TextField value={record?.["permission"]} />

      <Heading as="h5" size="sm" mt={4}>
        {translate("project-api-keys.fields.apiKey")}
      </Heading>
      <TextField value={record?.["apiKey"]} />

      <Heading as="h5" size="sm" mt={4}>
        {translate("project-api-keys.fields.roomList")}
      </Heading>
      <TextField value={record?.["roomList"]} />

      <Heading as="h5" size="sm" mt={4}>
        {translate("project-api-keys.fields.status")}
      </Heading>
      <TextField value={record?.["status"]} />

      <Heading as="h5" size="sm" mt={4}>
        {translate("project-api-keys.fields.createdTime")}
      </Heading>
      <TextField value={record?.["createTime"]} />

      <Heading as="h5" size="sm" mt={4}>
        {translate("project-api-keys.fields.updatedTime")}
      </Heading>
      <TextField value={record?.["updateTime"]} />
    </Show>
  );
};
