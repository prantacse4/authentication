import React, {useState, useEffect} from "react";
import Home from "../Home/Home";
import Navbar from "../Navbar/Navbar";
// import '../../Bootstrap/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import Login from "../Login/Login";
import axios from 'axios';
import {domain} from '../env';
import LoadingBar from 'react-top-loading-bar';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    // Redirect,
    // Redirect,
    // Link,
    // NavLink
  } from "react-router-dom";
import {UserDataContext} from '../ContextAPI/AuthContext.jsx'

import Signup from "../Signup/Signup";
import Profile from "../Profile/Profile";
import Hello from "../Hello";
import Activate from "../Activate/Activate";
const Index = () => {
    const initAccess = 'KSJHUYAUHJCNJKWEYAJNCUNKNOWN';
    const baseURL = domain;
    const [user, setUser] = useState({});

 const [is_authenticated, setIs_authenticated] = useState(false);
 const [data_isLoaded, setData_isLoaded] = useState(false);
 const [progress, setProgress] = useState(0);

    // const LoginVerify = async() =>{
    //     try {
    //         const token = "token "+localStorage.getItem("auth_token");
    //         const config = {
    //             headers:{
    //                 'Authorization': token
    //             }
    //         }

    //         await axios.get(
    //             baseURL + "/auth/users/me/",
    //             config,
                
    //         ).then((response) => {
    //             console.log(response.data);
    //             setUser({
    //                 first_name:response.data.first_name,
    //                 last_name:response.data.last_name,
    //                 id:response.data.id,
    //                 email:response.data.email,
    //             });
    //             setIs_authenticated(true);
    //             setData_isLoaded(true);
                
    //         }).catch((error)=>{
    //             console.log(error);
    //             setIs_authenticated(false);
    //             setData_isLoaded(true);
    //         });
            
    //     } catch (error) {
            
    //     }
    // }
    // if (data_isLoaded==false) {
    //     LoginVerify();
    // }

    // useEffect(() => {
    //     setData_isLoaded(data_isLoaded);
    // }, [data_isLoaded]);


 
    // useEffect(() => {
    //     console.log("Get USer when Data loaded Change", user);
    //     console.log(is_authenticated)
    //     if(user!==null || user!==""){
    //         setIs_authenticated(true);
    //     }
    //     else{
    //         setIs_authenticated(false);
    //     }
    // }, [data_isLoaded]);



    const logout = async () => {
        
        try {
            const tokenLog = "token " + localStorage.getItem("auth_token");
            const config = {
                headers: {
                    "Authorization": tokenLog,
                },
            };
            const logouturl = baseURL+"/auth/token/logout/";
            console.log(logouturl);

            await axios.post(logouturl,{},config)
                .then((response) => {
                    console.log(response);
                    setIs_authenticated(false);
                    setUser({});
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            console.log(error.response);
        }
    };
    
    const [loading, setLoading] = useState(false);
    const loginVerify = () =>{
        const token = "token "+localStorage.getItem("auth_token");
        const config = {
            headers:{
                'Authorization': token
            }
        }
        axios.get(
        baseURL + "/auth/users/me/",
        config,
            
        ).then((response) => {
            console.log(response.data);
            setUser({
                id:response.data.id,
                first_name:response.data.first_name,
                last_name:response.data.last_name,
                email:response.data.email,
            });
            setIs_authenticated(true);
            setLoading(true);

            
        }).catch((error)=>{
            console.log(error);
            setIs_authenticated(false);
            setLoading(true);

        });
    }

    useEffect(() => {
        loginVerify();
    }, []);
    
    if (loading==false) return null;

    return (
        
        <div>
            
            <Router>

            <Navbar is_authenticated={is_authenticated} logout={logout} ></Navbar>
                <Switch>
                    <Route exact path="/">
                        <Home user = {user} is_authenticated={is_authenticated} />
                    </Route>
                    <Route exact path="/login">
                        <Login  is_authenticated={is_authenticated} loginVerify={loginVerify}  setIs_authenticated={setIs_authenticated} setUser={setUser}  />
                    </Route>

                    <Route exact path="/signup">
                        <Signup is_authenticated={is_authenticated} />
                    </Route>
                         
                    <Route exact path ="/profile">
                        <UserDataContext.Provider value={user}>
                            <Profile  is_authenticated={is_authenticated} logout={logout}  />
                        </UserDataContext.Provider>
                        {/* <Profile is_authenticated={is_authenticated} user={user} setIs_authenticated={setIs_authenticated}  /> */}
                    </Route>
                    <Route 
                        exact 
                        path='/activate/:uid/:token'
                        component={Activate}
                    />
                     
                    <Route exact path ="/hello/">
                        <Hello />
                    </Route>
                </Switch>
            </Router>
            <div>

                {
                    is_authenticated===false ? (
                    <div className="text-center">
                        <div className="alert alert-danger">Not Logged IN</div>
                    </div>
                    ):(
                        <div className="alert alert-success">Logged In Successfully</div>
                    )
                }
            </div>
       
        
        
        
        
        </div>




    );
};

export default Index;
