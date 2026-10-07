import { useState, useEffect } from 'react'
import { Row, Col, Spin, message, Select } from 'antd'
import {
  SearchOutlined,
  FileTextOutlined,
  CopyOutlined,
  QrcodeOutlined,
  LinkOutlined,
  EditOutlined,
  DeleteOutlined,
  RocketOutlined,
  TableOutlined,
} from '@ant-design/icons'
import { fetchCategories, getCategoryGroupSelectList } from '@/features/pages/category/services/category.service'
import type { CategoryItem, CategoryGroupSelectItem } from '@/features/pages/category/types/category'
import Card from '@/shared/components/ui/card'
import type { CardDetail } from '@/shared/components/ui/card'
import CustomButton from '@/shared/components/ui/button'
import InputCustom from '@/shared/components/ui/input'

const Category = () => {
  const [categories, setCategories] = useState<CategoryItem[]>([])
  const [groupOptions, setGroupOptions] = useState<CategoryGroupSelectItem[]>([])
  const [loading, setLoading] = useState(false)
  const [categoryName, setCategoryName] = useState('')
  const [categoryGroup, setCategoryGroup] = useState<number | undefined>()
  const [categoryCode, setCategoryCode] = useState('')

  const loadCategories = async () => {
    setLoading(true)
    try {
      const response = await fetchCategories(1, 10, '')
      setCategories(response.data || [])
    } catch (error: any) {
      const msg = error?.response?.data?.message || error?.message || 'Unknown error'
      message.error(`Failed to fetch categories: ${msg}`)
      console.error('Failed to fetch categories:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCategories()
  }, [])

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await getCategoryGroupSelectList()
        console.log('Category group select list:', response)
        setGroupOptions(response)
      } catch (error) {
        console.error('Failed to fetch category groups', error)
      }
    }
    fetchGroups()
  }, [])

  const handleFilterChange = () => {
    loadCategories()
  }

  return (
    <div className="p-6">

      <Spin spinning={loading}>
        <div className="mb-6 flex flex-wrap items-end gap-4">
          <div className="w-64">
            <label className="mb-1 block text-sm font-bold text-black">Category Name</label>
            <InputCustom
              placeholder="Search by category name"
              value={categoryName}
              onChange={(e) => { setCategoryName(e.target.value); handleFilterChange() }}
            />
          </div>
          <div className="w-64">
            <label className="mb-1 block text-sm font-bold text-black">Category Group</label>
            <Select
              placeholder="Select category group"
              value={categoryGroup}
              onChange={(value) => { setCategoryGroup(value); handleFilterChange() }}
              className="w-full"
              allowClear
            >
              {groupOptions.map((group) => (
                <Select.Option key={group.CategoryGroupID} value={group.CategoryGroupID}>
                  {group.GroupName}
                </Select.Option>
              ))}
            </Select>
          </div>
          <div className="w-64">
            <label className="mb-1 block text-sm font-bold text-black">Category Code</label>
            <InputCustom
              placeholder="Search by category code"
              value={categoryCode}
              onChange={(e) => { setCategoryCode(e.target.value); handleFilterChange() }}
            />
          </div>
          <div className="flex gap-2">
            <CustomButton type="primary" icon={<SearchOutlined />} onClick={handleFilterChange}>
              Search
            </CustomButton>
            <CustomButton onClick={() => { setCategoryName(''); setCategoryGroup(undefined); setCategoryCode(''); setTimeout(handleFilterChange, 0) }}>
              Clear
            </CustomButton>
          </div>
        </div>
        <Row gutter={[16, 16]}>
          {categories.map((category) => {
            const details: CardDetail[] = [
              { label: 'Category Group', value: category.CategoryGroupName },
              { label: 'DB Table Name', value: category.DbTableName },
              ...(category.Description
                ? [{ label: 'Description', value: category.Description }]
                : []),
              ...(category.CreatedAt
                ? [{ label: 'Created', value: new Date(category.CreatedAt).toLocaleDateString() }]
                : []),
            ]

            return (
              <Col xs={24} sm={12} md={12} lg={8} key={category.CategoryID}>
                <Card
                  title={category.CategoryName}
                  details={details}
                className="h-full group"
                action={
                  <CustomButton size="small" type="primary" icon={<FileTextOutlined />}>
                    Open Form
                  </CustomButton>
                }
                >
                  <div className="border-b border-slate-200 my-3" />
                  <div className="grid grid-cols-1 gap-2 transition-all duration-200 max-h-0 overflow-hidden group-hover:max-h-40 opacity-0 group-hover:opacity-100 group-hover:delay-75 delay-0">
                    <Row gutter={[8, 8]}>
                      <Col span={6}>
                        <CustomButton size="small" block icon={<LinkOutlined />}>
                          Copy
                        </CustomButton>
                      </Col>
                      <Col span={6}>
                        <CustomButton size="small" block icon={<QrcodeOutlined />}>
                          QR
                        </CustomButton>
                      </Col>
                      <Col span={6}>
                        <CustomButton size="small" block icon={<CopyOutlined />}>
                          Clone
                        </CustomButton>
                      </Col>
                      <Col span={6}>
                        <CustomButton size="small" block type="primary" icon={<RocketOutlined />}>
                          Deploy
                        </CustomButton>
                      </Col>
                      <Col span={8}>
                        <CustomButton size="small" block icon={<EditOutlined />}>
                          Edit
                        </CustomButton>
                      </Col>
                      <Col span={8}>
                        <CustomButton size="small" block danger icon={<DeleteOutlined />}>
                          Delete
                        </CustomButton>
                      </Col>
                      <Col span={8}>
                        <CustomButton size="small" block icon={<TableOutlined />}>
                          Manage Table
                        </CustomButton>
                      </Col>
                    </Row>
                  </div>
                </Card>
              </Col>
            )
          })}
        </Row>

        {!loading && categories.length === 0 && (
          <div className="py-12 text-center text-slate-400">
            No categories found
          </div>
        )}
      </Spin>
    </div>
  )
}

export default Category
