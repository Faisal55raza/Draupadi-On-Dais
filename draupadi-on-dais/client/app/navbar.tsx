import Link from "next/link";

export default function NavBar() {
  return (
    <div className="navbar bg-base-100 fixed z-10">
      <div className="flex-1">
        <a href={"/"} className="btn btn-ghost text-xl">
          Draupadi On The Dais
        </a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 gap-2">
          <li>
            <Link href={"/speakers"} className="btn btn-sm btn-accent">
              Invite An Expert
            </Link>
          </li>
          <li>
            <Link href={"/events"} className="btn btn-sm btn-accent">
              Upcoming Events
            </Link>
          </li>
          <li>
            <Link href={"/login"} className="btn btn-sm btn-primary">
              Get Started
            </Link>
          </li>
          <li>
            <Link href={"/chat"} className="btn btn-sm btn-secondary">
              Chat
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
