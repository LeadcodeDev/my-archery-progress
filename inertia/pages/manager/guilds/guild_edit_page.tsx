import { useUserPermissions } from '@/hooks/use_user'
import { permission, toastVariant } from '@/commons/utils'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { router } from '@inertiajs/react'
import { toast } from 'sonner'
import Role from '#models/role'
import { Dispatch, SetStateAction } from 'react'
import {
  CreateGuildFormSchema,
  UpdateGuildFormSchema,
  updateGuildValidator,
} from '@/pages/manager/guilds/validators/guild_validators'
import { Form } from '@/components/ui/form'
import EditGuildForm from '@/pages/manager/guilds/components/forms/edit_guild_form'
import Structure from '#models/structure'

type Props = {
  roles: Role[]
  guild: Structure
  setOpen: Dispatch<SetStateAction<boolean>>
}

export default function GuildEditPage(props: Props) {
  const canBeUsed = useUserPermissions(permission.guilds('update', true))

  const form = useForm<UpdateGuildFormSchema>({
    resolver: zodResolver(updateGuildValidator),
    values: {
      name: props.guild.name,
      siret: props.guild.siret,
      isDeactivated: props.guild.isDeactivated,
      defaultLogo: props.guild.logo,
      logo: undefined,
    },
  })

  function handleSubmit(values: CreateGuildFormSchema) {
    const payload = new FormData()
    payload.append('name', values.name)
    payload.append('siret', values.siret)
    payload.append('isDeactivated', Boolean(values.isDeactivated).toString())

    if (values.logo) {
      payload.append('logo', values.logo)
    }

    router.put(`/manager/guilds/${props.guild.uid}`, payload, {
      preserveState: true,
      onSuccess: () => {
        props.setOpen(false)
        toast.success('Success', {
          ...toastVariant.success,
          description: 'Guild has been created.',
        })
      },
      onError: () => {
        toast.error('Error', {
          ...toastVariant.error,
          description: 'An error occurred while creating the guild.',
        })
      },
    })
  }

  return (
    <Form {...form}>
      <EditGuildForm id="form" onSubmit={handleSubmit} guild={props.guild} canBeUsed={canBeUsed} />
    </Form>
  )
}
