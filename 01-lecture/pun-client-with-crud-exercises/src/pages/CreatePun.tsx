import { FormEvent, useState } from "react"
import { PunCreate } from "../types/Pun";
import { getToken } from "../services/authService";
import axios from "axios";
import { API_URL } from "../services/baseService";
import { Navigate, useNavigate } from "react-router";

export const CreatePun = () => {

  // Exercise 1: Create a state variable to store the pun content
  // Exercise 2: Handle changes in the form
  // Exercise 3: Create a function to create the pun, and call it when the form is submitted
  // Exercise 4: Redirect to the ManagePuns page after creating the pun
  // Exercise 5: Add a back link to the ManagePuns page 
  const navigate = useNavigate();
  const [punContent, setPunContent] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const payload: PunCreate = {
      content: punContent
    }

    const options = {
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + await getToken(),
      }
    }

    await axios.post(`${API_URL}/puns`, payload, options);
    navigate("/")
    };
  
  return (
    <div>
      <h2>Create Pun</h2>

      <form onSubmit={handleSubmit}>
        <textarea 
          name="" 
          id="" 
          cols={30} 
          rows={10} 
          value={punContent}
          onChange={(e) => setPunContent(e.target.value)}
        />

        <button>Create</button>

        &#x2190; back-link
      </form>
    </div>
  )
}
