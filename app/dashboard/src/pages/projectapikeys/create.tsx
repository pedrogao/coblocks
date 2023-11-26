import { IResourceComponentsProps, useTranslate, useSelect } from "@refinedev/core";
import { Create } from "@refinedev/chakra-ui";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Select,
  CheckboxGroup,
  Stack,
  Checkbox,
} from "@chakra-ui/react";
import { useForm } from "@refinedev/react-hook-form";

export const ProjectApiKeyCreate: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const {
    refineCore: { formLoading },
    saveButtonProps,
    register,
    formState: { errors },
  } = useForm({
    refineCoreProps: {},
  });

  const { options: projectOptions } = useSelect({
    resource: "projects",
    optionLabel: "name",
    optionValue: "id",
    pagination: {
      current: 1,
      pageSize: 10,
      mode: "server",
    },
  });

  const { options: roomOptions } = useSelect({
    resource: "rooms",
    optionLabel: "name",
    optionValue: "id",
    pagination: {
      current: 1,
      pageSize: 10,
      mode: "server",
    },
  });

  const permissionOptions = [
    {
      label: "ReadOnly",
      value: "ReadOnly",
    },
    {
      label: "ReadWrite",
      value: "ReadWrite",
    },
  ];

  const statusOptions = [
    {
      label: "Opened",
      value: "Opened",
    },
    {
      label: "Closed",
      value: "Closed",
    },
  ];

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <FormControl mb="3" isInvalid={!!errors?.projectId}>
        <FormLabel>{translate("project-api-keys.fields.projectId")}</FormLabel>
        <Select
          placeholder="Select project"
          {...register("projectId", {
            required: "This field is required",
          })}
        >
          {projectOptions?.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
        <FormErrorMessage>{(errors as any)?.projectId?.message as string}</FormErrorMessage>
      </FormControl>
      <FormControl mb="3" isInvalid={!!(errors as any)?.permission}>
        <FormLabel>{translate("project-api-keys.fields.permission")}</FormLabel>
        <Select
          placeholder="Select permission"
          {...register("permission", {
            required: "This field is required",
          })}
        >
          {permissionOptions.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
        <FormErrorMessage>{(errors as any)?.permission?.message as string}</FormErrorMessage>
      </FormControl>

      <FormControl mb="3" isInvalid={!!(errors as any)?.roomList}>
        <FormLabel>{translate("project-api-keys.fields.roomList")}</FormLabel>
        <CheckboxGroup>
          <Stack spacing={[1, 5]} direction={["column", "row"]}>
            {roomOptions?.map((option, i) => (
              <Checkbox {...register(`roomList.${i}`)} value={option.value} key={option.value}>
                {option.label}
              </Checkbox>
            ))}
          </Stack>
        </CheckboxGroup>

        <FormErrorMessage>{(errors as any)?.roomList?.message as string}</FormErrorMessage>
      </FormControl>

      <FormControl mb="3" isInvalid={!!(errors as any)?.status}>
        <FormLabel>{translate("project-api-keys.fields.status")}</FormLabel>
        <Select
          placeholder="Select status"
          {...register("status", {
            required: "This field is required",
          })}
        >
          {statusOptions.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
        <FormErrorMessage>{(errors as any)?.status?.message as string}</FormErrorMessage>
      </FormControl>
    </Create>
  );
};
