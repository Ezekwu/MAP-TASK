import React from 'react';

export interface Header {
  title: string;
  query: string;
  alignText?: 'left' | 'right' | 'center';
}

export interface Row extends Record<string, any> {
  _id: string;
}

interface Props {
  data: Row[];
  headers: Header[];
  actionTriggers?: (id: string) => React.ReactNode;
}

export default function UiTableSimplified({
  headers,
  data,
  actionTriggers,
}: Props) {
  return (
    <div className="bg-white border border-tertiary-300 rounded-lg ">
      {/* Header */}
      <div className="flex justify-between border-b border-tertiary-300 pb-4">
        {headers.map((header, index) => (
          <div
            key={`header-${index}`}
            className={`col-span-2 text-sm font-medium text-tertiary-700 capitalize`}
            style={{ textAlign: header.alignText }}
          >
            {header.title}
          </div>
        ))}
        {actionTriggers && (
          <div className="col-span-2 text-sm font-medium text-tertiary-700 capitalize text-right">
            Actions
          </div>
        )}
      </div>

      {/* Rows */}
      <div className="flex flex-col gap-4 mt-4">
        {data.map((item, rowIndex) => (
          <div
            key={`row-${rowIndex}`}
            className="flex justify-between p-4 border border-tertiary-300 rounded-md"
          >
            {headers.map((header, colIndex) => (
              <div
                key={`row-${rowIndex}-col-${colIndex}`}
                className={`col-span-2 text-sm text-gray-1000 capitalize`}
                style={{ textAlign: header.alignText }}
              >
                {item[header.query]}
              </div>
            ))}
            {actionTriggers && (
              <div className="col-span-2 flex justify-end items-center">
                {actionTriggers(item._id)}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
