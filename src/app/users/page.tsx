"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "@/components/ui/pagination";
import ProfileCard from "./_components/ ProfileCard";
import Loading from "@/components/ui/looding";
import { useGetUsersQuery } from "@/lib/services/usersApi";
import { IconReload } from "@tabler/icons-react";

const UserListPage = () => {
  const [page, setPage] = useState<number>(1);
  const [isReloading, setIsReloading] = useState<boolean>(false);

  const {
    data: usersResponse,
    isLoading,
    isError,
    refetch,
  } = useGetUsersQuery({ page });

  const handleReload = async () => {
    setIsReloading(true);
    try {
      await refetch();
    } finally {
      // Add a small delay to show the animation
      setTimeout(() => setIsReloading(false), 500);
    }
  };

  if (isLoading) return <Loading />;

  if (isError) {
    return <p>Error: Failed to load users</p>;
  }

  const users = usersResponse?.data || [];
  const totalPages = usersResponse?.total_pages || 1;

  return (
    <div className="">
      <div className="border-b-1 border-gray-900 mb-4">
        <div className="flex justify-between items-center p-4">
          <div>
            <p className="text-2xl font-bold">User List</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleReload}
              disabled={isReloading}
            >
              <IconReload
                size={16}
                className={`mr-2 transition-transform duration-300 ${
                  isReloading ? "animate-spin" : ""
                }`}
              />
              {isReloading ? "Reloading..." : "Reload"}
            </Button>
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
            width={128}
            height={128}
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
