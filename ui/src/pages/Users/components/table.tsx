import { CSSProperties, Key } from "react";
import cl from "./table.module.scss";

export interface Column<T> {
  title: string;
  dataKey?: keyof T;
  render: (row: T) => React.ReactNode;
  style?: CSSProperties;
}

interface TableProps<T> {
  data: T[];
  rowKey: (row: T) => Key;
  columns: Column<T>[];
  onSelect?: (record: T) => void;
  onBottomReached?: () => void;
}

const Table = <T extends object>(p: TableProps<T>) => {
  return (
    <table className={cl.table}>
      <thead>
        <tr>
          {p.columns.map((column) => (
            <th
              key={column.title}
              className="font-normal pl-3 text-text-secondary relative after:content-[''] after:block after:absolute after:right-1 after:top-0.5 after:bottom-0.5 after:w-[1px] after:bg-bg-tetriary last:after:hidden pr-5">
              {column.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {p.data.map((row) => (
          <tr
            className={`${cl.tr} bg-bg-secondary`}
            key={p.rowKey(row)}
            onClick={() => p.onSelect?.(row)}>
            {p.columns.map((column) => (
              <td key={column.title} style={column.style}>
                {column.render(row)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
