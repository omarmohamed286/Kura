import { Modal } from "@mantine/core";
import React from "react";

type ModalComponentProps = {
  title: string;
  close: () => void;
  opened: boolean;
  children: React.ReactNode;
};

const ModalComponent = ({
  children,
  close,
  opened,
  title,
}: ModalComponentProps) => {
  return (
    <Modal opened={opened} onClose={close} title={title}>
      {children}
    </Modal>
  );
};

export default ModalComponent;
