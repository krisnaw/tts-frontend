import {Form, redirect, useNavigation} from "react-router";
import type {Route} from "./+types/create-record";
import {Input} from "~/components/ui/input";
import {Button} from "~/components/ui/button";
import {Loader2, PlayIcon, SaveIcon} from "lucide-react";
import {getSession} from "~/sessions.server";
import {Label} from "~/components/ui/label";
import {Textarea} from "~/components/ui/textarea";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "~/components/ui/select";
import {Slider} from "~/components/ui/slider";
import {useState} from "react";

export async function action({request}: Route.ActionArgs) {

  const session = await getSession(
      request.headers.get("Cookie"),
  );

  // if it doesn't have a token, redirect to log in
  if (!session.has("token") && session.get("token") == undefined) {
    return redirect("/login");
  }

  const token = session.get("token") as string;
  const user_id = session.get("userId") as string;

  const response = await fetch("http://localhost:3000/records", {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    method: "POST",
    body: JSON.stringify({
      userId: user_id,
      content: "10",
      pitch: "10",
      volume: "10",
      rate: "10",
      voice: "10",
    })
  })
  console.log(response)

  return redirect('/')
}

export default function CreateRecord() {

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting" && navigation.formAction === "/record/create";

  const [rate, setRate] = useState<number>(20);
  const [pitch, setPitch] = useState<number>(33);
  const [volume, setVolume] = useState<number>(1);
  const [voice, setVoice] = useState<string>('en-US');

  return (
      <div>
        <Form id="create-record-form" method="POST" action="/record/create">

          <div className="grid grid-cols-1 gap-4 mt-6">

            <div>
              <Label htmlFor="textInput">Text you want to convert</Label>
              <div className="mt-2">
                <Textarea className="bg-white" name="textInput" id="textInput" placeholder="Type here..." />
              </div>
            </div>

            <div>
              <Label htmlFor="voice">Select voices</Label>
              <div className="mt-2">
                <Select>
                  <SelectTrigger name="voice" className="w-full bg-white">
                    <SelectValue placeholder="Select a fruit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apple">Apple</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <div className="flex justify-between">
                <Label>Rate</Label>
                {rate}
              </div>
              <div className="mt-2">
                <Slider value={[rate]} onValueChange={(e: number[]) => setRate(e[0])} max={100} step={1} />
              </div>
            </div>

            <div>
              <div className="flex justify-between">
                <Label>Pitch</Label>
                {pitch}
              </div>
              <div className="mt-2">
                <Slider value={[pitch]} onValueChange={(e: number[]) => setPitch(e[0])} max={100} step={1} />
              </div>
            </div>

            <div>
              <div className="flex justify-between">
                <Label>Volume</Label>
                {volume}
              </div>
              <div className="mt-2">
                <Slider value={[volume]} onValueChange={(e: number[]) => setVolume(e[0])} max={100} step={1} />
              </div>
            </div>

            <div className="flex justify-between space-x-4">
              <Button size="lg" className="w-1/2" disabled={isSubmitting} type="submit">
                <SaveIcon />
                {isSubmitting && <Loader2 className="animate-spin" />}
              </Button>

              <Button type="submit" size="lg" variant="outline" className="w-1/2">
                <PlayIcon />
              </Button>
            </div>

          </div>

        </Form>
      </div>
  )
}
