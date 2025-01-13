import { ComponentProps } from 'react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'
import { Authenticated } from '@/commons/types'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { LogOutIcon, User2Icon } from 'lucide-react'
import { router, usePage } from '@inertiajs/react'
import ViewSelector from '@/components/layouts/default/view_selector'
import { SidebarCollapse, SidebarItem } from '@/components/layouts/default/sidebar_items'
import { LayoutProps } from '@/components/layouts/default/layout'
import { sidebarLinks } from '@/components/layouts/default/settings'

export function AppSidebar(props: ComponentProps<typeof Sidebar> & LayoutProps) {
  const page = usePage<Authenticated>()
  const { mode, ...rest } = props

  const currentLinks = sidebarLinks[mode]

  return (
    <Sidebar {...rest}>
      <SidebarHeader className="px-4 pt-4">
        <ScrollArea className="w-96 whitespace-nowrap">
          <p className="text-lg font-bold">
            {page.props.currentUser.firstname} {page.props.currentUser.lastname}
          </p>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        <ViewSelector currentView={mode} />
      </SidebarHeader>
      <SidebarContent className="py-5 gap-0">
        {currentLinks.map((item) => {
          if (item.items) {
            return <SidebarCollapse key={item.title} item={item} />
          }
          return <SidebarItem key={item.title} item={item} />
        })}
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter>
        {mode === 'platform' && (
          <Button variant="outline">
            <User2Icon className="mr-2" />
            Mon compte
          </Button>
        )}
        <Button variant="default" onClick={() => router.post('/authentication/logout')}>
          <LogOutIcon className="mr-2" />
          Déconnexion
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}
