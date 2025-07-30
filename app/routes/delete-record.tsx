import {redirect} from "react-router";
import type { Route } from "./+types/delete-record";
import {getSession} from "~/sessions.server";
import {toast} from "sonner";

export async function action({ params, request }: Route.ActionArgs) {
  const { recordId } = params;

  const session = await getSession(
      request.headers.get("Cookie"),
  );

  // if it doesn't have a token, redirect to log in
  if (!session.has("token") && session.get("token") == undefined) {
    return redirect("/login");
  }

  const token = session.get("token") as string;

  const response = await fetch(`http://localhost:3000/records/${recordId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    method: "DELETE",
  })

  console.log(response)

  if (response.status !== 200) {
    toast.error("Something went wrong")
  }

  toast.success("Record deleted")

  return redirect('/')
}