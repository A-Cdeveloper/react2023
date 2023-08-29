import { useQueryClient, useMutation } from "@ta nstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import styled from "styled-components";

import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";

import { addCabin } from "../../services/apiCabins";

const LastRow = styled.div`
  padding-bottom: 0;
  display: flex;
  justify-content: flex-end;
  gap: 1.2rem;
`;

////////////////////////////////////////////////////////////////////////////
function CreateCabinForm() {
  const queryClient = useQueryClient();
  const { isLoading: isInserting, mutate } = useMutation({
    mutationFn: addCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      toast.success("Cabin succesfully inserted!");
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    mutate({
      ...data,
      image: data.image[0],
    });
    //console.log(data.image[0]);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Cabin name" error={errors?.name}>
        <Input
          type="text"
          id="name"
          disabled={isInserting}
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isInserting}
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
          disabled={isInserting}
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
          disabled={isInserting}
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
          disabled={isInserting}
          {...register("description", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Cabin photo" error="">
        <FileInput
          accept="image/*"
          id="image"
          disabled={isInserting}
          {...register("image", { required: "This field is required" })}
        />
      </FormRow>

      <LastRow>
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isInserting}>Edit cabin</Button>
      </LastRow>
    </Form>
  );
}

export default CreateCabinForm;
