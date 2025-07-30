import {
  getSession,
  destroySession,
} from "~/sessions.server";

import type { Route } from "./+types/logout";
import {Form, redirect, useNavigation} from "react-router";
import {Button} from "~/components/ui/button";
import {Loader2} from "lucide-react";

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
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
      <div>
        <Form id="logout-form" method="POST" action="/logout">
          <Button disabled={isSubmitting} type="submit">
            Logout
            {isSubmitting &&  <Loader2 className="animate-spin" />}
          </Button>
        </Form>
      </div>
  );
}
