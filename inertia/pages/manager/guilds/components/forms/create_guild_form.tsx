import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { CreateGuildFormSchema } from '@/pages/manager/guilds/validators/guild_validators'
import { Switch } from '@/components/ui/switch'

type Props = {
  id?: string
  canBeUsed: boolean
  onSubmit: (data: CreateGuildFormSchema) => void
}

export default function CreateGuildForm(props: Props) {
  const form = useForm<CreateGuildFormSchema>()

  return (
    <form id={props.id} onSubmit={form.handleSubmit(props.onSubmit)}>
      <div className="pt-5 flex flex-col gap-5">
        <FormField
          control={form.control}
          name="logo"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem className="flex-1">
              <FormLabel>Logo</FormLabel>
              <FormControl>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Input
                    id="logo"
                    {...fieldProps}
                    placeholder="Picture"
                    type="file"
                    accept="image/*"
                    onChange={(event) => onChange(event.target.files && event.target.files[0])}
                    disabled={!props.canBeUsed}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Nom du club</FormLabel>
                <FormControl>
                  <Input placeholder="Nom du club" disabled={!props.canBeUsed} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="siret"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Siret</FormLabel>
                <FormControl>
                  <Input placeholder="88267349400010" disabled={!props.canBeUsed} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="isDeactivated"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>État du compte</FormLabel>
              <FormControl>
                <div className="flex gap-2">
                  <Switch
                    disabled={!props.canBeUsed}
                    labelBuilder={(checked) => checked ? 'Le compte est désactivé' : 'Le compte est actif'}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </form>
  )
}
