import { InformationCircleIcon } from "@heroicons/react/24/solid";
import React from "react";

type Props = {
  message: string;
};

const AlertComponent: React.FC<Props> = ({ message }) => {
  return (
    <h1 color="failure">
      <span>{message}</span>
    </h1>
  );
};

export default AlertComponent;
