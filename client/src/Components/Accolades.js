import React, { useEffect, useState } from 'react';
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    CircularProgress,
} from '@material-ui/core';
import { getUserEventParticipation } from '../api';
import { auth } from '../firebase.js';
import '../StyleSheets/Accolades.css';

const Accolades = props => {
    const [AccoladesList, setAccoladesList] = useState();

    async function blockingCall() {
        auth.onAuthStateChanged(async user => {
            setAccoladesList(await getUserEventParticipation(user.uid));
        });
    }

    useEffect(() => {
        try {
            blockingCall();
        } catch (err) {
            console.error('err: ', err);
        }
    }, []);

    function AccoladeInfo() {
        if (AccoladesList != null) {
            return AccoladesList.map(event => {
                const { event_name } = event;
                return (
                    <TableRow className="accolade-row">
                        <TableCell>
                            {event_name.concat(' Participant')}
                        </TableCell>
                    </TableRow>
                );
            });
        }
        return <CircularProgress id="spinner" />;
    }
    return (
        <div id="accolade">
            <Table id="accoladeTable">
                <h1 id="award-header"> Awards: </h1>
                <TableBody id="award-body">{AccoladeInfo()}</TableBody>
            </Table>
        </div>
    );
};

export default Accolades;
