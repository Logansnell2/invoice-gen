import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import loadImg from "../assets/loading.gif";
import axios from "axios";

const Questions = () => {
  const [que, SetQue] = useState(0);
  const [loading, SetLoading] = useState(true);
  const [name, SetName] = useState("");
  const [surname, SetSurname] = useState("");
  const [cell, SetCell] = useState("");
  const [rate, SetRate] = useState("");

  const navigate = useNavigate();
  //--------------FUNCTIONS---------------------
  function handleClick(place) {
    navigate(`/${place}`);
  }

  useEffect(() => {
    createNewClient();
  }, [rate]);

  function createNewClient() {
    const url = "http://192.168.1.3:3001/createNewClient";

    let id = cell.split("");
    console.log(id);
    let idnew = id.slice(5).toString();
    let ClenId = idnew.replace(/[^a-zA-Z0-9 ]/g, "");
    console.log(ClenId);

    let data = {
      Name: name,
      Surname: surname,
      Cell: cell,
      Rate: rate,
      ID: ClenId,
    };

    axios.put(url, data).then((response) => {
      if (response.data.message == "Client Created") {
        SetLoading(false);
      }
    });
  }

  function handleNext(question) {
    let data = "";
    switch (question) {
      case 0:
        data = document.getElementById("input").value;
        SetName(data);
        document.getElementById("input").value = "";
        SetQue(question + 1);
        break;
      case 1:
        data = document.getElementById("input").value;
        SetSurname(data);
        document.getElementById("input").value = "";
        SetQue(question + 1);
        break;
      case 2:
        data = document.getElementById("input").value;
        SetCell(data);
        document.getElementById("input").value = "";
        SetQue(question + 1);
        break;
      case 3:
        data = document.getElementById("input").value;
        SetRate(data);
        SetQue(question + 1);

        break;

      default:
        break;
    }
  }

  switch (que) {
    case 0:
      return (
        <div className="w-screen h-screen bg-bg flex-col items-center place-content-center flex ">
          <p className="absolute top-1/3 text-2xl">
            Congratulations On your New Client!
          </p>
          <form className=" flex-col flex items-center">
            <label className="text-2xl mb-2">What is thier Name? </label>
            <input type="text" className="h-10" id="input" />
          </form>
          <button
            onClick={() => handleNext(0)}
            className=" border-4 border-sec p-3 rounded-lg bg-sec text-bg text-xl active:scale-95 shadow-2xl mt-10 w-32 "
            type="button"
          >
            Next
          </button>
        </div>
      );
      break;
    case 1:
      return (
        <div className="w-screen h-screen bg-bg flex-col items-center place-content-center flex ">
          <form className=" flex-col flex items-center">
            <label className="text-2xl mb-2">What is thier Surname? </label>
            <input type="text" className="h-10" id="input" />
          </form>
          <button
            onClick={() => handleNext(1)}
            className=" border-4 border-sec p-3 rounded-lg bg-sec text-bg text-xl active:scale-95 shadow-2xl mt-10 w-32 "
            type="button"
          >
            Next
          </button>
        </div>
      );
      break;
    case 2:
      return (
        <div className="w-screen h-screen bg-bg flex-col items-center place-content-center flex ">
          <form className=" flex-col flex items-center">
            <label className="text-2xl mb-2">
              What's thier Cellphone Number?{" "}
            </label>
            <input type="number" className="h-10" id="input" />
          </form>
          <button
            onClick={() => handleNext(2)}
            className=" border-4 border-sec p-3 rounded-lg bg-sec text-bg text-xl active:scale-95 shadow-2xl mt-10 w-32 "
            type="button"
          >
            Next
          </button>
        </div>
      );

      break;
    case 3:
      return (
        <div className="w-screen h-screen bg-bg flex-col items-center place-content-center flex ">
          <form className=" flex-col flex items-center">
            <label className="text-2xl mb-2">Lastly,</label>
            <label className="text-xl text-center mb-2">
              How Much Do you want to charge them per Hour?
            </label>
            <input
              type="number"
              defaultValue={300}
              className="h-10 text-center"
              id="input"
            />
          </form>

          <button
            onClick={() => handleNext(3)}
            className=" border-4 border-sec p-3 rounded-lg bg-sec text-bg text-xl active:scale-95 shadow-2xl mt-10 w-32 "
            type="button"
          >
            Next
          </button>
        </div>
      );

      break;
    case 4:
      if (loading == true) {
        return (
          <div className="w-screen h-screen bg-bg flex-col items-center place-content-center flex ">
            <p>Creating New Client</p>
            <img src={loadImg} alt="" />
          </div>
        );
      } else
        return (
          <div className="w-screen h-screen bg-bg flex-col items-center place-content-center flex ">
            <button
              onClick={() => handleClick("invoice")}
              className=" border-4 border-sec p-3 rounded-lg bg-sec text-bg text-xl active:scale-95 shadow-2xl mt-10 w-32 "
              type="button"
            >
              Create a New Invoice
            </button>
          </div>
        );

      break;

    default:
      return (
        <div className="w-screen h-screen bg-bg flex-col items-center place-content-center flex ">
          <div className="mb-5 text-2xl">Oops! How embarassing,</div>
          <div className="mb-16 text-lg">There has been an error</div>

          <button
            onClick={() => handleClick("")}
            className=" border-4 border-sec p-3 rounded-lg bg-sec text-bg text-xl active:scale-95 shadow-2xl "
            type="button"
          >
            Go Back
          </button>
        </div>
      );
      break;
  }
};

export default Questions;

// name
// surname
// cell
// rate
