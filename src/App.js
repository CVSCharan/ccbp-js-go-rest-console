import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [reqBody, setReqBody] = useState("");
  const [reqMethod, setReqMethod] = useState("POST");
  const [resBody, setResBody] = useState("");
  const [resStatus, setResStatus] = useState("");
  const [buttonClick, setButtonClick] = useState(false);
  const [reqUrl, setReqUrl] = useState("https://gorest.co.in/public-api/users");

  const onChangeMethod = (e) => {
    setReqMethod(e.target.value);
    setButtonClick(false);
  };

  const onChangeReqBody = (e) => {
    setReqBody(e.target.value);
    setButtonClick(false);
  };

  const onClickButton = (e) => {
    e.preventDefault();
    setButtonClick(true);
  };

  useEffect(() => {
    let options = {
      method: reqMethod,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization:
          "Bearer b2d8461de1f1eac9ca5df728892265d23f55ebe156521d9ee866aa61132526e6",
      },
      body: reqBody,
    };
    fetch(reqUrl, options)
      .then(function (response) {
        return response.json();
      })
      .then(function (jsonData) {
        let responseStatus = jsonData.code;
        let responseBody = JSON.stringify(jsonData);
        setResStatus(responseStatus);
        setResBody(responseBody);
        console.log(responseBody, responseStatus);
      });
  }, [buttonClick, reqBody, reqMethod, reqUrl]);

  const respBody = buttonClick ? resBody : "";

  return (
    <div className="bg-container">
      <div className="container">
        <div className="row p-3 d-flex flex-row justify-content-center console-container">
          <h1 className="col-12 mb-2 text-center heading">GO REST CONSOLE</h1>
          <form className="col-11" id="consoleForm" onSubmit={onClickButton}>
            <div className="mb-2">
              <label>Request URL</label>
              <input
                id="requestUrl"
                className="form-control"
                type="text"
                value={reqUrl}
              />
              <p id="requestUrlErrMsg" className="error-message"></p>
            </div>
            <div className="mb-2">
              <label>Request Method</label>
              <select
                id="requestMethod"
                className="form-control mb-2"
                onChange={onChangeMethod}
              >
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
              </select>
            </div>
            <div className="mb-2">
              <label>Request Body</label>
              <textarea
                id="requestBody"
                className="form-control w-100"
                rows="5"
                value={reqBody}
                onChange={onChangeReqBody}
              ></textarea>
            </div>
            <div className="text-right">
              <button
                type="submit"
                className="p-2 btn btn-primary"
                id="sendRequestBtn"
              >
                Send Request
              </button>
            </div>
          </form>
          <div className="col-11 mt-4">
            <label>Response Status</label>
            <input
              id="responseStatus"
              className="form-control"
              type="text"
              value={resStatus}
            />
          </div>
          <div className="col-11 mt-2">
            <label>Response Body</label>
            <textarea
              id="responseBody"
              className="form-control w-100"
              rows="6"
              value={respBody}
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
