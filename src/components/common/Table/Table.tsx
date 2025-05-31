import React from "react";

interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  children: React.ReactNode;
  className?: string;
}

const Table: React.FC<TableProps> = ({ children, className = "", ...props }) => {
  return (
    <table
      className={`min-w-full border border-gray-300 text-sm ${className}`}
      {...props}
    >
      {children}
    </table>
  );
};

export const TableHeader: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <thead className="bg-gray-200">{children}</thead>;

export const TableRow: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = "",
}) => <tr className={className}>{children}</tr>;

export const TableCell: React.FC<
  React.TdHTMLAttributes<HTMLTableCellElement>
> = ({ children, className = "", ...props }) => (
  <td className={`border px-4 py-2 ${className}`} {...props}>
    {children}
  </td>
);

export const TableHeaderCell: React.FC<
  React.ThHTMLAttributes<HTMLTableCellElement>
> = ({ children, className = "", ...props }) => (
  <th className={`border px-4 py-2 text-left ${className}`} {...props}>
    {children}
  </th>
);

export default Table;
