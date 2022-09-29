import React, { ReactNode } from "react";

type Props = {
  children: ReactNode | ReactNode[];
};

const StepperContainer: React.FC<Props> = ({ children }) => {
  return <ol className="items-center sm:flex">{children}</ol>;
};

export default StepperContainer;
