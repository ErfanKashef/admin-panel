import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

const CreateUserPage = () => {
  return (
    <div>
      <div className="bg-gray-700 rounded-lg p-2 flex flex-col gap-4">
        <div>
          <p>Create User Page</p>
        </div>
        <div className="flex flex-col gap-4 w-full p-1">
          <Label htmlFor="first_name">First Name</Label>
          <Input
            id="first_name"
            name="first_name"
            type="text"
            placeholder="First Name"
          />
          <Label htmlFor="last_name">Last Name</Label>
          <Input
            id="last_name"
            name="last_name"
            type="text"
            placeholder="Last Name"
          />
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            
          />
          <Link href="/users">
            <Button className="w-full" variant="default">
              Create
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateUserPage;
