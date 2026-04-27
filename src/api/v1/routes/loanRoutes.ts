import express from "express";
import {
  getLoans,
  createLoan,
  updateLoan,
  deleteLoan,
} from "../controllers/loanController";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";

const router = express.Router();

router.get("/", authenticate, getLoans);

router.post(
  "/",
  authenticate,
  isAuthorized({ hasRole: ["manager", "admin"] }),
  createLoan
);

router.put(
  "/:id",
  authenticate,
  isAuthorized({ hasRole: ["manager", "admin"] }),
  updateLoan
);

router.delete(
  "/:id",
  authenticate,
  isAuthorized({ hasRole: ["admin"] }),
  deleteLoan
);

export default router;