import type {Route} from "./+types/list-record";
import {getSession} from "~/sessions.server";
import {redirect} from "react-router";

export async function loader({ context, request }: Route.LoaderArgs) {
  const endpoint = import.meta.env.VITE_API_ENDPOINT

  const session = await getSession(
      request.headers.get("Cookie"),
  );

  // if it doesn't have a token, redirect to log in
  if (!session.has("token") && session.get("token") == undefined) {
    return redirect("/login");
  }

  const token = session.get("token") as string;
  const userId = session.get("userId") as string;

  const result = await fetch(`${endpoint}/records/${userId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    method: "GET",
  })

  // if Unauthorized, the token might expired redirect to log in page
  if (result.status === 401 && result.statusText === "Unauthorized") {
    return redirect("/login");
  }

  const data = await result.json();

  return {  records: data};
}


export default function ListRecord({loaderData} : Route.ComponentProps) {
  const {records} = loaderData
  console.log(records)
  return (
      <div>
        Show here
      </div>
  )
}