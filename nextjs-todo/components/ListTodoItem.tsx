export default function ListTodoItem({ todoItem, onCheck, onRemove }) {
  return (
    <li style={{ textDecoration: todoItem.success && "line-through" }}>
      <input
        type="checkbox"
        checked={todoItem.success}
        onChange={() => onCheck(todoItem.id)}
      />
      {todoItem.content}
      <button onClick={() => onRemove(todoItem.id)}>삭제</button>
    </li>
  );
}
