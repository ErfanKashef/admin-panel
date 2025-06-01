import Link from "next/link";
import ProfileCard from "./_components/ ProfileCard";
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

const users = [
  {
    id: 1,
    email: "erfan@spaceomid.com",
    name: "Erfan",
    lastName: "Ghasemi",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Brad_Pitt-69858.jpg/960px-Brad_Pitt-69858.jpg",
    width: 150,
    height: 200,
    alt: "Brad Pitt",
  },
  {
    id: 2,
    email: "sara@example.com",
    name: "Sara",
    lastName: "Smith",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Brad_Pitt-69858.jpg/960px-Brad_Pitt-69858.jpg",
    width: 150,
    height: 200,
    alt: "Sara Smith",
  },
  {
    id: 3,
    email: "sara@example.com",
    name: "Sara",
    lastName: "Smith",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Brad_Pitt-69858.jpg/960px-Brad_Pitt-69858.jpg",
    width: 150,
    height: 200,
    alt: "Sara Smith",
  },
  {
    id: 4,
    email: "sara@example.com",
    name: "Sara",
    lastName: "Smith",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Brad_Pitt-69858.jpg/960px-Brad_Pitt-69858.jpg",
    width: 150,
    height: 200,
    alt: "Sara Smith",
  },
  {
    id: 5,
    email: "sara@example.com",
    name: "Sara",
    lastName: "Smith",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Brad_Pitt-69858.jpg/960px-Brad_Pitt-69858.jpg",
    width: 150,
    height: 200,
    alt: "Sara Smith",
  },
  {
    id: 6,
    email: "sara@example.com",
    name: "Sara",
    lastName: "Smith",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Brad_Pitt-69858.jpg/960px-Brad_Pitt-69858.jpg",
    width: 150,
    height: 200,
    alt: "Sara Smith",
  },
  {
    id: 7,
    email: "sara@example.com",
    name: "Sara",
    lastName: "Smith",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Brad_Pitt-69858.jpg/960px-Brad_Pitt-69858.jpg",
    width: 150,
    height: 200,
    alt: "Sara Smith",
  },
  {
    id: 8,
    email: "sara@example.com",
    name: "Sara",
    lastName: "Smith",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Brad_Pitt-69858.jpg/960px-Brad_Pitt-69858.jpg",
    width: 150,
    height: 200,
    alt: "Sara Smith",
  },
];

const UserListPage = () => {
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
          <ProfileCard key={user.id} {...user} />
        ))}
      </div>
      <div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default UserListPage;
