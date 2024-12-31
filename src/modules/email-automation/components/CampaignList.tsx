"use client"

import { Card } from "@/components/ui/card"
import { useEmailCampaigns } from "../hooks/useEmailCampaigns"

export function CampaignList() {
  const { campaigns, isLoading } = useEmailCampaigns()

  if (isLoading) {
    return <div>Loading campaigns...</div>
  }

  return (
    <div className="grid gap-4">
      {campaigns?.map((campaign) => (
        <Card key={campaign.id} className="p-4">
          <h3 className="font-semibold">{campaign.name}</h3>
          <p className="text-sm text-muted-foreground">{campaign.subject}</p>
          <div className="mt-2">
            <span className="text-xs bg-secondary px-2 py-1 rounded">
              {campaign.status}
            </span>
          </div>
        </Card>
      ))}
    </div>
  )
}