import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Typography,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import type { Advertisement } from '../../types/ads'
import { AD_PRIORITY_LABELS, AD_STATUS_LABELS } from '../../config/constants'

const getStatusColor = (status: Advertisement['status']) => {
  switch (status) {
    case 'approved':
      return 'success'
    case 'rejected':
      return 'error'
    case 'pending':
      return 'warning'
    default:
      return 'default'
  }
}

export interface AdCardProps {
  ad: Advertisement
}

export const AdCard = ({ ad }: AdCardProps) => {
  const navigate = useNavigate()
  const image = ad.images[0] ?? 'https://via.placeholder.com/400x250?text=No+Image'

  return (
    <Card>
      <CardActionArea onClick={() => navigate(`/item/${ad.id}`)}>
        <CardMedia component="img" height="180" image={image} alt={ad.title} />
        <CardContent>
          <Stack spacing={1}>
            <Typography variant="subtitle1" fontWeight={600} noWrap>
              {ad.title}
            </Typography>
            <Typography variant="subtitle2" color="primary">
              {ad.price.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' })}
            </Typography>
            <Typography variant="body2" color="text.secondary" noWrap>
              {ad.category}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Создано:{' '}
              {new Date(ad.createdAt).toLocaleString('ru-RU', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Typography>
            <Stack direction="row" spacing={1}>
              <Chip
                size="small"
                label={AD_STATUS_LABELS[ad.status]}
                color={getStatusColor(ad.status)}
              />
              <Chip
                size="small"
                label={AD_PRIORITY_LABELS[ad.priority]}
                color={ad.priority === 'urgent' ? 'warning' : 'default'}
              />
            </Stack>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}


