import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Card, Row, Col, Statistic, Button, Modal, Form, Input, InputNumber, Select, message, Spin, Tag, Progress } from 'antd'
import { HddOutlined, PlusOutlined, DeleteOutlined, ExpandOutlined } from '@ant-design/icons'
import { listDevices, listSpaces, createSpace, deleteSpace, resizeSpace } from '@/api/client'

export default function DevicesPage() {
  const queryClient = useQueryClient()
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [resizeModalOpen, setResizeModalOpen] = useState(false)
  const [resizeTarget, setResizeTarget] = useState<any>(null)
  const [form] = Form.useForm()
  const [resizeForm] = Form.useForm()

  const { data: devicesRes, isLoading: loadingDevices } = useQuery({ queryKey: ['devices'], queryFn: listDevices })
  const { data: spacesRes, isLoading: loadingSpaces } = useQuery({ queryKey: ['spaces'], queryFn: listSpaces })

  const devices = devicesRes?.data || []
  const spaces = spacesRes?.data || []

  const createMutation = useMutation({
    mutationFn: (values: any) => createSpace(values),
    onSuccess: () => {
      message.success('空间创建成功')
      setCreateModalOpen(false)
      form.resetFields()
      queryClient.invalidateQueries({ queryKey: ['spaces'] })
    },
    onError: () => message.error('创建失败'),
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteSpace(id),
    onSuccess: () => {
      message.success('空间已删除')
      queryClient.invalidateQueries({ queryKey: ['spaces'] })
    },
  })

  const resizeMutation = useMutation({
    mutationFn: ({ id, newSize }: { id: string; newSize: number }) => resizeSpace(id, newSize),
    onSuccess: () => {
      message.success('空间已扩容')
      setResizeModalOpen(false)
      setResizeTarget(null)
      queryClient.invalidateQueries({ queryKey: ['spaces'] })
    },
  })

  const formatBytes = (bytes: number) => {
    if (!bytes) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  if (loadingDevices || loadingSpaces) return <Spin size="large" style={{ display: 'block', margin: '100px auto' }} />

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <h3>存储设备</h3>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setCreateModalOpen(true)}>创建空间</Button>
      </div>

      <Row gutter={[16, 16]}>
        {devices.map((d: any) => (
          <Col span={8} key={d.id}>
            <Card>
              <Statistic
                title={d.name}
                value={d.healthy ? '正常' : '异常'}
                prefix={<HddOutlined />}
                valueStyle={{ color: d.healthy ? '#3f8600' : '#cf1322' }}
                suffix={<Tag color={d.device_type === 'ram' ? 'blue' : 'purple'}>{d.device_type.toUpperCase()}</Tag>}
              />
              <div style={{ marginTop: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span>容量</span>
                  <span>{formatBytes(d.used_size)} / {formatBytes(d.total_size)}</span>
                </div>
                <Progress percent={Math.round((d.used_size / d.total_size) * 100)} size="small" />
              </div>
              {d.model && <p style={{ color: '#999', fontSize: 12, marginTop: 8 }}>{d.model}</p>}
            </Card>
          </Col>
        ))}
      </Row>

      <h3 style={{ marginTop: 32 }}>存储空间</h3>
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        {spaces.map((s: any) => (
          <Col span={8} key={s.id}>
            <Card
              actions={[
                <ExpandOutlined key="resize" onClick={() => { setResizeTarget(s); resizeForm.setFieldsValue({ new_size: s.total_size }); setResizeModalOpen(true) }} />,
                <DeleteOutlined key="delete" onClick={() => deleteMutation.mutate(s.id)} />,
              ]}
            >
              <Card.Meta
                title={s.name}
                description={s.description || '无描述'}
              />
              <div style={{ marginTop: 16 }}>
                <Tag color={s.status === 'active' ? 'green' : 'orange'}>{s.status === 'active' ? '运行中' : '已停用'}</Tag>
                <span style={{ marginLeft: 8, fontSize: 12, color: '#999' }}>{s.device_type.toUpperCase()}</span>
              </div>
              <div style={{ marginTop: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span>使用量</span>
                  <span>{formatBytes(s.used_size)} / {formatBytes(s.total_size)}</span>
                </div>
                <Progress percent={Math.round((s.used_size / s.total_size) * 100)} size="small" />
              </div>
            </Card>
          </Col>
        ))}
        {spaces.length === 0 && <div style={{ color: '#999', padding: 24 }}>暂无空间，请先创建</div>}
      </Row>

      <Modal title="创建存储空间" open={createModalOpen} onCancel={() => setCreateModalOpen(false)} footer={null}>
        <Form form={form} layout="vertical" onFinish={(values) => createMutation.mutate(values)}>
          <Form.Item name="name" label="空间名称" rules={[{ required: true }]}>
            <Input placeholder="输入空间名称" />
          </Form.Item>
          <Form.Item name="description" label="描述">
            <Input.TextArea placeholder="可选描述" />
          </Form.Item>
          <Form.Item name="total_size" label="大小 (字节)" rules={[{ required: true }]}>
            <InputNumber min={1048576} max={1099511627776} style={{ width: '100%' }} placeholder="至少 1MB" />
          </Form.Item>
          <Form.Item name="device_id" label="存储设备" rules={[{ required: true }]}>
            <Select options={devices.map((d: any) => ({ label: `${d.name} (${formatBytes(d.free_size)} 可用)`, value: d.id }))} />
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={createMutation.isPending} block>创建</Button>
        </Form>
      </Modal>

      <Modal title="调整空间大小" open={resizeModalOpen} onCancel={() => { setResizeModalOpen(false); setResizeTarget(null) }} footer={null}>
        <Form form={resizeForm} layout="vertical" onFinish={(values) => resizeMutation.mutate({ id: resizeTarget.id, newSize: values.new_size })}>
          <Form.Item name="new_size" label="新大小 (字节)" rules={[{ required: true }]}>
            <InputNumber min={resizeTarget?.total_size || 0} max={1099511627776} style={{ width: '100%' }} />
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={resizeMutation.isPending} block>确认调整</Button>
        </Form>
      </Modal>
    </div>
  )
}