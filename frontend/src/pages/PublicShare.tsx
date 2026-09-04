import { useParams, useSearchParams } from 'react-router-dom'
import { useState } from 'react'
import { Card, Button, Input, message, Typography, Spin, Result } from 'antd'
import { DownloadOutlined, LockOutlined } from '@ant-design/icons'
import axios from 'axios'

const { Title, Paragraph } = Typography

export default function PublicSharePage() {
  const { key } = useParams<{ key: string }>()
  const [searchParams] = useSearchParams()
  const [password, setPassword] = useState(searchParams.get('password') || '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleDownload = async () => {
    setLoading(true)
    setError('')
    try {
      const params: any = {}
      if (password) params.password = password
      const response = await axios.get(`/api/v3/share/${key}/download`, {
        params,
        responseType: 'blob',
      })
      const disposition = response.headers['content-disposition']
      let filename = 'download'
      if (disposition) {
        const match = disposition.match(/filename="?(.+?)"?$/)
        if (match) filename = match[1]
      }
      const url = URL.createObjectURL(response.data)
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      a.click()
      URL.revokeObjectURL(url)
      message.success('下载成功')
    } catch (err: any) {
      const msg = err.response?.data?.message || '下载失败'
      setError(msg)
      message.error(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f5f5f5' }}>
      <Card style={{ width: 480, textAlign: 'center' }}>
        <Title level={3} style={{ color: '#1677ff' }}>Memesplora</Title>
        <Title level={4}>文件分享</Title>
        <Paragraph type="secondary">分享链接: {key}</Paragraph>

        <div style={{ margin: '24px 0' }}>
          <Input
            prefix={<LockOutlined />}
            placeholder="输入分享密码（如有）"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginBottom: 16 }}
          />
          <Button
            type="primary"
            icon={<DownloadOutlined />}
            size="large"
            block
            loading={loading}
            onClick={handleDownload}
          >
            下载文件
          </Button>
        </div>

        {error && (
          <Result
            status="error"
            title="下载失败"
            subTitle={error}
          />
        )}
      </Card>
    </div>
  )
}