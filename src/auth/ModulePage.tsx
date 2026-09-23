import React from 'react'
import { Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import { DatabaseOutlined, ProjectOutlined } from '@ant-design/icons'
import PageLayout from '@/components/layout/PageLayout'
import ModuleCard from '@/components/ui/ModuleCard'
import datacollectionimg from '@/assets/images/data_collection.jpg'
import projectmanagementimg from '@/assets/images/project_management.png'

const { Title, Text } = Typography

const ModulePage = () => {
  const navigate = useNavigate()

  return (
    <PageLayout>
      <div className="min-h-[calc(100vh-5rem)] w-full py-12 px-4 sm:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-14 flex flex-col items-center text-center">
            <span className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
              Work Smarter • Collect Better • Build Together
            </span>
            <Title level={2} className="!text-slate-800 !mb-4 !md:text-5xl">
              Select a{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">
                Module
              </span>
            </Title>
            <Text className="mb-6 max-w-2xl text-sm font-medium leading-relaxed text-slate-500 md:text-base">
              Choose the module that fits your workflow and start making an impact with real-time data and powerful tools.
            </Text>
            <div className="h-1.5 w-16 rounded-full bg-gradient-to-r from-blue-500 to-indigo-400" />
          </div>

          {/* Modules */}
          <div className="flex flex-col gap-6 md:gap-8">
            {/* Data Collection - Text Card Left, Image Right */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
              <ModuleCard
                title="Data Collection"
                subtitle="Module 01"
                description="Easily manage and collect dynamic data forms with a user-friendly interface. Design, deploy, and monitor responses in real time with powerful analytics and validation tools."
                icon={<DatabaseOutlined className="text-xl" />}
                imageSrc={datacollectionimg}
                imageAlt="Data Collection Interface"
                buttonText="Open Module"
                onAction={() => navigate('/category')}
                accentColor="#4F46E5"
                bulletPoints={[
                  'Dynamic form builder',
                  'Customizable templates',
                  'Real-time data monitoring',
                  'Export & reporting',
                  'Data validation & error handling',
                  'Secure and reliable',
                ]}
              />

              {/* Image Card */}
              <div className="group relative hidden overflow-hidden rounded-3xl md:block">
                <img
                  src={datacollectionimg}
                  alt="Data Collection Interface"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>

            {/* Project Management - Image Left, Text Right */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
              {/* Image Card */}
              <div className="group relative hidden overflow-hidden rounded-3xl md:block">
                <img
                  src={projectmanagementimg}
                  alt="Project Management Interface"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <ModuleCard
                title="Project Management"
                subtitle="Module 02"
                description="Track projects, milestones, and team progress with ease. Keep your tasks organized, align your team, and stay on schedule with real-time updates and insightful reports."
                icon={<ProjectOutlined className="text-xl" />}
                imageSrc={projectmanagementimg}
                imageAlt="Project Management Interface"
                buttonText="Open Module"
                onAction={() => { window.location.href = 'https://projectmanagement.himalayankasturi.com.np/' }}
                accentColor="#10B981"
                bulletPoints={[
                  'Project & milestone tracking',
                  'Department & branch support',
                  'Task & subtask management',
                  'Progress analytics',
                  'Team collaboration',
                  'Audit logs & activity history',
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

export default ModulePage