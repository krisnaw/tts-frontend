import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import {getSession} from "~/sessions.server";
import {Button} from "~/components/ui/button";
import {Form, redirect} from "react-router";
import LogoutRoute from "~/routes/logout";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader({ context, request }: Route.LoaderArgs) {

  const session = await getSession(
      request.headers.get("Cookie"),
  );

  // if it doesn't have a token, redirect to log in
  if (!session.has("token")) {
    return redirect("/login");
  }

  return {  username: session.get('username') };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const {username} = loaderData
  return (
      <div>
        Hello, {username}

        <LogoutRoute />
      </div>
  )
}
