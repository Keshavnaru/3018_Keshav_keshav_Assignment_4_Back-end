import { Request, Response, NextFunction } from "express";
import { LoanApplication } from "../models/loanModel";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { NotFoundError } from "../errors/errors";

let loans: LoanApplication[] = [
  {
    id: 1,
    applicant: "John Smith",
    amount: 50000,
    status: "pending",
    createdAt: "2025-01-10T10:00:00.000Z",
  },
  {
    id: 2,
    applicant: "Sarah Johnson",
    amount: 150000,
    status: "under_review",
    createdAt: "2025-01-08T10:00:00.000Z",
  },
  {
    id: 3,
    applicant: "Michael Chen",
    amount: 500000,
    status: "pending",
    createdAt: "2025-01-05T10:00:00.000Z",
  },
  {
    id: 4,
    applicant: "Emily Williams",
    amount: 1000000,
    status: "flagged",
    createdAt: "2025-01-03T10:00:00.000Z",
  },
];

export const getLoans = (req: Request, res: Response): void => {
  res.status(HTTP_STATUS.OK).json({
    message: "Loan applications retrieved",
    count: loans.length,
    data: loans,
  });
};

export const createLoan = (req: Request, res: Response): void => {
  const newLoan: LoanApplication = {
    id: loans.length + 1,
    applicant: req.body.applicant,
    amount: req.body.amount,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  loans.push(newLoan);

  res.status(HTTP_STATUS.CREATED).json({
    message: "Loan application created",
    data: newLoan,
  });
};

export const updateLoan = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const id = Number(req.params.id);
  const loan = loans.find((item) => item.id === id);

  if (!loan) {
    next(new NotFoundError("Loan application not found", "LOAN_NOT_FOUND"));
    return;
  }

  loan.status = req.body.status;

  res.status(HTTP_STATUS.OK).json({
    message: "Loan application updated",
    data: loan,
  });
};

export const deleteLoan = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const id = Number(req.params.id);
  const loanIndex = loans.findIndex((item) => item.id === id);

  if (loanIndex === -1) {
    next(new NotFoundError("Loan application not found", "LOAN_NOT_FOUND"));
    return;
  }

  loans.splice(loanIndex, 1);

  res.status(HTTP_STATUS.OK).json({
    message: "Loan application deleted",
  });
};