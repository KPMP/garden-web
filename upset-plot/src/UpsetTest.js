import React, {Component} from 'react';
import UpSetJS, { extractSets, generateCombinations, ISetLike } from '@upsetjs/react';

class UpsetTest extends Component {
  render() {
      const elems = [
          { name: 'A', sets: ['S1', 'S2'], link: "linkA"},
          { name: 'B', sets: ['S1'], link: "linkB" },
          { name: 'C', sets: ['S2'], link: "linkC" },
          { name: 'D', sets: ['S1', 'S3'], link: "linkD" },
      ];

      const sets = extractSets(elems);
      const combinations = generateCombinations(sets);

      const UpSetJSSelection = (props) => {
          const [selection, setSelection] = React.useState(null);
          return <UpSetJS {...props} selection={selection} onHover={setSelection} onClick={() => alert("blah")}/>;
      };

    return (
        <div>
            <UpSetJSSelection sets={sets} combinations={combinations} width={500} height={300} />;
      </div>
    );
  }
}

export default UpsetTest