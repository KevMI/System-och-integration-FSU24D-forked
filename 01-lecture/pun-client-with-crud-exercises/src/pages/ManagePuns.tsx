import { useEffect, useState } from "react"
import { IPun } from "../types/Pun";
import axios from "axios";
import { getToken } from "../services/authService";
import { formatDate } from "../utils/dateUtils";
import { NavLink } from "react-router";
import { API_URL } from "../services/baseService";

export const ManagePuns = () => {
  // Exercise 1: Create a state variable to store the puns
  // Exercise 2: Create a useEffect hook to fetch the puns from the API
  // Exercise 3: Display the puns in the page
  // Exercise 4: Create a function to delete a pun, and call it when the delete link is clicked
  // Exercise 5: Add a link to the UpdatePun page, passing the pun id as a parameter

  const [puns, setPuns] = useState<IPun[]>([]);

  useEffect(() => {
    const fetchPuns = async () => {
      const options = {
        headers: {
          Authorization: "Bearer " + await getToken()
        }
      }
  
      const response = await axios.get<IPun[]>(`${API_URL}/puns`, options);
      setPuns(response.data);
    };

  fetchPuns();
  }, []);

  const handleClick = (id: string) => {
    const deletePun = async () => {
      const options = {
        headers: {
          Authorization: "Bearer " + await getToken()
        }
      }
      await axios.delete(`${API_URL}/puns/${id}`, options);
      setPuns(puns.filter((p) => p._id !== id));
    };
    deletePun();
  }


  return (
    <div>
      <h2>Manage Puns</h2>

      <section id="pun-list">
        {puns.map((p) => {
          return <>
              <article className="list-group-item">
              <section>
                <p>{p.content}</p>
                <p className='date'>{formatDate(p.date)}</p>
              </section>
              
              <section>
                <NavLink to={`/update-pun/${p._id}`}>Update </NavLink>
                |
                <a onClick={() => handleClick(p._id)}> Delete</a>
              </section>
            </article>
          </>
        })}
      </section>
    </div>
  )
}
