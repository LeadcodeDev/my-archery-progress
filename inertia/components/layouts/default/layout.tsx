import { Fragment, PropsWithChildren, ReactNode } from 'react'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Toaster } from '@/components/ui/sonner'
import { AppSidebar } from '@/components/layouts/default/app_sidebar'
import { sidebarLinks } from '@/components/layouts/default/settings'

export type LayoutProps = {
  breadcrumb?: { label: string; url?: string }[]
  trailing?: ReactNode
  mode: keyof typeof sidebarLinks
}

export function Layout(props: PropsWithChildren<LayoutProps>) {
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
