import React from "react";

const FilterModal = ({
    addFilter,
    setAddFilter,
    showFilter,
    onSubmitSearch,
    handleInputChange,
}) => {
    return (
        <div
            className="fixed text-white top-1/2 left-1/2 -translate-x-1/2"
            onClick={(e) => e.stopPropagation()}
        >
            <div className="bg-white border border-gray-300 rounded-lg shadow-lg">
                <div className="flex justify-end items-center text-2xl px-2 py-4">
                    <div className="flex flex-col-reverse">
                        <input
                            name="column"
                            value={addFilter.column}
                            onChange={(e) =>
                                setAddFilter({
                                    ...addFilter,
                                    column: e.target.value,
                                })
                            }
                            className="border-0 border-b border-b-gray-400 text-black font-light text-sm px-1.5 py-1.5 focus:bg-gray-100 focus:outline-none focus:border-b-2 focus:border-b-blue-500 peer/column"
                        />
                        <label className="text-gray-400 text-xs font-semibold peer-focus/column:text-blue-500">
                            Column
                        </label>
                    </div>
                    <div className="flex flex-col-reverse">
                        <select
                            name="operators"
                            value={addFilter.operators}
                            onChange={(e) =>
                                setAddFilter({
                                    ...addFilter,
                                    operators: e.target.value,
                                })
                            }
                            className="border-0 border-b border-b-gray-400 text-black font-light text-sm px-1.5 py-1.5 focus:outline-none focus:border-b-2 focus:border-b-blue-500 focus:ring-0 peer/operator"
                        >
                            <option value="1">contains</option>
                            <option value="2">equal</option>
                        </select>
                        <label className="text-gray-400 text-xs font-semibold peer-focus/operator:text-blue-500">
                            Operator
                        </label>
                    </div>
                    <div className="flex flex-col-reverse">
                        <input
                            value={addFilter.values}
                            type={
                                showFilter.format == "number"
                                    ? "number"
                                    : showFilter.format == "date"
                                    ? "date"
                                    : showFilter.format == "currency"
                                    ? "number"
                                    : "text"
                            }
                            onChange={handleInputChange}
                            name="values"
                            className="border-0 border-b border-b-gray-400 text-black font-light text-sm px-1.5 py-1.5 focus:bg-gray-100 focus:outline-none focus:border-b-2 focus:border-b-blue-500 peer/value"
                        />
                        <label className="text-gray-400 text-xs font-semibold peer-focus/value:text-blue-500">
                            Value
                        </label>
                    </div>
                    <div>
                        <button
                            onClick={onSubmitSearch}
                            className="text-black text-xs border border-main-500 hover:bg-main-500 hover:text-white focus:bg-main-500 focus:text-white p-2 rounded-lg"
                        >
                            Go
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default FilterModal;
