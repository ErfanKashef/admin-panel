"use client";
import Loading from "@/components/ui/looding";
import { useParams } from "next/navigation";
import UserCard from "./_components/Usercard";
import { useGetUserQuery } from "@/lib/services/usersApi";

const UserPage = () => {
  const params = useParams();
  const userId = Number(params.id);

  const { data: userResponse, isLoading, isError } = useGetUserQuery(userId);

  if (isLoading) return <Loading />;
  if (isError) return <p>Error: Failed to load user</p>;
  if (!userResponse?.data) return <p>User not found</p>;

  const user = userResponse.data;

  return (
    <div className="rounded-lg bg-gray-800 p-4">
      <UserCard {...user} />
    </div>
  );
};

export default UserPage;
