import {Button} from "~/components/ui/button";
import {PlayIcon} from "lucide-react";

export function TrackItem() {
  return (
      <article className="py-10 sm:py-12">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="lg:max-w-4xl">
            <div className="mx-auto px-4 sm:px-6 md:max-w-2xl md:px-4 lg:px-0">

              <div className="flex flex-col items-start">

                <p className="text-muted-foreground font-light mt-2.5">
                  He’s going to need you to go ahead and come in on Saturday, but there’s a lot more to the story than you think.
                </p>

                <div className="text-muted-foreground order-first">
                  February 24, 2022
                </div>

                <div className="mt-4">
                  <Button variant="outline"><PlayIcon /> Listen</Button>
                </div>

              </div>

            </div>
          </div>
        </div>
      </article>
  )
}