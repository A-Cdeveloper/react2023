import { useSettings } from "./useSettings";
import { useUpdateSetting } from "./useUpdateSetting";
import { useForm } from "react-hook-form";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import Button from "../../ui/Button";

function UpdateSettingsForm() {
  const {
    settings: {
      minBookingLength,
      maxBookingLength,
      maxNumberOfGuestPerBooking,
      breakfastPrice,
    } = {},
    isLoading,
  } = useSettings();
  const { mutate: updateSetting, isLoading: isUpdating } = useUpdateSetting();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // return <Spinner />;
  if (isLoading) return <Spinner />;

  // function handleBlur(e, field) {
  //   const { value } = e.target;
  //   if (!value) return;
  //   updateSetting({ [field]: value });
  // }

  const onSubmit = (data) => {
    console.log(data);
    updateSetting(data);
  };
  // This time we are using UNCONTROLLED fields, so we will NOT store state
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          defaultValue={minBookingLength}
          //onBlur={(e) => handleBlur(e, "minBookingLength")}
          {...register("minBookingLength")}
          disabled={isUpdating}
          id="minBookingLength"
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          defaultValue={maxBookingLength}
          //onBlur={(e) => handleBlur(e, "maxBookingLength")}
          disabled={isUpdating}
          {...register("maxBookingLength")}
          id="maxBookingLength"
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          defaultValue={maxNumberOfGuestPerBooking}
          //onBlur={(e) => handleBlur(e, "maxNumberOfGuestPerBooking")}
          disabled={isUpdating}
          {...register("maxNumberOfGuestPerBooking")}
          id="maxNumberOfGuestPerBooking"
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          defaultValue={breakfastPrice}
          //onBlur={(e) => handleBlur(e, "breakfastPrice")}
          disabled={isUpdating}
          {...register("breakfastPrice")}
          id="breakfastPrice"
        />
      </FormRow>
      <FormRow>
        <button>Change</button>
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
