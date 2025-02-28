export default function Table({
  columns,
  data,
  currentPage,
  pageSize,
  total,
  onPageChange,
  onPageSizeChange,
}) {
  const totalPages = Math.ceil(total / pageSize);

  return (
    <div>
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead className="bg-gray-100">
            <tr>
              {columns.map((column) => (
                <th
                  key={column}
                  className="py-3 px-5 border-b border-gray-300 text-left text-gray-700 font-semibold"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="even:bg-gray-50 hover:bg-gray-100 transition-all"
              >
                {columns.map((column) => (
                  <td
                    key={column}
                    className="py-3 px-5 border-b border-gray-300 text-gray-800"
                  >
                    {row[column]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <div>
          <label htmlFor="pageSize" className="mr-2 text-gray-600">
            Rows per page:
          </label>
          <select
            id="pageSize"
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="border rounded-md p-1 text-gray-700"
          >
            {[10, 25, 50, 100].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 rounded-md text-gray-700 hover:bg-gray-400 disabled:bg-gray-200"
          >
            Prev
          </button>
          <span className="text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 rounded-md text-gray-700 hover:bg-gray-400 disabled:bg-gray-200"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
