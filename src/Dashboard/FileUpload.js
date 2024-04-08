import React, { useState } from "react";
import NavBar from "./Components/NavBar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAuthentication from "../Auth/UseAuthentication";
function FileUpload() {
  useAuthentication();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true when submitting form
    const formData = new FormData();
    formData.append("filename", e.target.customFile.files[0]);
    formData.append("uid", localStorage.getItem("uid")); 
    try {
      const response = await axios.post("https://simplefileupload-node.onrender.com/store", formData);

      if (response.data.status === "success") {
        navigate("/dashboard");
      } else {
        console.error("File upload failed");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setLoading(false); // Set loading state back to false after request completes
    }
  };

  return (
    <>
      <NavBar />
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3 mt-5">
            <div className="card">
              <div className="card-body mx-auto">
                <h5 className="card-title text-center mb-4">Upload File</h5>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="customFile">
                      Default file input example
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="customFile"
                      name="filename"
                      required
                    />
                  </div>
                  <div className="form-group text-center">
                    <button type="submit" className="btn btn-primary btn-block mt-4" disabled={loading}>
                      {loading ? (
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      ) : (
                        "Upload"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FileUpload;
