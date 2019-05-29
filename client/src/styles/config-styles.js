import theme from "./theme";

export const authForm = {
  minHeight: "80vh",
  color: theme.palette.primary.dark,
};
export const icon = {
  padding: "4px",
};

export const button = {
  color: theme.palette.primary.dark,
  transition: "background 0.7s",
  minWidth: "100px",
  width: "20vh",
  "&:hover": {
    color: theme.palette.secondary.black,
  },
};

export const link = {
  display: "flex",
  alignItems: "center",
  textDecoration: "none",
  transition: "color 0.7s",
  color: theme.palette.primary.dark,
  fontFamily: theme.fontFamily,
  "&:hover": {
    color: theme.palette.secondary.black,
  },
};

export const visible = {
  visibility: "visible",
  opacity: "1",
};

export const hidden = {
  visibility: "hidden",
  opacity: "0",
};
