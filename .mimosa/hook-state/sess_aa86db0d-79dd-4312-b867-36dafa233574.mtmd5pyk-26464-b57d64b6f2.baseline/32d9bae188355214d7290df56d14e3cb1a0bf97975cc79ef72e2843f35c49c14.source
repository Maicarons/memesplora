import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Table, Button, Tag, message, Spin, Space } from 'antd'
import { DeleteOutlined, LinkOutlined } from '@ant-design/icons'
import { listShares, deleteShare } from '@/api/client'

export default function SharesPage() {
  const queryClient = useQueryClient()
  const { data: sharesRes, isLoading } = useQuery({ queryKey: ['shares'], queryFn: listShares })
  const shares = sharesRes?.data || []

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteShare(id),
    onSuccess: () => {
      message.success('分享已取消')
      queryClient.invalidateQueries({ queryKey: ['shares'] })
    },
  })

  const columns = [
    { title: '分享链接', dataIndex: 'share_key', key: 'share_key', render: (v: string) => <code>{v}</code> },
    { title: '文件 ID', dataIndex: 'file_id', key: 'file_id' },
    {
      title: '下载限制', dataIndex: 'download_limit', key: 'download_limit',
      render: (v: number) => v === 0 ? '无限制' : `${v} 次`,
    },
    {
      title: '已下载', dataIndex: 'download_count', key: 'download_count',
    },
    {
      title: '密码保护', dataIndex: 'is_password', key: 'is_password',
      render: (v: boolean) => <Tag color={v ? 'orange' : 'default'}>{v ? '是' : '否'}</Tag>,
    },
    {
      title: '创建时间', dataIndex: 'created_at', key: 'created_at',
      render: (v: string) => v?.slice(0, 19).replace('T', ' '),
    },
    {
      title: '操作', key: 'actions',
      render: (_: any, record: any) => (
        <Space>
          <Button type="link" icon={<LinkOutlined />} onClick={() => {
            const url = `${window.location.origin}/share/${record.share_key}`
            navigator.clipboard.writeText(url)
            message.success('链接已复制')
          }}>复制链接</Button>
          <Button type="link" icon={<DeleteOutlined />} danger onClick={() => deleteMutation.mutate(record.id)}>取消分享</Button>
        </Space>
      ),
    },
  ]

  if (isLoading) return <Spin size="large" style={{ display: 'block', margin: '100px auto' }} />

  return (
    <div>
      <h3 style={{ marginBottom: 16 }}>分享管理</h3>
      <Table
        rowKey="id"
        dataSource={shares}
        columns={columns}
        locale={{ emptyText: '暂无分享链接' }}
      />
    </div>
  )
}