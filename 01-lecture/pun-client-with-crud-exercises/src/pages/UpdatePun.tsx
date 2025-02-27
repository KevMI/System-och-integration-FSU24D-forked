import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { IPun, PunUpdate } from "../types/Pun"
import { useParams } from "react-router";
import axios from "axios";
import { API_URL } from "../services/baseService";
import { getToken } from "../services/authService";
import { formatDate } from "../utils/dateUtils";

export const UpdatePun = () => {
  // Exercise 1: Create a state variable to store the pun
  // Exercise 2: Create a useEffect hook to fetch the pun from the API, using the id from the URL
  // Exercise 3: Display the pun contents in the form
  // Exercise 4: Handle changes in the form
  // Exercise 5: Create a function to update the pun, and call it when the form is submitted
  // Exercise 6: Redirect to the ManagePuns page after updating the pun
  // Exercise 7: Add a back link to the ManagePuns page

  const [pun, setPun] = useState<IPun | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const getPun = async () => {

      const options = {
        headers: {
          Authorization: "Bearer " + await getToken()
        }
      }

      const response = await axios.get<IPun>(`${API_URL}/puns/${id}`, options);
      setPun(response.data);
    };
    getPun();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (pun) {
      setPun({...pun, content: e.target.value});
    };
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const payload: PunUpdate = {
      content: pun?.content || ""
    };

    const options = {
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + await getToken(),
      }
    }

    await axios.patch(`${API_URL}/puns/${id}`, payload, options);
  }

  return (
    <div>
      <h2>Update Pun</h2>

      <form onSubmit={handleSubmit}>
        <textarea 
          name="" 
          id="" 
          cols={30} 
          rows={10} 
          value={pun?.content}
          onChange={(e) => handleChange(e)}
        />

        <p>{pun ? formatDate(pun.date) : "Date not available."}</p>

        <button>Update</button>

        &#x2190; back-link
      </form>
    </div>
  )
}
