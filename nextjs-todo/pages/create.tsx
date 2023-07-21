import CreateTodo from "components/CreateTodo";
import { GetServerSideProps } from "next";
import * as todoService from "service/todo";

interface searchProps {}

export const getServerSideProps: GetServerSideProps<searchProps> = async () => {
  const result = await todoService.search({ query: "", condi: "todo" });

  return {
    props: { result },
  };
};

export default function Create({ result }) {
  return (
    <>
      <div className="header-wrap">
        <CreateTodo />
      </div>
      <br />
      <div style={{ textAlign: "center" }}>
        현재 등록된 할일 갯수는 {result.length} 입니다.
      </div>
    </>
  );
}
