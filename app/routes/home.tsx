import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import {getSession} from "~/sessions.server";
import {Button} from "~/components/ui/button";
import {Form} from "react-router";


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


  return {  username: session.get('username') };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const {username} = loaderData
  return (
      <div>
        Hello, {username}

        <div>
          <Form>
            <Button>Logout</Button>
          </Form>
        </div>
      </div>
  )
}
