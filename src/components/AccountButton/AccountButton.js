import React from "react";
import { NavLink, Link } from "react-router-dom";

import Account from "../Icons/Account";
import Button from "../Button/Button";
import "./AccountButton.css";

function AccountButton() {
  return (
    <Link className="button__text_type_account" to="/profile">
    <Button className="button_type_account">
      <Account className="button__icon_type_account" />
      <p className="button__text_type_account">Аккаунт</p>
    </Button>
    </Link>
  );
}

export default AccountButton;