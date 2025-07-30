// import type { Route } from "./+types/home";
// import {getSession} from "~/sessions.server";
// import {Form, redirect} from "react-router";
// import LogoutRoute from "~/routes/logout";
// import CreateRecord from "~/routes/create-record";
// import {jwtDecode} from "jwt-decode";
// import {Button} from "~/components/ui/button";
//
//
// type RecordType = {
//   id: string,
//   voice: string,
// }
//
// function isTokenExpired(token: string) {
//   try {
//     const { exp } = jwtDecode(token);
//     // @ts-ignore
//     return exp * 1000 > Date.now();
//   } catch {
//     return false;
//   }
// }
//
// export function meta({}: Route.MetaArgs) {
//   return [
//     { title: "New React Router App" },
//     { name: "description", content: "Welcome to React Router!" },
//   ];
// }
//
// export async function loader({ context, request }: Route.LoaderArgs) {
//
//   const session = await getSession(
//       request.headers.get("Cookie"),
//   );
//
//   // if it doesn't have a token, redirect to log in
//   if (!session.has("token") && session.get("token") == undefined) {
//     return redirect("/login");
//   }
//
//   const token = session.get("token") as string;
//
//   const result = await fetch("http://localhost:3000/records", {
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${token}`
//     },
//     method: "GET",
//   })
//
//   const data = await result.json();
//
//   return {  username: session.get('username'), token: token, records: data };
// }
//
// export default function Home({ loaderData }: Route.ComponentProps) {
//   const {username, token, records} = loaderData
//
//   return (
//       <div>
//         {/*Hello, {username}*/}
//
//         {/*<div>*/}
//         {/*  Token: {token}*/}
//         {/*</div>*/}
//
//         {/*{records && records.map((record: RecordType) => (*/}
//         {/*    <div key={record.id} className="flex flex-col gap-3 p-4 bg-gray-100 dark:bg-gray-800 rounded-md">*/}
//         {/*      <p>{record.id}</p>*/}
//         {/*      <Form action={`/record/${record.id}/delete`} method="DELETE" >*/}
//         {/*        <Button type="submit">Delete</Button>*/}
//         {/*      </Form>*/}
//         {/*    </div>*/}
//         {/*))}*/}
//
//         {/*<CreateRecord />*/}
//
//         {/*<LogoutRoute />*/}
//       </div>
//   )
// }
