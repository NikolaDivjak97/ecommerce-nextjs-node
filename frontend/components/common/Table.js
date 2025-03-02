import { useRouter } from "next/router";

export default function Table({ columns, data, currentPage, pageSize, total, onPageChange, onPageSizeChange, editRoute }) {
  const router = useRouter();
  const totalPages = Math.ceil(total / pageSize);

  const editRow = (rowId) => {
    router.push(`${editRoute}/${rowId}`);
  };

  return (
    <div>
      <div>
        <table className="min-w-full">
          <thead className="bg-gray-800 text-white">
            <tr>
              {columns.map((column) => (
                <th key={column} className="px-6 py-3 text-left text-sm font-semibold uppercase">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => editRow(row.id)}>
                {columns.map((column) => (
                  <td key={column} className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
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
          <label htmlFor="pageSize" className="mr-2 text-sm text-gray-600">
            Rows per page:
          </label>
          <select id="pageSize" value={pageSize} onChange={(e) => onPageSizeChange(Number(e.target.value))} className="border border-gray-300 rounded-md p-1 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
            {[10, 25, 50, 100].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed">
            Prev
          </button>
          <span className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
