import {Form, redirect} from "react-router";
import type {Route} from "./+types/create-record";
import {Input} from "~/components/ui/input";

export async function action({request}: Route.ActionArgs) {
  const token = request.headers.get("Authorization");

  const response = await fetch("http://localhost:3000/login", {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    method: "POST",
    body: JSON.stringify({})
  })

  if (response.status !== 200) {
    return redirect("/dashboard");
  }

}

export default function CreateRecord() {
  return (
      <div>
        <Form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-3">
              <Input id="username" type="text" placeholder="John doe" required/>
            </div>
          </div>
        </Form>
      </div>
  )
}
