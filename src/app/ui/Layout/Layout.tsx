import { Container } from '@/shared/ui'
import { Sidebar } from '@/widgets'
import { Outlet } from 'react-router-dom'

export const Layout = () => {
  return (
    <>
      <Sidebar />
      <Container
        as="main"
        size="full"
        centered={false}
        padded={false}
        style={{ marginLeft: '64px', minHeight: '100dvh', width: 'calc(100% - 64px)' }}
      >
        <Outlet />
      </Container>
    </>
  )
}
