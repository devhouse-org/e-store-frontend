import { useParams } from "react-router-dom";
import { getBlogById } from "@/utils/data/blogs";
import { Clock, User } from "lucide-react";

const Blog = () => {
    const { id } = useParams();
    const blog = getBlogById(id || "");

    if (!blog) {
        return <div>Blog not found</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-4 mb-4">
                        <span className="bg-orange-100 text-orange-500 px-3 py-1 rounded-full text-sm">
                            {blog.category}
                        </span>
                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                            <Clock className="w-4 h-4" />
                            <span>{blog.readTime} دقائق</span>
                        </div>
                    </div>
                    <h1 className="text-4xl font-tajawal-bold mb-6">{blog.title}</h1>
                    <div className="flex items-center gap-4">
                        <img
                            src={blog.author.avatar}
                            alt={blog.author.name}
                            className="w-12 h-12 rounded-full"
                        />
                        <div className="flex flex-col">
                            <span className="font-tajawal-medium">{blog.author.name}</span>
                            <span className="text-gray-500">
                                {new Date(blog.date).toLocaleDateString('ar-EG')}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Featured Image */}
                <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-[400px] object-cover rounded-lg mb-8"
                />

                {/* Content */}
                <div className="prose prose-lg max-w-none">
                    <p className="whitespace-pre-line text-gray-700 leading-relaxed font-tajawal-regular">
                        {blog.content}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Blog; 