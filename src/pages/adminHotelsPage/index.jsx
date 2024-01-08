import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as DeleteIcon } from 'assets/delete.svg';
import { ReactComponent as EditIcon } from 'assets/edit.svg';
import { ReactComponent as LinkIcon } from 'assets/url.svg';
import { ReactComponent as ShowIcon } from 'assets/eye.svg';

import AdminPanel from 'components/adminPanel';
import Modal from 'components/modal';
import ManageHotelForm from 'components/manageHotelForm';
import Loader from 'components/loader';
import getHotels from 'api/getHotels';
import updateHotel from 'api/updateHotel';
import deleteHotelById from 'api/deleteHotel';
import createHotel from 'api/createHotel';
import { useModal } from 'hooks/useModal';

export default function AdminHotelsPage() {
  const [hotels, setHotels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editId, setEditId] = useState(null);

  const [isEditHotelFormOpen, onEditHotelFormOpen, onEditHotelFormClose] =
    useModal();

  useEffect(() => {
    getHotels()
      .then(r => {
        if (!r.ok) {
          throw new Error('bad request');
        }
        return r.json();
      })
      .then(data => {
        setHotels(data);
        setIsLoading(false);
        setError(null);
      })
      .catch(e => {
        setIsLoading(false);
        setError(e);
      });
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <h1>Error</h1>;
  }

  async function onHotelDelete(id) {
    await deleteHotelById(id).then(() => window.location.reload());
  }

  async function onHotelEdit(id, data) {
    await updateHotel(id, data).then(() => window.location.reload());
  }

  async function onHotelCreate(data) {
    await createHotel(data).then(() => window.location.reload());
  }

  function onEditModalOpen(id) {
    setEditId(id);
    onEditHotelFormOpen();
  }

  function onEditModalClose() {
    setEditId(null);
    onEditHotelFormClose();
  }

  const hotelToEdit = hotels.find(hotel => hotel.id === editId);

  const hotelsData = hotels.map(hotel => ({
    ...hotel,
    image: (
      <a href={hotel.image} target="_blank" rel="noreferrer">
        <LinkIcon height="25px" />
      </a>
    ),
    rooms: (
      <Link to={`/admin/hotels/${hotel.id}/rooms`}>
        <ShowIcon height="30px" />
      </Link>
    ),
    edit: (
      <EditIcon
        onClick={() => onEditModalOpen(hotel.id)}
        height="25px"
        style={{ cursor: 'pointer' }}
      />
    ),
    delete: (
      <DeleteIcon
        onClick={() => onHotelDelete(hotel.id)}
        height="30px"
        style={{ cursor: 'pointer' }}
      />
    ),
  }));

  const AddHotelForm = (
    <ManageHotelForm onSubmit={data => onHotelCreate(data)} />
  );

  return (
    <>
      {isEditHotelFormOpen && (
        <Modal onClose={() => onEditModalClose()}>
          <ManageHotelForm
            initialValues={hotelToEdit}
            onSubmit={values => onHotelEdit(editId, values)}
          />
        </Modal>
      )}
      <AdminPanel data={hotelsData} addEntity={AddHotelForm} />
    </>
  );
}
