import React, { useState, useEffect, useMemo, useRef } from "react";
import MyProjectsListService from "../services/myProjectsListService";
import { useTable } from "react-table";
import axios from "axios";
import img from './projects.png';
import Cookies from "universal-cookie";
const cookies = new Cookies();

const MyProjectsList = (props) => {
  const [myProjects, setMyProjects] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [userPK, setUserPK] = useState(0);
  const myProjectsRef = useRef();

  myProjectsRef.current = myProjects;

  //useEffect acts like componentDidMount if you pass in empty array
  //as second argument.
  useEffect(() => {
    componentDidMount();
  }, []);

  const componentDidMount = async () => {

    await axios.get(`http://127.0.0.1:8000/api/v1/dj-rest-auth/user/`,{ 
        headers: {
            'Content-Type': 'application/json',
            "X-CSRFToken": cookies.get("csrftoken"),
        }
    })
    .then(res => {
        console.log((res.data).pk);
        setUserPK((res.data).pk);
        window.$user_pk = (res.data).pk;
        console.log(`current state of userPK ${window.$user_pk}`);
    });

    
    await axios.get(`http://127.0.0.1:8000/api/v1/profiles/${window.$user_pk}/projects/`,{ 
        headers: {
            'Content-Type': 'application/json',
            "X-CSRFToken": cookies.get("csrftoken"),
        }
    })
        .then((response) => {
          setMyProjects(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    

  const onChangeSearchName = async (e) => {
    const searchName = e.target.value;
    await setSearchName(searchName);
  };

  const findByName = async () => {
    await axios.get(`http://127.0.0.1:8000/api/v1/profiles/${searchName}/projects/`,{ 
        headers: {
            'Content-Type': 'application/json',
            "X-CSRFToken": cookies.get("csrftoken"),
        }
    })
      .then((response) => {
        setMyProjects(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const openMyProjects = (rowIndex) => {
    const id = myProjectsRef.current[rowIndex].id;

    props.history.push("/my-projects/" + id);
  };

  const deleteMyProjects = async (rowIndex) => {
    const id = myProjectsRef.current[rowIndex].id;

    await MyProjectsListService.remove(id)
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
    <div class="card">

    <img class="card-img-top" src={img} alt=""/>
    
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by user_id"
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
    </div>
  );
};

export default MyProjectsList;