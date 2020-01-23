import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import PostItem from "./PostItem";
import PostForm from "./PostForm";
import { getPosts } from "../../actions/post";
import { getCurrentProfile } from "../../actions/profile";

const Posts = ({
  getPosts,
  post: { posts, loading },
  profile: { profile },
  getCurrentProfile
}) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  let postform;

  if (profile !== null) {
    postform = profile.isWorker ? <PostForm /> : null;
  }

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome to the community
      </p>
      {postform}
      <div className="posts">
        {posts.map(post => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </Fragment>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  profile: state.profile
});

export default connect(mapStateToProps, { getPosts, getCurrentProfile })(Posts);
