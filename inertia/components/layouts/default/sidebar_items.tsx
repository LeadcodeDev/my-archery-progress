import { Link } from '@inertiajs/react'
import { cn } from '@/commons/utils'
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton, SidebarMenuItem
} from '@/components/ui/sidebar'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { ChevronRight } from 'lucide-react'
import { SidebarLink } from '@/components/layouts/default/settings'

type Props = {
  item: SidebarLink
}

export function SidebarItem(props: Props) {
  return (
    <div data-sidebar="menu-item" className={cn('group/menu-item relative w-full px-2')}>
      <SidebarMenuButton asChild isActive={false}>
        <Link href={props.item.url!} className="font-medium">
          {props.item.title}
        </Link>
      </SidebarMenuButton>
    </div>
  )
}

export function SidebarCollapse(props: Props) {
  return (
    <Collapsible
      key={props.item.title}
      title={props.item.title}
      defaultOpen
      className="group/collapsible"
    >
      <SidebarGroup>
        <SidebarGroupLabel
          asChild
          className="group/label text-sm text-sidebar-foreground"
        >
          <CollapsibleTrigger>
            <span className="text-xs font-bold uppercase text-sidebar-foreground/50 hover:text-sidebar-accent-foreground/75">
              {props.item.title}
            </span>
            <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent>
          <SidebarGroupContent>
            <SidebarMenu>
              {props.item.items?.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={false}>
                    <Link href={item.url} className="font-medium">
                      {item.title}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  )
}
