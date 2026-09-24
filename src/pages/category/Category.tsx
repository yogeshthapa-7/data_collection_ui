import React, { useState, useEffect } from 'react'
import { Input, Row, Col, Spin, message, Typography } from 'antd'
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
import { categoryServerSearch } from '@/services/category.service'
import type { CategoryServerSearchRequest, CategoryItem } from '@/types/category'
import Card from '@/components/ui/card'
import type { CardDetail } from '@/components/ui/card'
import CustomButton from '@/components/ui/button'

const { Title } = Typography
const { Search } = Input

const Category = () => {
  const [categories, setCategories] = useState<CategoryItem[]>([])
  const [loading, setLoading] = useState(false)
  const [searchText, setSearchText] = useState('')

  const fetchCategories = async (searchValue: string = '') => {
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

  const handleSearch = (value: string) => {
    setSearchText(value)
    fetchCategories(value)
  }

  return (
    <div className="p-6">

      <Spin spinning={loading}>
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
