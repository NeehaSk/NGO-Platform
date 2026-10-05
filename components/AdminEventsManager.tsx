"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EventSchema, type EventInput } from "@/lib/validations";
import { createEventAction, deleteEventAction } from "@/actions/admin-actions";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2 } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface EventItem {
  id: string;
  title: string;
  slug: string;
  location: string;
  eventDate: Date;
  status: "UPCOMING" | "ONGOING" | "COMPLETED" | "CANCELLED";
}

export function AdminEventsManager({ initialEvents }: { initialEvents: EventItem[] }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<EventInput>({
    resolver: zodResolver(EventSchema),
    defaultValues: {
      status: "UPCOMING",
      location: "Vijayawada, Andhra Pradesh",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800",
      eventDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    },
  });

  const onSubmit = async (data: EventInput) => {
    setServerError(null);
    const res = await createEventAction(data);
    if (res.success) {
      setShowAddForm(false);
      reset();
    } else {
      setServerError(res.error || "Failed to create event");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this event?")) {
      await deleteEventAction(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#0F3E36]">Events & Drives</h1>
          <p className="text-xs text-[#64748B]">Schedule and manage community drives in Vijayawada.</p>
        </div>
        <Button
          variant="accent"
          size="sm"
          onClick={() => setShowAddForm(!showAddForm)}
          className="gap-1.5"
        >
          <Plus className="w-4 h-4" /> {showAddForm ? "Cancel" : "New Event"}
        </Button>
      </div>

      {showAddForm && (
        <div className="p-6 bg-white rounded-2xl border border-[#E5DFD7] shadow-xs space-y-4">
          <h3 className="font-bold text-base text-[#0F3E36]">Schedule New Event</h3>
          {serverError && <p className="text-xs text-red-600">{serverError}</p>}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Event Title *"
                placeholder="e.g. Free Eye Screening Camp"
                {...register("title")}
                error={errors.title?.message}
              />
              <Input
                label="Slug *"
                placeholder="e.g. free-eye-screening-camp"
                {...register("slug")}
                error={errors.slug?.message}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input
                label="Date *"
                type="date"
                {...register("eventDate")}
                error={errors.eventDate?.message}
              />
              <Input
                label="Location *"
                placeholder="e.g. Krishna Lanka, Vijayawada"
                {...register("location")}
                error={errors.location?.message}
              />
              <Input
                label="Banner Image URL *"
                placeholder="https://..."
                {...register("image")}
                error={errors.image?.message}
              />
            </div>
            <Textarea
              label="Event Description *"
              rows={4}
              placeholder="Details regarding timing, volunteer slots, services offered..."
              {...register("description")}
              error={errors.description?.message}
            />
            <Button type="submit" variant="primary" isLoading={isSubmitting}>
              Publish Event
            </Button>
          </form>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-[#E5DFD7] p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Event Title</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {initialEvents.map((event) => (
              <TableRow key={event.id}>
                <TableCell className="font-semibold text-[#0F3E36]">{event.title}</TableCell>
                <TableCell className="text-xs text-[#64748B]">{event.location}</TableCell>
                <TableCell className="text-xs text-[#1E293B]">
                  {formatDate(event.eventDate)}
                </TableCell>
                <TableCell>
                  <Badge variant="accent">{event.status}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
