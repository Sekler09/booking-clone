import ManageEntityForm from 'components/manageEntityForm';
import { func, number, shape, string } from 'prop-types';

function ManageRoomForm({ initialValues, onSubmit }) {
  const fields = [
    {
      name: 'type',
      label: 'Type',
      initialValue: initialValues.type,
      inputType: 'text',
    },
    {
      name: 'capacity',
      label: 'Capacity',
      initialValue: initialValues.capacity,
      inputType: 'number',
    },
    {
      name: 'price',
      label: 'Price per night',
      initialValue: initialValues.price,
      inputType: 'number',
    },
  ];

  function validate(values) {
    const errors = {};
    if (!values.type.trim()) {
      errors.type = 'Required';
    } else if (values.type.trim().length < 5) {
      errors.type = 'Name is too short';
    }

    if (!values.capacity) {
      errors.capacity = 'Required';
    } else if (values.capacity < 0 || values.capacity > 30) {
      errors.capacity = 'Invalid value';
    }

    if (!values.price) {
      errors.price = 'Required';
    } else if (values.price < 0) {
      errors.price = 'Invalid value';
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

ManageRoomForm.propTypes = {
  initialValues: shape({
    type: string,
    capacity: number,
    price: number,
  }),
  onSubmit: func.isRequired,
};

ManageRoomForm.defaultProps = {
  initialValues: {
    type: '',
    capacity: 0,
    price: 0,
  },
};

export default ManageRoomForm;
