"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert } from "@/components/ui/alert"
import { Key } from "lucide-react"

const apiKeySchema = z.object({
  openaiKey: z.string().min(1, "OpenAI API key is required"),
  openaiOrg: z.string().optional(),
})

type ApiKeyForm = z.infer<typeof apiKeySchema>

export function ApiKeyForm() {
  const [success, setSuccess] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<ApiKeyForm>({
    resolver: zodResolver(apiKeySchema),
  })

  const onSubmit = async (data: ApiKeyForm) => {
    try {
      const response = await fetch("/api/settings/api-keys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          openaiKey: data.openaiKey,
          openaiOrg: data.openaiOrg,
        }),
      })

      if (response.ok) {
        setSuccess(true)
      }
    } catch (error) {
      console.error("Failed to save API keys:", error)
    }
  }

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Key className="h-5 w-5" />
        <h2 className="text-lg font-semibold">API Keys</h2>
      </div>

      {success && (
        <Alert className="mb-4 bg-green-50 text-green-700">
          API keys saved successfully
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="openaiKey">OpenAI API Key</Label>
          <Input
            id="openaiKey"
            type="password"
            {...register("openaiKey")}
          />
          {errors.openaiKey && (
            <p className="text-sm text-red-500">{errors.openaiKey.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="openaiOrg">
            OpenAI Organization ID (Optional)
          </Label>
          <Input
            id="openaiOrg"
            {...register("openaiOrg")}
          />
        </div>

        <Button type="submit">Save API Keys</Button>
      </form>
    </Card>
  )
}