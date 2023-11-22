import {
  useShow,
  IResourceComponentsProps,
  useTranslate,
} from "@refinedev/core";
import { Show, TextField } from "@refinedev/chakra-ui";
import { Heading } from "@chakra-ui/react";

export const ProjectShow: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Heading as="h5" size="sm" mt={4}>
        {translate("projects.fields.id")}
      </Heading>
      <TextField value={record?.id} />
      <Heading as="h5" size="sm" mt={4}>
        {translate("projects.fields.name")}
      </Heading>
      <TextField value={record?.name} />
      <Heading as="h5" size="sm" mt={4}>
        {translate("projects.fields.environment")}
      </Heading>
      <TextField value={record?.environment} />
      <Heading as="h5" size="sm" mt={4}>
        {translate("projects.fields.description")}
      </Heading>
      <TextField value={record?.description} />
    </Show>
  );
};
