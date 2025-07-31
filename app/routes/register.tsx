import {RegisterForm} from "~/components/register-form";
import type {Route} from "./+types/register";
import {Form, redirect} from "react-router";
import {commitSession, getSession} from "~/sessions.server";
import {Alert, AlertTitle} from "~/components/ui/alert";
import {AlertCircleIcon} from "lucide-react";

export async function action({request} : Route.ActionArgs) {
  const endpoint = import.meta.env.VITE_API_ENDPOINT
  const session = await getSession(
      request.headers.get("Cookie"),
  );
  let data = await request.formData();

  const email = data.get("email") as string;
  const name = data.get("name") as string;
  const password = data.get("password") as string;

  const response = await fetch(`${endpoint}/register`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify({
      name: name,
      email: email,
      password: password
    })
  })

  if (!response.ok) {
    const result = await response.json();
    return { success: false, message: result.message }
  }

  const result = await response.json();

  session.set('userId', result.user.id);
  session.set('username', result.user.name);
  session.set('token', result.token);

  // Login succeeded, send them to the home page.
  return redirect("/", {
    headers: {
      "Set-Cookie": await commitSession(session, {
        expires: new Date(Date.now() + 86_400_000)
      }),
    },
  });

}

export default function Register({actionData} : Route.ComponentProps) {

  return (
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">

          {actionData?.success == false && (
              <div className="mb-4">
                <Alert variant="destructive">
                  <AlertCircleIcon />
                  <AlertTitle>
                    {actionData?.message}
                  </AlertTitle>
                </Alert>
              </div>
          )}

          <Form method="POST">
            <RegisterForm />
          </Form>
        </div>
      </div>
  )
}
