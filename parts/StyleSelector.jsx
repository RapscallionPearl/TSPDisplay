import { useState } from "react";

//et component til at vælge style type og attributter
//skal kunne tilføje flere styles til et objekt
//skal kunne fjerne styles fra et objekt
//skal kunne resette input felter
//skal kunne vise det endelige objekt der bygges op

export default function StyleSelector({
  handler,
  resetButton,
  submitButton,
  deleteButton,
  style,
  item,
}) {
  return (
    <>
      <p>Type Andet er endnu ikke sat op:</p>
      <br />
      <form onReset={resetButton} onSubmit={submitButton}>
        <label>
          Vælg Style type:
          <br />
          <input
            name="type"
            className="form-control"
            id="styleTypeSelector1"
            value={Object.keys(style)[0]}
            placeholder="Style Name"
            onChange={handler}
          />
          <input
            name="attribute"
            className="form-control"
            id="styleAttributeSelector1"
            value={Object.values(style)[0]}
            placeholder="Attribute"
            onChange={handler}
          />
          <br />
          <button type="submit">Add Style</button>
          <button type="reset">Reset</button>
          <button type="delete" onClick={deleteButton}>
            Remove
          </button>
          <br />
          currently to be added/removed:
          <br /> {JSON.stringify(style)}
        </label>
      </form>
      <br />
      Style:{JSON.stringify(item, null, 2)}
      {/* // viser det enedelige objekt - skal exponeres til parent */}
    </>
  );
}

// funktionen der styrer state og logik i style editoren, skal være parent til StyleSelector
// import StyleSelector from "./StyleSelector";

// export default function DisplayOption3() {
//   //setup test for style editor
//   // const [item, setitem] = useState({});
//   // const [style, setstyle] = useState({
//   //   Style: "none",
//   // });
//   // const handler = (e) => {
//   //   e.preventDefault();
//   //   let obj = { ...style };
//   //   if (e.target.name === "type") {
//   //     obj = { [e.target.value]: Object.values(style)[0] };
//   //     setstyle({ ...obj });
//   //     return;
//   //   }
//   //   if (e.target.name === "attribute") {
//   //     obj = { [Object.keys(style)[0]]: e.target.value };
//   //     setstyle({ ...obj });
//   //     return;
//   //   }
//   // };
//   // const submitButton = (e) => {
//   //   e.preventDefault();
//   //   Object.assign(item, style);
//   //   setitem({ ...item });
//   //   console.log(style);
//   // };
//   // const resetButton = (e) => {
//   //   setstyle({ type: "none" });
//   //   setitem({});
//   //   console.log("reset");
//   // };
//   // const deleteButton = (e) => {
//   //   e.preventDefault();
//   //   let obj = { ...item };
//   //   delete obj[Object.keys(style)[0]];
//   //   setitem({ ...obj });
//   //   console.log("deleted entry:", obj);
//   // };
//   return (
//     <>
//       <p>Type Andet er endnu ikke sat op:</p>
//       {/* <StyleSelector
//         handler={handler}
//         resetButton={resetButton}
//         submitButton={submitButton}
//         deleteButton={deleteButton}
//         style={style}
//         item={item}
//       /> */}
//       ;
//     </>
//   );
// }
