import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Post {
  id: string;
  userId: string;
  title: string;
  description: string;
  author: string;
  timestamp: string;
}

interface PostCardProps {
  post: Post;
  showOptions?: boolean;
}

const PostCard = ({ post, showOptions = false }: PostCardProps) => {
  const getInitials = (name?: string) => {
    if (!name) return "";
    return name
      .split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow duration-200 border-0 bg-white">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="" alt={post?.author} />
              <AvatarFallback className="bg-blue-100 text-blue-600 text-sm font-medium">
                {getInitials(post.author)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-gray-900">{post.author}</p>
              <p className="text-sm text-gray-500">{post.timestamp}</p>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="mb-4">
          <h3 className="font-semibold text-lg text-gray-900 mb-2 leading-tight">
            {post.title}
          </h3>
          <p className="text-gray-700 leading-relaxed">
            {post.description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard;
