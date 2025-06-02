"use client";
import { Button } from "@/components/ui/button";
import DeleteDialog from "@/components/ui/deletdialog";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IconEdit, IconTrashX } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

interface UserCardProps {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

const UserCard: React.FC<UserCardProps> = ({
  id,
  email,
  first_name,
  last_name,
  avatar,
}) => {
  return (
    <div className="flex justify-around gap-4 items-center">
      <div>
        <Image
          src={avatar}
          width={150}
          height={200}
          alt={`${first_name} ${last_name}`}
          className="rounded-lg w-full md:w-auto"
        />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <div className="flex flex-col justify-center items-center gap-3 w-full p-1 text-lg font-semibold">
          <p className="text-white">{first_name}</p>
          <p className="text-gray-400">{last_name}</p>
          <p className="text-gray-400">{email}</p>
        </div>
        <div className="flex items-center justify-evenly gap-2 w-full">
          <div className="flex gap-2 items-center">
            <Link href={`/users/${id}/edit`}>
              <Button type="button" variant="primary">
                <IconEdit size={35} color="white" />
                Edit
              </Button>
            </Link>
          </div>
          <DeleteDialog />
        </div>
      </div>
    </div>
  );
};

export default UserCard;
