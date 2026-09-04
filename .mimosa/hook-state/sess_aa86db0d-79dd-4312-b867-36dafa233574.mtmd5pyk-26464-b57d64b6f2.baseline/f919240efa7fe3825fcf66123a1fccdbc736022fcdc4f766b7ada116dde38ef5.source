import { useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Layout, Menu, Button, Avatar, Dropdown, theme } from 'antd'
import {
  DashboardOutlined,
  FolderOutlined,
  HddOutlined,
  LinkOutlined,
  SettingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import { useAuthStore, useUIStore } from '@/stores'

const { Header, Sider, Content } = Layout

export default function AppLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useAuthStore()
  const { sidebarCollapsed, toggleSidebar } = useUIStore()
  const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken()

  const menuItems = [
    { key: '/dashboard', icon: <DashboardOutlined />, label: '仪表盘' },
    { key: '/files', icon: <FolderOutlined />, label: '文件管理' },
    { key: '/devices', icon: <HddOutlined />, label: '存储设备' },
    { key: '/shares', icon: <LinkOutlined />, label: '分享管理' },
    ...(user?.is_admin ? [{ key: '/admin', icon: <SettingOutlined />, label: '管理后台' }] : []),
  ]

  const userMenu = {
    items: [
      { key: 'profile', icon: <UserOutlined />, label: user?.nickname || user?.username },
      { type: 'divider' as const },
      { key: 'logout', icon: <LogoutOutlined />, label: '退出登录', danger: true },
    ],
    onClick: ({ key }: { key: string }) => {
      if (key === 'logout') {
        logout()
        navigate('/login')
      }
    },
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={sidebarCollapsed} theme="light" style={{ borderRight: '1px solid #f0f0f0' }}>
        <div style={{ height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid #f0f0f0' }}>
          <h2 style={{ margin: 0, fontSize: sidebarCollapsed ? 16 : 20, fontWeight: 700, color: '#1677ff' }}>
            {sidebarCollapsed ? 'M' : 'Memesplora'}
          </h2>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
          style={{ borderRight: 0 }}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: '0 24px', background: colorBgContainer, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #f0f0f0' }}>
          <Button type="text" icon={sidebarCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} onClick={toggleSidebar} />
          <Dropdown menu={userMenu} placement="bottomRight">
            <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#1677ff' }} />
              <span>{user?.nickname || user?.username}</span>
            </div>
          </Dropdown>
        </Header>
        <Content style={{ margin: 24 }}>
          <div style={{ padding: 24, minHeight: 360, background: colorBgContainer, borderRadius: borderRadiusLG }}>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}