import Link from "next/link";


export default function Home() {
  return (
    <>
      <h1>Home Page</h1>
      <Link href={"/students/list"}>
        Go To list
      </Link>
    </>
  );
}
