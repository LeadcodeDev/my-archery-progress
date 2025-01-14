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
  createGuildValidator,
} from '@/pages/manager/guilds/validators/guild_validators'
import CreateGuildForm from '@/pages/manager/guilds/components/forms/create_guild_form'
import { Form } from '@/components/ui/form'

type Props = {
  roles: Role[]
  setOpen: Dispatch<SetStateAction<boolean>>
}

export default function GuildCreatePage(props: Props) {
  const canBeUsed = useUserPermissions(permission.guilds('store', true))

  const form = useForm<CreateGuildFormSchema>({
    resolver: zodResolver(createGuildValidator),
    defaultValues: {
      name: '',
      siret: '',
      isDeactivated: false,
      logo: undefined,
    },
  })

  function handleSubmit(values: CreateGuildFormSchema) {
    console.log(values)
    const payload = new FormData()
    payload.append('name', values.name)
    payload.append('siret', values.siret)
    payload.append('isDeactivated', Boolean(values.isDeactivated).toString())

    if (values.logo) {
      payload.append('logo', values.logo)
    }

    router.post(`/manager/guilds`, payload, {
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
      <CreateGuildForm
        id="form"
        canBeUsed={canBeUsed}
        onSubmit={handleSubmit}
      />
    </Form>)
}
