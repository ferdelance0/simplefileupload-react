import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "./Components/NavBar";
import FileTable from "./Components/FileTable";
import useAuthentication from "../Auth/UseAuthentication";

   function Dashboard() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false); // Add loading state
   useAuthentication();
  const fetchData = async () => {
    try {
      setLoading(true); // Set loading to true when fetching data
      const uid = localStorage.getItem("uid");
      const email = localStorage.getItem("email");
      const response = await axios.get("https://simplefileupload-node.onrender.com/dashboard", {
        params: {
          uid,
          email,
        },
      });
      setFiles(response.data.documents);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Set loading back to false after fetching completes
    }
  };
  useEffect(() => {
    fetchData();
  }, []); // Fetch data only once when component mounts

  return (
    <div>
      <NavBar />
      <h1 className="text-center mt-4">Dashboard</h1>
      <p className="text-center">Welcome {localStorage.getItem("email")}!</p>
      {loading ? (
        <div className="text-center mt-4">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <FileTable files={files} />
      )}
    </div>
  );
}

export default Dashboard;
