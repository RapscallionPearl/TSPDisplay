

const ExampleCode = {
    "Type": "Card",
    "VCardSetup": {
        "Rows": [{
            "Cols": [{
                "ClassName": "colQuarter",
                "Fields": [{
                    "Type": "Image",
                    "Style": {
                        "maxWidth": "100px",
                        "borderRadius": "50%"
                    }
                }]
            },
            {
                "ClassName": "colThreeQuarter",
                "Fields": [{
                    "Type": "Label",
                    "Label": "Navn",
                    "FieldName": "displayName"
                },
                {
                    "Type": "Mail",
                    "Label": "Email",
                    "FieldName": "mail"
                }]
            }]
        }]
    }
}

// needs to parse through the JSON Object, and get all keys with their related Arrays,
// and end up with separate parts for each array
// so that each part can maintain structure, and be reused
// for later adding and editing in the expansion of the display.

function extractArraysFromObject(obj = ExampleCode) {
  const results = [];
  const seen = new Set();

  function helper(value, path) {
    if (value && typeof value === "object") {
      if (seen.has(value)) return; // prevent circular loops
      seen.add(value);
    }

    if (Array.isArray(value)) {
      results.push({ path: path || "root", array: value });
      value.forEach((item, i) => helper(item, `${path}[${i}]`));
    } else if (value && typeof value === "object") {
      Object.keys(value).forEach((key) =>
        helper(value[key], path ? `${path}.${key}` : key)
      );
    }
  }

  helper(obj, "");
  return results;
}

function DisplayArrays() {
  const arrays = extractArraysFromObject(ExampleCode);
  return (
    <>
      {arrays.map((item, index) => (
        <div key={index}>
          <h4>Array found at: {item.path}</h4>
          <pre>{JSON.stringify(item.array, null, 2)}</pre>
        </div>
      ))}
    </>
  );
}
export default DisplayArrays;

