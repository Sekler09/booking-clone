import { useCallback, useEffect } from 'react';
import { io } from 'socket.io-client';

const URL = import.meta.env.VITE_FETCH_URL;

let socket;

export const useSocket = onBook => {
  if (!socket) {
    socket = io(URL);
  }

  useEffect(() => {
    socket.on('book', payload => onBook(payload));

    return () => {
      socket.off('book');
    };
  }, []);

  const emitBook = useCallback(payload => {
    socket.emit('book', payload);
  }, []);

  return { emitBook };
};
