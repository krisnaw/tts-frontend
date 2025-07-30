import {Label} from "~/components/ui/label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "~/components/ui/select";

export function VoiceList() {
  return (
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
  )
}