import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import moment from "moment";
import { connect } from "react-redux";
import { deleteExperience } from "../../actions/profile";

import { useTranslation } from "react-i18next";
import i18next from "i18next";
const Experience = ({ experience, deleteExperience }) => {
  const experiences = experience.map((exp) => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td className="hide-sm">{exp.title}</td>
      <td>
        <Moment format="YYYY/MM/DD">{moment.utc(exp.from)}</Moment> -{" "}
        {exp.to === null ? (
          " Now"
        ) : (
          <Moment format="YYYY/MM/DD">{moment.utc(exp.to)}</Moment>
        )}
      </td>
      <td>
        <button
          onClick={() => deleteExperience(exp._id)}
          className="btn btn-danger"
        >
          {t("dash.18")}
        </button>
      </td>
    </tr>
  ));
  function handleClick(lang) {
    i18next.changeLanguage(lang);
  }
  const { t } = useTranslation();

  return (
    <Fragment>
      <h2 className="my-2">{t("dash.10")}</h2>
      <table className="table">
        <thead>
          <tr>
            <th>{t("dash.11")}</th>
            <th className="hide-sm">{t("dash.12")}</th>
            <th className="hide-sm">{t("dash.13")}</th>
            <th />
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </Fragment>
  );
};

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
  deleteExperience: PropTypes.func.isRequired,
};

export default connect(null, { deleteExperience })(Experience);
