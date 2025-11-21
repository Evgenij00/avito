import { apiClient } from './client'
import type { AdsListResponse, AdStatus } from '../types/ads'
import type { AdsSortBy, SortOrder } from '../config/constants'

export interface GetAdsParams {
  page?: number
  limit?: number
  status?: AdStatus[]
  categoryId?: number
  minPrice?: number
  maxPrice?: number
  search?: string
  sortBy?: AdsSortBy
  sortOrder?: SortOrder
}

export const getAds = async (params: GetAdsParams): Promise<AdsListResponse> => {
  const response = await apiClient.get<AdsListResponse>('/ads', { params })
  return response.data
}


