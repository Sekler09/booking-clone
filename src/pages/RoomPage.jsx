import { useParams } from 'react-router-dom';

export default function Room() {
  const { hotelId, roomId } = useParams();
  return (
    <div>
      Hotel{hotelId}, Room{roomId}
    </div>
  );
}
