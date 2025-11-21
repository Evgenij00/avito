import type { AdPriority, AdStatus } from '../types/ads'

// В dev используем относительный URL, который уйдёт через Vite proxy на backend.
// В prod можно переопределить через VITE_API_BASE_URL.
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api/v1'

export const ADS_PAGE_SIZE = 10

export const AD_STATUSES: AdStatus[] = ['pending', 'approved', 'rejected', 'draft']

export const AD_STATUS_LABELS: Record<AdStatus, string> = {
  pending: 'На модерации',
  approved: 'Одобрено',
  rejected: 'Отклонено',
  draft: 'Черновик',
}

export const AD_PRIORITIES: AdPriority[] = ['normal', 'urgent']

export const AD_PRIORITY_LABELS: Record<AdPriority, string> = {
  normal: 'Обычный',
  urgent: 'Срочный',
}

export type AdsSortBy = 'createdAt' | 'price' | 'priority'

export type SortOrder = 'asc' | 'desc'


