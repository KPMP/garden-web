import logo from './logo.svg';
import './App.css';
import UpsetTest from './UpsetTest.js'
import React from "react";
import UpSetJS, { extractSets, generateCombinations, ISetLike } from '@upsetjs/react';

function App() {
    const elems = [
        { name: 'A', sets: ['SN RNASeq', 'SC RNASeq', 'LMD RNA Seq'], link: "linkA"},
        { name: 'B', sets: ['SN RNASeq'], link: "linkB" },
        { name: 'C', sets: ['SC RNASeq', 'LMD RNA Seq'], link: "linkC" },
        { name: 'D', sets: ['SN RNASeq', 'LMD RNA Seq'], link: "linkD" },
        { name: 'E', sets: ['3D Cytometry'], link: "linkE" },
    ];

    const sets = extractSets(elems);
    const combinations = generateCombinations(sets);

    const UpSetJSSelection = (props) => {
        const [selection, setSelection] = React.useState(null);
        return <UpSetJS {...props} intersectionPlotElements={0} selection={selection} onClick={() => alert("You clicked " + selection.name)} onHover={setSelection} />;
    };

    return (
        <div>
            <UpSetJSSelection sets={sets} combinations={combinations} width={800} height={400} />;
        </div>
    );
}

export default App;
