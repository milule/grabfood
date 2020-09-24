import React, { memo, lazy, Suspense, useMemo } from "react";
import Dialog from "@material-ui/core/Dialog";
import { useDialog } from "../../utils";
import { DIALOG_NAME } from "../../constanst";
import { useStyles } from "./AppDialog.styled";

const DIALOG = {
  [DIALOG_NAME.CONFIRM]: lazy(() => import("../AppDialogConfirm")),
};

const AppDialog = memo(() => {
  const classes = useStyles();
  const { open, mode, close, customProps, dialogProps } = useDialog();

  const Children = DIALOG[mode];

  const isOpen = useMemo(() => {
    if (!open) return open;

    return open && !!Children;
  }, [open, Children]);

  return (
    <Dialog
      id="app-dialog"
      scroll="paper"
      onClose={close}
      open={isOpen}
      fullWidth={true}
      className={classes.root}
      {...dialogProps}
    >
      <Suspense fallback={null}>
        {Children && <Children {...customProps} close={close} />}
      </Suspense>
    </Dialog>
  );
});

export default AppDialog;
