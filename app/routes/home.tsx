import type { Route } from "./+types/home";
import {getSession} from "~/sessions.server";
import {Form, redirect} from "react-router";
import LogoutRoute from "~/routes/logout";
import CreateRecord from "~/routes/create-record";
import {jwtDecode} from "jwt-decode";

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
  const userId = session.get("userId") as string;

  const result = await fetch(`http://localhost:3000/records/${userId}`, {
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
            <div className="px-4 sm:px6 lg:px-8 py-6 flex flex-col justify-center">
              <div className="pt-10">
                <h5 className="text-2xl">Text-to-Speech Recorder</h5>
                <p className="text-muted-foreground mt-2 font-light">
                  Conversations with the most tragically misunderstood people of our time.
                </p>
              </div>
              <div>
                <CreateRecord />
              </div>
              <div className="fixed bottom-0 mb-5 w-full">
                <LogoutRoute />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:pl-96">
          <TrackContainer records={records} />
        </div>
      </div>
  )
}
