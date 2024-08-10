import React, { useEffect, useState, useRef } from "react";
import { CgNotes } from "react-icons/cg";
import {
  MdLabelImportant,
  MdOutlinePendingActions,
  MdIncompleteCircle,
} from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle.min"; // Import Bootstrap JS

const prourl = "https://project-management-tool-av.onrender.com";

const Nav = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [data1, setData1] = useState();
  const offcanvasRef = useRef(null);
  const overlayRef = useRef(null);

  const data = [
    { title: "All tasks", icon: <CgNotes />, link: "/" },
    {
      title: "Important tasks",
      icon: <MdLabelImportant />,
      link: "/importanttask",
    },
    {
      title: "Completed tasks",
      icon: <MdIncompleteCircle />,
      link: "/completedtask",
    },
    {
      title: "Incomplete tasks",
      icon: <MdOutlinePendingActions />,
      link: "/Incompletetask",
    },
  ];

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`${prourl}/api/get-all-tasks`, {
          headers: { id: localStorage.getItem("id") },
        });
        setData1(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    if (localStorage.getItem("id") && localStorage.getItem("token")) {
      fetch();
    }
  }, []);

  const Logout = () => {
    dispatch(authActions.logout());
    localStorage.clear();
    history("/signup");
  };

  const toggleOffcanvas = (show) => {
    if (window.bootstrap && offcanvasRef.current) {
      const offcanvas = window.bootstrap.Offcanvas.getInstance(
        offcanvasRef.current
      );
      if (show) {
        if (offcanvas) {
          offcanvas.show();
        } else {
          new window.bootstrap.Offcanvas(offcanvasRef.current).show();
        }
      } else {
        if (offcanvas) {
          offcanvas.hide();
        }
      }
    }
    if (overlayRef.current) {
      overlayRef.current.classList.toggle("d-none", !show); // Show or hide overlay
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand mx-2" href="#">
            Task Management
            {data1 && (
              <div>
                <h2 className="text-xl mt-4  font-semibold">
                  {data1.username}
                </h2>
                {/* <h4 className="mb-1">{data1.email}</h4> */}
              </div>
            )}
          </a>

          <button
            className="navbar-toggler"
            type="button"
            onClick={() => toggleOffcanvas(true)}
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="offcanvas offcanvas-end bg-dark text-light"
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            ref={offcanvasRef}
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                {data1 && (
                  <div>
                    <h2 className="text-xl font-semibold">{data1.username}</h2>
                    <h4 className="mb-1">{data1.email}</h4>
                  </div>
                )}
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
                onClick={() => toggleOffcanvas(false)}
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav">
                {data.map((item, i) => (
                  <li className="nav-item" key={i}>
                    <Link
                      className="nav-link text-light"
                      to={item.link}
                      onClick={() => toggleOffcanvas(false)}
                    >
                      {item.icon} {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
              {/* <form className="d-flex mt-3" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="btn btn-outline-light" type="submit">
                  Search
                </button>
              </form> */}
              <button className="btn  btn-danger mt-80" onClick={Logout}>
                Log Out
              </button>
            </div>
          </div>
        </div>
      </nav>
      <div
        className="overlay d-none"
        ref={overlayRef}
        onClick={() => toggleOffcanvas(false)}
      ></div>
      <style>
        {`
          .overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 1040; /* Bootstrap's z-index for offcanvas */
            transition: opacity 0.3s ease;
          }
          .overlay.d-none {
            display: none;
          }
        `}
      </style>
    </>
  );
};

export default Nav;
