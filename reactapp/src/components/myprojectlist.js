import React, { useState, useEffect, useMemo, useRef } from "react";
import MyProjectsListService from "../services/myProjectsListService";
import { useTable } from "react-table";

const MyProjectsList = (props) => {
  const [myProjects, setMyProjects] = useState([]);
  const [searchName, setSearchName] = useState("");
  const myProjectsRef = useRef();

  myProjectsRef.current = myProjects;

  useEffect(() => {
    retrieveMyProjects();
  }, []);

  const onChangeSearchName = (e) => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const retrieveMyProjects = () => {
    MyProjectsListService.getAll()
      .then((response) => {
        setMyProjects(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByName = () => {
    MyProjectsListService.findByName(searchName)
      .then((response) => {
        setMyProjects(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  function search(rows) {
    return rows.filter(
      (row) => row.name.toLowerCase().indexOf(searchName) > -1
    );
  }

  const openMyProjects = (rowIndex) => {
    const id = myProjectsRef.current[rowIndex].id;

    props.history.push("/my-projects/" + id);
  };

  const deleteMyProjects = (rowIndex) => {
    const id = myProjectsRef.current[rowIndex].id;

    MyProjectsListService.remove(id)
      .then((response) => {
        props.history.push("/my-projects");

        let newmyProjects = [...myProjectsRef.current];
        newmyProjects.splice(rowIndex, 1);

        setMyProjects(newmyProjects);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Owner ID",
        accessor: "members",
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: (props) => {
          const rowIdx = props.row.id;
          return (
            <div>
              <span onClick={() => openMyProjects(rowIdx)}>
                <i className="far fa-edit action mr-2"></i>
              </span>

              <span onClick={() => deleteMyProjects(rowIdx)}>
                <i className="fas fa-trash action"></i>
              </span>
            </div>
          );
        },
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data: myProjects,
  });

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Name"
            value={searchName}
            onChange={onChangeSearchName}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByName}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-12 list">
        <table
          className="table table-striped table-bordered"
          {...getTableProps()}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyProjectsList;