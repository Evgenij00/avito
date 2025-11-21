import { Route, Routes, Navigate } from 'react-router-dom'
import { AppRoute } from './routesConfig'
import { AdsListPage } from '../pages/AdsListPage/AdsListPage'
import { AdDetailsPage } from '../pages/AdDetailsPage/AdDetailsPage'
import { StatsPage } from '../pages/StatsPage/StatsPage'

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={AppRoute.AdsList} replace />} />
      <Route path={AppRoute.AdsList} element={<AdsListPage />} />
      <Route path={AppRoute.AdDetails} element={<AdDetailsPage />} />
      <Route path={AppRoute.Stats} element={<StatsPage />} />
      <Route path="*" element={<Navigate to={AppRoute.AdsList} replace />} />
    </Routes>
  )
}


