import Structure from '#models/structure'
import { useFormContext } from 'react-hook-form'
import { UpdateGuildFormSchema } from '@/pages/manager/guilds/validators/guild_validators'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { InputImage } from '@/components/commons/input_image'

type Props = {
  id: string
  onSubmit: (data: UpdateGuildFormSchema) => void
  guild: Structure
  canBeUsed: boolean
}

export default function EditGuildForm(props: Props) {
  const form = useFormContext<UpdateGuildFormSchema>()
  return (
    <form id={props.id} onSubmit={form.handleSubmit(props.onSubmit)}>
      <div className="flex flex-col md:flex-row gap-5">
        <div className="flex flex-col gap-5 max-w-xs">
          <FormField
            control={form.control}
            name="logo"
            render={({ field: { value, onChange, ...fields } }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <InputImage
                      {...fields}
                      defaultValue={props.guild.logo}
                      value={value}
                      name="logo"
                      onFileChange={onChange}
                      className="w-[64] h-[64] aspect-square object-cover"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex-1">
          <div className="flex flex-col gap-5">
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
                    <Input placeholder="Siret" disabled={!props.canBeUsed} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </div>
    </form>
  )
}
