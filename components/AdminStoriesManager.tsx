"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { StorySchema, type StoryInput } from "@/lib/validations";
import { createStoryAction, deleteStoryAction } from "@/actions/admin-actions";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Plus, Trash2 } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface StoryItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: string | null;
  published: boolean;
  publishedAt: Date;
}

export function AdminStoriesManager({ initialStories }: { initialStories: StoryItem[] }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<StoryInput>({
    resolver: zodResolver(StorySchema),
    defaultValues: {
      published: true,
      author: "Trust Field Team",
      image: "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800",
    },
  });

  const onSubmit = async (data: StoryInput) => {
    setServerError(null);
    const res = await createStoryAction(data);
    if (res.success) {
      setShowAddForm(false);
      reset();
    } else {
      setServerError(res.error || "Failed to publish story");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this beneficiary story?")) {
      await deleteStoryAction(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#0F3E36]">Beneficiary Stories</h1>
          <p className="text-xs text-[#64748B]">Publish and curate community success stories.</p>
        </div>
        <Button
          variant="accent"
          size="sm"
          onClick={() => setShowAddForm(!showAddForm)}
          className="gap-1.5"
        >
          <Plus className="w-4 h-4" /> {showAddForm ? "Cancel" : "New Story"}
        </Button>
      </div>

      {showAddForm && (
        <div className="p-6 bg-white rounded-2xl border border-[#E5DFD7] shadow-xs space-y-4">
          <h3 className="font-bold text-base text-[#0F3E36]">Write Beneficiary Story</h3>
          {serverError && <p className="text-xs text-red-600">{serverError}</p>}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Story Title *"
                placeholder="e.g. Higher Education for Laxmi"
                {...register("title")}
                error={errors.title?.message}
              />
              <Input
                label="Slug *"
                placeholder="e.g. higher-education-for-laxmi"
                {...register("slug")}
                error={errors.slug?.message}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Image URL *"
                placeholder="https://images.unsplash.com/..."
                {...register("image")}
                error={errors.image?.message}
              />
              <Input label="Author / Reporter" {...register("author")} />
            </div>
            <Input
              label="Excerpt (Summary) *"
              placeholder="Brief summary of the transformation"
              {...register("excerpt")}
              error={errors.excerpt?.message}
            />
            <Textarea
              label="Story Narrative *"
              rows={6}
              placeholder="Detailed story of the beneficiary..."
              {...register("content")}
              error={errors.content?.message}
            />
            <Button type="submit" variant="primary" isLoading={isSubmitting}>
              Publish Story
            </Button>
          </form>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-[#E5DFD7] p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Published Date</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {initialStories.map((story) => (
              <TableRow key={story.id}>
                <TableCell className="font-semibold text-[#0F3E36]">{story.title}</TableCell>
                <TableCell className="text-xs text-[#64748B]">{story.author}</TableCell>
                <TableCell className="text-xs text-[#64748B]">
                  {formatDate(story.publishedAt)}
                </TableCell>
                <TableCell className="text-right">
                  <button
                    onClick={() => handleDelete(story.id)}
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
