import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import AdminPanel from 'components/adminPanel';
import Modal from 'components/modal';
import ManageRoomForm from 'components/manageRoomForm';
import Loader from 'components/loader';
import updateRoom from 'api/updateRoom';
import deleteRoomOfHotel from 'api/deleteRoom';
import createRoom from 'api/createRoom';
import getHotelRooms from 'api/getHotelRooms';
import { useModal } from 'hooks/useModal';

import {
  DeleteIcon,
  EditIcon,
  PanelCell,
  PanelRow,
  ShowIcon,
} from 'components/adminPanel/styled';

const LABELS = ['id', 'type', 'capacity', 'price', 'reviews', 'edit', 'delete'];

export default function AdminHotelRoomsPage() {
  const { hotelId } = useParams();
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState('');

  const [isEditRoomFormOpen, onEditRoomFormOpen, onEditRoomFormClose] =
    useModal();

  useEffect(() => {
    getHotelRooms(hotelId, search)
      .then(r => {
        if (!r.ok) {
          throw new Error('bad request');
        }
        return r.json();
      })
      .then(data => {
        setRooms(data);
        setIsLoading(false);
        setError(null);
      })
      .catch(e => {
        setIsLoading(false);
        setError(e);
      });
  }, [search]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <h1>Error</h1>;
  }

  async function onRoomDelete(id) {
    await deleteRoomOfHotel(hotelId, id).then(() => window.location.reload());
  }

  async function onRoomEdit(id, data) {
    await updateRoom(hotelId, id, data).then(() => window.location.reload());
  }

  async function onRoomCreate(data) {
    await createRoom(hotelId, data).then(() => window.location.reload());
  }

  function onEditModalOpen(id) {
    setEditId(id);
    onEditRoomFormOpen();
  }

  function onEditModalClose() {
    setEditId(null);
    onEditRoomFormClose();
  }

  const roomToEdit = rooms.find(room => room.id === editId);

  const AddRoomForm = <ManageRoomForm onSubmit={data => onRoomCreate(data)} />;

  return (
    <>
      {isEditRoomFormOpen && (
        <Modal onClose={() => onEditModalClose()}>
          <ManageRoomForm
            initialValues={roomToEdit}
            onSubmit={values => onRoomEdit(editId, values)}
          />
        </Modal>
      )}
      <AdminPanel labels={LABELS} addEntity={AddRoomForm} onSearch={setSearch}>
        {rooms.map(room => (
          <PanelRow key={room.id}>
            <PanelCell>{room.id}</PanelCell>
            <PanelCell>{room.type}</PanelCell>
            <PanelCell>{room.capacity}</PanelCell>
            <PanelCell>{room.price}</PanelCell>
            <PanelCell>
              <Link to={`/admin/hotels/${hotelId}/rooms/${room.id}/reviews`}>
                <ShowIcon />
              </Link>
            </PanelCell>
            <PanelCell>
              <EditIcon onClick={() => onEditModalOpen(room.id)} />
            </PanelCell>
            <PanelCell>
              <DeleteIcon onClick={() => onRoomDelete(room.id)} />
            </PanelCell>
          </PanelRow>
        ))}
      </AdminPanel>
    </>
  );
}
