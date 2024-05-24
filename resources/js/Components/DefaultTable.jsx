import React from "react";

const DefaultTable = ({ children }) => {
    return (
        <div className="overflow-auto max-h-[50vh] lg:max-h-[70vh]">
            <table className="w-full divide-y divide-gray-200 text-xs lg:text-sm relative z-0">
                {children}
            </table>
        </div>
    );
};

const tabletTead = ({ children }) => {
    return (
        <thead className="sticky top-0 left-0 z-10">
            <tr className="bg-gray-300 shadow-sm">{children}</tr>
        </thead>
    );
};

const tableBody = ({ children }) => {
    return (
        <tbody className="divide-y divide-gray-200 relative z-0 text-gray-700 text-xs">
            {children}
        </tbody>
    );
};

const tableTr = ({ children }) => {
    return (
        <tr className="odd:bg-white even:bg-gray-100 hover:bg-roman-50/50 group">
            {children}
        </tr>
    );
};

const tableTd = ({ nested = false, children, noSpace, className }) => {
    let components = [];

    nested
        ? components.push(
              <td
                  key={1}
                  className="px-3 py-1.5 sticky left-0 top-0 z-10 bg-inherit"
              >
                  <div className="grid grid-cols-5 gap-1">{children}</div>
              </td>
          )
        : components.push(
              <td
                  key={2}
                  scope="col"
                  className={`px-3 py-1.5 group-hover:bg-inherit ${
                      noSpace ? ` whitespace-nowrap ` : ``
                  } ${className}  `}
              >
                  {children}
              </td>
          );

    return components;
    // <td className="odd:bg-white even:bg-gray-100 hover:bg-roman-50">
    //     {children}
    // </td>;
};

const nestedTh = (headers, sticky) => {
    let components = [];
    headers.forEach((item, key) => {
        if (item.filterable == "no") {
            components.push(
                <div key={key} className="col-span-1 px-6 py-1.5 text-center">
                    {item.name}
                </div>
            );
        } else if (item.filterable == "yes") {
            components.push(
                <div
                    key={key}
                    className="col-span-4 px-6 py-1.5 filterthis hover:cursor-pointer hover:bg-gray-500 hover:text-white text-center"
                    data-type={item.type_date}
                    data-name={item.column}
                >
                    {item.name}
                </div>
            );
        }
    });

    return (
        <th
            scope="col"
            className={`${
                sticky ? "sticky" : ""
            } left-0 top-0 z-10 bg-inherit `}
        >
            <div className="grid grid-cols-5 gap-1 lg:w-[20vw] w-[40vw] ">
                {components}
            </div>
        </th>
    );
};

const defaultTr = (headers) => {
    if (headers.filterable == "yes") {
        return (
            <th
                scope="col"
                className="px-6 py-1.5 whitespace-nowrap filterthis hover:cursor-pointer hover:bg-gray-500 hover:text-white text-center"
                data-type={headers.type_date}
                data-name={headers.column}
            >
                {headers.name}
            </th>
        );
    } else {
        return (
            <th
                scope="col"
                className="px-6 py-1.5 whitespace-nowrap text-center"
            >
                {headers.name}
            </th>
        );
    }
};

const tableTh = ({ type, sticky = false, headers }) => {
    return type == "nested" ? nestedTh(headers, sticky) : defaultTr(headers);
};

DefaultTable.thead = tabletTead;
DefaultTable.th = tableTh;
DefaultTable.td = tableTd;
DefaultTable.tr = tableTr;
DefaultTable.tbody = tableBody;

export default DefaultTable;
