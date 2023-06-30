import * as yup from 'yup';

export const tutorValidationSchema = yup.object().shape({
  skills: yup.string().required(),
  location: yup.string().required(),
  availability: yup.string().required(),
  user_id: yup.string().nullable(),
});
