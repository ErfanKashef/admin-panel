import Image from "next/image";
import UserCard from "./_components/Usercard";

const UsersPage = () => {
  const user = {
    id: 1,
    email: "simple@email.com",
    first_name: "Brad",
    last_name: "Pitt",
    avatar:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Brad_Pitt-69858.jpg/960px-Brad_Pitt-69858.jpg",
  };
  return (
    <div className="rounded-lg bg-gray-800 p-2">
      <UserCard {...user} />
    </div>
  );
};

export default UsersPage;
