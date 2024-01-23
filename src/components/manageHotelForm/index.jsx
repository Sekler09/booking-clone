import ManageEntityForm from 'components/manageEntityForm';
import { func, number, shape, string } from 'prop-types';

function ManageHotelForm({ initialValues, onSubmit }) {
  const fields = [
    {
      name: 'name',
      label: 'Name',
      initialValue: initialValues.name,
      inputType: 'text',
    },
    {
      name: 'city',
      label: 'City',
      initialValue: initialValues.city,
      inputType: 'text',
    },
    {
      name: 'address',
      label: 'Address',
      initialValue: initialValues.address,
      inputType: 'text',
    },
    {
      name: 'distance',
      label: 'Distance, km',
      initialValue: initialValues.distance,
      inputType: 'number',
    },
    {
      name: 'image',
      label: 'Image',
      initialValue: initialValues.image,
      inputType: 'url',
    },
  ];

  function validate(values) {
    const errors = {};
    if (!values.name.trim()) {
      errors.name = 'Required';
    } else if (values.name.trim().length < 5) {
      errors.name = 'Name is too short';
    }

    if (!values.address.trim()) {
      errors.address = 'Required';
    } else if (values.address.trim().length < 8) {
      errors.address = 'Address is too short';
    }

    if (!values.city.trim()) {
      errors.city = 'Required';
    } else if (values.city.trim().length < 4) {
      errors.city = 'City is too short';
    }

    if (!values.image.trim()) {
      errors.image = 'Required';
    }

    if (values.distance < 0 || values.distance > 100) {
      errors.distance = 'Distance value is invalid';
    }
    return errors;
  }

  return (
    <ManageEntityForm
      fields={fields}
      onSubmit={onSubmit}
      validate={values => validate(values)}
    />
  );
}

ManageHotelForm.propTypes = {
  initialValues: shape({
    name: string,
    city: string,
    address: string,
    image: string,
    distance: number,
  }),
  onSubmit: func.isRequired,
};

ManageHotelForm.defaultProps = {
  initialValues: {
    name: '',
    city: '',
    address: '',
    image: '',
    distance: 0,
  },
};

export default ManageHotelForm;
