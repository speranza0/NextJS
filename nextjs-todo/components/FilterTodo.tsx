import { useEffect } from "react";
import {
  Controller,
  SubmitHandler,
  SubmitErrorHandler,
  useForm,
} from "react-hook-form";
import { SearchRequest } from "service/model/SearchRequest";

export default function FilterTodo({ searchItem, setSearchItem }) {
  const { control, handleSubmit, reset } = useForm();

  const onSubmit: SubmitHandler<SearchRequest> = async (data) => {
    if (!data.query) {
      data.query = "";
    }
    setSearchItem(data);
  };

  const onError: SubmitErrorHandler<SearchRequest> = (error) => {
    const errorKey = Object.keys(error);
    for (const key of errorKey) {
      alert(error[key].message);
      break;
    }
  };

  useEffect(() => {
    reset(searchItem);
  }, [searchItem]);

  return (
    <div className="filter">
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <Controller
          name="query"
          control={control}
          render={({ field }) => (
            <input
              id="search"
              type="text"
              placeholder="검색할 내용을 입력해주세요"
              {...field}
            />
          )}
        />
        <button id="searchBtn" type="submit">
          검색
        </button>
        검색 조건 :
        <Controller
          name="condi"
          control={control}
          render={({ field }) => (
            <select
              id="selectBox"
              {...field}
              onChange={(event) => {
                field.onChange(event.target.value);
                handleSubmit(onSubmit, onError)();
              }}
            >
              <option value="all">전체</option>
              <option value="todo">할일</option>
              <option value="success">완료</option>
            </select>
          )}
        />
      </form>
    </div>
  );
}
