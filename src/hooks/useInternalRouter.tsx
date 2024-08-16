import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

interface InternalRouterType {
  goBack: () => void
  push: (path: RoutePath) => void
  replace: (path: RoutePath) => void
}

export function useInternalRouter (): InternalRouterType {
  const navigate = useNavigate()

  return useMemo(() => {
    return {
      goBack () {
        navigate(-1)
      },
      push (path: RoutePath) {
        navigate(path)
      },
      replace (path: RoutePath) {
        navigate(path, { replace: true })
      }
    }
  }, [navigate])
}

type RoutePath = `/${string}`
