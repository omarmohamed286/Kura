import { Modal } from "@mantine/core";
import React from "react";

type ModalComponentProps = {
  close: () => void;
  opened: boolean;
  children: React.ReactNode;
};

const ModalComponent = ({ children, close, opened }: ModalComponentProps) => {
  return (
    <Modal opened={opened} onClose={close} title="Add New Youtube Video">
      {children}
    </Modal>
  );
};

export default ModalComponent;
