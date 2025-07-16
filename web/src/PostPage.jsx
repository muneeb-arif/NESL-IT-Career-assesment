import { useAuth } from './auth.jsx';
import { useEffect, useRef, useState } from 'react';

function PostPage() {
  const { token: _token } = useAuth(); // Keep for future API integration
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const loader = useRef();

  useEffect(() => {
    // Mock posts since the feed endpoint doesn't exist in the API
    const mockPosts = [
      {
        authorName: 'John Doe',
        content: 'This is a sample post content. Welcome to our platform!',
        created: new Date().toISOString()
      },
      {
        authorName: 'Jane Smith',
        content: 'Another interesting post with some content to display.',
        created: new Date(Date.now() - 86400000).toISOString()
      },
      {
        authorName: 'Admin User',
        content: 'This post was created by an admin user.',
        created: new Date(Date.now() - 172800000).toISOString()
      }
    ];
    
    // Simulate API delay
    setTimeout(() => {
      setPosts(prev => [...prev, ...mockPosts]);
    }, 500);
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) setPage(p => p + 1);
    });
    if (loader.current) observer.observe(loader.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="post-container">
      <header className="post-header">
        <h2 className="post-title">📰 News Feed</h2>
        <p className="post-subtitle">Stay updated with the latest posts</p>
      </header>
      
      <div className="posts-list">
        {posts.map((post, i) => (
          <article key={i} className="post-card">
            <div className="post-header">
              <div className="post-author">
                <span className="author-avatar">👤</span>
                <strong className="author-name">{post.authorName}</strong>
              </div>
              <time className="post-time">
                {new Date(post.created).toLocaleString()}
              </time>
            </div>
            <div className="post-content">
              <p>{post.content}</p>
            </div>
          </article>
        ))}
      </div>
      
      <div ref={loader} className="loader-indicator">
        <div className="loading-spinner"></div>
        <p>Loading more posts...</p>
      </div>
    </div>
  );
}

export default PostPage;
