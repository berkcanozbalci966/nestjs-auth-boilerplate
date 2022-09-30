import { Alert } from "flowbite-react";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import React from "react";

type Props = {
  message: string;
};

const AlertComponent: React.FC<Props> = ({ message }) => {
  return (
    <Alert color="failure" icon={InformationCircleIcon}>
      <span>{message}</span>
    </Alert>
  );
};

export default AlertComponent;
