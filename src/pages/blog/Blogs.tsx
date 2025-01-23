import { blogs, getCategories } from "@/utils/data/blogs";
import { Link } from "react-router-dom";
import { Clock, User } from "lucide-react";

const Blogs = () => {
    const categories = getCategories();

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-tajawal-bold mb-8">المدونة</h1>

            {/* Categories */}
            <div className="flex gap-4 mb-8 overflow-x-auto pb-4">
                {categories.map((category) => (
                    <button
                        key={category}
                        className="px-4 py-2 bg-orange-100 text-orange-500 rounded-full hover:bg-orange-200 transition-colors whitespace-nowrap font-tajawal-medium"
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Blog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((blog) => (
                    <Link
                        to={`/blog/${blog.id}`}
                        key={blog.id}
                        className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                    >
                        <img
                            src={blog.image}
                            alt={blog.title}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-6">
                            <div className="flex items-center gap-4 mb-4">
                                <span className="bg-orange-100 text-orange-500 px-3 py-1 rounded-full text-sm">
                                    {blog.category}
                                </span>
                                <div className="flex items-center gap-2 text-gray-500 text-sm">
                                    <Clock className="w-4 h-4" />
                                    <span>{blog.readTime} دقائق</span>
                                </div>
                            </div>
                            <h2 className="text-xl font-tajawal-bold mb-2">{blog.title}</h2>
                            <p className="text-gray-600 mb-4 line-clamp-2">{blog.excerpt}</p>
                            <div className="flex items-center gap-3">
                                <img
                                    src={blog.author.avatar}
                                    alt={blog.author.name}
                                    className="w-8 h-8 rounded-full"
                                />
                                <div className="flex flex-col">
                                    <span className="text-sm font-tajawal-medium">
                                        {blog.author.name}
                                    </span>
                                    <span className="text-sm text-gray-500">
                                        {new Date(blog.date).toLocaleDateString('ar-EG')}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Blogs; 