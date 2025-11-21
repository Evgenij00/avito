import { Typography } from '@mui/material'
import { useParams } from 'react-router-dom'

export const AdDetailsPage = () => {
  const { id } = useParams<{ id: string }>()

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Детали объявления
      </Typography>
      <Typography color="text.secondary">
        Здесь будет детальная карточка объявления c ID: {id}
      </Typography>
    </>
  )
}


