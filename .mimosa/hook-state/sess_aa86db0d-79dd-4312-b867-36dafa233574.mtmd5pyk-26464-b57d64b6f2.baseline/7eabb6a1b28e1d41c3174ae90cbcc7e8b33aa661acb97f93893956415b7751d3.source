import { useQuery } from '@tanstack/react-query'
import { Row, Col, Card, Statistic, Table, Tag, Spin } from 'antd'
import { HddOutlined, FolderOutlined, FileOutlined, LinkOutlined } from '@ant-design/icons'
import { listSpaces, listDevices, listFiles } from '@/api/client'

export default function DashboardPage() {
  const { data: spacesRes, isLoading: loadingSpaces } = useQuery({
    queryKey: ['spaces'],
    queryFn: listSpaces,
  })

  const { data: devicesRes, isLoading: loadingDevices } = useQuery({
    queryKey: ['devices'],
    queryFn: listDevices,
  })

  const spaces = spacesRes?.data || []
  const devices = devicesRes?.data || []

  const totalStorage = spaces.reduce((sum: number, s: any) => sum + (s.total_size || 0), 0)
  const usedStorage = spaces.reduce((sum: number, s: any) => sum + (s.used_size || 0), 0)

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const recentFilesColumns = [
    { title: '文件名', dataIndex: 'name', key: 'name' },
    { title: '大小', dataIndex: 'size', key: 'size', render: (v: number) => formatBytes(v) },
    { title: '类型', dataIndex: 'type', key: 'type', render: (v: string) => <Tag>{v === 'file' ? '文件' : '目录'}</Tag> },
    { title: '修改时间', dataIndex: 'modified_at', key: 'modified_at', render: (v: string) => v?.slice(0, 19).replace('T', ' ') },
  ]

  if (loadingSpaces || loadingDevices) return <Spin size="large" style={{ display: 'block', margin: '100px auto' }} />

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card><Statistic title="存储空间" value={spaces.length} prefix={<HddOutlined />} suffix="个" /></Card>
        </Col>
        <Col span={6}>
          <Card><Statistic title="总容量" value={formatBytes(totalStorage)} prefix={<FolderOutlined />} /></Card>
        </Col>
        <Col span={6}>
          <Card><Statistic title="已用空间" value={formatBytes(usedStorage)} prefix={<FileOutlined />} /></Card>
        </Col>
        <Col span={6}>
          <Card><Statistic title="存储设备" value={devices.length} prefix={<LinkOutlined />} suffix="个" /></Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col span={12}>
          <Card title="存储设备状态">
            {devices.map((d: any) => (
              <div key={d.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
                <span>{d.name} ({d.device_type})</span>
                <span>
                  <Tag color={d.healthy ? 'green' : 'red'}>{d.healthy ? '正常' : '异常'}</Tag>
                  {formatBytes(d.free_size)} / {formatBytes(d.total_size)}
                </span>
              </div>
            ))}
            {devices.length === 0 && <div style={{ color: '#999' }}>暂无设备</div>}
          </Card>
        </Col>
        <Col span={12}>
          <Card title="快速操作">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <a href="/devices" style={{ color: '#1677ff' }}>→ 创建新存储空间</a>
              <a href="/files" style={{ color: '#1677ff' }}>→ 进入文件管理</a>
              <a href="/shares" style={{ color: '#1677ff' }}>→ 查看分享链接</a>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  )
}