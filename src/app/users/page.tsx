"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from "@/components/ui/pagination";
import ProfileCard from "./_components/ ProfileCard";
import { coreApi } from "@/services/core-api";
import Loading from "@/components/ui/looding";
import { useGetUsersQuery } from "@/lib/services/usersApi";

// تعریف نوع کاربران
interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

const UserListPage = () => {
  const {
    data: users2,
    isLoading,
    isError,
    error: error2,
  } = useGetUsersQuery();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const fetchUsers = async (page: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await coreApi.get<{
        data: User[];
        total_pages: number;
      }>(`users?page=${page}`);
      setUsers(response.data.data);
      setTotalPages(response.data.total_pages);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  if (loading) return <Loading />;

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="">
      <div className="border-b-1 border-gray-900 mb-4">
        <div className="flex justify-between items-center p-4">
          <div>
            <p className="text-2xl font-bold">User List</p>
          </div>
          <div>
            <Link href="/users/create">
              <Button variant={"primary"}>Create User</Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 justify-center sm:justify-center md:justify-center lg:justify-start pb-4">
        {users.map((user) => (
          <ProfileCard
            key={user.id}
            id={user.id}
            email={user.email}
            name={user.first_name}
            lastName={user.last_name}
            src={user.avatar}
            width={150}
            height={200}
            alt={`${user.first_name} ${user.last_name}`}
          />
        ))}
      </div>
      <footer>
        <div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    href="#"
                    onClick={() => setPage(i + 1)}
                    className={page === i + 1 ? "font-bold text-blue-500" : ""}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() =>
                    setPage((prev) => Math.min(prev + 1, totalPages))
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </footer>
    </div>
  );
};

export default UserListPage;
