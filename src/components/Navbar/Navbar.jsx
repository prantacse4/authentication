import React, { Fragment, useState, useEffect } from "react";
import classes from "./Navbar.module.css";
import styles from "../Index/Index.module.css";
import { Redirect } from "react-router";
import LoadingBar from "react-top-loading-bar";
import { NavLink } from "react-router-dom";

import { FiUser } from "react-icons/fi";
import { BiMessageSquareAdd } from "react-icons/bi";
import { GoHome } from "react-icons/go";
import { BiHomeSmile } from "react-icons/bi";
import { AiOutlineSlack } from "react-icons/ai";
import { AiOutlineCode } from "react-icons/ai";
import { BiUserPlus } from "react-icons/bi";
import { AiOutlineUserSwitch } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlinePoweroff } from "react-icons/ai";

const Navbar = ({ is_authenticated, logout }) => {
    const [isauth, setisauth] = useState(is_authenticated);
    useEffect(() => {
        setisauth(is_authenticated);
    }, [isauth]);
    const [navclass, setnavclass] = useState(" ")

    useEffect(() => {
        
        window.addEventListener('scroll', () => {
            console.log(window.scrollY);
            if(window.scrollY >= 100 ){
                setnavclass(classes.my_fixed);
            }
            else{
                setnavclass(" ");
            }
         });
    }, [])



    const notauthenticated = () => (
        <Fragment>
            <NavLink
                onClick={() => setProgress(100)}
                className={["dropdown-item", classes.myditem].join(" ")}
                activeClassName={classes.mydactive}
                exact
                to="/login"
            >
                <AiOutlineUserSwitch /> Login
            </NavLink>
            <NavLink
                onClick={() => setProgress(100)}
                className={["dropdown-item", classes.myditem].join(" ")}
                activeClassName={classes.mydactive}
                exact
                to="/signup"
            >
                <BiUserPlus /> Signup
            </NavLink>
        </Fragment>
    );

    const afterauth = () => (
        <Fragment>
            <NavLink
                onClick={() => setProgress(100)}
                className={["dropdown-item", classes.myditem].join(" ")}
                activeClassName={classes.mydactive}
                exact
                to="/profile"
            >
                <AiOutlineUser /> Profile
            </NavLink>

            <NavLink
                onClick={() => setProgress(100)}
                className={["dropdown-item", classes.myditem].join(" ")}
                activeClassName={classes.mydactive}
                exact
                to="/logout"
                onClick={logoutuser}
            >
                <AiOutlinePoweroff /> Logout
            </NavLink>
        </Fragment>
    );

    const logoutuser = (e) => {
        logout();
        setisauth(false);
        e.preventDefault();
        window.location.reload();
    };

    const [progress, setProgress] = useState(0);

    return (
        <div>
            <LoadingBar
                color="#f11946"
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
            />

            <nav
                className={[
                    "navbar",
                    "navbar-expand-md",
                    "navbar-dark",
                    classes.navbg,
                    classes.mynav, navclass
                ].join(" ")}
            >
                <NavLink
                    className="navbar-brand"
                    exact
                    to="/"
                    onClick={() => setProgress(100)}
                >
                    <span className={classes.mybrand}>প্রান্ত বিশ্বাস</span>
                </NavLink>
                <button
                    type="button"
                    className="navbar-toggler"
                    data-toggle="collapse"
                    data-target="#navbarCollapse"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <form className="form-inline">
                        <input
                            type="text"
                            className="mr-sm-2 myinput"
                            placeholder="Search"
                        />
                    </form>

                    <div className="navbar-nav ml-auto">
                        <NavLink
                            onClick={() => setProgress(100)}
                            className={[
                                "nav-item",
                                "nav-link",
                                classes.mylink,
                            ].join(" ")}
                            activeClassName={[classes.mylinkactive].join(" ")}
                            exact
                            to="/"
                        >
                            <BiHomeSmile />
                            <span> Home</span>
                        </NavLink>
                        <NavLink
                            onClick={() => setProgress(100)}
                            className={[
                                "nav-item",
                                "nav-link",
                                classes.mylink,
                            ].join(" ")}
                            activeClassName={[classes.mylinkactive].join(" ")}
                            exact
                            to="/portfolio"
                        >
                            <AiOutlineSlack />
                            <span> Portfolio</span>
                        </NavLink>

                        <NavLink
                            onClick={() => setProgress(100)}
                            className={[
                                "nav-item",
                                "nav-link",
                                classes.mylink,
                            ].join(" ")}
                            activeClassName={[classes.mylinkactive].join(" ")}
                            exact
                            to="/projects"
                        >
                            <AiOutlineCode />
                            <span> Projects</span>
                        </NavLink>

                        <NavLink
                            onClick={() => setProgress(100)}
                            className={[
                                "nav-item",
                                "nav-link",
                                classes.mylink,
                            ].join(" ")}
                            activeClassName={[classes.mylinkactive].join(" ")}
                            exact
                            to="/about"
                        >
                            <AiOutlineCode />
                            <span> About</span>
                        </NavLink>
                    </div>
                    <div className="navbar-nav dropdown ml-2 mr-2">
                        <button
                            className={styles.roundbtn}
                            type="button"
                            id="dropdownMenu2"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            <FiUser />
                        </button>
                        <div
                            className={[
                                "dropdown-menu",
                                "dropdown-menu-md-right",
                                classes.mydropdown,
                            ].join(" ")}
                            aria-labelledby="dropdownMenu2"
                        >
                            {is_authenticated === true
                                ? afterauth()
                                : notauthenticated()}
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
