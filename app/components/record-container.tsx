import {Label} from "~/components/ui/label";
import {Textarea} from "~/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "~/components/ui/select";
import {Slider} from "~/components/ui/slider";
import {Button} from "~/components/ui/button";
import {PlayIcon, SaveIcon} from "lucide-react";
import {useState} from "react";

export function RecordContainer() {

  const [rate, setRate] = useState<number>(20);
  const [pitch, setPitch] = useState<number>(33);
  const [volume, setVolume] = useState<number>(1);
  const [voice, setVoice] = useState<string>('en-US');


  return (
      <div className="px-4 sm:px6 lg:px-8 flex flex-col justify-center">
        <div className="pt-10">
          <h5 className="text-2xl">Text-to-Speech Recorder</h5>
          <p className="text-muted-foreground mt-2 font-light">
            Conversations with the most tragically misunderstood people of our time.
          </p>
        </div>
        <div>
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
              <Button size="lg" className="w-1/2">
                <SaveIcon />
              </Button>

              <Button size="lg" variant="outline" className="w-1/2">
                <PlayIcon />
              </Button>
            </div>

          </div>
        </div>
      </div>
  )
}