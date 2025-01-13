import { ComponentProps, Fragment, PropsWithChildren, ReactNode } from 'react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { ChevronRight, LogOutIcon } from 'lucide-react'
import { Link, router } from '@inertiajs/react'
import { Toaster } from '@/components/ui/sonner'
import { cn } from '@/commons/utils'
import ViewSelector from '@/components/commons/view_selector'
import { Authenticated } from '@/commons/types'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'

type Link = {
  title: string
  url?: string
  items?: { title: string; url: string }[]
}

const links: Link[] = [
  {
    title: 'Association',
    items: [
      { title: 'Licenciés', url: '/guild/members/overview' },
      { title: 'Encadrants', url: '/guild/supervisors/overview' },
      { title: 'Équipe administrative', url: '/guild/staff/overview' },
    ],
  },
  {
    title: 'Entrainements',
    items: [
      { title: 'Planning', url: '/guild/members/overview' },
      { title: 'Séances', url: '/guild/sessions/overview' },
      { title: 'Entrainements', url: '/guild/practices/overview' },
    ],
  },
  {
    title: 'Paramètres',
    items: [
      { title: 'Club', url: '/guild/settings' },
      { title: 'Licences', url: '/guild/members/transfert' },
      { title: 'Documents partagés', url: '/guild/documents/transfert' },
      { title: 'Transfert interclub', url: '/guild/members/transfert' },
    ],
  },
]

type Props = Authenticated & {
  breadcrumb?: { label: string; url?: string }[]
  trailing?: ReactNode
}

export function GuildLayout(props: PropsWithChildren<Props>) {
  return (
    <SidebarProvider>
      <AppSidebar {...props} />
      <SidebarInset>
        <header className="flex sticky z-10 top-0 bg-background h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          {props.breadcrumb && (
            <Fragment>
              <Separator orientation="vertical" className="mr-2 !h-6" />
              <Breadcrumb>
                <BreadcrumbList>
                  {props.breadcrumb.map((item, index) => {
                    if (index === props.breadcrumb!.length - 1) {
                      return (
                        <BreadcrumbItem key={index}>
                          <BreadcrumbPage className="font-medium">{item.label}</BreadcrumbPage>
                        </BreadcrumbItem>
                      )
                    }

                    return (
                      <Fragment key={index}>
                        <BreadcrumbItem className="hidden md:block">
                          <BreadcrumbLink href={item.url} className="font-medium">
                            {item.label}
                          </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="hidden md:block" />
                      </Fragment>
                    )
                  })}
                </BreadcrumbList>
              </Breadcrumb>
            </Fragment>
          )}

          {props.trailing && <div className="flex-1 items-center w-full">{props.trailing}</div>}
        </header>
        {props.children}
        <Toaster />
      </SidebarInset>
    </SidebarProvider>
  )
}

function AppSidebar(props: ComponentProps<typeof Sidebar> & Authenticated) {
  const { currentUser, currentPermissions, ...rest } = props
  return (
    <Sidebar {...rest}>
      <SidebarHeader className="px-4 pt-4">
        <ScrollArea className="w-96 whitespace-nowrap">
          <p className="text-lg font-bold">
            {props.currentUser.firstname} {props.currentUser.lastname}
          </p>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        <ViewSelector currentView="guild" />
      </SidebarHeader>
      <SidebarContent className="py-5 gap-0">
        {links.map((item) => {
          if (item.items) {
            return <SidebarCollapse key={item.title} item={item} />
          }

          return <SidebarItem key={item.title} item={item} />
        })}
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter>
        <Button variant="default" onClick={() => router.post('/authentication/logout')}>
          <LogOutIcon className="mr-2" />
          Déconnexion
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}

function SidebarItem(props: { item: Link }) {
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

function SidebarCollapse(props: { item: Link }) {
  return (
    <Collapsible
      key={props.item.title}
      title={props.item.title}
      defaultOpen
      className="group/collapsible"
    >
      <SidebarGroup>
        <SidebarGroupLabel asChild className="group/label text-sm text-sidebar-foreground">
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
