// import CollectData from '@/components/collectData';
import Link from 'next/link';

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const chats = [
    {user_id: 1, name: "Vaani"},
    // {user_id: 2, name: "Prachi1"},
    // {user_id: 3, name: "Prachi2"},
    // {user_id: 4, name: "Prachi3"},
    // {user_id: 5, name: "Prachi4"},
    // {user_id: 6, name: "Prachi5"},
    // {user_id: 7, name: "Prachi6"},
    // {user_id: 8, name: "Prachi7"},
  ]
  return (
    <div className="flex flex-row h-screen pt-10">
      {/* <CollectData /> */}
      <ul className="menu bg-base-200 w-96 rounded-box">
        {/* Example contacts */}
        <li className="menu-title">Chats</li>
        {/* Map over the chats array to generate menu items */}
        {chats.map((chat) => (
          <li key={chat.user_id} className="menu-item">
            <Link href={`/chat/${chat.user_id}`}>
              <div className="menu-link">{chat.name}</div>
            </Link>
          </li>
        ))}
      </ul>
      <div className="grow">
        {children}
      </div>
    </div>
  );
}