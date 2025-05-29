import { SettingsForm } from './_components/settings-form'

import React from 'react'

export const metadata ={
    title: "Veylo | Admin Settings",
    description: "Manage Settings in Veylo Admin Dashboard",
}

const SettingsPage = () => {
  return (
     <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      <SettingsForm />
    </div>
  )
}

export default SettingsPage