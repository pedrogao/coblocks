import React from "react";
import { IResourceComponentsProps, useTranslate } from "@refinedev/core";
import { Edit } from "@refinedev/chakra-ui";
import { FormControl, FormLabel, FormErrorMessage, Input, Select } from "@chakra-ui/react";
import { useForm } from "@refinedev/react-hook-form";

export const RoomEdit: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const {
    refineCore: { formLoading, queryResult },
    saveButtonProps,
    register,
    setValue,
    formState: { errors },
  } = useForm();

  const roomsData = queryResult?.data?.data;

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
    <Edit isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <FormControl mb="3" isInvalid={!!(errors as any)?.["id"]}>
        <FormLabel>{translate("rooms.fields.id")}</FormLabel>
        <Input
          disabled={true}
          type="text"
          {...register("id", {
            required: "This field is required",
          })}
        />
        <FormErrorMessage>{(errors as any)?.["id"]?.message as string}</FormErrorMessage>
      </FormControl>

      <FormControl mb="3" isInvalid={!!(errors as any)?.["name"]}>
        <FormLabel>{translate("rooms.fields.name")}</FormLabel>
        <Input
          type="text"
          {...register("name", {
            required: "This field is required",
          })}
        />
        <FormErrorMessage>{(errors as any)?.["name"]?.message as string}</FormErrorMessage>
      </FormControl>

      <FormControl mb="3" isInvalid={!!(errors as any)?.["status"]}>
        <FormLabel>{translate("rooms.fields.status")}</FormLabel>
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
        <FormErrorMessage>{(errors as any)?.["status"]?.message as string}</FormErrorMessage>
      </FormControl>
    </Edit>
  );
};
