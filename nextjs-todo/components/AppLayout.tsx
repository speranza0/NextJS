import Link from "next/link";

export default function AppLayout({ children }) {
  return (
    <div className="div-wrap">
      <div className="header">
        <h1>TODO APP</h1>
        <div>
          <Link href="/">
            <button>목록</button>
          </Link>
          <Link href="/create">
            <button>등록</button>
          </Link>
        </div>
      </div>
      {children}
    </div>
  );
}
