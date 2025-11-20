// app/(admin)/layout.jsx
import Link from "next/link";

export const metadata = {
  title: "Admin Panel",
};

export default function AdminLayout({ children }) {
  return (
    <div style={{ padding: "2rem", backgroundColor: "#f9f9f9" }}>
      <header style={{ marginBottom: "2rem" }}>
        <h1>Admin Panel</h1>
        <nav>
          <Link href="/admin/bosses">Bosses</Link> |{" "}
          <Link href="/admin/treasures">Treasures</Link> |{" "}
          <Link href="/admin/walkthrough">Walkthrough</Link> |{" "}
          <Link href="/admin/weapons">Weapons</Link>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
}
