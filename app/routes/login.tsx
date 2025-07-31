import { LoginForm } from "~/components/login-form"
import {Form, redirect, useNavigation} from "react-router";
import type { Route } from "./+types/login";
import {commitSession, getSession} from "~/sessions.server";

export async function action({request} : Route.ActionArgs) {
  const endpoint = import.meta.env.VITE_API_ENDPOINT
  const session = await getSession(
      request.headers.get("Cookie"),
  );

  let formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const response = await fetch(`${endpoint}/login`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password
    })
  })


  console.log(response)

  if (response.status !== 200) {
    console.log("Something went wrong")
  }

  const result = await response.json();
  console.log(result)

  session.set('userId', result.user.id);
  session.set('username', result.user.name);
  session.set('token', result.token);

  // Login succeeded, send them to the home page.
  return redirect("/", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });

}

export default function Login() {

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Form method="POST">
          <LoginForm />
        </Form>
      </div>
    </div>
  )
}
