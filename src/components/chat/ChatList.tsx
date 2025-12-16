import { NavLink } from "react-router-dom"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../ui/Accordion"

type Props = {  
  variant: "favorites" | "all"
}

const threads = [
  { id: "adam", name: "Adam Weasely (You)", last: "You: web socket, payment..." },
  { id: "sheryl", name: "Sheryl Wutherspoon", last: "Help is needed here" },
  { id: "mary", name: "Mary Pill", last: "You: ." },
  { id: "daily-sync", name: "Daily sync up", last: "Mary: Okay" },
]

export default function ChatList({ variant }: Props) {
  return (
    <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
      <AccordionItem value="item-1" className="border-none">
        <AccordionTrigger className="text-xl capitalize cursor-pointer !px-3 !py-2 hover:no-underline">
          {variant === "favorites" ? "Favorite Chats" : "Chats"}
        </AccordionTrigger>

        <AccordionContent className="mt-2">
          <ul className="flex flex-col gap-2 overflow-x-auto">
            {threads.map((t) => (
              <li key={t.id} className="min-w-56">
                <NavLink
                  to={`/chat/${t.id}`}
                  className={({ isActive }) =>
                    [
                      "block rounded-md border px-3 py-2 transition-colors",
                      isActive
                        ? "bg-accent border-accent text-foreground"
                        : "hover:bg-accent/60 border-transparent",
                    ].join(" ")
                  }
                >
                  <div className="flex items-center gap-2  !px-2 !py-2">
                    <div className="size-8 shrink-0 rounded-full bg-primary/20" aria-hidden />
                    <div className="min-w-0">
                      <p className="truncate text-lg font-medium">{t.name}</p>
                      <p className="truncate text-base">{t.last}</p>
                    </div>
                  </div>
                </NavLink>
              </li>
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
