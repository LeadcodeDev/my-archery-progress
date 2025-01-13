import { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Check, ChevronsUpDown } from 'lucide-react'
import { Command, CommandGroup, CommandItem, CommandList } from '@/components/ui/command'
import { cn } from '@/commons/utils'
import { router } from '@inertiajs/react'

type Props = {
  currentView: keyof typeof views
}

export default function ViewSelector(props: Props) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState<keyof typeof views>(props.currentView)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="flex !justify-start !px-3 w-[200px]"
        >
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
          {views[value].label}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandGroup>
              {Object.entries(views).map(([key, view]) => (
                <CommandItem
                  key={key}
                  value={key}
                  onSelect={(currentValue) => {
                    setValue(currentValue as keyof typeof views)
                    setOpen(false)
                    router.put(view.href)
                  }}
                >
                  <Check
                    className={cn('mr-2 h-4 w-4', key === value ? 'opacity-100' : 'opacity-0')}
                  />
                  {view.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export const views = {
  mySpace: {
    label: 'Mon espace',
    href: '/platform/practices/overview',
  },
  myGuild: {
    label: 'Mon club',
    href: '/club/members/overview',
  },
  manager: {
    label: 'Administrateur',
    href: '/manager/accounts/users/overview',
  },
} as const
