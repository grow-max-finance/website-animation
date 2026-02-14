"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface DeleteSubscriberButtonProps {
  id: string;
  email: string;
}

export function DeleteSubscriberButton({ id, email }: DeleteSubscriberButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete subscriber: ${email}?`)) {
      return;
    }

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/newsletter/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete subscriber");
      }

      router.refresh();
    } catch (error) {
      console.error("Error deleting subscriber:", error);
      alert("Failed to delete subscriber");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleDelete}
      disabled={isDeleting}
      className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );
}
