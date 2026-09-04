import { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  Table, Breadcrumb, Button, Space, Modal, Input, Upload, Dropdown, message, Spin, Tag, Select,
} from 'antd'
import {
  FolderOutlined, FileOutlined, UploadOutlined, DownloadOutlined,
  DeleteOutlined, ShareAltOutlined, EditOutlined, CopyOutlined,
  ScissorOutlined, PlusOutlined, AppstoreOutlined, UnorderedListOutlined,
} from '@ant-design/icons'
import { listFiles, uploadFile, deleteFile, createDir, listSpaces, downloadFile } from '@/api/client'
import { useFileStore } from '@/stores'

export default function FilesPage() {
  const { spaceId } = useParams()
  const queryClient = useQueryClient()
  const { currentSpace, currentPath, setCurrentSpace, setCurrentPath, viewMode, setViewMode } = useFileStore()
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([])
  const [dirModalOpen, setDirModalOpen] = useState(false)
  const [newDirName, setNewDirName] = useState('')
  const [uploadModalOpen, setUploadModalOpen] = useState(false)

  const { data: spacesRes } = useQuery({ queryKey: ['spaces'], queryFn: listSpaces })
  const spaces = spacesRes?.data || []

  const effectiveSpaceId = spaceId || currentSpace || spaces[0]?.id

  useEffect(() => {
    if (spaceId) setCurrentSpace(spaceId)
    else if (spaces.length > 0 && !currentSpace) setCurrentSpace(spaces[0].id)
  }, [spaceId, spaces])

  const { data: filesRes, isLoading } = useQuery({
    queryKey: ['files', effectiveSpaceId, currentPath],
    queryFn: () => listFiles(effectiveSpaceId, currentPath),
    enabled: !!effectiveSpaceId,
  })

  const files = filesRes?.data?.files || []

  const deleteMutation = useMutation({
    mutationFn: (fileId: string) => deleteFile(effectiveSpaceId, fileId),
    onSuccess: () => {
      message.success('删除成功')
      queryClient.invalidateQueries({ queryKey: ['files', effectiveSpaceId] })
    },
  })

  const createDirMutation = useMutation({
    mutationFn: () => createDir(effectiveSpaceId, currentPath + '/' + newDirName),
    onSuccess: () => {
      message.success('目录创建成功')
      setDirModalOpen(false)
      setNewDirName('')
      queryClient.invalidateQueries({ queryKey: ['files', effectiveSpaceId] })
    },
  })

  const handleDownload = async (fileId: string, fileName: string) => {
    try {
      const blob = await downloadFile(effectiveSpaceId, fileId)
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = fileName
      a.click()
      URL.revokeObjectURL(url)
    } catch {
      message.error('下载失败')
    }
  }

  const formatBytes = (bytes: number) => {
    if (!bytes) return '-'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const columns = [
    {
      title: '文件名',
      dataIndex: 'name',
      key: 'name',
      render: (name: string, record: any) => (
        <span
          style={{ cursor: record.type === 'directory' ? 'pointer' : 'default', color: record.type === 'directory' ? '#1677ff' : 'inherit' }}
          onClick={() => {
            if (record.type === 'directory') {
              setCurrentPath(currentPath === '/' ? '/' + name : currentPath + '/' + name)
            }
          }}
        >
          {record.type === 'directory' ? <FolderOutlined style={{ marginRight: 8 }} /> : <FileOutlined style={{ marginRight: 8 }} />}
          {name}
        </span>
      ),
    },
    { title: '大小', dataIndex: 'size', key: 'size', render: (v: number) => formatBytes(v), width: 120 },
    {
      title: '类型', dataIndex: 'type', key: 'type', width: 80,
      render: (v: string) => <Tag>{v === 'file' ? '文件' : '目录'}</Tag>,
    },
    {
      title: '修改时间', dataIndex: 'modified_at', key: 'modified_at', width: 180,
      render: (v: string) => v?.slice(0, 19).replace('T', ' '),
    },
    {
      title: '操作', key: 'actions', width: 200,
      render: (_: any, record: any) => (
        <Space>
          {record.type === 'file' && (
            <Button type="link" size="small" icon={<DownloadOutlined />} onClick={() => handleDownload(record.id, record.name)}>下载</Button>
          )}
          <Button type="link" size="small" icon={<DeleteOutlined />} danger onClick={() => deleteMutation.mutate(record.id)}>删除</Button>
        </Space>
      ),
    },
  ]

  const breadcrumbItems = [
    { title: <a onClick={() => setCurrentPath('/')}>我的文件</a> },
    ...currentPath.split('/').filter(Boolean).map((part, i, arr) => ({
      title: i < arr.length - 1
        ? <a onClick={() => setCurrentPath('/' + arr.slice(0, i + 1).join('/'))}>{part}</a>
        : part,
    })),
  ]

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <Space>
          <Select
            value={effectiveSpaceId}
            onChange={(val) => { setCurrentSpace(val); setCurrentPath('/') }}
            style={{ width: 200 }}
            options={spaces.map((s: any) => ({ label: s.name, value: s.id }))}
          />
          <Breadcrumb items={breadcrumbItems} />
        </Space>
        <Space>
          <Button icon={<PlusOutlined />} onClick={() => setDirModalOpen(true)}>新建文件夹</Button>
          <Button icon={<UploadOutlined />} onClick={() => setUploadModalOpen(true)}>上传文件</Button>
          <Button
            icon={viewMode === 'list' ? <AppstoreOutlined /> : <UnorderedListOutlined />}
            onClick={() => setViewMode(viewMode === 'list' ? 'grid' : 'list')}
          />
        </Space>
      </div>

      <Spin spinning={isLoading}>
        <Table
          rowKey="id"
          dataSource={files}
          columns={columns}
          pagination={false}
          rowSelection={{
            selectedRowKeys,
            onChange: (keys) => setSelectedRowKeys(keys as string[]),
          }}
          locale={{ emptyText: '此目录为空' }}
        />
      </Spin>

      <Modal
        title="新建文件夹"
        open={dirModalOpen}
        onOk={() => createDirMutation.mutate()}
        onCancel={() => setDirModalOpen(false)}
        confirmLoading={createDirMutation.isPending}
      >
        <Input
          placeholder="文件夹名称"
          value={newDirName}
          onChange={(e) => setNewDirName(e.target.value)}
          onPressEnter={() => createDirMutation.mutate()}
        />
      </Modal>

      <Modal
        title="上传文件"
        open={uploadModalOpen}
        onCancel={() => setUploadModalOpen(false)}
        footer={null}
      >
        <Upload.Dragger
          multiple
          directory
          showUploadList
          customRequest={async ({ file, onSuccess, onError }) => {
            try {
              await uploadFile(effectiveSpaceId, currentPath, file as File)
              message.success(`${(file as File).name} 上传成功`)
              onSuccess?.(null)
              queryClient.invalidateQueries({ queryKey: ['files', effectiveSpaceId] })
            } catch (err) {
              onError?.(err as Error)
              message.error(`${(file as File).name} 上传失败`)
            }
          }}
        >
          <p className="ant-upload-drag-icon"><UploadOutlined /></p>
          <p>点击或拖拽文件到此处上传</p>
        </Upload.Dragger>
      </Modal>
    </div>
  )
}