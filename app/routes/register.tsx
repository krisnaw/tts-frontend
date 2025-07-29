import {RegisterForm} from "~/components/register-form";
import type { Route } from "./+types/register";
import {getSession} from "~/sessions.server";

export async function action({request} : Route.ActionArgs) {

  const session = await getSession(
      request.headers.get("Cookie"),
  );

}

export default function Page() {
  return (
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <RegisterForm />
        </div>
      </div>
  )
}
