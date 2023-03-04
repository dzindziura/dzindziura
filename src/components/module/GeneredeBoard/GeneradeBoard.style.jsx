import ModalClose from "@mui/joy/ModalClose";
import Sheet from "@mui/joy/Sheet";
import styled from "@emotion/styled";

export const ModalCloseStyle = styled(ModalClose)(() => ({
  top: "calc(-1/4 * var(--IconButton-size))",
  right: "calc(-1/4 * var(--IconButton-size))",
  boxShadow: "0 2px 12px 0 rgba(0 0 0 / 0.2)",
  borderRadius: "50%",
  bgcolor: "background.body",
}));

export const SheetWrapper = styled(Sheet)(() => ({
  maxWidth: 500,
  borderRadius: "md",
  p: 3,
  boxShadow: "lg",
}));
