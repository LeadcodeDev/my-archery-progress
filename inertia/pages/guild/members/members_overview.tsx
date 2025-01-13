import { Searchbar } from '@/components/commons/searchbar'
import TableFilter, { ComponentFilter } from '@/components/commons/table_filter'
import Protected from '@/components/commons/protected'
import { CreatePermissionDialog } from '@/pages/manager/accounts/permissions/components/permissions/create_permission_dialog'
import { Button } from '@/components/ui/button'
import { Paginator } from '@/commons/types'
import User from '#models/user'
import { Layout } from '@/components/layouts/default/layout'

type Props = {
  members: Paginator<User>
}

export default function PracticesOverview(props: Props) {
  return (
    <Layout
      mode="guild"
      breadcrumb={[
        { label: 'Platform', url: '/platform' },
        { label: 'Practices', url: '/platform/practices/overview' },
      ]}
      trailing={
        <div className="flex items-center justify-end gap-x-2">
          <Searchbar
            placeholder="Rechercher un membre..."
            searchKey="search"
            redirect="/guild/members/overview"
          />

          <TableFilter
            itemPerPage={props.members.meta.perPage}
            resources={filterOptions}
            resourceRoute="/guild/members/overview"
          />

          <Protected permissions="manager:permissions:store">
            <CreatePermissionDialog trigger={<Button size="sm">Nouvel entrainement</Button>} />
          </Protected>
        </div>
      }
    >
      pp
    </Layout>
  )
}

const filterOptions: ComponentFilter = [
  {
    type: 'combobox',
    label: 'Admin only',
    multiple: false,
    searchKey: 'forAdmin',
    options: [
      { label: 'Oui', value: 'true' },
      { label: 'Non', value: 'false' },
    ],
  },
]
