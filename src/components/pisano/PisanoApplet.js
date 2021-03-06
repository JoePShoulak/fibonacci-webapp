import React from 'react';

import _ from 'lodash';

import {useDispatch, useSelector} from "react-redux";

import {
    Card,
    CardContent,
    Typography } from "@material-ui/core";

import PisanoArray  from "./PisanoArray";

import {makeTable}  from "../../helpers/mathHelper";
import {setSnackbar} from "../../redux/actions/snackbarActions";
import {setHeight, setModulus} from "../../redux/actions/pisanoActions";


// TODO: Implement redux error handling, Material UI snack bar

const PisanoApplet = () => {
    const dispatch = useDispatch();
    const pisanoState = useSelector((state) => state.pisanoReducer)

    const modulus = pisanoState.modulus
    const height = pisanoState.height

    let table, period, validArray, errorMsg

    if (modulus >= 3 && height >= 2) {
        [table, period] = makeTable(modulus, height);
        if (_.includes(_.flatten(table), undefined)) {
            validArray = false
            errorMsg = 'Error: Height not a factor of period'
        } else {
            validArray = true
            errorMsg = ''
        }
    } else {
        [table, period] = [undefined, undefined]
        validArray = false
        errorMsg = 'Error: Invalid parameters'
    }

    if (!validArray) {
        dispatch(setSnackbar(true, 'error', errorMsg))
    }

    return(
        <Card style={{maxWidth: 800}}>
            <CardContent style={{textAlign: 'center'}}>
                <Typography>
                    The Pisano Period of the Fibonacci numbers modulus {modulus} is {period}
                </Typography>

                <Typography display={'inline'} style={{width: 100}}>Modulus: </Typography>
                <input type={'number'}
                       value={modulus}
                       min={3}
                       onChange={(e) => {
                           dispatch(setSnackbar(false, '', ''))
                           dispatch(setModulus(e.target.value))}}
                />
                <br />
                <Typography display={'inline'} style={{width: 100}}>Height: </Typography>
                <input type={'number'}
                       value={height}
                       min={2}
                       onChange={(e) => {
                           dispatch(setSnackbar(false, '', ''))
                           dispatch(setHeight(e.target.value))}}
                />
                <br />
                <br />

                {validArray && <PisanoArray table={table}/> }
            </CardContent>
        </Card>
    )
};

export default PisanoApplet;
