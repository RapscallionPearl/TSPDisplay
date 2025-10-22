import { values } from "@fluentui/react";
import { useState } from "react";
import CodeExample from "./CodeExample";
import { Table } from "react-bootstrap";
import DisplayEksVCard from "./DisplayEksVCard";
import { set } from "@microsoft/sp-lodash-subset";

const ClassNameList = ["", "colFull", "colHalf", "colThird", "colQuarter"];
const FieldTypeList = ["Type", "Label", "FieldName", "Style"];
const TypeList = ["", "Label", "Mail", "Image", "Phone"];
const FieldNameList = [
  "",
  "displayName",
  "mail",
  "userPrincipalName",
  "jobTitle",
  "mobilePhone",
  "officeLocation",
  "department",
  "companyName",
  "city",
  "country",
  "postalCode",
  "streetAddress",
  "state",
  "userType",
  "givenName",
  "surname",
];
let item = [{
  ClassName: "",
  Fields: [
    {
      Type: "",
      Label: "",
      FieldName: "",
      Style: {},
    },
    {
      Type: "",
      Label: "",
      FieldName: "",
    },
  ],
}];


// type er altid Card, og den valgte type er altid VCardSetup
let cardExample = {
  Type: "Card",
  VCardSetup: {
    Rows: [
      {
        Cols: [...item],
      },
    ],
  },
};

function InsertFieldForm() {
  // kontrol elementer:
  // Style er med stort så der kan differencieres mellem at tilføje og fjerne styles, og at tilføje det til feltet
  // da styles kan være mange, en enkelt, eller slet ingen, så den setting er sat ud for sig selv.
  const [form, setform] = useState({
      ClassName: "",
      Fields: [{
          Type: "",
          Label: "",
          FieldName: "",
          Style: {},
        }]
  });
  // style med småt til at sætte Style med Stort (S)tyle - kan nok gøres pænere eller smartere
  const [style, setstyle] = useState({ style: "none" });
  // state til at sætte kortet op, lige nu et item placeret i Cols: array, add og remove er ikke sat op endnu
  const [card, setcard] = useState({
    Type: "Card",
    VCardSetup: {
      Rows: [
        {
          Cols: [{ ...item }],
        },
      ],
    },
  });

  const inputHandler = (e) => {
    e.preventDefault();
    let obj = { ...style };
    if (e.target.name === "styletype") {
      obj = { [e.target.value]: Object.values(style)[0] };
      setstyle({ ...obj });
      return;
    }
    if (e.target.name === "attribute") {
      obj = { [Object.keys(style)[0]]: e.target.value };
      setstyle({ ...obj });
      return;
    }
    setform({ ...form, [e.target.name]: [e.target.value] });
    return;
  };
  // const saveFieldButton = (e) => {
  //   e.preventDefault();
  //   // sikring for at man har valgt vilken type kort, da denne er nødvendig for at der vises noget.
  //   // lave er en alert popup der ber om at sætte Type feltet
  //   if (form.Type === "") {
  //     alert("Vælg Venligst hvilken Type felt");
  //     console.log(form);
  //   } else {
  //     setstyle({ ...style });
  //     setform({ ...form });
  //     Object.assign(form.Style, style); //sætter style ind i kortet
  //     console.log(form);
  //   }
  // };
  const resetButton = (e) => {
    e.preventDefault();
    setstyle({ style: "none" });
    setform({
      ClassName: "",
      Type: "",
      Label: "",
      FieldName: "",
      Style: {},
    });
  };
  const styleSave = (e) => {
    e.preventDefault();
    Object.assign(form.Style, style);
    setstyle({ ...style });
    console.log("current styles: ", style);
  };
  const deleteButton = (e) => {
    e.preventDefault();
    let obj = { ...form.Style };
    delete obj[Object.keys(style)[0]];
    setform({ ...form, Style: { ...obj } });
    setstyle({ ...obj });
    console.log("deleted entry:", obj);
  };
  const addToCardButton = (e) => {
    e.preventDefault();
    let obj = { ...form };
    if (obj.Type === "") {
      alert("Vælg Venligst hvilken Type felt");
      return;
    }
    setcard({
      ...card,
      VCardSetup: { Rows: [{ Cols: [{ ...obj }] }] },
    });
    console.log("added to card:", obj);
  };

  return (
    <section id="formControlSelectorsForDisplaySelections">
      {/* State : kan vælge værdier indenfor kriterer, console logger data når der trykkes gem */}
      <hr />
      <table>
        <thead>
          <tr>
            <th>Select options and input values:</th>
            <th>Currently selected:</th>
          </tr>
        </thead>
        <tr>
          <td>
            <form onReset={resetButton}>
              <label htmlFor="ClassnameSelector">
                ClassName :
                <select
                  name="ClassName"
                  value={form.ClassName}
                  className="form-control"
                  id="sel1"
                  onChange={inputHandler}
                >
                  {ClassNameList.map((i, index) => (
                    <option key={index} value={i}>
                      {i}
                    </option>
                  ))}
                </select>
              </label>
              <br />
              <label htmlFor="TypeSelector">
                Type :
                <select
                  name="Type"
                  value={form.Type}
                  className="form-control"
                  id="sel2"
                  onChange={inputHandler}
                >
                  {TypeList.map((i, index) => (
                    <option key={index} value={i}>
                      {i}
                    </option>
                  ))}
                </select>
              </label>
              <br />
              <label htmlFor="FieldNameSelector">
                FieldName :
                <select
                  name="FieldName"
                  value={form.FieldName}
                  className="form-control"
                  id="sel3"
                  onChange={inputHandler}
                >
                  {FieldNameList.map((i, index) => (
                    <option key={index} value={i}>
                      {i}
                    </option>
                  ))}
                </select>
              </label>
              <br />
              <label htmlFor="LabelTextInput">
                Label :
                <input
                  name="Label"
                  className="form-control"
                  id="sel4"
                  value={form.Label}
                  onChange={inputHandler}
                />
              </label>
              <br />
              <label htmlFor="StyleAttInput">
                Style :
                <br />
                <input
                  name="styletype"
                  className="form-control"
                  id="sel5"
                  value={Object.keys(style)[0]}
                  onChange={inputHandler}
                />
                <input
                  name="attribute"
                  className="form-control"
                  id="sel6"
                  value={Object.values(style)[0]}
                  onChange={inputHandler}
                />
              </label>
              <br />
              <button type="reset">
                Reset
              </button>
              <button type="button" onClick={styleSave}>
                add style to current
              </button>
              <button type="button" onClick={deleteButton}>
                Remove current style
              </button>
              <br />
              currently to be added/removed:
              <br /> {JSON.stringify(style)}
              <br />
              <button type="button" onClick={addToCardButton}>
                Add Field to Card
              </button>
              <br />
            </form>
          </td>
          <td>
            <pre>{JSON.stringify(form, null, 2)}</pre>
          </td>
        </tr>
      </table>
      <hr />
      <pre>
        <code>{JSON.stringify(card, null, 1)}</code>
      </pre>
    </section>
  );
}

export default function DisplayOption2() {
  return (
    <>
      <section id="option-2-description">
        <p>Option 2 valgt</p>
        <p>Option 2 er et Custom card</p>
        <p>Custom card består af følgende elementer:</p>
        <table>
          <tr>
            <td>Rows</td>
            <td>Hvor mange rækker Dataen skal fylde</td>
            <td></td>
          </tr>
          <tr>
            <td>Cols</td>
            <td>Hvor mange Kolonner Dataen skal fylde</td>
            <td></td>
          </tr>
          <tr>
            <td>ClassName</td>
            <td>predefineret størrelse på datablokken, er ikke påkrævet</td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td>Muligheder for ClassName</td>
            <td>{ClassNameList.join(", ")}</td>
          </tr>
          <tr>
            <td>Fields</td>
            <td>Beskriver hvilken type data der skal vises og er påkrævet</td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td>Data der kan være under Fields, kun Type er påkrævet:</td>
            <td>{FieldTypeList.join(", ")}</td>
          </tr>
          <tr>
            <td></td>
            <td>Type kan have værdien:</td>
            <td>{TypeList.join(", ")}</td>
          </tr>
          <tr>
            <td></td>
            <td>
              Label er hvilken tekst der skal vises ved siden af datafeltet
            </td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td>
              FieldName er fra hvor datafeltet skal hive dataen og har følgende
              muliehder:
            </td>
            <td>{FieldNameList.join(", ")}</td>
          </tr>
          <tr>
            <td></td>
            <td>
              Style definere hvordan datafeltet skal styles, er ikke påkrævet
            </td>
            <td>
              style typer kan hentes her:
              <a href="https://use-form.netlify.app/interfaces/_node_modules__types_react_index_d_.react.cssproperties.html">
                CSSproperties Link
              </a>
            </td>
          </tr>
        </table>
        <p>Eksempel på opsætning af Custom card:</p>
        <CodeExample />
      </section>
      <section id="option-2-editor">
        <p>Editor til opsætning af Custom card:</p>
        {/* her kommer editor til opsætning 
            tekst felt til style og Label, dropdown til ClassName, Type og FieldName
            knap til at tilføje felt efter valg ovenfor, 
            knap til at tilføje række ikke til kolonne da den kommer når et felt tilføjes
        */}
        <InsertFieldForm />
      </section>
      {/* Display af den valgte opsætning, eksempel er pre sat */}
      <section id="example-display">
        {/*her vises den "færdige" kode fra editoren, den klippes sammen ifht elementerne der er valgt
          taget fra Objektet og kan sættes sammen af flere objekter hvis der ønskes flere muligheder*/}
        <p>Nedenfor er JSON koden for Displayet:</p>
        {/* <pre>
          <code>{`
{
  "Type": "Card",
  "VCardSetup": {
  "Rows": [
  {
  "Cols": 
          ${JSON.stringify(item, null, 1)}
          
   }
  ]
 }
}
            `}</code>
        </pre> */}
      </section>
    </>
  );
}
