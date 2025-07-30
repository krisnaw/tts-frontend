import {Tooltip, TooltipTrigger, TooltipContent} from "~/components/ui/tooltip";

export function TooltipShell({children, content}: {children: React.ReactNode, content: string}) {
  return (
      <Tooltip>
        <TooltipTrigger>
          {children}
        </TooltipTrigger>
        <TooltipContent>
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
  )
}