import React from "react";
import './todo.css';
import MeterialTable from 'material-table';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import axios from 'axios';
import './apiCall.css'
import { ListItemSecondaryAction, DialogActions, Dialog, DialogContent, Button, TextField, Container, Card, FormGroup, Divider, IconButton, ListItemText, Typography, Link } from '@material-ui/core';

const styles = {
    done: {
        textDecoration: "line-through",
        opacity: ".5",
        display: "flex",
        width: "100%"
    },
    header: {
        justifyContent: "center",
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    main: {
        width: "100%",
        margin: "20px auto",
    },
    card: {
        padding: "20px",
        margin: "20px 0"
    },
    todo: {
        position: "relative",
        display: "flex",
        flexFow: "row",
        alignContent: "space-between"
    },
    label: {
        display: "flex",
        width: "100%"
    },
    divider: {
        position: "absolute",
        width: "100%",
        top: 0
    }
};

const columns = [
    { title: 'Avatar', field: 'avatar', render: rowData => <img src={rowData.avatar} style={{ width: 40, borderRadius: '50%' }} /> },
    { title: 'First Name', field: 'first_name' },
    { title: 'Last Name', field: 'last_name' },
    { title: 'Email', field: 'email' }
]

class ApiCall extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            pageNo: 0
        }
    }

    componentDidMount() {
        this.getInitialData();
    }

    getInitialData = () => {
        let temp = this.state.pageNo + 1;
        axios.get('https://reqres.in/api/users', {
            params: {
                page: temp
            }
        }).then((res) => {
            console.log(res.page)
            this.setState({
                users: res.data.data,
                pageNo: temp
            });
        }).catch(err => {
            alert(err);
        })
    }

    handelBackArrowClick = () => {
        let temp = this.state.pageNo - 1;
        axios.get('https://reqres.in/api/users', {
            params: {
                page: temp
            }
        }).then((res) => {
            this.setState({
                users: res.data.data,
                pageNo: temp
            });
        }).catch(err => {
            alert(err);
        })
    }

    handelForwardArrowClick = () => {
        let temp = this.state.pageNo + 1;
        axios.get('https://reqres.in/api/users', {
            params: {
                page: temp
            }
        }).then((res) => {
            this.setState({
                users: res.data.data,
                pageNo: temp
            });
        }).catch(err => {
            alert(err);
        })
    }

    render() {
        return (
            <div style={styles.main}>
                <Container maxWidth='md'>
                    <MeterialTable
                        title='User Table'
                        data={this.state.users}
                        columns={columns}
                        options={{
                            paging: false
                        }}
                    />
                </Container>
                <Container maxWidth="sm">
                    <IconButton className="backArrow" aria-label="privious page" disabled={!this.state.pageNo} onClick={() => this.handelBackArrowClick()}>
                        <ArrowBackIcon />
                    </IconButton>
                    <IconButton className="forwardArrow" aria-label="forward page" onClick={() => this.handelForwardArrowClick()}>
                        <ArrowForwardIcon />
                    </IconButton>
                </Container>
            </div>
        );
    }
}

export default ApiCall;