import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const ReportStudent = ({ reportData }) => {
  function topicWise(data) {
    if (!data) return [[], []];
    let strongTopics = [];
    let weakTopics = [];
    let topics = Object.keys(data);
    console.log(topics);
    for (let i = 0; i < topics.length; i++) {
      let r = data[topics[i]];
      if (r.correct / r.total < 0.5) {
        weakTopics.push(topics[i]);
      } else {
        strongTopics.push(topics[i]);
      }
    }

    return [weakTopics, strongTopics];
  }
  const [weakTopics, strongTopics] = topicWise(reportData.topicWise);
  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col">Marks: {reportData.marks}</div>
          <div className="col">Class Average: {reportData.classAverage}</div>
        </div>
        <div className="row heading">
          <div className="">
            <h6 className="mt-3">Weak Topics</h6>
            {weakTopics.map((t) => (
              <div className="col topic">{t}</div>
            ))}
          </div>
        </div>

        <div className="row heading">
          <div className="">
            <h6 className="mt-3">Strong Topics</h6>
            {strongTopics.map((t) => (
              <div className="col topic">{t}</div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportStudent;
