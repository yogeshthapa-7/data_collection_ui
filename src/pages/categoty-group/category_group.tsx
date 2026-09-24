import React, { useState, useEffect } from 'react'
import { Input, Row, Col, Spin, message, Typography } from 'antd'
import { SearchOutlined, HomeOutlined, CarryOutOutlined, HeartOutlined, ToolOutlined, BookOutlined, PhoneOutlined, DeleteOutlined, ApartmentOutlined, ShoppingOutlined } from '@ant-design/icons'
import { categoryGroupServerSearch } from '@/services/category.service'
import type {
  CategoryGroupServerSearchRequest,
  CategoryGroupItem,
} from '@/types/category'
import Card from '@/components/ui/card'
import CustomButton from '@/components/ui/button'

const { Title } = Typography
const { Search } = Input

const iconMap: Record<string, React.ReactNode> = {
  'fa fa-home': <HomeOutlined />,
  'fa fa-road': <CarryOutOutlined />,
  'fa fa-address-book': <HeartOutlined />,
  'fa fa-address-book-o': <PhoneOutlined />,
  'fa fa-adn': <ToolOutlined />,
  'fa fa-500px': <BookOutlined />,
  'fa fa-building': <ApartmentOutlined />,
  'fa fa-shopping-cart': <ShoppingOutlined />,
}

const CategoryGroup = () => {
  const [groups, setGroups] = useState<CategoryGroupItem[]>([])
  const [loading, setLoading] = useState(false)
  const [searchText, setSearchText] = useState('')

  const getIcon = (icon?: string) => {
    if (!icon) return <HomeOutlined />
    return iconMap[icon] || <HomeOutlined />
  }

  const fetchGroups = async (searchValue: string = '') => {
    setLoading(true)
    try {
      const payload: CategoryGroupServerSearchRequest = {
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
          CategoryGroupID: 0,
        },
      }

      const response = await categoryGroupServerSearch(payload)
      setGroups(response.data || [])
    } catch (error) {
      message.error('Failed to fetch category groups')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchGroups()
  }, [])

  const handleSearch = (value: string) => {
    setSearchText(value)
    fetchGroups(value)
  }

  return (
    <div className="p-6">

      <Spin spinning={loading}>
        <Row gutter={[16, 16]}>
          {groups.map((group) => {
            return (
              <Col xs={24} sm={12} md={12} lg={8} key={group.CategoryGroupID}>
                <Card
                  title={group.GroupName}
                  className="h-full"
                  action={getIcon(group.Icon)}
                >
                  <div className="border-b border-slate-200 my-3" />
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">समूहको नाम:</span>
                      <span className="text-sm font-medium text-slate-800">{group.GroupName}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">समूह कोड:</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-slate-800">{group.GroupCode}</span>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 pt-2">
                      <CustomButton size="small" style={{ backgroundColor: '#389e0d', borderColor: '#389e0d', color: 'white' }}>
                        Edit
                      </CustomButton>
                      <CustomButton size="small" danger>
                        Delete
                      </CustomButton>
                    </div>
                  </div>
                </Card>
              </Col>
            )
          })}
        </Row>

        {!loading && groups.length === 0 && (
          <div className="py-12 text-center text-slate-400">
            No category groups found
          </div>
        )}
      </Spin>
    </div>
  )
}

export default CategoryGroup
