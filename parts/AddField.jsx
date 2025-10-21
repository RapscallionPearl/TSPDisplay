import { createElement, useState } from "react";
import { ProgressBar } from "react-bootstrap";

export default function FunctionOverview() {
  let thing = {
    Type: "Card",
    VCardSetup: {
      Rows: [
        {
          Cols: [
            {
              ClassName: "colQuarter",
              Fields: [
                {
                  Type: "Image",
                  Style: {
                    maxWidth: "100px",
                    borderRadius: "50%",
                  },
                },
              ],
            },
            {
              ClassName: "colThreeQuarter",
              Fields: [
                {
                  Type: "Label",
                  Label: "Navn",
                  FieldName: "displayName",
                },
                {
                  Type: "Mail",
                  Label: "Email",
                  FieldName: "mail",
                },
              ],
            },
          ],
        },
      ],
    },
  };
  return (
    <>
      {/* <p>function to call is:</p> */}
      <DeconstructObject prop={thing} />
    </>
  );
}

function DeconstructObject({ prop }) {
  let obj = prop; //rows har kun 1 post i array, dvs een række, og Cols har 2 poster i Array, dvs 2 sektioner i Cols
  let row = obj.VCardSetup.Rows;
  let col = obj.VCardSetup.Rows[0].Cols;
  const [returnObj, setreturnObj] = useState({
    Type: "Card",
    VCardSetup: {
      Rows: [
        {
          Cols: [{}],
        },
      ],
    },
  });

  return (
    <>
      {/* {JSON.stringify(obj, null, 2)}
      {console.log({ obj })}
      {toString({ obj })}
      {console.log("Row array: ", row)}
      {console.log("Col array in row pos [0]: ", col)}
      {console.log(
        "object to return: ",
        returnObj,
        "and the state obj: ",
        setreturnObj
      )}*/}
      {dataToTable(obj)}
    </>
  );
}

// function addObjectToTable(table, obj, tr) {
//   var rows = 0;
//   for (key in obj) {
//     if (tr == null) {
//       tr = document.createElement("tr");
//       table.appendChild(tr);
//     }
//     var td = td = document.createElement('td');
//     td.textContent = key;
//     tr.appendChild(td);

//     var value = obj[key];
//     if (typeof value != 'object') {
//       var td = document.createElement('td');
//       td.textContent = value;
//       tr.appendChild(td);
//       rows += 1;
//     }
//     else {
//       var subrows = addObjectToTable(table, value, tr);
//       td.setAttribute('rowspan',subrows);
//       rows += subrows;
//     }

//     tr = null;
//   }
//   return rows;
// }

function dataToTable(data) {
  var storage = [];
  return (function buildTable(data) {
    var table = "<table><tbody>";
    var name, value;
    // Add the object/array to storage for cirular detection.
    storage.push(data);
    for (name in data) {
      value = data[name];
      table += "<tr><td>" + name + "</td><td>";
      // If the value is a an object we've put in storage (circular)
      if (storage.indexOf(value) !== -1) {
        table += "<em>Circular</em>";
      } else if (typeof value === "object") {
        table += buildTable(value);
      } else {
        table += value;
      }
      table += "</td></tr>";
    }
    return table + "</tbody></table>";
  })(data);
}

function toString(object) {
  if (typeof object === "string") return object;
  if (typeof object === "number") return object;
  if (typeof object === "boolean") return object ? "True" : "False";
  if (object === null || object === undefined) return "N/A";
  if (typeof object === "function") return "Function";
  //if (object instanceof Date) return object.toLocaleString();
  if (object.hasOwnProperty("toString")) return object.toString();
  return JSON.stringify(object);
}

// function TableView(props) {
//   if (Object.keys(props).length < 1) return null;

//   let keys = Object.keys(props);

//   return (
//     <table>
//       <thead>
//         <tr>
//           {keys.map((key, i) => (
//             <td key={i}>{key}</td>
//           ))}
//         </tr>
//       </thead>
//       <tbody>
//         {props.object.map((row, i) => (
//           <tr key={i}>
//             {keys.map((key, i) => (
//               <td key={key}>{toString(row[key])}</td>
//             ))}
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// }

// const obj = {
//    "value 0": "value",
//    "value 1": "value",
//    "value 2": "value",
//    "value 3": "value",
//    "value 4": "value",
//    "value 5": "value",
//    "value 6": "value",
//    "value 7": "value",
//    "value 8": "value",
//    "value 9": "value"
// };
// const separateObject = obj => {
//    const res = [];
//    const keys = Object.keys(obj);
//    keys.forEach(key => {
//       res.push({
//          key: obj[key]
//       });
//    });
//    return res;
// };
// console.log(separateObject(obj));
