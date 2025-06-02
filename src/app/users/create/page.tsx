"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAddUserMutation, CreateUserData } from "@/lib/services/usersApi";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const CreateUserPage = () => {
  const router = useRouter();
  const [addUser, { isLoading, isError }] = useAddUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateUserData>();

  const onSubmit = async (data: CreateUserData) => {
    try {
      await addUser(data).unwrap();
      reset();
      router.push("/users");
    } catch (error) {
      console.error("Failed to create user:", error);
    }
  };

  return (
    <div>
      <div className="bg-gray-700 rounded-lg p-2 flex flex-col gap-4">
        <div>
          <p className="text-xl font-bold text-white">Create User</p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full p-1"
        >
          <div>
            <Label htmlFor="name" className="text-white">
              Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter full name"
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters long",
                },
              })}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="job" className="text-white">
              Job
            </Label>
            <Input
              id="job"
              type="text"
              placeholder="Enter job title"
              {...register("job", {
                required: "Job is required",
                minLength: {
                  value: 2,
                  message: "Job must be at least 2 characters long",
                },
              })}
              className={errors.job ? "border-red-500" : ""}
            />
            {errors.job && (
              <p className="text-red-500 text-sm mt-1">{errors.job.message}</p>
            )}
          </div>

          {isError && (
            <p className="text-red-500 text-sm mt-1">
              Failed to create user. Please try again.
            </p>
          )}

          <div className="flex gap-2">
            <Button
              type="submit"
              className="flex-1"
              variant="default"
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create User"}
            </Button>
            <Link href="/users" className="flex-1">
              <Button type="button" className="w-full" variant="outline">
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUserPage;
