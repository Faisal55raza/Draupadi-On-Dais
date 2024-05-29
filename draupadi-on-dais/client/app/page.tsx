import Link from "next/link";
// @ts-ignore
import CollectData from "@/components/collectData";
export default function Home() {

  return (
    <div>
      <CollectData/>
      <div
        className="hero min-h-screen bg-base-200"
        style={{ backgroundImage: "url(women_bg.png)" }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-lg">
            <h1 className="mb-5 text-3xl font-bold">
              The last panel you were on was probably missing a woman.
            </h1>
            <p className="mb-5">
              Find women experts available for speaking opportunities at your
              leadership-level panel discussions.
            </p>
            <Link href={"/login"} className="btn btn-primary shadow-2xl">
              Get Started
            </Link>
            <div className="divider divider-accent">OR</div>
            <ul className="flex flex-row justify-center gap-4 m-4">
              <li>
                <Link
                  href={"/speakers"}
                  className="btn btn-sm btn-accent shadow-2xl"
                >
                  Invite An Expert
                </Link>
              </li>
              <li>
                <Link
                  href={"/events"}
                  className="btn btn-sm btn-accent shadow-2xl"
                >
                  Upcoming Events
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
