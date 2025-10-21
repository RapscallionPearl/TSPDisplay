

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

function destructureObject({obj}) {
     let tempObj = obj;
     let objectComponents = [];
        Object.keys(tempObj).forEach((key) => {
            if (typeof tempObj[key] === 'object' && !Array.isArray(tempObj[key])) {
                objectComponents.push({[key]: destructureObject({obj: tempObj[key]})});
                }
            else if (Array.isArray(tempObj[key])) {
                let arrayComponents = [];
                tempObj[key].forEach((item, index) => {
                    if (typeof item === 'object') {
                        arrayComponents.push(destructureObject({obj: item}));
                        } else {
                            arrayComponents.push(item);
                            }
                            });
                            objectComponents.push({[key]: arrayComponents});
                            }

            else {
                    objectComponents.push({[key]: tempObj[key]});
                    }
                    });
                    return objectComponents;
                    }

// flatten object? måske bedre til at læse del elementer af objektet

function flattenObject(ob) {
    let toReturn = {};
    for (let i in ob) {
        if (!ob.hasOwnProperty(i)) continue;
        if ((typeof ob[i]) == 'object' && ob[i] !== null) {
            let flatObject = flattenObject(ob[i]);
            for (let x in flatObject) {
                if (!flatObject.hasOwnProperty(x)) continue;
                toReturn[i + '.' + x] = flatObject[x];
                }
                } else {
                    toReturn[i] = ob[i];
                    }
                    }
                    return toReturn;
                    }



function DisplayExample() {
    let obj = ExampleCode;
    Object.keys(obj).forEach((key) => {console.log(key, obj[key])});
    Object.entries(obj).forEach(([key, value]) => {console.log(key, value)});
        let components = destructureObject({obj: obj});
        console.log("destructure funktion ", components);
    let flat = flattenObject(obj);
    console.log("flat funktion ", flat);
    return (
        <>
            <pre>{JSON.stringify(ExampleCode, null, 2)}</pre>
        </>
    );
}

export default DisplayExample;