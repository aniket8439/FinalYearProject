import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { FiHeart, FiMessageCircle } from "react-icons/fi";
import "../assets/styles/postStyles.css";

const ExplorePage = () => {
  const user = useSelector((state) => state.user.user);
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");
  const [media, setMedia] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("fetch_post_api");
      setPosts(response.data.posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleCreatePost = async () => {
    const formData = new FormData();
    formData.append("user", user._id);
    formData.append("content", content);
    if (media) {
      formData.append("media", media);
    }

    try {
      await axios.post("create_api_here", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      fetchPosts();
      setContent("");
      setMedia(null);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const handleLike = async (postId) => {
    try {
      await axios.post(`like_api_here/${postId}`, {
        userId: user._id,
      });
      fetchPosts();
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleComment = async (postId, comment) => {
    try {
      await axios.post(`comment_api_here/${postId}`, {
        user: user._id,
        text: comment,
      });
      fetchPosts();
    } catch (error) {
      console.error("Error commenting on post:", error);
    }
  };

  const renderMedia = (mediaArray) => {
    if (!mediaArray || mediaArray.length === 0) {
      return null;
    }
    const mediaUrl = mediaArray[0];
    const mediaType = mediaUrl.split('.').pop().startsWith("mp4") ? "video/mp4" : "image";

    console.log("Media URL:", mediaUrl);
    console.log("Media Type:", mediaType);

    if (mediaType.startsWith("video/")) {
      return <video src={`base_url/${mediaUrl}`} controls />;
    } else {
      return <img src={`base_url/${mediaUrl}`} alt="Media" />;
    }
  };

  return (
    <div className="explore-page">
      <div className="create-post-form">
        {user && (
          <>
            <h2>Add Post</h2>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter post content..."
            ></textarea>
            <input
              type="file"
              onChange={(e) => setMedia(e.target.files[0])}
            />
            <button onClick={handleCreatePost}>Create Post</button>
          </>
        )}
      </div>
      <div className="posts-container">
        <h1 className="heading">Explore all journeys here...</h1>
        <div className="posts">
          {posts.map((post) => {
            console.log("Post:", post);
            return (
              <div key={post._id} className="post">
                <div className="post-header">
                  <img
                    src="https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg"
                    alt="User Avatar"
                    className="avatar"
                  />
                  <p>Posted By: {post.user.name}</p>
                </div>
                <p className="desc">{post.content}</p>
                {renderMedia(post.media)}
                <div className="post-actions">
                  <button
                    onClick={() => handleLike(post._id)}
                    className={post.likes.includes(user._id) ? "liked" : ""}
                    style={{
                      color: post.likes.includes(user._id) ? "red" : "black",
                    }}
                  >
                    <FiHeart /> {post.likes.length}
                  </button>
                  <button>
                    <FiMessageCircle /> {post.comments.length}
                  </button>
                </div>
                <div className="post-comments">
                  {post.comments.map((comment, index) => (
                    <p key={index}>
                      <strong>{comment.user.name}:</strong> {comment.text}
                    </p>
                  ))}
                </div>
                <div className="comment-form">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleComment(post._id, e.target.value);
                        e.target.value = "";
                      }
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
