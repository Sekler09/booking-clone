import { Formik } from 'formik';
import { any, arrayOf, func, shape, string } from 'prop-types';
import {
  ErrorMessage,
  Input,
  InputContainer,
  Label,
  RatingInput,
  ReviewForm,
  SubmitButton,
} from './styled';

function ManageEntityForm({ onSubmit, fields, validate }) {
  const initialValues = {};
  fields.forEach(field => {
    initialValues[field.name] = field.initialValue;
  });
  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={values => onSubmit(values)}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <ReviewForm onSubmit={handleSubmit}>
          {fields.map(({ name, label, inputType }) => (
            <InputContainer key={name}>
              <Label>{label}</Label>
              {inputType === 'number' ? (
                <RatingInput
                  type="number"
                  value={values[name]}
                  name={name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              ) : (
                <Input
                  type={inputType}
                  value={values[name]}
                  name={name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              )}
              <ErrorMessage>
                {errors[name] && touched[name] && errors[name]}
              </ErrorMessage>
            </InputContainer>
          ))}
          <SubmitButton disabled={isSubmitting}>Submit</SubmitButton>
        </ReviewForm>
      )}
    </Formik>
  );
}

ManageEntityForm.propTypes = {
  onSubmit: func.isRequired,
  validate: func.isRequired,
  fields: arrayOf(
    shape({
      name: string,
      label: string,
      // eslint-disable-next-line react/forbid-prop-types
      initialValue: any,
      inputType: string,
    }),
  ).isRequired,
};

export default ManageEntityForm;
