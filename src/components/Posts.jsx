import React from "react";
// import InstagramEmbed from "react-instagram-embed";
import Post from "./Post";

const Posts = ({ user, posts }) => {
  return (
    <div className="app__posts">
      <div className="app__postsLeft">
        {posts.map(({ id, post }) => (
          <Post
            user={user}
            key={id}
            postId={id}
            username={post.username}
            caption={post.caption}
            imageUrl={post.imageURL}
          />
        ))}
      </div>
      {/* <div className="app__postsRight">
        <InstagramEmbed
          url="https://www.instagram.com/p/B_uf9dmAGPw/"
          hideCaption={false}
          containerTagName="div"
          injectScript
          onLoading={() => {}}
          onSuccess={() => {}}
          onAfterRender={() => {}}
          onFailure={() => {}}
        />
      </div> */}
    </div>
  );
};

export default Posts;
