import {
  Alert,
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useSearchParams } from 'react-router-dom'
import { useMemo } from 'react'
import { AdsGrid } from '../../components/ads/AdsGrid'
import { useAdsList } from '../../hooks/useAdsList'
import {
  ADS_PAGE_SIZE,
  AD_STATUSES,
  AD_STATUS_LABELS,
  type AdsSortBy,
  type SortOrder,
} from '../../config/constants'
import type { AdStatus } from '../../types/ads'

export const AdsListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const page = Number(searchParams.get('page') ?? '1')
  const search = searchParams.get('search') ?? ''
  const status = searchParams.getAll('status') as AdStatus[]
  const categoryIdParam = searchParams.get('categoryId')
  const minPriceParam = searchParams.get('minPrice')
  const maxPriceParam = searchParams.get('maxPrice')
  const sortBy = (searchParams.get('sortBy') as AdsSortBy) ?? 'createdAt'
  const sortOrder = (searchParams.get('sortOrder') as SortOrder) ?? 'desc'

  const categoryId = categoryIdParam ? Number(categoryIdParam) : undefined
  const minPrice = minPriceParam ? Number(minPriceParam) : undefined
  const maxPrice = maxPriceParam ? Number(maxPriceParam) : undefined

  const { data, isLoading, isError, error, isFetching } = useAdsList({
    page,
    limit: ADS_PAGE_SIZE,
    status: status.length ? status : undefined,
    categoryId,
    minPrice,
    maxPrice,
    search: search || undefined,
    sortBy,
    sortOrder,
  })

  const totalItems = data?.pagination.totalItems ?? 0
  const totalPages = data?.pagination.totalPages ?? 0

  const handleUpdateParams = (next: Record<string, string | string[] | null>) => {
    const updated = new URLSearchParams(searchParams)

    Object.entries(next).forEach(([key, value]) => {
      updated.delete(key)
      if (value === null) return
      if (Array.isArray(value)) {
        value.forEach((v) => updated.append(key, v))
      } else {
        updated.set(key, value)
      }
    })

    setSearchParams(updated)
  }

  const handlePageChange = (_: unknown, newPage: number) => {
    handleUpdateParams({ page: String(newPage) })
  }

  const handleResetFilters = () => {
    setSearchParams({ page: '1' })
  }

  const currentStatusSet = useMemo(() => new Set(status), [status])

  const toggleStatus = (value: AdStatus) => {
    const next = new Set(currentStatusSet)
    if (next.has(value)) {
      next.delete(value)
    } else {
      next.add(value)
    }
    handleUpdateParams({
      status: Array.from(next),
      page: '1',
    })
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Список объявлений
      </Typography>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} mb={2}>
        <TextField
          label="Поиск по названию"
          size="small"
          value={search}
          onChange={(event) =>
            handleUpdateParams({
              search: event.target.value || null,
              page: '1',
            })
          }
          fullWidth
        />
        <TextField
          label="ID категории"
          size="small"
          type="number"
          value={categoryIdParam ?? ''}
          onChange={(event) =>
            handleUpdateParams({
              categoryId: event.target.value || null,
              page: '1',
            })
          }
          sx={{ minWidth: 140 }}
        />
        <TextField
          label="Мин. цена"
          size="small"
          type="number"
          value={minPriceParam ?? ''}
          onChange={(event) =>
            handleUpdateParams({
              minPrice: event.target.value || null,
              page: '1',
            })
          }
          sx={{ minWidth: 140 }}
        />
        <TextField
          label="Макс. цена"
          size="small"
          type="number"
          value={maxPriceParam ?? ''}
          onChange={(event) =>
            handleUpdateParams({
              maxPrice: event.target.value || null,
              page: '1',
            })
          }
          sx={{ minWidth: 140 }}
        />
        <Button variant="outlined" onClick={handleResetFilters}>
          Сбросить фильтры
        </Button>
      </Stack>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} mb={2} alignItems="center">
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {AD_STATUSES.map((value) => (
            <Button
              key={value}
              size="small"
              variant={currentStatusSet.has(value) ? 'contained' : 'outlined'}
              onClick={() => toggleStatus(value)}
            >
              {AD_STATUS_LABELS[value]}
            </Button>
          ))}
        </Stack>

        <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel id="sort-by-label">Сортировка</InputLabel>
          <Select
            labelId="sort-by-label"
            label="Сортировка"
            value={sortBy}
            onChange={(event) =>
              handleUpdateParams({
                sortBy: event.target.value,
                page: '1',
              })
            }
          >
            <MenuItem value="createdAt">По дате создания</MenuItem>
            <MenuItem value="price">По цене</MenuItem>
            <MenuItem value="priority">По приоритету</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel id="sort-order-label">Порядок</InputLabel>
          <Select
            labelId="sort-order-label"
            label="Порядок"
            value={sortOrder}
            onChange={(event) =>
              handleUpdateParams({
                sortOrder: event.target.value,
                page: '1',
              })
            }
          >
            <MenuItem value="desc">По убыванию</MenuItem>
            <MenuItem value="asc">По возрастанию</MenuItem>
          </Select>
        </FormControl>

        {isFetching && (
          <Stack direction="row" spacing={1} alignItems="center">
            <CircularProgress size={18} />
            <Typography variant="body2" color="text.secondary">
              Обновление списка...
            </Typography>
          </Stack>
        )}
      </Stack>

      {isLoading ? (
        <Stack alignItems="center" mt={4}>
          <CircularProgress />
        </Stack>
      ) : isError ? (
        <Alert severity="error" sx={{ mt: 2 }}>
          Не удалось загрузить список объявлений
          {error instanceof Error ? `: ${error.message}` : ''}
        </Alert>
      ) : data && data.ads.length === 0 ? (
        <Typography mt={2} color="text.secondary">
          Объявления не найдены. Попробуйте изменить фильтры.
        </Typography>
      ) : (
        <>
          {data && <AdsGrid ads={data.ads} />}

          <Stack
            mt={3}
            direction={{ xs: 'column', md: 'row' }}
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            <Typography variant="body2" color="text.secondary">
              Всего объявлений: {totalItems}
            </Typography>

            {totalPages > 1 && (
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                showFirstButton
                showLastButton
              />
            )}
          </Stack>
        </>
      )}
    </Box>
  )
}

