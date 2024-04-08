import React from "react";
import { useState } from "react";
import axios from "axios";
function FileTable({ files }) {
  const [loading, setLoading] = useState(false);
  const handleDelete = async (fileId) => {
    setLoading(true);
    try {
      const confirmed = window.confirm("Are you sure you want to delete this file?");
      if (!confirmed) {
        setLoading(false);
        return;
      }
      console.log(localStorage.getItem("uid"), fileId);
      const response = await axios.post(`https://simplefileupload-node.onrender.com/delete`, {
        params: {
          uid: localStorage.getItem("uid"),
          fileId: fileId
        }
      }
      )
      if (response.data.status === "success") {
        window.location.reload();
      }
      else {
      }
    } catch (error) {
      setLoading(false);
      console.error('Error deleting file:', error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="container">
      {files.length > 0 ? (
        <table className="table mx-auto " style={{ width: "75%" }}>
          <thead className="thead-light">
            <tr>
              <th>File Name</th>
              <th>Content Type</th>
              <th>Download</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file, index) => (
              <tr key={index}>
                <td>{file.metadata.file_name}</td>
                <td>{file.metadata.contentType}</td>
                <td>
                  <a href={file.downloadURL} target="_blank" rel="noopener noreferrer">
                    <button className="btn btn-primary" type="button"><i className="bi bi-cloud-download"></i></button>
                  </a>
                </td>
                <td>
                  <a>

                    <button className="btn btn-danger" type="button" onClick={() => handleDelete(file.id)}>
                    {loading ?<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                     : <i className="bi bi-x-lg"></i>}
                    </button>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h6 className="text-center">No files uploaded yet.</h6>
      )}
    </div>
  );
}

export default FileTable;
