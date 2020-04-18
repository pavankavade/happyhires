import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import PostItem from "./PostItem";
import PostForm from "./upload/PostForm";
import { getPosts } from "../../actions/post";
import { getCurrentProfile } from "../../actions/profile";
import FileUpload from "./upload/FileUpload";

import { useTranslation } from "react-i18next";
import i18next from "i18next";
const Posts = ({
  getPosts,
  post: { posts, loading },
  profile: { profile },
  getCurrentProfile,
}) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  function handleClick(lang) {
    i18next.changeLanguage(lang);
  }
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ search: "", select: "" });

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const { search, select } = formData;
  let postform;
  let postitem;

  postitem = posts.map((post) => {
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
      <h1 className="large text-primary"> {t("post.6")}</h1>
      <p className="lead">
        <i className="fas fa-user" /> {t("post.7")}
      </p>
      {postform}
      <div class="s01">
        <form>
          <div class="inner-form">
            <div class="input-field first-wrap">
              <input
                type="text"
                placeholder={t("post.8")}
                name="search"
                value={search}
                id="search"
                onChange={(e) => onChange(e)}
                required
              />
            </div>
            <div class="input-field second-wrap">
              <select
                className="browser-default custom-select"
                id="search"
                name="select"
                value="select"
                onChange={(e) => onChange(e)}
              >
                <option selected value="select">
                  {t("post.9")}
                </option>
                <option id="search" value="text">
                  Info {t("post.10")}
                </option>
              </select>{" "}
            </div>
            <div class="input-field third-wrap">
              <button class="btn-search" type="button">
                Search
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="posts">{postitem}</div>
    </Fragment>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  profile: state.profile,
});

export default connect(mapStateToProps, { getPosts, getCurrentProfile })(Posts);
