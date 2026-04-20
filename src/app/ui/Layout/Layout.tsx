import { Container } from '@/shared/ui'
import { Sidebar } from '@/widgets'
import { Outlet } from 'react-router-dom'
import styles from './layout.module.css'

export const Layout = () => {
  return (
    <>
      <Sidebar />
      <Container
        as="main"
        size="full"
        centered={false}
        padded={false}
        className={styles.container}
      >
        <Outlet />
      </Container>
    </>
  )
}
