import { useAuthStore } from '@/stores'
import { Card, Typography } from 'antd'
import { SettingOutlined } from '@ant-design/icons'

const { Title, Paragraph } = Typography

export default function AdminPage() {
  const user = useAuthStore((s) => s.user)

  if (!user?.is_admin) {
    return (
      <Card>
        <Title level={4}>无权限访问</Title>
        <Paragraph>只有管理员可以访问此页面。</Paragraph>
      </Card>
    )
  }

  return (
    <div>
      <Title level={3}><SettingOutlined /> 管理后台</Title>
      <Card title="系统信息">
        <p><strong>版本:</strong> 1.0.0-beta</p>
        <p><strong>运行模式:</strong> 单机模式</p>
        <p><strong>管理员:</strong> {user?.nickname || user?.username}</p>
      </Card>
      <Card title="存储配置" style={{ marginTop: 16 }}>
        <p>默认块大小: 4096 字节</p>
        <p>单空间最大容量: 1 TB</p>
        <p>GPU 显存支持: 已禁用（可通过环境变量启用）</p>
      </Card>
      <Card title="REST API 端点" style={{ marginTop: 16 }}>
        <p><strong>HTTP API:</strong> http://localhost:5212/api/v3</p>
        <p><strong>S3 API:</strong> http://localhost:5213</p>
        <p><strong>WebDAV:</strong> http://localhost:5214</p>
      </Card>
    </div>
  )
}