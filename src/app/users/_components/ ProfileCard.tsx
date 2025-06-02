import { Button } from "@/components/ui/button";
import DeleteDialog from "@/components/ui/deletdialog";
import { IconEdit } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

type ProfileCardProps = {
  id: number;
  src: string;
  width: number;
  height: number;
  alt: string;
  name: string;
  lastName: string;
  email: string;
};

export default function ProfileCard({
  id,
  src,
  width,
  height,
  alt,
  name,
  lastName,
  email,
}: ProfileCardProps) {
  return (
    <div className="bg-gray-700 p-2 rounded-lg md:flex-row gap-4 items-center cursor-pointer">
      <Link href={`/users/${id}`} passHref>
        <div className="flex  justify-between gap-4">
          <Image
            src={src}
            width={width}
            height={height}
            alt={alt}
            className="rounded-lg w-full md:w-auto"
          />
          <div className="flex flex-col gap-4 w-full p-1">
            <div className="flex  gap-2  text-white">
              <p>{name}</p>
              <p>{lastName}</p>
            </div>
            <div>
              <p className="text-gray-300">{email}</p>
            </div>
          </div>
        </div>
      </Link>
      <div className="flex items-center justify-between mt-4 gap-2 w-full">
        <div className="flex gap-2 items-center">
          <Link href={`/users/${id}/edit`}>
            <Button type="button" variant="primary">
              <IconEdit size={35} color="white" />
              Edit
            </Button>
          </Link>
        </div>
        <DeleteDialog id={id} />
      </div>
    </div>
  );
}
