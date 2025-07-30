import {Form, redirect, useNavigation} from "react-router";
import type {Route} from "./+types/create-record";
import {Button} from "~/components/ui/button";
import {Loader2, PlayIcon, SaveIcon} from "lucide-react";
import {getSession} from "~/sessions.server";
import {Label} from "~/components/ui/label";
import {Textarea} from "~/components/ui/textarea";
import {Slider} from "~/components/ui/slider";
import {useEffect, useState} from "react";
import {VoiceList} from "~/components/voice-list";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "~/components/ui/select";


export async function action({request}: Route.ActionArgs) {

  const formData = await request.formData();
  console.log(formData)

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
      content: formData.get("content") as string,
      pitch: formData.get("pitch") as string,
      volume: formData.get("volume") as string,
      rate: formData.get("rate") as string,
      voice: formData.get("voice") as string,
    })
  })

  return redirect('/')
}

export default function CreateRecord() {

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting" && navigation.formAction === "/record/create";

  const [rate, setRate] = useState<number>(1);
  const [pitch, setPitch] = useState<number>(2);
  const [volume, setVolume] = useState<number>(1);
  const [content, setContent] = useState<string>('')

  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState<string>('')

  useEffect(() => {

    if (typeof window !== 'undefined') {
      const hasWebSpeech = 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
      if (hasWebSpeech) {
        console.log('Web Speech API is supported.');
        setLoading(true);

        // Some browsers load voices asynchronously
        window.speechSynthesis.onvoiceschanged = () => {
          const availableVoices = window.speechSynthesis.getVoices();
          setVoices(availableVoices)
          setLoading(false);
          setSelectedVoice(availableVoices[0].name)
        };

        return () => {
          window.speechSynthesis.onvoiceschanged = null;
        };
      }
    }
  }, [])


  const onClickHandler = () => {
    if (content == '') alert('Please enter some text to convert')
    const utterThis = new SpeechSynthesisUtterance(content);
    const synth = window.speechSynthesis;

    utterThis.pitch = pitch;
    utterThis.rate = rate;
    utterThis.volume = volume;

    for (const voice of voices) {
      if (voice.name === selectedVoice) {
        utterThis.voice = voice;
      }
    }

    synth.speak(utterThis);
  }

  return (
      <div>
        <Form id="create-record-form" method="POST" action="/record/create">

          <div className="grid grid-cols-1 gap-4 mt-6">

            <div>
              <Label htmlFor="content">Text you want to convert</Label>
              <div className="mt-2">
                <Textarea value={content} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
                    className="bg-white" name="content" id="content" placeholder="Type here..." />
              </div>
            </div>

            <div>

              {loading ? <div>Fetching voices... <Loader2 className="animate-spin" /></div>: (
                  <div>
                    <Label htmlFor="voice">Select voices</Label>
                    <div className="mt-2">
                      <Select name="voice" value={selectedVoice} onValueChange={(value: string) => setSelectedVoice(value)}>
                        <SelectTrigger name="voice" className="w-full bg-white">
                          <SelectValue placeholder="Select a fruit" />
                        </SelectTrigger>
                        <SelectContent>
                          {voices.map((voice, index) => (
                              <SelectItem value={voice.name} key={index}>
                                {voice.name} ({voice.lang})
                              </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
              )}


            </div>

            <div>
              <div className="flex justify-between">
                <Label>Rate</Label>
                {rate}
              </div>
              <div className="mt-2">
                <Slider name="rate" value={[rate]} onValueChange={(e: number[]) => setRate(e[0])} max={2} step={0.5} />
              </div>
            </div>

            <div>
              <div className="flex justify-between">
                <Label>Pitch</Label>
                {pitch}
              </div>
              <div className="mt-2">
                <Slider name="pitch" value={[pitch]} onValueChange={(e: number[]) => setPitch(e[0])} max={2} step={0.5} />
              </div>
            </div>

            <div>
              <div className="flex justify-between">
                <Label>Volume</Label>
                {volume}
              </div>
              <div className="mt-2">
                <Slider name="volume" value={[volume]} onValueChange={(e: number[]) => setVolume(e[0])} max={2} step={0.5} />
              </div>
            </div>

            <div className="flex justify-between space-x-4">
              <Button size="lg" className="w-1/2" disabled={isSubmitting} type="submit">
                <SaveIcon />
                {isSubmitting && <Loader2 className="animate-spin" />}
              </Button>

              <Button type="button" size="lg" variant="outline" className="w-1/2" onClick={onClickHandler}>
                <PlayIcon />
              </Button>
            </div>

          </div>

        </Form>
      </div>
  )
}
