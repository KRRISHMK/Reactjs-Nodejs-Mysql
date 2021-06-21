import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import { Grid, Row, Col } from "rsuite";
import CloseIcon from "@material-ui/icons/Close";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { useHistory } from "react-router-dom";

import Axios from "axios";

Axios.defaults.withCredentials = true;

function refreshPage() {
  window.location.reload(false);
}

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});
const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const Drop = () => {
  const [namecat, setNamecat] = useState("");
  const [positioncat, setPositioncat] = useState("");
  const [qualificat, setQualicat] = useState("");
  const [agecat, setAgecat] = useState("");
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [positiondrop, setPositiondrop] = useState("");
  const [qualificationdrop, setQualificationdrop] = useState("");
  const [drops, setDrop] = useState([]);
  let history = useHistory();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickOpen1 = () => {
    setOpen1(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClose1 = () => {
    setOpen1(false);
  };
  let arr = [];
  let namearr = [];
  let posarr = [];
  let qualifiarr = [];
  let agearr = [];
  let posdata = [];
  const quadata = [];
  const qua = [];

  const dropadd = () => {
    Axios.post("http://localhost:3003/dropadd", {
      position: positiondrop,
      qualification: qualificationdrop,
    }).then((response) => {
      if (response.data.message) {
        console.log("email");
      } else {
        console.log("summa");

        setOpen(false);
        history.push("/");
      }
    });
  };

  const catdata = () => {
    Axios.post("http://localhost:3003/add", {
      name: namecat,
      position: positioncat,
      qualification: qualificat,
      age: agecat,
    }).then((response) => {
      if (response.data.message) {
        console.log("email");
      } else {
        console.log("summa");

        setOpen(false);
        history.push("/");
      }
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3003/users").then((result) => {
      if (result) {
        for (let i = 0; i < result["data"].length; i++) {
          namearr.push(result["data"][i].name);
          posarr.push(result["data"][i].position);
          qualifiarr.push(result["data"][i].qualification);
          agearr.push(result["data"][i].age);
          console.log(posarr);
          arr.push(result["data"][i]);
        }
      }
    });
  });
  useEffect(() => {
    Axios.get("http://localhost:3003/dropget1").then((result) => {
      if (result) {
        
        for (let i = 0; i < result["data"].length; i++) {
          setDrop(result.data);
          posdata.push(result["data"][i].position);
          quadata.push(result["data"][i].qualification);
        }
      }
    });
  },[]);
 
  const quads = [quadata];

  for (let i = 0; i < quads.length; i++) {
    console.log(quads[i]);
    qua.push(quads[i]);
  }

  const options = [];
  for (let i = 18; i < 38; i++) {
    options.push(i);
  }

  return (
    <div>
      <div className="root">
        <AppBar>
          <Toolbar>
            <IconButton
              edge="start"
              className="menuButton"
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className="title">
              Icon
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </div>
      <div className="btn1">
        <Button appearance="primary" onClick={handleClickOpen}>
          {" "}
          <i class="fa fa-plus-square fa-2x"></i> New
        </Button>
      </div>
      <div className="bt2">
        <Button appearance="primary" onClick={handleClickOpen1}>
          <i className="fa fa-plus-square fa-2x"></i> ADD
        </Button>
      </div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Add Fields
        </DialogTitle>
        <DialogContent dividers>
          <Grid>
            <Row className="show-grid">
              <Col xs={12}>
                <TextField
                  input="true"
                  className="pr-1"
                  id="standard-multiline-flexible"
                  label="Name"
                  multiline
                  rowsMax={4}
                  onChange={(e) => setNamecat(e.target.value)}
                />
                <TextField
                  input="true"
                  className="pl2"
                  id="standard-multiline-flexible"
                  label="Position"
                  multiline
                  rowsMax={4}
                  onChange={(e) => setPositioncat(e.target.value)}
                />
              </Col>
              <Col xs={12}>
                <FormControl className="form">
                  <InputLabel id="demo-simple-select-label">
                    Qualification
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={qualificat}
                    onChange={(e) => setQualicat(e.target.value)}
                  >
                     {drops.map((drop) => (
                      <MenuItem value={drop.qualification}>
                    {drop.qualification}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl className="form pl2">
                  <InputLabel id="demo-simple-select-label">Age</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    onChange={(e) => setAgecat(e.target.value)}
                  >
                    {options.map((option) => (
                      <MenuItem value={option}>
                        {" "}
                        <option key={option} value={option}>
                          {option}
                        </option>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Col>
            </Row>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => {
              catdata();
              refreshPage();
            }}
            color="primary"
          >
            Save
          </Button>
          <Button autoFocus onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        onClose={handleClose1}
        aria-labelledby="customized-dialog-title"
        open={open1}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose1}>
          Add Drop Data
        </DialogTitle>
        <DialogContent dividers>
          <Grid>
            <Row className="show-grid">
              <Col xs={12}>
                <TextField
                  input="true"
                  className="pr-1"
                  id="standard-multiline-flexible"
                  label="Position"
                  multiline
                  rowsMax={4}
                  onChange={(e) => setPositiondrop(e.target.value)}
                />
                <TextField
                  input="true"
                  className="pl2"
                  id="standard-multiline-flexible"
                  label="Qualification"
                  outline
                  rowsMax={4}
                  onChange={(e) => setQualificationdrop(e.target.value)}
                />
              </Col>
            </Row>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            block
            autoFocus
            onClick={() => {
              dropadd();
              refreshPage();
            }}
            color="primary"
          >
            ADD
          </Button>
          <Button autoFocus onClick={handleClose1} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Drop;
