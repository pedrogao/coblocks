import React from "react";
import { IResourceComponentsProps, useTranslate } from "@refinedev/core";
import { Edit } from "@refinedev/chakra-ui";
import { FormControl, FormLabel, FormErrorMessage, Input } from "@chakra-ui/react";
import { useForm } from "@refinedev/react-hook-form";

export const ProjectApiKeyEdit: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const {
    refineCore: { formLoading, queryResult },
    saveButtonProps,
    register,
    setValue,
    formState: { errors },
  } = useForm();

  const projectApiKeysData = queryResult?.data?.data;

  return (
    <Edit isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <FormControl mb="3" isInvalid={!!(errors as any)?.["id"]}>
        <FormLabel>{translate("project-api-keys.fields.id")}</FormLabel>
        <Input
          type="text"
          {...register("id", {
            required: "This field is required",
          })}
        />
        <FormErrorMessage>{(errors as any)?.["id"]?.message as string}</FormErrorMessage>
      </FormControl>
      <FormControl mb="3" isInvalid={!!(errors as any)?.["projectId"]}>
        <FormLabel>{translate("project-api-keys.fields.projectId")}</FormLabel>
        <Input
          type="text"
          {...register("projectId", {
            required: "This field is required",
          })}
        />
        <FormErrorMessage>{(errors as any)?.["projectId"]?.message as string}</FormErrorMessage>
      </FormControl>
      <FormControl mb="3" isInvalid={!!(errors as any)?.["permission"]}>
        <FormLabel>{translate("project-api-keys.fields.permission")}</FormLabel>
        <Input
          type="text"
          {...register("permission", {
            required: "This field is required",
          })}
        />
        <FormErrorMessage>{(errors as any)?.["permission"]?.message as string}</FormErrorMessage>
      </FormControl>
      <FormControl mb="3" isInvalid={!!(errors as any)?.["apiKey"]}>
        <FormLabel>{translate("project-api-keys.fields.apiKey")}</FormLabel>
        <Input
          type="text"
          {...register("apiKey", {
            required: "This field is required",
          })}
        />
        <FormErrorMessage>{(errors as any)?.["apiKey"]?.message as string}</FormErrorMessage>
      </FormControl>
      <FormControl mb="3" isInvalid={!!(errors as any)?.["roomList"]}>
        <FormLabel>{translate("project-api-keys.fields.roomList")}</FormLabel>
        <Input
          type="number"
          {...register("roomList", {
            required: "This field is required",
            valueAsNumber: true,
          })}
        />
        <FormErrorMessage>{(errors as any)?.["roomList"]?.message as string}</FormErrorMessage>
      </FormControl>
      <FormControl mb="3" isInvalid={!!(errors as any)?.["status"]}>
        <FormLabel>{translate("project-api-keys.fields.status")}</FormLabel>
        <Input
          type="text"
          {...register("status", {
            required: "This field is required",
          })}
        />
        <FormErrorMessage>{(errors as any)?.["status"]?.message as string}</FormErrorMessage>
      </FormControl>
      <FormControl mb="3" isInvalid={!!(errors as any)?.["createdTime"]}>
        <FormLabel>{translate("project-api-keys.fields.createdTime")}</FormLabel>
        <Input
          type="text"
          {...register("createdTime", {
            required: "This field is required",
          })}
        />
        <FormErrorMessage>{(errors as any)?.["createdTime"]?.message as string}</FormErrorMessage>
      </FormControl>
      <FormControl mb="3" isInvalid={!!(errors as any)?.["updatedTime"]}>
        <FormLabel>{translate("project-api-keys.fields.updatedTime")}</FormLabel>
        <Input
          type="text"
          {...register("updatedTime", {
            required: "This field is required",
          })}
        />
        <FormErrorMessage>{(errors as any)?.["updatedTime"]?.message as string}</FormErrorMessage>
      </FormControl>
    </Edit>
  );
};
