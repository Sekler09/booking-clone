import { useState } from 'react';

export const useModal = () => {
  const [open, setOpen] = useState(false);

  const onOpenClick = () => setOpen(true);

  const onCloseClick = () => setOpen(false);

  return [open, onOpenClick, onCloseClick];
};
