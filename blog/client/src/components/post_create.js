import React, { useState } from "react";
import axios from "axios";

export const PostCreate = () => {
  const [title, setTitle] = useState("");

  const sendForm = async (event) => {
    event.preventDefault();

    await axios.post("http://localhost:4000/posts", {
      title: title,
    });

    setTitle("");
  };

  return (
    <div>
      <form onSubmit={sendForm}>
        <div className="form-group">
          <label>Title</label>
          <input
            value={title}
            className="form-control"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};
