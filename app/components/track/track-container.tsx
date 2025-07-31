import type {RecordType} from "~/lib/types";
import {Button} from "~/components/ui/button";
import {AudioLines, CassetteTape, FileAudio, Gauge, PlayIcon, Volume2} from "lucide-react";
import {format} from "date-fns";
import {TooltipShell} from "~/components/tooltip-shell";
import {DeleteButton} from "~/components/delete-button";
import {Form} from "react-router";

export function TrackContainer({records}: { records: RecordType[] }) {

  return (
      <>

        <div className="w-full pt-16 pb-12 sm:pb-4 lg:pt-12">

          <div className="px-4 sm:px-6 lg:px-8">
            <div className="lg:max-w-4xl">
              <div className="mx-auto px-4 sm:px-6 md:max-w-2xl md:px-4 lg:px-0">
                <h4 className="text-xl font-medium">Histories</h4>
              </div>
            </div>
          </div>

          <div className="divide-y divide-slate-100 sm:mt-4 lg:mt-8 lg:border-t lg:border-slate-100">

            {records.length === 0 && (
                <div className="py-10 sm:py-12 text-center grid place-items-center">
                  <div className="text-muted-foreground">
                    <CassetteTape size={64} />
                  </div>
                  <div>
                    <h2 className="text-lg text-muted-foreground">No record yet, please save one. </h2>
                  </div>
                </div>
            )}


            {records.length > 0 && records.map((record: RecordType) => (
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
                              <Form>
                                <input name="play" type="text" value={record.id}/>
                                <Button type="submit" variant="outline" ><PlayIcon/> Listen</Button>
                              </Form>
                            </div>

                            <div>
                              <DeleteButton record={record} />
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