export interface EmailCampaign {
  id: string
  name: string
  subject: string
  content: string
  status: "draft" | "scheduled" | "sent"
  scheduledFor?: Date
  sentAt?: Date
  createdAt: Date
  updatedAt: Date
}

export interface EmailTemplate {
  id: string
  name: string
  subject: string
  content: string
  createdAt: Date
  updatedAt: Date
}