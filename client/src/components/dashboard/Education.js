import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import moment from "moment";
import { connect } from "react-redux";
import { deleteEducation } from "../../actions/profile";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

const Education = ({ education, deleteEducation }) => {
  const educations = education.map((edu) => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td className="hide-sm">{edu.degree}</td>
      <td>
        <Moment format="YYYY/MM/DD">{moment.utc(edu.from)}</Moment> -{" "}
        {edu.to === null ? (
          " Now"
        ) : (
          <Moment format="YYYY/MM/DD">{moment.utc(edu.to)}</Moment>
        )}
      </td>
      <td>
        <button
          onClick={() => deleteEducation(edu._id)}
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
      <h2 className="my-2">{t("dash.14")}</h2>
      <table className="table">
        <thead>
          <tr>
            <th>School{t("dash.15")}</th>
            <th className="hide-sm">{t("dash.16")}</th>
            <th className="hide-sm">{t("dash.17")}</th>
            <th />
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </Fragment>
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, { deleteEducation })(Education);
