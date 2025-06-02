// lib/axiosBaseQuery.ts
import type { BaseQueryFn, BaseQueryApi } from "@reduxjs/toolkit/query";
import axios, { AxiosRequestConfig, AxiosError } from "axios";

export const axiosBaseQuery =
  ({
    baseUrl = "https://reqres.in/api/",
  }: { baseUrl?: string } = {}): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
      headers?: AxiosRequestConfig["headers"]; // ① NEW
    },
    unknown,
    unknown
  > =>
  async ({ url, method = "get", data, params, headers }) => {
    // ② NEW
    try {
      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
        headers: {
          ...headers,
          "Content-Type": "application/json",
        },
      });
      return { data: result.data };
    } catch (err) {
      const axiosErr = err as AxiosError;
      return {
        error: {
          status: axiosErr.response?.status,
          data: axiosErr.response?.data || axiosErr.message,
        },
      };
    }
  };
