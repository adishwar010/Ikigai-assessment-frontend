import React, { useEffect, useState } from "react";
import { useTable, usePagination } from "react-table";
import axios from "axios";

const ADSATable = () => {
  const [data, setData] = useState([]);
  useEffect(async () => {
    if (localStorage.getItem("Admin")) {
      const config = {
        headers: {
          Authorization: `Admin ${localStorage.getItem("Admin")}`,
        },
      };
      try {
        const res = await axios.get("/api/v1/admin/registrationStats", config);
        // console.log(res.data.data.users);
        setData(res.data.data.users);
      } catch (err) {
        console.log(err);
        if (err.response && err.response.data) alert(err.response.data.message);
      }
    } else {
    }
  }, []);

  async function onDelete(id) {
    const config = {
      headers: {
        Authorization: `Admin ${localStorage.getItem("Admin")}`,
      },
    };

    try {
      const res = await axios.delete(
        `/api/v1/admin/registrationStats/${id}`,
        config
      );
      alert(res.data.message);
    } catch (err) {
      console.log(err.response.data);
      if (err.response.data && err.response.data.message) {
        alert(err.response.data.message);
      }
    }
  }

  const columns = React.useMemo(
    () => [
      {
        Header: "Student Name",
        accessor: "name",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Contact No.",
        accessor: "phone",
      },
      {
        Header: "University Name",
        accessor: "university",
      },
      {
        Header: "Branch",
        accessor: "branch",
      },
      {
        Header: "Delete Data",
        // accessor: "delete",
        Cell: ({ cell }) => (
          <div
            style={{ cursor: "pointer" }}
            onClick={() => onDelete(cell.row.original._id)}
          >
            <i style={{ color: "#C82333" }} class="fas fa-trash"></i>
          </div>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    usePagination
  );

  return (
    <>
      <div class="table-responsive">
        <table
          {...getTableProps()}
          className="table  table-hover mx-auto w-auto"
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    style={{
                      // padding: "10px",
                      paddingTop: "10px",
                      paddingBottom: "10px",
                      paddingRight: "30px",
                      paddingLeft: "30px",
                      border: "solid 1px gray",
                      cursor: "pointer",
                    }}
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        style={{
                          padding: "10px",
                          border: "solid 1px gray",
                        }}
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="pagination ">
          <div className="container text-center mb-5">
            <span className="">
              Page{" "}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>{" "}
            </span>
            <div className="mt-3">
              <button
                onClick={() => gotoPage(0)}
                disabled={!canPreviousPage}
                className="btn btn-primary"
              >
                {"<<"}
              </button>{" "}
              <button
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
                className="btn btn-primary"
              >
                {"<"}
              </button>{" "}
              <button
                onClick={() => nextPage()}
                disabled={!canNextPage}
                className="btn btn-primary"
              >
                {">"}
              </button>{" "}
              <button
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}
                className="btn btn-primary"
              >
                {">>"}
              </button>{" "}
            </div>
            <br />
            <span className="">
              Go to page:{" "}
              <input
                type="number"
                defaultValue={pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  gotoPage(page);
                }}
                style={{ width: "30px" }}
              />
            </span>{" "}
            <span className="ml-3">
              Rows Per Page:{" "}
              <select
                value={pageSize}
                className=""
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                }}
              >
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </select>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ADSATable;
