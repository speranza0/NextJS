import FilterTodo from "components/FilterTodo";
import ListTodo from "components/ListTodo";
import {
  QueryClient,
  dehydrate,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import * as todoService from "service/todo";
import { useState } from "react";
import { GetServerSideProps } from "next";
import { SearchRequest } from "service/model/SearchRequest";

export const getServerSideProps: GetServerSideProps<
  SearchRequest
> = async () => {
  const queryClient = new QueryClient();
  console.log("되나?");

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      query: "",
      condi: "",
    },
  };
};

export default function Home() {
  const [searchItem, setSearchItem] = useState({
    query: "",
    condi: "",
  });

  const queryClient = useQueryClient();

  const { data: todos } = useQuery({
    queryKey: todoService.findAllQueryKey(searchItem),
    queryFn: () => todoService.search(searchItem),
  });

  const onCheck = async (id: number) => {
    await todoService.update(id);

    await queryClient.invalidateQueries(todoService.findOneQueryKey(id));
    await queryClient.invalidateQueries(todoService.findAllQueryKey());
  };

  const onRemove = async (id: number) => {
    const result = window.confirm("삭제하시겠습니까?");
    if (result) {
      await todoService.remove(id);
      await queryClient.invalidateQueries(todoService.findOneQueryKey(id));
      await queryClient.invalidateQueries(todoService.findAllQueryKey());

      alert("삭제 완료");
    }
  };

  if (!todos) return <>로딩중</>;

  return (
    <div className="content-wrap">
      <FilterTodo searchItem={searchItem} setSearchItem={setSearchItem} />
      <ListTodo todoList={todos} onCheck={onCheck} onRemove={onRemove} />
    </div>
  );
}
