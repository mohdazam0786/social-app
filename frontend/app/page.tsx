"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { RefreshCw, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import PostCard from "@/components/PostCard";

interface Post {
  id: string;
  title: string;
  description: string;
  author: string;
  timestamp: string;
  likes: number;
}

export default function Timeline() {
  const { token } = useAuth();
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchPosts = async () => {
    try {
      if (!token) return;
      const res = await axios.get("http://localhost:4000/posts/timeline", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res);
      const mappedPosts = res.data.map((post: any) => ({
        id: post._id,
        title: post.title,
        description: post.description,
        author: post.userId.username,
        timestamp: post.timestamp,
        likes: post.likes,
      }));
      console.log(mappedPosts);
      setPosts(mappedPosts);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    if (!token) {
      router.push("/login");
    } else {
      fetchPosts();
    }
  }, [token, router]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchPosts();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Timeline</h1>
            <p className="text-gray-600 mt-1">Discover what's happening in your network</p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => router.push('/create')}
              variant="outline"
              size="sm"
              className="rounded-lg"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Create
            </Button>
            <Button
              onClick={handleRefresh}
              variant="outline"
              size="sm"
              className="rounded-lg"
              disabled={isRefreshing}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-12 text-gray-500">Loading posts...</div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No posts to show yet.</p>
            <p className="text-gray-400 mt-2">Be the first to share something!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>  
        )}
      </div>
    </div>
  );
}
