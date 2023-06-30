import * as yup from 'yup';

export const bookingValidationSchema = yup.object().shape({
  date_time: yup.date().required(),
  user_id: yup.string().nullable(),
  tutor_id: yup.string().nullable(),
});
