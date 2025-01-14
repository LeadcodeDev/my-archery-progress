import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Dispatch, Fragment, SetStateAction, useState } from 'react'

import { Paginator, UserStatus } from '@/commons/types'
import { Searchbar } from '@/components/commons/searchbar'
import { Button } from '@/components/ui/button'
import { CopyIcon, PlusIcon } from 'lucide-react'
import { toast } from 'sonner'
import TableFilter, { ComponentFilter } from '@/components/commons/table_filter'
import Protected from '@/components/commons/protected'
import { Layout } from '@/components/layouts/default/layout'
import Structure from '#models/structure'
import { CreateGuildDialog } from '@/pages/manager/guilds/components/create_guild_dialog'
import { UpdateGuildDialog } from '@/pages/manager/guilds/components/update_guild_dialog'

type Props = {
  guilds: Paginator<Structure>
}

export default function GuildsOverview(props: Props) {
  const [guild, setGuild] = useState<Structure | null>(null)

  return (
    <Layout
      mode="manager"
      breadcrumb={[
        { label: 'Manager', url: '/manager' },
        { label: 'Club overview', url: '/manager/guilds' },
      ]}
      trailing={
        <div className="flex items-center justify-end gap-x-2">
          <Searchbar
            placeholder="Search for a club..."
            searchKey="search"
            redirect="/manager/guilds/overview"
          />

          <TableFilter
            itemPerPage={props.guilds.meta.perPage}
            resources={filterOptions}
            resourceRoute="/manager/guilds/overview"
          />

          <Protected permissions="manager:guilds:store">
            <CreateGuildDialog trigger={<Button size="sm">New club</Button>} />
          </Protected>
        </div>
      }
    >
      <Fragment>
        <div className="p-5 border-b">
          <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Club
          </h2>
          <p className="text-sm text-muted-foreground">
            Manage your club. You can create, update, delete, and view club.
          </p>
        </div>
        <Table meta={props.guilds.meta} empty={<EmptyData />}>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead className="w-[300px]">Identité</TableHead>
              <TableHead>Type de compte</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody
            data={props.guilds.data}
            builder={(guild) => <RowBuilder key={guild.uid} guild={guild} setGuild={setGuild} />}
          />
        </Table>

        <UpdateGuildDialog guildState={[guild, setGuild]} />
      </Fragment>
    </Layout>
  )
}

function RowBuilder(props: {
  guild: Structure
  setGuild: Dispatch<SetStateAction<Structure | null>>
}) {
  async function onCopy(value: string) {
    await navigator.clipboard.writeText(value)
    toast('Copied to the clipboard', {
      icon: <CopyIcon className="size-4" />,
    })
  }

  return (
    <TableRow>
      <TableCell className="font-medium whitespace-nowrap !text-xs">
        <Badge onClick={() => onCopy(props.guild.uid)} variant="outline" className="cursor-pointer">
          {props.guild.uid}
          <CopyIcon className="ml-2 -mr-1 size-2" />
        </Badge>
      </TableCell>
      <TableCell onClick={() => props.setGuild(props.guild)} className="cursor-pointer">
        {props.guild.name}
      </TableCell>
      <TableCell onClick={() => props.setGuild(props.guild)} className="cursor-pointer">
        {props.guild.siret}
      </TableCell>
      <TableCell
        onClick={() => props.setGuild(props.guild)}
        className="flex items-center gap-x-2 cursor-pointer"
      >
        {props.guild.isDeactivated ? (
          <Badge variant="secondary">Pending</Badge>
        ) : (
          <Badge variant="success">Activate</Badge>
        )}
      </TableCell>
      <TableCell
        onClick={() => props.setGuild(props.guild)}
        className="text-right cursor-pointer"
      ></TableCell>
    </TableRow>
  )
}

function EmptyData() {
  return (
    <div className="p-5">
      <div className="flex items-center justify-center max-h-screen h-[40rem] border border-input rounded-md p-5">
        <div className="">
          <h2 className="text-xl text-center mt-5">No data found.</h2>
          <div className="mt-5">
            <CreateGuildDialog
              trigger={
                <Button variant="outline" size="sm">
                  <PlusIcon />
                  Créer un club
                </Button>
              }
            />
          </div>
        </div>
      </div>
    </div>
  )
}

const filterOptions: ComponentFilter = [
  {
    type: 'combobox',
    label: 'Account types',
    multiple: false,
    searchKey: 'type',
    options: [
      { label: 'Staff', value: 'staff' },
      { label: 'Practitioner', value: 'practitioner' },
      { label: 'User', value: 'user' },
    ],
  },
  {
    type: 'combobox',
    label: 'Account status',
    multiple: false,
    searchKey: 'status',
    options: Object.values(UserStatus).map((status) => ({
      label: status,
      value: status,
    })),
  },
]
