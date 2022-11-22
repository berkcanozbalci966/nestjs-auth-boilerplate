import { useEffect, useState } from "react";

type Props = {
  created_at: string;
  message: string;
  user: {
    username: string;
  };
};

const Entry = ({ created_at, message, user }: Props) => {
  const [createdDate, setCreatedDate] = useState<string>();

  useEffect(() => {
    setCreatedDate(new Date(created_at).toLocaleDateString());
  }, []);

  return (
    <div className="mb-3">
      <p className="text-md"> {message} </p>

      <div className="flex justify-end">
        <div className="flex flex-col items-end">
          <p className="text-sm">{user.username}</p>
          <p className="text-xs">{createdDate}</p>
        </div>

        <img
          className="rounded-full w-10 ml-3"
          src="https://placeimg.com/80/80/people"
        />
      </div>
    </div>
  );
};

export default Entry;
