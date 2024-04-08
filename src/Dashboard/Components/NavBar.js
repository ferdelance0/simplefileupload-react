import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
function NavBar() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleLogout = async () => {
        localStorage.removeItem('uid');
        localStorage.removeItem('email');
        const response = await axios.get("https://simplefileupload-node.onrender.com/logout")
        if (response.data.status === "success") {
            console.log(localStorage.getItem('uid'));
            console.log("Logout success")
            setLoading(false);
            navigate('/')

        }
        else {
            console.log(response.data.status);
        }
    }
    const handleTruncate = async () => {
        setLoading(true);
        const confirmed = window.confirm("Are you sure you want to truncate this table?");
        if (!confirmed) {
            setLoading(false);
            return;
        }
    
        const response = await axios.post(`https://simplefileupload-node.onrender.com/truncate`, {
            params: {
                uid: localStorage.getItem("uid"),
            }
        })
        if (response.data.status === "success") {
            window.location.reload();
        }
        else {
            console.log("Error truncating table");
        }
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <a className="navbar-brand" href="#">Simple File Upload</a>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                        <ul className="navbar-nav">
                            <li className="nav-item ">
                                <Link className="nav-link" to="/dashboard">Dashboard</Link>
                            </li>
                            {loading ? (<li className="nav-item ">
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </li>) : <li className="nav-item ">
                                
                                <a className="nav-link" onClick={handleTruncate}>Truncate Table</a>
                            </li>}
                            <li className="nav-item">
                                <Link className="nav-link" to="/upload">File Upload</Link>
                            </li>
                            <li>
                                <button className="btn btn-danger my-2 my-sm-0" type="submit" onClick={handleLogout}>Logout</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default NavBar;
