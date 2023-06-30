import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createTutor } from 'apiSdk/tutors';
import { Error } from 'components/error';
import { tutorValidationSchema } from 'validationSchema/tutors';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';
import { TutorInterface } from 'interfaces/tutor';

function TutorCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: TutorInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createTutor(values);
      resetForm();
      router.push('/tutors');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<TutorInterface>({
    initialValues: {
      skills: '',
      location: '',
      availability: '',
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: tutorValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Tutor
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="skills" mb="4" isInvalid={!!formik.errors?.skills}>
            <FormLabel>Skills</FormLabel>
            <Input type="text" name="skills" value={formik.values?.skills} onChange={formik.handleChange} />
            {formik.errors.skills && <FormErrorMessage>{formik.errors?.skills}</FormErrorMessage>}
          </FormControl>
          <FormControl id="location" mb="4" isInvalid={!!formik.errors?.location}>
            <FormLabel>Location</FormLabel>
            <Input type="text" name="location" value={formik.values?.location} onChange={formik.handleChange} />
            {formik.errors.location && <FormErrorMessage>{formik.errors?.location}</FormErrorMessage>}
          </FormControl>
          <FormControl id="availability" mb="4" isInvalid={!!formik.errors?.availability}>
            <FormLabel>Availability</FormLabel>
            <Input type="text" name="availability" value={formik.values?.availability} onChange={formik.handleChange} />
            {formik.errors.availability && <FormErrorMessage>{formik.errors?.availability}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'tutor',
    operation: AccessOperationEnum.CREATE,
  }),
)(TutorCreatePage);
