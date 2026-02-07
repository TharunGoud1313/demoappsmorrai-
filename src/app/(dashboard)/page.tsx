import { redirect } from "next/navigation";

export default function Home() {
  redirect("/role_menu");
  return <></>;
}
