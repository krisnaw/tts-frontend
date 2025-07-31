import {Form, redirect, useNavigation} from "react-router";
import type {Route} from "./+types/create-record";
import {Button} from "~/components/ui/button";
import {Loader2, PauseIcon, PlayIcon, SaveIcon, SquareStop} from "lucide-react";
import {getSession} from "~/sessions.server";
import {Label} from "~/components/ui/label";
import {Textarea} from "~/components/ui/textarea";
import {Slider} from "~/components/ui/slider";
import {useEffect, useRef, useState} from "react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "~/components/ui/select";
import {toast} from "sonner";

export async function action({request}: Route.ActionArgs) {
  const endpoint = import.meta.env.VITE_API_ENDPOINT
  const formData = await request.formData();

  const session = await getSession(
      request.headers.get("Cookie"),
  );

  // if it doesn't have a token, redirect to log in
  if (!session.has("token") && session.get("token") == undefined) {
    return redirect("/login");
  }

  const token = session.get("token") as string;
  const user_id = session.get("userId") as string;

  const response = await fetch(`${endpoint}/records`, {
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

  const result = await response.json();
  console.log(result)

  if (!response.ok) {
    return redirect('/login');
  }

  return redirect('/')
}

const PLAYER_STATUS = {
  PLAYING: 'playing',
  STOPPED: 'stop',
  RESUMED: 'resume',
  PAUSED: 'pause'
};

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

  const utteranceRef = useRef<SpeechSynthesisUtterance>(null);

  const [playingState, setPlayingState] = useState(PLAYER_STATUS.STOPPED)

  useEffect(() => {

    if (typeof window !== 'undefined') {
      const hasWebSpeech = 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
      if (hasWebSpeech) {
        toast.info('Web Speech API is supported.');
        setLoading(true);

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


    if (utteranceRef.current) {
      window.speechSynthesis.cancel();
    }

  }, []);

  if (utteranceRef.current) {
    utteranceRef.current.onend = () => {
      setPlayingState(PLAYER_STATUS.STOPPED)
    }
  }

  const onClickHandler = () => {
    // return early when there is no text to speech
    if (content == '') {
      toast.warning('Please enter some text to convert')
      return;
    }

    const utterThis = new SpeechSynthesisUtterance(content);
    const synth = window.speechSynthesis;
    utteranceRef.current = utterThis;

    utterThis.pitch = pitch;
    utterThis.rate = rate;
    utterThis.volume = volume;

    for (const voice of voices) {
      if (voice.name === selectedVoice) {
        utterThis.voice = voice;
      }
    }

    if (playingState === PLAYER_STATUS.PLAYING) {
      synth.pause();
      setPlayingState(PLAYER_STATUS.PAUSED)
      toast.info('Text is paused')
      return;
    }

    if (playingState === PLAYER_STATUS.PAUSED) {
      synth.resume();
      setPlayingState(PLAYER_STATUS.RESUMED)
      toast.info('Text is resumed')
      return;
    }

    synth.speak(utterThis);
    setPlayingState(PLAYER_STATUS.PLAYING)
    toast.info('Text is playing')
  }

  const onClickStopHandler = () => {
    if (utteranceRef.current) {
      const synth = window.speechSynthesis;
      synth.cancel()
      setPlayingState(PLAYER_STATUS.STOPPED)
      toast.info('Text is stopped')
    }
  }

  return (
      <div>
        <Form id="create-record-form" method="POST" action="/record/create">

          <div className="grid grid-cols-1 gap-4 mt-6">

            <div>
              <Label htmlFor="content">Text you want to convert</Label>
              <div className="mt-2">
                <Textarea required value={content} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
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
              <div className="flex justify-between text-muted-foreground">
                <Label>Rate</Label>
                {rate}
              </div>
              <div className="mt-2">
                <Slider name="rate" value={[rate]} onValueChange={(e: number[]) => setRate(e[0])} max={2} step={0.1} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-muted-foreground">
                <Label>Pitch</Label>
                {pitch}
              </div>
              <div className="mt-2">
                <Slider name="pitch" value={[pitch]} onValueChange={(e: number[]) => setPitch(e[0])} max={2} step={0.1} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-muted-foreground">
                <Label>Volume</Label>
                {volume}
              </div>
              <div className="mt-2">
                <Slider name="volume" value={[volume]} onValueChange={(e: number[]) => setVolume(e[0])} max={2} step={0.1} />
              </div>
            </div>

            <div className="flex justify-between space-x-4">
              <Button size="lg" className="w-1/2" disabled={isSubmitting} type="submit" variant="outline">
                <SaveIcon />
                {isSubmitting && <Loader2 className="animate-spin" />}
              </Button>

              <div className="grid grid-cols-2 gap-x-2.5">
                <Button type="button" size="icon" onClick={onClickStopHandler} variant="outline">
                  <SquareStop />
                </Button>
                <Button type="button" size="icon" onClick={onClickHandler}>
                  {playingState == PLAYER_STATUS.RESUMED || playingState == PLAYER_STATUS.PLAYING ? <PauseIcon /> : <PlayIcon />}
                </Button>
              </div>

            </div>

          </div>

        </Form>
      </div>
  )
}
