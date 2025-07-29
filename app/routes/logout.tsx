import {
  getSession,
  destroySession,
} from "~/sessions.server";
import type { Route } from "./+types/logout";
import {Form, redirect} from "react-router";
import {Button} from "~/components/ui/button";

export async function action({request}: Route.ActionArgs) {
  const session = await getSession(
      request.headers.get("Cookie"),
  );
  return redirect("/login", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
}

export default function LogoutRoute() {
  return (
      <>
        <Form method="post">
          <Button>Logout</Button>
        </Form>
      </>
  );
}
