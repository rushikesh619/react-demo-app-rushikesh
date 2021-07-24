import React from "react";
import { AddCircleOutlineRounded, Edit } from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons/Delete';
// import IconButton from '@material-ui/icons/IconButton';
import './todo.css'
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

class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Todo: [],
            open: false,
            taskUpdate: "",
            input: ""
        }
    }

    componentDidMount() {
        const arr = localStorage.getItem('myArray')
        if (arr && arr.length) {
            const myArray = JSON.parse(arr);
            this.setState({ Todo: myArray })
        }
    }

    addActivity = () => {
        const newItem = document.getElementById("activity").value;
        this.setState({ Todo: [...this.state.Todo, newItem] });
        document.getElementById("activity").value = " ";
    }

    deleteItem = (task) => {
        var ary = this.state.Todo.filter((a, index) => {
            if (task !== a) {
                return true;
            } else {
                return false;
            }
        });
        this.setState({ Todo: ary });
    }

    openUpdateDialog = (task) => {
        this.setState({
            open: true,
            updateTask: task
        })
    }

    handleClose = () => {
        this.setState({ open: false });
    };

    editTodo = () => {
        var arr = [];
        this.state.Todo.forEach((a, index) => {
            if (this.state.updateTask == a) {
                arr.push(this.state.taskUpdate);
            } else {
                arr.push(a);
            }
        });
        this.setState({ Todo: arr, open: false, taskUpdate: "", updateTask: "" });
    }

    handleFormSubmit = () => {
        localStorage.setItem('myArray', JSON.stringify(this.state.Todo))
    };

    something = (event) => {
        if (event.keyCode === 13) {
            console.log('enter');
            this.addActivity();
        }
    }

    render() {
        return (
            <div style={styles.main}>
                <Container maxWidth='md'>
                    <Typography variant="h2" align='center' gutterBottom >
                        Todo App
                    </Typography>
                    <Typography variant="h4" align='center' gutterBottom >
                        To demonstrate the usage of material UI and ReactJS
                    </Typography>
                    <Typography variant="h5" align='center' gutterBottom >
                        Developers Info :-
                        <Link href="http://rushikesh619.github.io/" >
                            http://rushikesh619.github.io/
                        </Link>
                    </Typography>
                    <Typography variant="h5" align='center' gutterBottom >
                        GitHub Repositiry :-
                        <Link href="http://rushikesh619.github.io/" >
                            http://rushikesh619.github.io/
                        </Link>
                    </Typography>
                </Container>
                <Container maxWidth="sm">

                    <Button
                        type="save"
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={this.handleFormSubmit}
                    >
                        Save tasks
                    </Button>


                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="activity"
                        label="Enter ToDo"
                        name="todo"
                        autoFocus
                        type="text"
                        value={this.state.input}
                        onKeyDown={(e) => this.something(e)}
                        onChange={event => { this.setState({ input: event.target.value }) }}
                    />

                    <Button
                        type="submit"
                        id="addTask"
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={this.addActivity}
                        defaultValue="will focus"
                        disabled={!this.state.input}
                        startIcon={<AddCircleOutlineRounded />}
                    >
                        Add Todo
                    </Button>

                    {this.state.Todo.length > 0 && (
                        <Card style={styles.card}>
                            <FormGroup>
                                {this.state.Todo.map((task, index) => (
                                    <div key={index} style={styles.todo}>
                                        {index > 0 ? <Divider style={styles.divider} /> : ""}
                                        <ListItemText
                                            primary={task}
                                        />
                                        <ListItemSecondaryAction >
                                            <IconButton aria-label="update" onClick={() => this.openUpdateDialog(task)}>
                                                <Edit />
                                            </IconButton>
                                            <IconButton
                                                aria-label="delete"
                                                onClick={() => this.deleteItem(task)}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </div>
                                ))}
                            </FormGroup>
                        </Card>
                    )}

                    <Dialog open={this.state.open} onClose={this.handleClose}>
                        <DialogContent>
                            <TextField
                                autoFocus
                                margin="normal"
                                label="Update Todo"
                                type="text"
                                fullWidth
                                name="updateTodo"
                                value={this.state.taskUpdate}
                                onChange={event => this.setState({ taskUpdate: event.target.value })}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={this.editTodo} color="primary">
                                Save
                            </Button>
                        </DialogActions>
                    </Dialog>

                </Container >
            </div>
        );
    }
}

export default Todo;