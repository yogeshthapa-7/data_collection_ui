import React, { useState, useEffect } from 'react'
import { Input, Row, Col, Spin, message, Typography } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { categoryServerSearch } from '@/services/category.service'
import type { CategoryServerSearchRequest, CategoryItem } from '@/types/category'
import Card from '@/components/ui/card'
import type { CardDetail } from '@/components/ui/card'

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
            value: searchValue,
            regex: false,
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
              ...(category.Description
                ? [{ label: 'Description', value: category.Description }]
                : []),
              {
                label: 'Status',
                value: category.Status ? 'Active' : 'Inactive',
              },
              ...(category.CreatedAt
                ? [{ label: 'Created', value: new Date(category.CreatedAt).toLocaleDateString() }]
                : []),
            ]

            return (
              <Col xs={24} sm={12} md={12} lg={6} key={category.CategoryID}>
                <Card
                  title={category.CategoryName}
                  orderKey={category.CategoryID}
                  details={details}
                  className="h-full"
                />
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
