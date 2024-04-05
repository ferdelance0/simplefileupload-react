import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const uid = localStorage.getItem("uid");
        const email = localStorage.getItem("email");
        const response = await axios.get("http://localhost:3000/dashboard", {
          params: {
            uid,
            email,
          },
        });

        console.log(response.data);
        setFiles(response.data.documents);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Remove the dependency array, as it should only run once on mount

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome {localStorage.getItem("uid")}!</p>
      {files.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>File Name</th>
              <th>Content Type</th>
              <th>Download URL</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file, index) => (
              <tr key={index}>
                <td>{file.metadata.file_name}</td>
                <td>{file.metadata.contentType}</td>
                <td>
                  <a href={file.downloadURL} target="_blank" rel="noopener noreferrer">
                    Download
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No files uploaded yet.</p>
      )}
    </div>
  );
}

export default Dashboard;