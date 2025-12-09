"use client";

import { useState } from "react";
import { Plus, Search, Filter, Edit, Trash2, Mail, Phone, UserCheck, UserX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";

// Mock data (replace with API fetch)
const initialReps: Rep[] = [
  { id: "1", name: "John", email: "john@example.com", phone: "123", role: "SDR", team: "Team A" },
  { id: "2", name: "Alice", email: "alice@example.com", phone: "456", role: "AE", team: "Team B" },
  { id: "3", name: "Bob", email: "bob@example.com", phone: "789", role: "Manager", team: "Team C" },
  
];


const repSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Phone is required"),
  role: z.enum(["SDR", "AE", "Manager"]),
  team: z.string().min(1, "Team is required"),
});

type Rep = z.infer<typeof repSchema> & { id: string; status: "active" | "inactive" };

export default function RepsPage() {
  const [reps, setReps] = useState<Rep[]>(initialReps);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<string[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const form = useForm<z.infer<typeof repSchema>>({
    resolver: zodResolver(repSchema),
    defaultValues: { name: "", email: "", phone: "", role: "SDR", team: "" },
  });

  const filteredReps = reps.filter((rep) => {
    const matchesSearch = rep.name.toLowerCase().includes(search.toLowerCase()) || rep.email.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || rep.status === filter;
    return matchesSearch && matchesFilter;
  });

  const handleEdit = (rep: Rep) => {
    setEditingId(rep.id);
    form.reset(rep);
  };

  const handleSave = (data: z.infer<typeof repSchema>) => {
    if (editingId) {
      setReps(reps.map((r) => (r.id === editingId ? { ...r, ...data } : r)));
    } else {
      setReps([...reps, { id: Date.now().toString(), status: "active", ...data }]);
    }
    setEditingId(null);
    setIsAddOpen(false);
    form.reset();
  };

  const handleBulkAction = (action: "activate" | "deactivate" | "delete") => {
    setReps(reps.filter((r) => !selected.includes(r.id)));
    setSelected([]);
  };

  const StatusBadge = ({ status }: { status: Rep["status"] }) => (
    <Badge variant={status === "active" ? "default" : "secondary"} className={cn(status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800")}>
      {status === "active" ? <UserCheck className="w-3 h-3 mr-1" /> : <UserX className="w-3 h-3 mr-1" />}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900 p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Sales Reps Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Manage your sales team members, roles, and activity status.</p>
          </div>
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg">
                <Plus className="w-4 h-4 mr-2" /> Add Rep
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md rounded-2xl">
              <DialogHeader>
                <DialogTitle>{editingId ? "Edit Rep" : "Add New Rep"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={form.handleSubmit(handleSave)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" {...form.register("name")} />
                  {form.formState.errors.name && <p className="text-red-500 text-sm">{form.formState.errors.name.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" {...form.register("email")} />
                  {form.formState.errors.email && <p className="text-red-500 text-sm">{form.formState.errors.email.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" {...form.register("phone")} />
                  {form.formState.errors.phone && <p className="text-red-500 text-sm">{form.formState.errors.phone.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select onValueChange={(v) => form.setValue("role", v as any)} defaultValue={form.watch("role")}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SDR">SDR</SelectItem>
                      <SelectItem value="AE">AE</SelectItem>
                      <SelectItem value="Manager">Manager</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="team">Team</Label>
                  <Input id="team" {...form.register("team")} />
                  {form.formState.errors.team && <p className="text-red-500 text-sm">{form.formState.errors.team.message}</p>}
                </div>
                <div className="flex justify-end space-x-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => { setIsAddOpen(false); setEditingId(null); form.reset(); }}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-gradient-to-r from-blue-600 to-purple-600">
                    Save
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6 items-center justify-between bg-white/80 backdrop-blur-xl rounded-2xl p-4 shadow-lg border border-white/50">
        <div className="flex items-center gap-2 flex-1 max-w-md">
          <Search className="w-4 h-4 text-gray-500" />
          <Input
            placeholder="Search reps by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-none bg-transparent"
          />
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Filter className="w-4 h-4 text-gray-500" />
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-auto border-none bg-transparent">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {selected.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">{selected.length} selected</span>
              <Button variant="outline" size="sm" onClick={() => handleBulkAction("delete")}>
                <Trash2 className="w-4 h-4 mr-1" /> Delete
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleBulkAction("activate")}>
                Activate
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th className="p-4 text-left text-sm font-semibold text-gray-700">
                  <input type="checkbox" onChange={(e) => setSelected(e.target.checked ? reps.map(r => r.id) : [])} />
                </th>
                <th className="p-4 text-left text-sm font-semibold text-gray-700">Name</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-700">Email</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-700">Phone</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-700">Role</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-700">Team</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredReps.map((rep) => (
                <tr key={rep.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selected.includes(rep.id)}
                      onChange={(e) => setSelected(e.target.checked ? [...selected, rep.id] : selected.filter(id => id !== rep.id))}
                    />
                  </td>
                  <td className="p-4">
                    <div className="font-medium text-gray-900 flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm">
                        {rep.name.charAt(0)}
                      </div>
                      <span className="cursor-pointer hover:text-blue-600" onClick={() => handleEdit(rep)}>
                        {editingId === rep.id ? (
                          <Input {...form.register("name")} className="w-32" />
                        ) : (
                          rep.name
                        )}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      {editingId === rep.id ? (
                        <Input {...form.register("email")} className="w-48" />
                      ) : (
                        <a href={`mailto:${rep.email}`} className="text-blue-600 hover:underline">{rep.email}</a>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      {rep.phone}
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge variant="outline">{rep.role}</Badge>
                  </td>
                  <td className="p-4">{rep.team}</td>
                  <td className="p-4">
                    <StatusBadge status={rep.status} />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(rep)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleBulkAction("delete")}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredReps.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No reps found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}