import { IResourceComponentsProps, useTranslate, useSelect } from "@refinedev/core";
import { Create } from "@refinedev/chakra-ui";
import { FormControl, FormLabel, FormErrorMessage, Input, Select } from "@chakra-ui/react";
import { useForm } from "@refinedev/react-hook-form";

export const RoomCreate: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const {
    refineCore: { formLoading },
    saveButtonProps,
    register,
    formState: { errors },
  } = useForm();

  const { options: projectOptions } = useSelect({
    resource: "projects",
  });

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <FormControl mb="3" isInvalid={!!(errors as any)?.name}>
        <FormLabel>{translate("rooms.fields.name")}</FormLabel>
        <Input
          type="text"
          {...register("name", {
            required: "This field is required",
          })}
        />
        <FormErrorMessage>{(errors as any)?.name?.message as string}</FormErrorMessage>
      </FormControl>
      <FormControl mb="3" isInvalid={!!errors?.projectId}>
        <FormLabel>{translate("rooms.fields.projectId")}</FormLabel>
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
      <FormControl mb="3" isInvalid={!!(errors as any)?.status}>
        <FormLabel>{translate("rooms.fields.status")}</FormLabel>
        <Input
          type="number"
          {...register("status", {
            required: "This field is required",
            valueAsNumber: true,
          })}
        />
        <FormErrorMessage>{(errors as any)?.status?.message as string}</FormErrorMessage>
      </FormControl>
    </Create>
  );
};
