import React from "react";
import axios from "axios";
function FileTable({ files }) {
  const handleDelete = async (fileId) => {
    try {
      const confirmed = window.confirm("Are you sure you want to delete this file?");
      if (!confirmed) {
        return;
      }

      console.log(localStorage.getItem("uid"), fileId);
      const response = await axios.post(`http://localhost:3000/delete`, {
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
      console.error('Error deleting file:', error);
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

                    <button className="btn btn-danger" type="button" onClick={() => handleDelete(file.id)}><i className="bi bi-x-lg"></i></button>
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
