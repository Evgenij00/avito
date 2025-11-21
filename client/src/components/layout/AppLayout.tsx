import type { PropsWithChildren } from 'react'
import { AppBar, Box, Container, Toolbar, Typography, Button } from '@mui/material'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { AppRoute } from '../../routing/routesConfig'

const Main = styled.main`
  padding-top: 80px;
  padding-bottom: 24px;
`

const NavButton = ({ to, label }: { to: string; label: string }) => {
  const location = useLocation()
  const isActive = location.pathname.startsWith(to)

  return (
    <Button
      color={isActive ? 'secondary' : 'inherit'}
      component={RouterLink}
      to={to}
      sx={{ textTransform: 'none', mr: 1 }}
    >
      {label}
    </Button>
  )
}

export const AppLayout = ({ children }: PropsWithChildren) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Система модерации объявлений
          </Typography>
          <NavButton to={AppRoute.AdsList} label="Список объявлений" />
          <NavButton to={AppRoute.Stats} label="Статистика" />
        </Toolbar>
      </AppBar>
      <Main>
        <Container maxWidth="lg">{children}</Container>
      </Main>
    </Box>
  )
}


