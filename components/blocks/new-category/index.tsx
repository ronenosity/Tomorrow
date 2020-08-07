import {Button} from "@material-ui/core";
import React from "react";
import useIsOpen from "../../../hooks/useIsOpen";
import FormDialog from "./dialog";

const EditCategories = () => {
    const { isOpen, close, toggle } = useIsOpen();
    return (
      <div style={{ margin: '10px 0' }}>
        <Button variant="contained" color="secondary" onClick={toggle}>
          Edit Categories
        </Button>
        <FormDialog isOpen={isOpen} close={close} toggle={toggle} />
      </div>
    );

};

export default EditCategories;
