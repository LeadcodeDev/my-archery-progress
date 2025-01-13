import { useEffect, useState } from 'react'
import Permission from '#models/permission'

type Props = {
  limit: number
  skip?: boolean
}

export function usePermission(props: Props) {
  const [state, setState] = useState<Permission[]>([])

  useEffect(() => {
    if (props.skip) return

    const queryParam = new URLSearchParams()
    queryParam.append('limit', props.limit.toString())

    fetch(`/manager/permissions/overview?${queryParam}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })
      .then((res) => res.json())
      .then(async (resource) => setState(await resource.data))
  }, [props.skip])

  return state
}
