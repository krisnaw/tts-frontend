import {Link, useSearchParams} from "react-router";
import {useEffect, useRef, useState} from "react";
import {toast} from "sonner";
import {AudioLines, FileAudio, Gauge, Volume2, X} from "lucide-react";
import type {RecordType} from "~/lib/types";
import {TooltipShell} from "~/components/tooltip-shell";

const PLAYER_STATUS = {
  PLAYING: 'playing',
  STOPPED: 'stop',
  RESUMED: 'resume',
  PAUSED: 'pause'
};

export default function Player({token} : {token: string}) {
  const endpoint = import.meta.env.VITE_API_ENDPOINT
  const [searchParams, setSearchParams] = useSearchParams();
  const [recordId, setRecordId] = useState<string | null>(null);
  const [record, setRecord] = useState<RecordType | null>(null)
  const [playingState, setPlayingState] = useState(PLAYER_STATUS.STOPPED)
  const utteranceRef = useRef<SpeechSynthesisUtterance>(null);

  useEffect(() => {

    const recordId = searchParams.get('play')

    if (recordId == null) {
      setRecordId(null)
      return;
    }

    setRecordId(recordId)

    const fetchRecord = async () => {
      const url = `${endpoint}/record/${searchParams.get('play')}`

      const result = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        method: "GET",
      })

      if (!result.ok) {
        toast.error("Something went wrong")
      }

      const data = await result.json();
      setRecord(data)
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(data.content);
      utteranceRef.current = utterance;
      utterance.pitch = data.pitch;
      utterance.rate = data.rate;
      utterance.volume = data.volume;

      for (const voice of synth.getVoices()) {
        if (voice.name === data.voice) {
          utterance.voice = voice;
        }
      }

      synth.speak(utterance);
      setPlayingState(PLAYER_STATUS.PLAYING)
    }

    fetchRecord()

  }, [searchParams]);

  if (recordId == null) return null;

  if (utteranceRef.current) {
    utteranceRef.current.onend = () => {
      setPlayingState(PLAYER_STATUS.STOPPED)
    }
  }

  return (
      <div className="fixed inset-x-0 bottom-0 z-20 left-95">
        <div className="bg-white ring-1 ring-slate-200 px-10 py-6">

          <div className="lg:max-w-4xl mx-auto">

            <div className="px-4 sm:px-6 lg:px-8 flex items-center justify-between">

              <div>
                <div className="text-lg font-medium text-muted-foreground">
                  Playing record: {recordId}
                </div>
                <p className="font-light text-muted-foreground">
                  {record?.content}
                </p>

                <div className="grid grid-cols-4 gap-4 mt-4">
                  <TooltipShell content="Voice">
                    <div className="text-muted-foreground flex gap-x-2.5">
                      <FileAudio />
                      {record?.voice}
                    </div>
                  </TooltipShell>

                  <TooltipShell content="Volume">
                    <div className="text-muted-foreground flex gap-x-2.5">
                      <Volume2 />
                      {parseFloat(record?.volume as string)}
                    </div>
                  </TooltipShell>

                  <TooltipShell content="Rate">
                    <div className="text-muted-foreground flex gap-x-2.5">
                      <Gauge />
                      {parseFloat(record?.rate as string)}
                    </div>
                  </TooltipShell>

                  <TooltipShell content="Pitch">
                    <div className="text-muted-foreground flex gap-x-2.5">
                      <AudioLines />
                      {parseFloat(record?.pitch as string)}
                    </div>
                  </TooltipShell>

                </div>
              </div>

              <Link to="/">
                <X size={24} className="ml-4 text-muted-foreground" />
              </Link>
            </div>


          </div>


        </div>
      </div>
  )
}