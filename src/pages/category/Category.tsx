import React, { useState, useEffect } from 'react'
import { Input, Row, Col, Spin, message, Typography, Select } from 'antd'
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
import { categoryServerSearch, getCategoryGroupSelectList } from '@/services/category.service'
import type { CategoryServerSearchRequest, CategoryItem, CategoryGroupSelectItem } from '@/types/category'
import Card from '@/components/ui/card'
import type { CardDetail } from '@/components/ui/card'
import CustomButton from '@/components/ui/button'
import InputCustom from '@/components/ui/input'

const { Title } = Typography
const { Search } = Input
const { Option } = Select

const Category = () => {
  const [categories, setCategories] = useState<CategoryItem[]>([])
  const [groupOptions, setGroupOptions] = useState<CategoryGroupSelectItem[]>([])
  const [loading, setLoading] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [categoryName, setCategoryName] = useState('')
  const [categoryGroup, setCategoryGroup] = useState<number | undefined>()
  const [categoryCode, setCategoryCode] = useState('')

  const fetchCategories = async () => {
    setLoading(true)
    try {
      const payload: CategoryServerSearchRequest = {
        model: {
          draw: 1,
          start: 0,
          length: 10,
          search: {
            value: "",
            regex: "",
          },
        },
        param: {
          CategoryID: 0,
        },
      }

      const response = await categoryServerSearch(payload)
      setCategories(response.data || [])
    } catch (error) {
      message.error('Failed to fetch categories')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const data = await getCategoryGroupSelectList()
        console.log('Category group select list:', data)
        setGroupOptions(data || [])
      } catch (error) {
        console.error('Failed to fetch category groups', error)
      }
    }
    fetchGroups()
  }, [])

  const handleSearch = (value: string) => {
    setSearchText(value)
    fetchCategories()
  }

  const handleFilterChange = () => {
    fetchCategories()
  }

  return (
    <div className="p-6">

      <Spin spinning={loading}>
        <div className="mb-6 flex flex-wrap items-end gap-4">
          <div className="w-64">
            <label className="mb-1 block text-sm font-bold text-slate-700">Category Name</label>
            <InputCustom
              placeholder="Search by category name"
              value={categoryName}
              onChange={(e) => { setCategoryName(e.target.value); handleFilterChange() }}
            />
          </div>
          <div className="w-64">
            <label className="mb-1 block text-sm font-medium text-slate-700">Category Group</label>
            <Select
              placeholder="Select category group"
              value={categoryGroup}
              onChange={(value) => { setCategoryGroup(value); handleFilterChange() }}
              className="w-full"
              allowClear
            >
              {groupOptions.map((group) => (
                <Option key={group.CategoryGroupID} value={group.CategoryGroupID}>
                  {group.GroupName}
                </Option>
              ))}
            </Select>
          </div>
          <div className="w-64">
            <label className="mb-1 block text-sm font-medium text-slate-700">Category Code</label>
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
