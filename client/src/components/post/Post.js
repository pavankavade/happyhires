import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import PostItem from "../posts/PostItem";
import CommentForm from "../post/CommentForm";
import CommentItem from "../post/CommentItem";
import { getPost } from "../../actions/post";
import { getCurrentProfile } from "../../actions/profile";

import { useTranslation } from "react-i18next";
import i18next from "i18next";

const Post = ({
  getPost,
  post: { post, loading },
  match,
  profile: { profile },
  getCurrentProfile,
}) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost]);
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  let comments;
  function handleClick(lang) {
    i18next.changeLanguage(lang);
  }
  const { t } = useTranslation();
  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to="/posts" className="btn">
        {t("post.1")}
      </Link>
      <PostItem post={post} showActions={false} />
      <h3>{t("post.3")}</h3>
      <CommentForm postId={post._id} />

      <div className="comments">
        {profile.isWorker
          ? null
          : post.comments.map((comment) => (
              <CommentItem
                key={comment._id}
                comment={comment}
                postId={post._id}
              />
            ))}
      </div>
    </Fragment>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  profile: state.profile,
});

export default connect(mapStateToProps, { getPost, getCurrentProfile })(Post);
