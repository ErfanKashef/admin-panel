import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../axiosBaseQuery";
import { ApiResponse } from "@/types/api";

export interface User {
  avatar: string;
  email: string;
  first_name: string;
  id: number;
  last_name: string;
}

export interface GetUsersParams {
  page?: number;
}

export interface CreateUserData {
  name: string;
  job: string;
}

export interface UpdateUserData {
  name: string;
  job: string;
}

export interface UpdateUserParams {
  id: number;
  data: UpdateUserData;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    // Get all Users
    getUsers: builder.query<ApiResponse<User>, GetUsersParams | void>({
      query: (params) => ({
        url: "/users",
        params: params ? { page: params.page } : undefined,
      }),
      providesTags: (result) => {
        return result
          ? [
              ...result.data.map((user) => ({
                type: "User" as const,
                id: user.id,
              })),
              { type: "User", id: "LIST" },
            ]
          : [{ type: "User", id: "LIST" }];
      },
    }),
    // Get one User
    getUser: builder.query<{ data: User }, number>({
      query: (id) => ({ url: `/users/${id}` }),
      providesTags: (_result, _error, id) => [{ type: "User", id }],
    }),
    // Create User
    addUser: builder.mutation<{ name: string; job: string }, CreateUserData>({
      query: (body) => ({ url: "/users", method: "post", data: body }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    // Update User
    updateUser: builder.mutation<
      { name: string; job: string },
      UpdateUserParams
    >({
      query: ({ id, data }) => ({
        url: `/users/${id}`,
        method: "put",
        data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "User", id },
        { type: "User", id: "LIST" },
      ],
    }),
    // Delete User
    deleteUser: builder.mutation<void, number>({
      query: (id) => ({ url: `/users/${id}`, method: "delete" }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    // Login
    login: builder.mutation<LoginResponse, LoginData>({
      query: (credentials) => ({
        url: "/login",
        method: "post",
        data: credentials,
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useLoginMutation,
} = usersApi;
