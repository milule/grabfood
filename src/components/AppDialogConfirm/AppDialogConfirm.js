import React from "react";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Divider from "@material-ui/core/Divider";

export default function ({ title, close, message, node, onCancel, onConfirm }) {
  /** actions **/
  function handleCancel() {
    if (typeof onCancel === "function") {
      onCancel();
    }

    close();
  }

  function handleConfirm() {
    if (typeof onConfirm === "function") {
      onConfirm();
    }

    close();
  }

  return (
    <section id="app-dialog-confirm">
      <DialogTitle>{title}</DialogTitle>
      <Divider />
      <DialogContent style={{ paddingLeft: 8, paddingRight: 8 }}>
        {node || message || "No message."}
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button onClick={handleCancel} color="default" variant="contained">
          Cancel
        </Button>
        <Button color="primary" variant="contained" onClick={handleConfirm}>
          OK
        </Button>
      </DialogActions>
    </section>
  );
}
