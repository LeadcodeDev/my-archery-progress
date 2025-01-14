import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { permission, toastVariant } from '@/commons/utils'
import { ReactElement } from 'react'
import Protected from '@/components/commons/protected'
import LoadFragment from '@/components/commons/load_fragment'
import Structure from '#models/structure'
import { State } from '@/commons/types'
import { DeleteButton } from '@/components/commons/delete_button'
import { router } from '@inertiajs/react'
import { toast } from 'sonner'

type Props = {
  guildState: State<Structure | null>
  trigger?: ReactElement
}

export function UpdateGuildDialog(props: Props) {
  const [guild, setGuild] = props.guildState

  function handleDelete() {
    router.delete(`/manager/guilds/${guild?.uid}`, {
      onSuccess: () => {
        setGuild(null)
        toast.success('Success', {
          ...toastVariant.success,
          description: 'Club was deleted.',
        })
      },
      onError: () => {
        toast.error('Error', {
          ...toastVariant.error,
          description: 'An error occurred while deleting the token.',
        })
      },
    })
  }

  return (
    <Dialog
      open={!!guild}
      onOpenChange={(value) => {
        if (!value) setGuild(null)
      }}
    >
      {props.trigger && <DialogTrigger asChild>{props.trigger}</DialogTrigger>}
      <DialogContent className="sm:max-w-2xl w-full">
        <DialogHeader>
          <DialogTitle>Update {guild?.name}</DialogTitle>
          <DialogDescription>Fill in the form to update a guild.</DialogDescription>
        </DialogHeader>

        <LoadFragment
          source={`/manager/guilds/${guild?.uid}/edit`}
          props={{ setOpen: () => setGuild(null) }}
        >
          <div className="border rounded-md aspect-video" />
        </LoadFragment>

        <DialogFooter className="flex items-center sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary" className="mt-5">
              Close
            </Button>
          </DialogClose>
          <Protected permissions={permission.guilds('update', true)}>
            <Button form="form" type="submit" size="sm" className="mt-5">
              Sauvegarder
            </Button>
          </Protected>
          <Protected permissions={permission.guilds('delete', true)}>
            <DeleteButton
              word="confirmation"
              onSubmit={handleDelete}
              variant="destructive"
              size="sm"
              className="mt-5"
            >
              Supprimer
            </DeleteButton>
          </Protected>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
