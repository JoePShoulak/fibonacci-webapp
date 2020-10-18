import React, {useState} from 'react';
import _ from 'lodash';

import {makeTable, checkNum} from "../helpers/mathHelper";
import PisanoTable from "./PisanoTable";
import ErrorMessage from "./ErrorMessage";

const Array = (props) => {
    const [height, setHeight]   = useState(props.height);
    const [modulus, setModulus] = useState(props.modulus);

    const [table, period] = makeTable(modulus, height);
    const data  = _.flatten(table);
    const validArray = !_.includes(data, undefined);

    return(
        <div className={"array-wrapper"}>
            <p>The Pisano Period of the Fibonacci numbers modulus {modulus} is {period}</p>

            <label>Modulus: </label>
            <input type={"number"}
                   value={modulus}
                   min={2}
                   onChange={ (e) => setModulus(checkNum(e.target.value)) } /> <br />

            <label>Height:  </label>
            <input type={"number"}
                   value={height}
                   min={1}
                   onChange={ (e) => setHeight(checkNum(e.target.value))  } /> <br />
            {validArray ? <PisanoTable table={table}/> : <ErrorMessage type={"INVALID-ARRAY"}/>}
        </div>
    )
};

export default Array;
