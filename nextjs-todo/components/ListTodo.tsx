export default function ListTodo({ todoList, onCheck, onRemove }) {
  return (
    <div id="list-box">
      할 일 목록
      <ul id="todoList">
        {todoList.map((todoItem) => (
          <li
            key={todoItem.id}
            style={{ textDecoration: todoItem.success && "line-through" }}
          >
            <input
              type="checkbox"
              checked={todoItem.success}
              onChange={() => onCheck(todoItem.id)}
            />
            {todoItem.content}
            <button onClick={() => onRemove(todoItem.id)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
