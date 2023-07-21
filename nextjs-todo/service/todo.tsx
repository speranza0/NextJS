import instance from "library/axios";
import { CreateRequest } from "./model/CreateRequest";
import { SearchRequest } from "./model/SearchRequest";

export const findOneQueryKey = (idx: number) => ["todo", idx];
export const findAllQueryKey = (searchItem?: SearchRequest) =>
  searchItem ? ["todos", searchItem] : ["todos"];

export const search = async ({ query, condi }: SearchRequest) => {
  const result = await instance.get("/todo", {
    params: {
      query,
      condi,
    },
  });
  return result.data;
};

export const create = async ({ content }: CreateRequest) => {
  const result = await instance.post("/todo", { content });
  return result.data;
};

export const remove = async (id: number) => {
  const result = await instance.delete(`/todo/${id}`);
  return result.data;
};

export const update = async (id: number) => {
  const result = await instance.patch(`/todo/${id}`);
  return result.data;
};
