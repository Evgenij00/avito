import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import { getAds, type GetAdsParams } from '../api/adsApi'
import type { AdsListResponse } from '../types/ads'

const ADS_LIST_QUERY_KEY = 'ads-list'

export const useAdsList = (params: GetAdsParams): UseQueryResult<AdsListResponse> => {
  return useQuery<AdsListResponse>({
    queryKey: [ADS_LIST_QUERY_KEY, params],
    queryFn: () => getAds(params),
  })
}


