import {Form, redirect, useNavigation} from "react-router";
import type {Route} from "./+types/create-record";
import {Input} from "~/components/ui/input";
import {Button} from "~/components/ui/button";
import {Loader2} from "lucide-react";
import {getSession} from "~/sessions.server";

export async function action({request}: Route.ActionArgs) {


  const session = await getSession(
      request.headers.get("Cookie"),
  );

  // if it doesn't have a token, redirect to log in
  if (!session.has("token") && session.get("token") == undefined) {
    return redirect("/login");
  }

  const token = session.get("token") as string;


  const response = await fetch("http://localhost:3000/records", {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },

    method: "POST",
    body: JSON.stringify({})
  })
  console.log(response)

  return redirect('/')
}

export default function CreateRecord() {

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
      <div>
        <Form id="create-record-form" method="POST" action="/record/create">

          <div className="flex flex-col gap-6">

            <div className="grid gap-3">
              <Input id="username" type="text" value="hello" placeholder="John doe" required/>
            </div>

            <div>
              <Button type="submit" disabled={isSubmitting}>
                Save
                {isSubmitting && <Loader2 className="animate-spin" />}
              </Button>
            </div>
          </div>
        </Form>
      </div>
  )
}
