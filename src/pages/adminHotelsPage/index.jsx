import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import AdminPanel from 'components/adminPanel';
import Modal from 'components/modal';
import ManageHotelForm from 'components/manageHotelForm';
import Loader from 'components/loader';
import getHotels from 'api/getHotels';
import updateHotel from 'api/updateHotel';
import deleteHotelById from 'api/deleteHotel';
import createHotel from 'api/createHotel';
import { useModal } from 'hooks/useModal';

import {
  DeleteIcon,
  EditIcon,
  LinkIcon,
  PanelCell,
  PanelRow,
  ShowIcon,
} from 'components/adminPanel/styled';

const LABELS = [
  { label: 'id', sort: false },
  { label: 'name', sort: true },
  { label: 'city', sort: true },
  { label: 'address', sort: false },
  { label: 'distance', sort: true },
  { label: 'image', sort: false },
  { label: 'rooms', sort: false },
  { label: 'edit', sort: false },
  { label: 'delete', sort: false },
];

export default function AdminHotelsPage() {
  const [hotels, setHotels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState('');
  const [sorting, setSorting] = useState('');

  const [isEditHotelFormOpen, onEditHotelFormOpen, onEditHotelFormClose] =
    useModal();

  useEffect(() => {
    getHotels(search, sorting)
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
  }, [search, sorting]);

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
      <AdminPanel
        addEntity={AddHotelForm}
        labels={LABELS}
        onSearch={setSearch}
        onSort={setSorting}
      >
        {hotels.map(hotel => (
          <PanelRow key={hotel.id}>
            <PanelCell>{hotel.id}</PanelCell>
            <PanelCell>{hotel.name}</PanelCell>
            <PanelCell>{hotel.city}</PanelCell>
            <PanelCell>{hotel.address}</PanelCell>
            <PanelCell>{hotel.distance}</PanelCell>
            <PanelCell>
              <a href={hotel.image} target="_blank" rel="noreferrer">
                <LinkIcon />
              </a>
            </PanelCell>
            <PanelCell>
              <Link to={`/admin/hotels/${hotel.id}/rooms`}>
                <ShowIcon />
              </Link>
            </PanelCell>
            <PanelCell>
              <EditIcon onClick={() => onEditModalOpen(hotel.id)} />
            </PanelCell>
            <PanelCell>
              <DeleteIcon onClick={() => onHotelDelete(hotel.id)} />
            </PanelCell>
          </PanelRow>
        ))}
      </AdminPanel>
    </>
  );
}
