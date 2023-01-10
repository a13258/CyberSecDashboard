import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [ hrm, setHRM ] = useState([]);
  const [ listening, setListening ] = useState(false);

  useEffect( () => {
    if (!listening) {
      const events = new EventSource('http://localhost:997/api/realTimeHRM');

      events.onmessage = (event) => {
        const parsedData = JSON.parse(event.data);
        console.log(parsedData)

        setHRM((hrm) => hrm.concat(parsedData));
      };

      setListening(true);
    }
  }, [listening, hrm]);

  return (
    <table className="stats-table">
      <thead>
        <tr>
          <th>HRM</th>
          <th>Source (MAC)</th>
        </tr>
      </thead>
      <tbody>
        {
          hrm.map((hrm, i) =>
            <tr key={i}>
              <td>{hrm.heartrateMeasurement}</td>
              <td>{hrm.macAddr}</td>
            </tr>
          )
        }
      </tbody>
    </table>
  );
}

export default App;