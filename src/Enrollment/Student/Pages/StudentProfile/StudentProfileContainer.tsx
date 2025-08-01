import React from "react";
import StudentProfile from "./StudentProfile";
import { findStudentById } from "../../Services/findStudentById";
import { deleteStudentById } from "../../Services/deleteStudentById";

const StudentProfileContainer = () => {
  return (
    <StudentProfile
      findStudentById={findStudentById}
      deleteStudentById={deleteStudentById}
    />
  );
};

export default StudentProfileContainer;
