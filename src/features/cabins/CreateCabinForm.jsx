import { useForm } from "react-hook-form";

import styled from "styled-components";

import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";

import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

const LastRow = styled.div`
  padding-bottom: 0;
  display: flex;
  justify-content: flex-end;
  gap: 1.2rem;
`;

////////////////////////////////////////////////////////////////////////////
function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = !!editId;

  const { isInserting, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();
  const isWorking = isInserting || isEditing;

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const onSubmit = (data) => {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession) {
      editCabin(
        {
          newCabinData: { ...data, image },
          id: editId,
        },
        {
          // data - recently created object
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    } else {
      createCabin(
        {
          ...data,
          image,
        },
        {
          // data - recently created object
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    }
    // console.log(data);
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Cabin name" error={errors?.name}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at last 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Price should be at last 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isWorking}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              +value >= +getValues().regularPrice && +value !== 0
                ? "Discount should be less than regular price"
                : null,
          })}
        />
      </FormRow>

      <FormRow label="Description for website" error={errors?.description}>
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Cabin photo" error="">
        <>
          <FileInput
            accept="image/*"
            id="image"
            disabled={isWorking}
            {...register("image", {
              required: isEditSession ? false : "This field is required",
            })}
          />
          {isEditSession && <img src={editValues.image} alt="" />}
        </>
      </FormRow>

      <LastRow>
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit cabin" : "Create New Cabin"}
        </Button>
      </LastRow>
    </Form>
  );
}

export default CreateCabinForm;
