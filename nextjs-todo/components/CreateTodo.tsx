import { useRouter } from "next/router";
import {
  Controller,
  SubmitHandler,
  SubmitErrorHandler,
  useForm,
} from "react-hook-form";
import { QueryClient } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import * as todoService from "service/todo";
import { CreateRequest } from "service/model/CreateRequest";

const schema = yup.object({
  content: yup.string().required("할일을 입력해주세요."),
});

export default function CreateTodo() {
  const router = useRouter();

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const queryClient = new QueryClient();

  const onSubmit: SubmitHandler<CreateRequest> = async (data) => {
    let idx = 0;
    const result = await todoService.create(data);
    idx = result.id;

    await queryClient.invalidateQueries(todoService.findOneQueryKey(idx));
    await queryClient.invalidateQueries(todoService.findAllQueryKey());
    router.replace("/");
  };

  const onError: SubmitErrorHandler<CreateRequest> = (error) => {
    const errorKey = Object.keys(error);
    for (const key of errorKey) {
      alert(error[key].message);
      break;
    }
  };

  return (
    <div className="header-in">
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <Controller
          name="content"
          control={control}
          render={({ field }) => (
            <input
              id="input"
              type="text"
              placeholder="할일을 입력해주세요"
              {...field}
            />
          )}
        />
        <button type="submit">등록</button>
      </form>
    </div>
  );
}
