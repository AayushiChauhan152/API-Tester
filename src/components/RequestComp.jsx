import React, { useState } from "react";
import axiosInstance from "../config/proxyConfig";

function RequestComp() {
  const [requests, setRequests] = useState([
    { id: Date.now(), method: "GET", url: "", headers: [], body: "" },
  ]);
  const [response, setResponse] = useState(null);

  const handleChange = (index, field, value) => {
    const newRequests = [...requests];
    newRequests[index][field] = value;
    setRequests(newRequests);
  };

  const handleHeaderChange = (reqIndex, headerIndex, field, value) => {
    const newRequests = [...requests];
    newRequests[reqIndex].headers[headerIndex][field] = value;
    setRequests(newRequests);
  };

  const addHeader = (index) => {
    const newRequests = [...requests];
    newRequests[index].headers.push({ key: "", value: "" });
    setRequests(newRequests);
  };

  const removeHeader = (reqIndex, headerIndex) => {
    const newRequests = [...requests];
    newRequests[reqIndex].headers.splice(headerIndex, 1);
    setRequests(newRequests);
  };

  const sendRequest = async (index) => {
    const { method, url, headers, body } = requests[index];

    const headersObj = headers.reduce((acc, h) => {
      if (h.key && h.value) acc[h.key] = h.value;
      return acc;
    }, {});

    try {
      const hasBody = ["POST", "PUT", "PATCH", "DELETE"].includes(method);

      const res = await axiosInstance({
        method,
        url: `/api?url=${encodeURIComponent(url)}`,
        headers: {
          ...headersObj,
          "Content-Type": "application/json",
        },
        data: hasBody && body ? JSON.parse(body) : undefined,
      });

      console.log(res.data);
      setResponse(res.data);
    } catch (error) {
      console.error("Request Failed:", error);
      setResponse(
        error.response ? error.response.data : "Error making request"
      );
    }
  };

  const addRequest = () => {
    setRequests([
      ...requests,
      { id: Date.now(), method: "GET", url: "", headers: [], body: "" },
    ]);
  };

  const removeRequest = (id) => {
    setRequests(requests.filter((req) => req.id !== id));
  };

  return (
    <div className="space-y-6 overflow-auto no-scrollbar ">
      {requests.map((request, index) => (
        <div key={request.id} className="space-y-4 relative">
          <div className="bg-secondary-light border border-gray-800 rounded-lg shadow-lg p-6 space-y-4">
            <div className="flex space-x-4">
              <select
                className="px-4 py-2 bg-secondary border border-gray-700 rounded-md text-white"
                value={request.method}
                onChange={(e) => handleChange(index, "method", e.target.value)}
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
                <option value="PATCH">PATCH</option>
              </select>
              <input
                type="text"
                placeholder="Enter URL"
                className="flex-1 px-4 py-2 bg-secondary border w-full border-gray-700 rounded-md text-white"
                value={request.url}
                onChange={(e) => handleChange(index, "url", e.target.value)}
              />
            </div>

            {/* Headers Section */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-300">Headers</h3>
              <div className="bg-secondary p-4 rounded-md">
                <button
                  onClick={() => addHeader(index)}
                  className="text-lg text-primary hover:text-primary-dark"
                >
                  + Add Header
                </button>
                {request.headers.map((header, hIndex) => (
                  <div key={hIndex} className="flex space-x-2 mb-2">
                    <input
                      type="text"
                      placeholder="Key"
                      className="flex-1 px-3 py-1 bg-secondary-light border border-gray-700 rounded-md text-sm text-white"
                      value={header.key}
                      onChange={(e) =>
                        handleHeaderChange(index, hIndex, "key", e.target.value)
                      }
                    />
                    <input
                      type="text"
                      placeholder="Value"
                      className="flex-1 px-3 py-1 bg-secondary-light border border-gray-700 rounded-md text-sm text-white"
                      value={header.value}
                      onChange={(e) =>
                        handleHeaderChange(
                          index,
                          hIndex,
                          "value",
                          e.target.value
                        )
                      }
                    />
                    <button
                      className="p-1 text-gray-400 hover:text-primary"
                      onClick={() => removeHeader(index, hIndex)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        className="lucide lucide-trash2 "
                      >
                        <path d="M3 6h18"></path>
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                        <line x1="10" x2="10" y1="11" y2="17"></line>
                        <line x1="14" x2="14" y1="11" y2="17"></line>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Request Body */}
            {["POST", "PUT", "PATCH"].includes(request.method) && (
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-300">
                  Request Body
                </h3>
                <textarea
                  placeholder="Enter request body (JSON)"
                  className="w-full h-40 px-4 py-2 bg-secondary border border-gray-700 rounded-md text-sm text-white"
                  value={request.body}
                  onChange={(e) => handleChange(index, "body", e.target.value)}
                ></textarea>
              </div>
            )}

            {/* Buttons */}
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => sendRequest(index)}
                className="px-4 py-2 text-lg bg-primary text-white border rounded-md"
              >
                Send
              </button>
              {index !== 0 && (
                <button
                  className="p-2 text-gray-400 hover:text-red-500"
                  onClick={() => removeRequest(request.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="lucide lucide-trash2 "
                  >
                    <path d="M3 6h18"></path>
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                    <line x1="10" x2="10" y1="11" y2="17"></line>
                    <line x1="14" x2="14" y1="11" y2="17"></line>
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Add Request */}
      <div className="flex justify-between items-center">
        <button
          onClick={addRequest}
          className="px-4 py-2 text-lg text-primary hover:text-primary-dark"
        >
          + Add Request
        </button>
      </div>

      {response && (
        <div className="bg-secondary-light p-4 border border-gray-700 rounded-md mt-4">
          <h3 className="text-lg font-semibold text-gray-300">Response</h3>
          <textarea
            className="w-full h-40 px-4 py-2 bg-secondary border border-gray-700 rounded-md text-sm text-white"
            value={JSON.stringify(response, null, 2)}
            readOnly
          />
        </div>
      )}
    </div>
  );
}

export default RequestComp;
