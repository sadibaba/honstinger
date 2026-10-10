import React, { useState, useEffect } from 'react';
import { navigate } from 'vike/client/router';
import { motion, AnimatePresence } from 'framer-motion';
import { getPosts, deletePost, getImageUrl } from '../api/api';
import EditPostModal from './EditProfileModal';

const AdminDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingPost, setEditingPost] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [actionLoading, setActionLoading] = useState({});

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    if (!isAdmin) { navigate('/admin-login'); return; }
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await getPosts(true);
      const data = Array.isArray(response) ? response : response?.data || [];
      setPosts(data);
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!showDeleteConfirm) return;
    const id = showDeleteConfirm.id || showDeleteConfirm._id;
    setDeletingId(id);
    setActionLoading((prev) => ({ ...prev, [id]: true }));
    try {
      await deletePost(id);
      setPosts((prev) => prev.filter((p) => (p.id || p._id) !== id));
      setShowDeleteConfirm(null);
    } catch (err) {
      console.error('Delete error:', err);
      alert(err.message || 'Failed to delete post');
    } finally {
      setDeletingId(null);
      setActionLoading((prev) => ({ ...prev, [id]: false }));
    }
  };

  const handleEditSuccess = (updatedPost) => {
    if (updatedPost) setPosts((prev) => prev.map((p) => (p.id || p._id) === (updatedPost.id || updatedPost._id) ? updatedPost : p));
    else fetchPosts();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center pt-32">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent mx-auto mb-4" />
          <p className="text-text-secondary">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary pt-32 pb-20 relative overflow-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/95 to-primary"></div>
        <div className="absolute top-[-15%] left-[-10%] w-[600px] h-[600px] rounded-full bg-accent/[0.06] blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-accent/[0.04] blur-[100px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <div>
            <p className="text-accent text-xs uppercase tracking-[0.3em] mb-2 font-medium">Admin Panel</p>
            <h1 className="font-display text-5xl sm:text-6xl text-text-primary">Manage Stories</h1>
            <p className="text-text-secondary text-sm mt-2">{posts.length} {posts.length === 1 ? 'story' : 'stories'} total</p>
          </div>
          <button onClick={() => navigate('/')} className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-primary rounded-full font-bold text-sm hover:bg-amber-300 transition-all hover:scale-105">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
            New Post
          </button>
        </div>

        {error && (<div className="mb-6 p-4 bg-red-900/30 border border-red-800 rounded-lg text-red-400 text-sm">{error}</div>)}

        {posts.length > 0 ? (
          <div className="space-y-4">
            {posts.map((post, i) => {
              const id = post.id || post._id;
              const image = getImageUrl(post.imageUrl || post.image);
              const isLoading = actionLoading[id];
              return (
                <motion.div key={id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="rounded-2xl border border-secondary/50 bg-secondary/30 backdrop-blur-sm p-4 sm:p-5 hover:border-accent/40 transition-all duration-300">
                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                    <div className="w-full sm:w-32 h-32 sm:h-20 rounded-xl overflow-hidden flex-shrink-0 bg-secondary">
                      {image ? (
                        <img src={image} alt={post.title} className="w-full h-full object-cover" onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=800'; }} />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-text-secondary text-xs">No image</div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-accent/10 text-accent text-xs font-medium">{post.category}</span>
                        <span className="text-text-secondary text-xs">{post.createdAt ? new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''}</span>
                        <span className="text-text-secondary text-xs">· {post.views || 0} views</span>
                      </div>
                      <h3 className="font-display text-xl text-text-primary mb-1 truncate">{post.title}</h3>
                      <p className="text-text-secondary text-sm line-clamp-1 font-serif">{post.excerpt}</p>
                    </div>

                    <div className="flex gap-2 self-stretch sm:self-center">
                      <button onClick={() => setEditingPost(post)} disabled={isLoading} className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-secondary/60 hover:bg-secondary text-text-primary rounded-full font-medium text-sm transition-all border border-secondary/50 disabled:opacity-50">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                        Edit
                      </button>
                      <button onClick={() => setShowDeleteConfirm(post)} disabled={isLoading} className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-red-900/30 hover:bg-red-900/50 text-red-400 rounded-full font-medium text-sm transition-all disabled:opacity-50">
                        {isLoading ? (
                          <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
                        ) : (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        )}
                        Delete
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 rounded-3xl border border-secondary/50 bg-secondary/20 backdrop-blur-sm">
            <div className="w-20 h-20 mx-auto mb-6 text-text-secondary">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            </div>
            <h3 className="text-xl font-semibold text-text-primary mb-2">No stories yet</h3>
            <p className="text-text-secondary mb-6 text-sm">Create your first story to get started.</p>
            <button onClick={() => navigate('/')} className="px-6 py-2.5 bg-accent text-primary rounded-full font-bold text-sm hover:bg-amber-300 transition-colors">Write First Story</button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {editingPost && (
          <EditPostModal post={editingPost} onClose={() => setEditingPost(null)} onSuccess={handleEditSuccess} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="glass rounded-2xl p-6 max-w-md w-full">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-red-900/30 border border-red-800 flex items-center justify-center">
                <svg className="w-7 h-7 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              </div>
              <h3 className="font-display text-2xl text-text-primary text-center mb-2">Delete this story?</h3>
              <p className="text-text-secondary text-sm text-center mb-6 font-serif">"{showDeleteConfirm.title}" will be permanently removed. This action cannot be undone.</p>
              <div className="flex gap-3">
                <button onClick={() => setShowDeleteConfirm(null)} disabled={deletingId} className="flex-1 px-4 py-3 bg-secondary/60 hover:bg-secondary text-text-primary rounded-full font-medium text-sm transition-all border border-secondary/50 disabled:opacity-50">Cancel</button>
                <button onClick={handleDeleteConfirm} disabled={deletingId} className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-full font-bold text-sm transition-all disabled:opacity-50 inline-flex items-center justify-center gap-2">
                  {deletingId ? (
                    <>
                      <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
                      Deleting...
                    </>
                  ) : ('Delete')}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;