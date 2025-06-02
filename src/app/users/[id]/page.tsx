"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import UserCard from "./_components/Usercard";
import { coreApi } from "@/services/core-api";
import Loading from "@/components/ui/looding";

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

const UserPage = () => {
  const params = useParams();
  const userId = params.id;

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;

    const fetchUser = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await coreApi.get<{ data: User }>(`users/${userId}`);
        setUser(response.data.data);
      } catch (err: any) {
        setError(err.message || "Error fetching user");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) return <Loading />;
  if (error) return <p>Error: {error}</p>;
  if (!user) return <p>User not found</p>;

  return (
    <div className="rounded-lg bg-gray-800 p-4">
      <UserCard {...user} />
    </div>
  );
};

export default UserPage;
