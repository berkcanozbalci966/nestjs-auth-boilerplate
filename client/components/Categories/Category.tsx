import React, { useContext } from "react";
import GeneralContext from "../../context/GeneralProvider";
import Link from "next/link";

type Props = {
  name: string;
  slug: string;
  isActive: boolean;
};

const Category = ({ name, slug, isActive }: Props) => {
  return (
    <Link
      href={`/basliklar/${slug}`}
      className={`btn btn-primary mr-5 ${isActive && "btn-active"}`}
    >
      {name}
    </Link>
  );
};

export default Category;
