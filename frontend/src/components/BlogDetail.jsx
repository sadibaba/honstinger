import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getPost,
  getComments,
  addComment,
  getImageUrl,
} from "../api/api";
import { motion } from "framer-motion";

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);
  const [authorName, setAuthorName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBlog();
    fetchComments();
  }, [id]);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await getPost(id);
      const blogData = response?.data || response;
      if (!blogData) {
        setError("Blog post not found");
        return;
      }
      setBlog({
        ...blogData,
        id: blogData.id || blogData._id,
        authorName: blogData.authorName || "Chronica Editorial",
        date: blogData.createdAt
          ? new Date(blogData.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          : "Unknown date",
        readTime:
          blogData.readTime ||
          `${Math.ceil((blogData.content?.split(" ").length || 0) / 200) || 3} min read`,
        commentsCount: blogData.comments?.length || 0,
      });
    } catch (err) {
      console.error("Error fetching blog:", err);
      setError("Failed to load blog post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await getComments(id);
      const data = response?.data || response || [];
      setComments(
        data.map((c) => ({
          ...c,
          id: c.id || c._id,
          authorName: c.authorName || c.user?.name || "Anonymous",
          date: c.createdAt
            ? new Date(c.createdAt).toLocaleDateString()
            : "Unknown date",
        })),
      );
    } catch (err) {
      console.error("Error fetching comments:", err);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    setCommentLoading(true);
    try {
      await addComment({
        postId: id,
        content: newComment.trim(),
        authorName: authorName.trim() || "Anonymous",
      });
      setNewComment("");
      await fetchComments();
      setBlog((prev) => ({ ...prev, commentsCount: prev.commentsCount + 1 }));
    } catch (err) {
      console.error("Error adding comment:", err);
      alert("Failed to add comment. Please try again.");
    } finally {
      setCommentLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent mx-auto mb-4" />
          <p className="text-text-secondary">Loading story...</p>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-5 text-text-secondary">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-text-primary mb-2">
            Post not found
          </h3>
          <p className="text-text-secondary mb-6 text-sm">
            {error || "This blog post doesn't exist."}
          </p>
          <button
            onClick={() => navigate("/home")}
            className="px-6 py-2 bg-accent text-primary rounded-full font-medium text-sm hover:bg-amber-300 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary">
      <div className="container mx-auto px-4 pt-8 pb-12">
        <button
          onClick={() => navigate("/home")}
          className="inline-flex items-center text-accent hover:text-amber-300 text-sm group mb-8"
        >
          <svg
            className="w-4 h-4 mr-1.5 group-hover:-translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Collection
        </button>

        <motion.article
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto"
        >
          {/* Header */}
          <div className="mb-8">
            <span className="inline-flex items-center px-3 py-1 bg-secondary text-accent rounded-full text-xs font-medium mb-4">
              {blog.category}
            </span>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-text-primary mb-6 leading-tight">
              {blog.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-accent to-amber-300 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-bold">
                    {blog.authorName?.charAt(0).toUpperCase() || "C"}
                  </span>
                </div>
                <div>
                  <p className="text-text-primary font-medium text-sm">
                    {blog.authorName}
                  </p>
                  <p className="text-text-secondary text-xs">
                    {blog.date} · {blog.readTime}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Cover Image */}
          {getImageUrl(blog.imageUrl || blog.image) && (
            <div className="relative h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden mb-10">
              <img
                src={getImageUrl(blog.imageUrl || blog.image)}
                alt={blog.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src =
                    "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=1974";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
            </div>
          )}

          {/* Content */}
          <div className="text-text-secondary leading-relaxed text-base sm:text-lg whitespace-pre-line mb-12 font-serif">
            {blog.content}
          </div>

          {/* Comments */}
          <div className="border-t border-secondary pt-10">
            <h2 className="font-display text-2xl text-text-primary mb-8">
              Comments ({comments.length})
            </h2>

            {/* Comment Form — sabke liye open */}
            <div className="mb-8">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-r from-accent to-amber-300 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary text-sm font-bold">
                    {authorName?.charAt(0).toUpperCase() || "A"}
                  </span>
                </div>
                <div className="flex-1 space-y-3">
                  <input
                    type="text"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="Your name (optional)"
                    maxLength="50"
                    className="w-full px-4 py-2.5 bg-secondary border border-secondary/50 rounded-lg text-text-primary placeholder-text-secondary focus:ring-2 focus:ring-accent focus:outline-none text-sm"
                  />
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Share your thoughts..."
                    className="w-full px-4 py-3 bg-secondary border border-secondary/50 rounded-lg text-text-primary placeholder-text-secondary focus:ring-2 focus:ring-accent focus:outline-none resize-none text-sm"
                    rows="3"
                  />
                  <div className="flex justify-end">
                    <button
                      onClick={handleAddComment}
                      disabled={commentLoading || !newComment.trim()}
                      className="px-5 py-2 bg-accent text-primary rounded-full font-bold text-sm hover:bg-amber-300 transition-colors disabled:opacity-50"
                    >
                      {commentLoading ? "Posting..." : "Post Comment"}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Comments List */}
            <div className="space-y-5">
              {comments.map((comment) => (
                <div key={comment.id} className="bg-secondary/50 rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-r from-accent to-amber-300 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary text-sm font-bold">
                        {comment.authorName?.charAt(0).toUpperCase() || "A"}
                      </span>
                    </div>
                    <div>
                      <p className="text-text-primary font-medium text-sm">
                        {comment.authorName}
                      </p>
                      <p className="text-text-secondary text-xs">
                        {comment.date}
                      </p>
                    </div>
                  </div>
                  <p className="text-text-secondary text-sm leading-relaxed font-serif">
                    {comment.content}
                  </p>
                </div>
              ))}
              {comments.length === 0 && (
                <p className="text-text-secondary text-center py-8 text-sm">
                  No comments yet — be the first!
                </p>
              )}
            </div>
          </div>
        </motion.article>
      </div>
    </div>
  );
};

export default BlogDetail;