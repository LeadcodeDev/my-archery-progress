export type SidebarLink = {
  title: string
  url?: string
  items?: { title: string; url: string }[]
}

export const platformLinks: SidebarLink[] = [
  {
    title: "Mon suivis d'archer",
    items: [
      { title: 'Mes séances', url: '/platform/sessions/overview' },
      { title: 'Mes entrainements', url: '/platform/practices/overview' },
    ],
  },
]

export const guildLinks: SidebarLink[] = [
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

export const managerLinks = [
  {
    title: 'Manage accounts',
    items: [
      { title: 'Users', url: '/manager/users/overview' },
      { title: 'Roles', url: '/manager/roles/overview' },
      { title: 'Permissions', url: '/manager/permissions/overview' },
    ],
  },
  {
    title: 'Manage organizations',
    items: [
      { title: 'Groups', url: '#' },
      { title: 'Structures', url: '#' },
    ],
  },
]

export const sidebarLinks = {
  manager: managerLinks,
  platform: platformLinks,
  guild: guildLinks,
}
