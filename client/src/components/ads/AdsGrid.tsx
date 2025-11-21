import { Box } from '@mui/material'
import type { Advertisement } from '../../types/ads'
import { AdCard } from './AdCard'

export interface AdsGridProps {
  ads: Advertisement[]
}

export const AdsGrid = ({ ads }: AdsGridProps) => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
        },
        gap: 2,
      }}
    >
      {ads.map((ad) => (
        <Box key={ad.id}>
          <AdCard ad={ad} />
        </Box>
      ))}
    </Box>
  )
}

