import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import PostItem from "./PostItem";
import PostForm from "./upload/PostForm";
import { getPosts } from "../../actions/post";
import { getCurrentProfile } from "../../actions/profile";
import FileUpload from "./upload/FileUpload";

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

  const [formData, setFormData] = useState({ search: "", select: "" });

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const { search, select } = formData;
  let postform;
  let postitem;

  postitem = posts.map(post => {
    if (select == "text") {
      if (post.text.toLowerCase().includes(search)) {
        return <PostItem key={post._id} post={post} />;
      }
    }
    if (select == "") {
      if (post.text.toLowerCase().includes(search)) {
        return <PostItem key={post._id} post={post} />;
      }
    }
  });
  if (profile !== null) {
    postform = profile.isWorker ? null : <PostForm />;
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

      <input
        type="text"
        placeholder="* Search"
        name="search"
        value={search}
        onChange={e => onChange(e)}
        required
      />

      <select name="select" value="select" onChange={e => onChange(e)}>
        <option selected value="select">
          Search By
        </option>
        <option value="text">Info</option>
      </select>

      <div className="posts">{postitem}</div>
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
