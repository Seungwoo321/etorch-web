import {
  useQuery,
  useMutation,
  useQueryClient,
  // useInfiniteQuery
} from '@tanstack/react-query'
import { IChart, INewDashboard, IUpdateDashboard } from '@/models/dashboard'
import { QUERY_KEYS } from './queryKeys'
import { createDashboard, updateDashboard, getDashboards, deleteDashboard } from '../api'

export const useGetDashboards = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_DASHBOARDS],
    queryFn: getDashboards
  })
}

export const useCreateDashboard = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (dashboard: INewDashboard) => createDashboard(dashboard),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_DASHBOARDS]
      })
    }
  })
}

export const useUpdateDashboard = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (dashboard: IUpdateDashboard<IChart>) => updateDashboard(dashboard),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.UPDATE_DASHBOARD, data?.$id]
      })
    }
  })
}

export const useDeleteDashboard = () => {
    const queryClient = useQueryClient()

    return useMutation({
      mutationFn: (dashboardId: string) => deleteDashboard(dashboardId),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_DASHBOARDS]
        })
      }
    })
}

