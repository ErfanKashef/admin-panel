"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useGetUserQuery,
  useUpdateUserMutation,
  UpdateUserData,
} from "@/lib/services/usersApi";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter, useParams } from "next/navigation";
import { useEffect } from "react";
import Loading from "@/components/ui/looding";

const EditUserPage = () => {
  const router = useRouter();
  const params = useParams();
  const userId = Number(params.id);

  // Get existing user data
  const {
    data: userResponse,
    isLoading: isLoadingUser,
    isError: isUserError,
  } = useGetUserQuery(userId);

  // Update user mutation
  const [updateUser, { isLoading: isUpdating, isError: isUpdateError }] =
    useUpdateUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<UpdateUserData>();

  // Populate form with existing user data
  useEffect(() => {
    if (userResponse?.data) {
      const user = userResponse.data;
      // Since the API returns first_name/last_name but we need name, combine them
      const fullName = `${user.first_name} ${user.last_name}`.trim();
      setValue("name", fullName);
      setValue("job", ""); // API doesn't return job, so default to empty
    }
  }, [userResponse, setValue]);

  const onSubmit = async (data: UpdateUserData) => {
    try {
      await updateUser({ id: userId, data }).unwrap();
      router.push("/users");
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  if (isLoadingUser) return <Loading />;
  if (isUserError) return <p>Error: Failed to load user</p>;
  if (!userResponse?.data) return <p>User not found</p>;

  return (
    <div>
      <div className="bg-gray-700 rounded-lg p-2 flex flex-col gap-4">
        <div>
          <p className="text-xl font-bold text-white">Edit User</p>
          <p className="text-gray-300 text-sm">
            Editing: {userResponse.data.first_name}{" "}
            {userResponse.data.last_name}
          </p>
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

          {isUpdateError && (
            <p className="text-red-500 text-sm mt-1">
              Failed to update user. Please try again.
            </p>
          )}

          <div className="flex gap-2">
            <Button
              type="submit"
              className="flex-1"
              variant="default"
              disabled={isUpdating}
            >
              {isUpdating ? "Updating..." : "Update User"}
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

export default EditUserPage;
