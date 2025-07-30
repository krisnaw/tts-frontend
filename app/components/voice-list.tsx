import {Label} from "~/components/ui/label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "~/components/ui/select";
import {useEffect, useState} from "react";
import {Loader2} from "lucide-react";

export function VoiceList() {

  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [loading, setLoading] = useState(false);

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
          console.log(availableVoices);
        };

        return () => {
          window.speechSynthesis.onvoiceschanged = null;
        };
      }
    }
  }, [])

  if (loading) {
    return (
        <div>
          Fetching voices... <Loader2 className="animate-spin" />
        </div>
    )
  }

  return (
      <div>
        <Label htmlFor="voice">Select voices</Label>

        <div className="mt-2">
          <Select name="voice">
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
  )
}