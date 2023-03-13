import { AlertDialog } from 'native-base';
import React, { useCallback, useRef, useState, createRef, useImperativeHandle } from 'react';

type DialogData = {
  title: string;
  content: string | JSX.Element | React.ReactNode;
  callback?: () => void;
};

type Ref = {
  showDialog: (data: DialogData) => void;
};
export const ref = createRef<{
  showDialog: (data: DialogData) => void;
}>();

const DialogContainer = () => {
  const [isOpen, setOpen] = useState(false);
  const dialogDataRef = useRef<DialogData>({
    title: '',
    content: '',
  });

  const cancelRef = useRef(null);
  const onClose = useCallback(() => {
    setOpen(false);
  }, []);

  const showDialog: Ref['showDialog'] = useCallback(data => {
    dialogDataRef.current = data;
    setOpen(true);
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      showDialog,
    }),
    [showDialog],
  );

  return (
    <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
      <AlertDialog.Content>
        <AlertDialog.Body bg="#1A202C">{dialogDataRef.current.content}</AlertDialog.Body>
      </AlertDialog.Content>
    </AlertDialog>
  );
};

export default DialogContainer;
