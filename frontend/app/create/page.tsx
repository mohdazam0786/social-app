"use client";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send, PenTool } from "lucide-react";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

export default function CreatePost() {
  const { token } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      toast.error("Please fill in both title and description.");
      return;
    }

    try {
      setIsSubmitting(true);
      await axios.post(
        "http://localhost:4000/posts/create",
        { title, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Post created successfully!");
      router.push("/"); // timeline ya home
    } catch (err) {
      console.error(err);
      toast.error("Failed to create post. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 flex justify-center items-center">
            <PenTool className="mr-3 h-8 w-8 text-blue-600" />
            Create Post
          </h1>
          <p className="text-gray-600 mt-2">Share your thoughts with the community</p>
        </div>

        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-xl">What's on your mind?</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreate} className="space-y-6">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Give your post a catchy title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  maxLength={100}
                  className="mt-1 rounded-lg border-gray-200 focus:border-blue-400 focus:ring-blue-400"
                />
                <p className="text-xs text-gray-500 mt-1">{title.length}/100 characters</p>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Share your story, thoughts, or experience..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  maxLength={500}
                  className="mt-1 rounded-lg border-gray-200 focus:border-blue-400 focus:ring-blue-400 min-h-32 resize-none"
                />
                <p className="text-xs text-gray-500 mt-1">{description.length}/500 characters</p>
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/")}
                  className="flex-1 rounded-lg"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting || !title.trim() || !description.trim()}
                  className="flex-1 rounded-lg bg-blue-600 hover:bg-blue-700"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Publishing...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Publish Post
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
