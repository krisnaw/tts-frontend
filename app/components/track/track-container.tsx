import type {RecordType} from "~/lib/types";
import {Button} from "~/components/ui/button";
import {Activity, AudioLines, FileAudio, Gauge, PlayIcon, TrashIcon, Volume2, VolumeIcon} from "lucide-react";
import {format} from "date-fns";
import {Form} from "react-router";
import {TooltipShell} from "~/components/tooltip-shell";

export function TrackContainer({records}: { records: RecordType[] }) {
  return (
      <>
        <svg aria-hidden="true" className="absolute top-0 left-0 h-20 w-full">
          <defs>
            <linearGradient id=":S1:-fade" x1="0" x2="0" y1="0" y2="1">
              <stop offset="40%" stop-color="white"></stop>
              <stop offset="100%" stop-color="black"></stop>
            </linearGradient>
            <linearGradient id=":S1:-gradient">
              <stop offset="0%" stop-color="#4989E8"></stop>
              <stop offset="50%" stop-color="#6159DA"></stop>
              <stop offset="100%" stop-color="#FF54AD"></stop>
            </linearGradient>
            <mask id=":S1:-mask">
              <rect width="100%" height="100%" fill="url(#:S1:-pattern)"></rect>
            </mask>
            <pattern id=":S1:-pattern" width="400" height="100%" patternUnits="userSpaceOnUse">
              <rect width="2" height="83%" x="2" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="99%" x="6" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="52%" x="10" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="99%" x="14" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="86%" x="18" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="91%" x="22" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="92%" x="26" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="75%" x="30" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="51%" x="34" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="88%" x="38" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="45%" x="42" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="56%" x="46" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="80%" x="50" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="44%" x="54" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="93%" x="58" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="98%" x="62" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="41%" x="66" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="47%" x="70" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="87%" x="74" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="67%" x="78" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="73%" x="82" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="69%" x="86" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="88%" x="90" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="53%" x="94" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="69%" x="98" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="75%" x="102" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="86%" x="106" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="43%" x="110" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="80%" x="114" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="81%" x="118" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="78%" x="122" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="56%" x="126" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="47%" x="130" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="90%" x="134" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="50%" x="138" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="52%" x="142" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="77%" x="146" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="81%" x="150" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="98%" x="154" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="48%" x="158" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="87%" x="162" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="87%" x="166" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="55%" x="170" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="41%" x="174" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="42%" x="178" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="93%" x="182" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="84%" x="186" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="67%" x="190" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="68%" x="194" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="55%" x="198" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="57%" x="202" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="56%" x="206" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="55%" x="210" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="46%" x="214" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="67%" x="218" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="69%" x="222" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="79%" x="226" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="84%" x="230" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="63%" x="234" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="94%" x="238" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="90%" x="242" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="51%" x="246" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="73%" x="250" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="55%" x="254" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="57%" x="258" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="69%" x="262" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="88%" x="266" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="84%" x="270" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="49%" x="274" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="95%" x="278" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="73%" x="282" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="54%" x="286" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="57%" x="290" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="72%" x="294" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="51%" x="298" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="44%" x="302" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="52%" x="306" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="87%" x="310" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="93%" x="314" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="46%" x="318" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="47%" x="322" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="57%" x="326" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="79%" x="330" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="95%" x="334" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="54%" x="338" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="65%" x="342" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="90%" x="346" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="99%" x="350" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="82%" x="354" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="98%" x="358" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="93%" x="362" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="60%" x="366" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="50%" x="370" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="69%" x="374" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="77%" x="378" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="93%" x="382" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="44%" x="386" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="51%" x="390" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="96%" x="394" fill="url(#:S1:-fade)"></rect>
              <rect width="2" height="60%" x="398" fill="url(#:S1:-fade)"></rect>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#:S1:-gradient)" mask="url(#:S1:-mask)" opacity="0.25"></rect>
        </svg>

        <div className="w-full pt-16 pb-12 sm:pb-4 lg:pt-12">

          <div className="px-4 sm:px-6 lg:px-8">
            <div className="lg:max-w-4xl">
              <div className="mx-auto px-4 sm:px-6 md:max-w-2xl md:px-4 lg:px-0">
                <h4 className="text-xl font-medium">Histories</h4>
              </div>
            </div>
          </div>

          <div className="divide-y divide-slate-100 sm:mt-4 lg:mt-8 lg:border-t lg:border-slate-100">
            {records.map((record: RecordType) => (
                <article className="py-10 sm:py-12" key={record.id}>
                  <div className="px-4 sm:px-6 lg:px-8">
                    <div className="lg:max-w-4xl">
                      <div className="mx-auto px-4 sm:px-6 md:max-w-2xl md:px-4 lg:px-0">

                        <div className="flex flex-col items-start">

                          <p className="text-muted-foreground font-light mt-2.5">
                            {record.content}
                          </p>

                          <div className="text-muted-foreground order-first">
                            {format(new Date(record.createdAt), 'PPpp')}
                          </div>

                          <div className="grid grid-cols-2 gap-4 mt-4">
                            <TooltipShell content="Voice">
                              <div className="text-muted-foreground flex gap-x-2.5">
                                <FileAudio />
                                {record.voice}
                              </div>
                            </TooltipShell>

                            <TooltipShell content="Volume">
                              <div className="text-muted-foreground flex gap-x-2.5">
                                <Volume2 />
                                {record.volume}
                              </div>
                            </TooltipShell>

                            <TooltipShell content="Rate">
                              <div className="text-muted-foreground flex gap-x-2.5">
                                <Gauge />
                                {record.rate}
                              </div>
                            </TooltipShell>

                            <TooltipShell content="Pitch">
                              <div className="text-muted-foreground flex gap-x-2.5">
                                <AudioLines />
                                {record.pitch}
                              </div>
                            </TooltipShell>

                          </div>

                          <div className="mt-4 w-full flex justify-between">
                            <div>
                              <Button variant="outline"><PlayIcon/> Listen</Button>
                            </div>

                            <div>
                              <Form action={`/record/${record.id}/delete`} method="DELETE">
                                <Button type="submit" variant="ghost" size="icon" className="text-muted-foreground">
                                  <TrashIcon />
                                </Button>
                              </Form>
                            </div>
                          </div>

                        </div>

                      </div>
                    </div>
                  </div>
                </article>
            ))}
          </div>

        </div>
      </>
  )
}