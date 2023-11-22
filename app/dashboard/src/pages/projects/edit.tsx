import React from "react";
import { IResourceComponentsProps, useTranslate } from "@refinedev/core";
import { Edit } from "@refinedev/chakra-ui";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
} from "@chakra-ui/react";
import { useForm } from "@refinedev/react-hook-form";

export const ProjectEdit: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const {
    refineCore: { formLoading, queryResult },
    saveButtonProps,
    register,
    setValue,
    formState: { errors },
  } = useForm();

  const projectsData = queryResult?.data?.data;

  return (
    <Edit isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <FormControl mb="3" isInvalid={!!(errors as any)?.["name"]}>
        <FormLabel>{translate("projects.fields.name")}</FormLabel>
        <Input
          type="text"
          {...register("name", {
            required: "This field is required",
          })}
        />
        <FormErrorMessage>
          {(errors as any)?.["name"]?.message as string}
        </FormErrorMessage>
      </FormControl>
      <FormControl mb="3" isInvalid={!!(errors as any)?.["environment"]}>
        <FormLabel>{translate("projects.fields.environment")}</FormLabel>
        <Input
          type="text"
          {...register("environment", {
            required: "This field is required",
          })}
        />
        <FormErrorMessage>
          {(errors as any)?.["environment"]?.message as string}
        </FormErrorMessage>
      </FormControl>
      <FormControl mb="3" isInvalid={!!(errors as any)?.["description"]}>
        <FormLabel>{translate("projects.fields.description")}</FormLabel>
        <Input
          type="text"
          {...register("description", {
            required: "This field is required",
          })}
        />
        <FormErrorMessage>
          {(errors as any)?.["description"]?.message as string}
        </FormErrorMessage>
      </FormControl>
    </Edit>
  );
};
