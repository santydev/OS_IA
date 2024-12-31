"use client";

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CalendarEvent } from '../types';
import { Plus } from 'lucide-react';

interface EventDialogProps {
  onSave: (event: Partial<CalendarEvent>) => void;
  defaultDate?: Date;
}

export function EventDialog({ onSave, defaultDate }: EventDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: defaultDate?.toISOString().slice(0, 16) || '',
    endDate: defaultDate?.toISOString().slice(0, 16) || '',
    location: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      startDate: new Date(formData.startDate),
      endDate: new Date(formData.endDate),
      status: 'scheduled'
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-1" />
          New Event
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Event</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startDate">Start</Label>
              <Input
                id="startDate"
                type="datetime-local"
                value={formData.startDate}
                onChange={e => setFormData({ ...formData, startDate: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="endDate">End</Label>
              <Input
                id="endDate"
                type="datetime-local"
                value={formData.endDate}
                onChange={e => setFormData({ ...formData, endDate: e.target.value })}
                required
              />
            </div>
          </div>
          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={e => setFormData({ ...formData, location: e.target.value })}
            />
          </div>
          <Button type="submit" className="w-full">Create Event</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}