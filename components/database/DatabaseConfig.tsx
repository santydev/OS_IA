"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

interface DatabaseConfig {
  host: string
  port: string
  database: string
  username: string
  password: string
}

export function DatabaseConfig({ onConnect }: { onConnect: (config: DatabaseConfig) => void }) {
  const [config, setConfig] = useState<DatabaseConfig>({
    host: "ba3206382-001.eu.clouddb.ovh.net",
    port: "35197",
    database: "Jarvis",
    username: "Jarvis",
    password: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onConnect(config)
  }

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Database Configuration</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="host">Host</Label>
          <Input
            id="host"
            value={config.host}
            onChange={(e) => setConfig({ ...config, host: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="port">Port</Label>
          <Input
            id="port"
            value={config.port}
            onChange={(e) => setConfig({ ...config, port: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="database">Database</Label>
          <Input
            id="database"
            value={config.database}
            onChange={(e) => setConfig({ ...config, database: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            value={config.username}
            onChange={(e) => setConfig({ ...config, username: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={config.password}
            onChange={(e) => setConfig({ ...config, password: e.target.value })}
            required
          />
        </div>
        <Button type="submit" className="w-full">Connect</Button>
      </form>
    </Card>
  )
}