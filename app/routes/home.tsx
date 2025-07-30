import type { Route } from "./+types/home";
import {getSession} from "~/sessions.server";
import {Form, redirect} from "react-router";
import LogoutRoute from "~/routes/logout";
import CreateRecord from "~/routes/create-record";
import {jwtDecode} from "jwt-decode";
import {Button} from "~/components/ui/button";
import {RecordContainer} from "~/components/record-container";
import {TrackContainer} from "~/components/track/track-container";


function isTokenExpired(token: string) {
  try {
    const { exp } = jwtDecode(token);
    // @ts-ignore
    return exp * 1000 > Date.now();
  } catch {
    return false;
  }
}

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
  if (!session.has("token") && session.get("token") == undefined) {
    return redirect("/login");
  }

  const token = session.get("token") as string;

  const result = await fetch("http://localhost:3000/records", {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    method: "GET",
  })

  if (result.status === 401 && result.statusText === "Unauthorized") {
    return redirect("/login");
  }

  const data = await result.json();

  return {  username: session.get('username'), token: token, records: data };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const {username, token, records} = loaderData

  return (
      <div className="w-full">

        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-96 lg:flex-col bg-slate-50">
          <div className="border-r border-muted h-screen">
            <RecordContainer />
          </div>
        </div>

        <div className="lg:pl-96">
          <TrackContainer records={records} />
        </div>


        {/*{records && records.map((record: RecordType) => (*/}
        {/*    <div key={record.id} className="flex flex-col gap-3 p-4 bg-gray-100 dark:bg-gray-800 rounded-md">*/}
        {/*      <p>{record.id}</p>*/}
        {/*      <Form action={`/record/${record.id}/delete`} method="DELETE" >*/}
        {/*        <Button type="submit">Delete</Button>*/}
        {/*      </Form>*/}
        {/*    </div>*/}
        {/*))}*/}

        {/*<CreateRecord />*/}

        {/*<LogoutRoute />*/}
      </div>
  )
}
