import axios from "axios";
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateId } from "../redux/Slices/dataSlice";

const Pdf = () => {
  const [Clients, setClients] = useState();
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    getUsers();
    console.log(Clients);
  }, []);

  //------------FUNCTIONS------------

  const getUsers = () => {
    let url = "http://192.168.1.3:3001/clients";
    axios.get(url).then((response) => {
      setClients(response.data);
    });
  };

  const handleClick = (ID) => {
    dispatch(updateId(ID));
    Navigate(`/invoice/${ID}`);
  };

  if (!Clients) {
    return (
      <div className="w-screen h-screen bg-bg flex-col items-center place-content-center flex ">
        Loading please wait!!!!
      </div>
    );
  } else
    return (
      <div className="w-screen h-screen bg-bg flex-col items-center place-content-center flex ">
        <ul className=" justify-center flex-col overflow-y-scroll overflow-x-hidden">
          {Clients.map((client) => {
            return (
              <li
                onClick={() => handleClick(client.ID)}
                key={client.NAME}
                className=" border-solid border-2 hover:cursor-pointer hover:scale-95 border-black rounded-xl w-60 h-16 text-center place-self-center  m-5"
              >
                <p className="text-2xl font-semibold">{client.NAME}</p>
                <p className="text-xl">{client.SURNAME}</p>
              </li>
            );
          })}
        </ul>
      </div>
    );
};

export default Pdf;
