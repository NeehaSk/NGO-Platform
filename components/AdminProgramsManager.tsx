"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProgramSchema, type ProgramInput } from "@/lib/validations";
import { createProgramAction, deleteProgramAction } from "@/actions/admin-actions";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, BookOpen } from "lucide-react";
import { formatINR } from "@/lib/utils";

interface ProgramItem {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  targetAmount: number | null;
  raisedAmount: number | null;
  status: string;
}

export function AdminProgramsManager({ initialPrograms }: { initialPrograms: ProgramItem[] }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProgramInput>({
    resolver: zodResolver(ProgramSchema),
    defaultValues: {
      status: "ACTIVE",
      featured: true,
      coverImage: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800",
    },
  });

  const onSubmit = async (data: ProgramInput) => {
    setServerError(null);
    const res = await createProgramAction(data);
    if (res.success) {
      setShowAddForm(false);
      reset();
    } else {
      setServerError(res.error || "Failed to create program");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this program?")) {
      await deleteProgramAction(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#0F3E36]">Manage Programs</h1>
          <p className="text-xs text-[#64748B]">Create, view, and organize community programs.</p>
        </div>
        <Button
          variant="accent"
          size="sm"
          onClick={() => setShowAddForm(!showAddForm)}
          className="gap-1.5"
        >
          <Plus className="w-4 h-4" /> {showAddForm ? "Cancel" : "Add Program"}
        </Button>
      </div>

      {showAddForm && (
        <div className="p-6 bg-white rounded-2xl border border-[#E5DFD7] shadow-xs space-y-4">
          <h3 className="font-bold text-base text-[#0F3E36]">Create New Initiative</h3>
          {serverError && <p className="text-xs text-red-600">{serverError}</p>}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Program Title *"
                placeholder="e.g. Vidya Jyothi Scholarship"
                {...register("title")}
                error={errors.title?.message}
              />
              <Input
                label="URL Slug *"
                placeholder="e.g. vidya-jyothi-scholarship"
                {...register("slug")}
                error={errors.slug?.message}
              />
            </div>
            <Input
              label="Cover Image URL *"
              placeholder="https://images.unsplash.com/..."
              {...register("coverImage")}
              error={errors.coverImage?.message}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Target Amount (₹)"
                type="number"
                placeholder="e.g. 500000"
                {...register("targetAmount")}
              />
              <Input
                label="Beneficiaries Count"
                type="number"
                placeholder="e.g. 250"
                {...register("beneficiaries")}
              />
            </div>
            <Input
              label="Short Summary *"
              placeholder="1-2 sentences summarizing the initiative"
              {...register("shortDescription")}
              error={errors.shortDescription?.message}
            />
            <Textarea
              label="Full Description & Interventions *"
              placeholder="Markdown or paragraphs explaining problem, action, and goals..."
              rows={5}
              {...register("description")}
              error={errors.description?.message}
            />
            <Button type="submit" variant="primary" isLoading={isSubmitting}>
              Publish Program
            </Button>
          </form>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-[#E5DFD7] p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Program</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Target Goal</TableHead>
              <TableHead>Raised</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {initialPrograms.map((prog) => (
              <TableRow key={prog.id}>
                <TableCell className="font-semibold text-[#0F3E36]">{prog.title}</TableCell>
                <TableCell className="font-mono text-xs text-[#64748B]">{prog.slug}</TableCell>
                <TableCell>{prog.targetAmount ? formatINR(prog.targetAmount) : "—"}</TableCell>
                <TableCell className="font-bold text-[#D97736]">
                  {formatINR(prog.raisedAmount || 0)}
                </TableCell>
                <TableCell>
                  <Badge variant="default">{prog.status}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <button
                    onClick={() => handleDelete(prog.id)}
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
