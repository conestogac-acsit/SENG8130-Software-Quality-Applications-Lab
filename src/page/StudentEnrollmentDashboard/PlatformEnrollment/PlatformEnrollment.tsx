import React from "react";
import type { EnrollmentStatus, Student } from "../StudentInfo/StudentInfo";
import Table, {
  TableHeader,
  TableRow,
  TableCell,
  TableHeaderCell,
} from "../../../components/common/Table/Table";
import Select from "../../../components/common/Select/Select";

interface Props {
  platform: "loop" | "github";
  data: Student[];
  onUpdateStatus: (
    index: number,
    platform: "loop" | "github",
    newStatus: EnrollmentStatus
  ) => void;
}

const PlatformDashboard: React.FC<Props> = ({ platform, data, onUpdateStatus }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHeaderCell>Email</TableHeaderCell>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Role</TableHeaderCell>
          <TableHeaderCell>Status</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <tbody>
        {data.map((student, index) => {
          const status = platform === "loop" ? student.loopStatus : student.githubStatus;
          const isEditable = status === "unenrolled";

          return (
            <TableRow key={index}>
              <TableCell>{student.email}</TableCell>
              <TableCell>{student.name}</TableCell>
              <TableCell>{student.role}</TableCell>
              <TableCell>
                {isEditable ? (
                  <Select
                    value={status}
                    onChange={(e) =>
                      onUpdateStatus(index, platform, e.target.value as EnrollmentStatus)
                    }
                  >
                    <option value="enrolled">enrolled</option>
                    <option value="unenrolled">unenrolled</option>
                  </Select>
                ) : (
                  <i className="text-gray-600">{status}</i>
                )}
              </TableCell>
            </TableRow>
          );
        })}
      </tbody>
    </Table>
  );
};

export default PlatformDashboard;
