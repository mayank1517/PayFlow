import { SalarySlip } from "../Models/SalarySlip.model.js";
import { User } from "../Models/User.model.js";

export const createSalarySlip = async (req, res) => {
  const adminId = req.user.id; // Comes from authMiddleware
  const {
    employeeId,
    month,
    year,
    basicPay,
    hra,
    allowances,
    deductions,
    notes,
  } = req.body;

  try {
    // Validate required fields
    if (!employeeId || !month || !year || !basicPay) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if employee exists and is not an admin
    const employee = await User.findById(employeeId);
    if (!employee || employee.role !== "employee") {
      return res
        .status(404)
        .json({ message: "Employee not found or invalid role" });
    }

    // Check for duplicate slip
    const existingSlip = await SalarySlip.findOne({
      employee: employeeId,
      month,
      year,
    });
    if (existingSlip) {
      return res
        .status(409)
        .json({ message: "Salary slip already exists for this month" });
    }

    // Calculate net salary
    const netSalary =
      basicPay + (hra || 0) + (allowances || 0) - (deductions || 0);

    // Create salary slip
    const slip = new SalarySlip({
      employee: employeeId,
      adminId,
      month,
      year,
      basicPay,
      hra,
      allowances,
      deductions,
      netSalary,
      notes,
      status: "generated",
    });

    await slip.save();

    res.status(201).json({ success: true, slip });
  } catch (error) {
    console.error("SalarySlip creation error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateSalarySlip = async (req, res) => {
  const adminId = req.user.id;
  const { slipId } = req.params;
  const { basicPay, hra, allowances, deductions, status, notes, month, year } =
    req.body;

  try {
    // Validate slipId format
    if (!slipId || slipId.length !== 24) {
      return res.status(400).json({ message: "Invalid slip ID" });
    }

    const slip = await SalarySlip.findById(slipId);
    if (!slip) {
      return res.status(404).json({ message: "Salary slip not found" });
    }

    // Optional: restrict updates to original admin
    // if (slip.adminId.toString() !== adminId) {
    //   return res.status(403).json({ message: "Forbidden: Not authorized to update this slip" });
    // }

    const toNumber = (val) =>
      val !== undefined && val !== null ? Number(val) : 0;

    // Update salary fields
    if (basicPay !== undefined) slip.basicPay = toNumber(basicPay);
    if (hra !== undefined) slip.hra = toNumber(hra);
    if (allowances !== undefined) slip.allowances = toNumber(allowances);
    if (deductions !== undefined) slip.deductions = toNumber(deductions);

    // Update month/year if provided
    if (month !== undefined) slip.month = month;
    if (year !== undefined) slip.year = year;

    // Recalculate net salary
    slip.netSalary =
      toNumber(slip.basicPay) +
      toNumber(slip.hra) +
      toNumber(slip.allowances) -
      toNumber(slip.deductions);

    if (isNaN(slip.netSalary)) {
      return res
        .status(400)
        .json({ message: "Invalid salary fields: netSalary is NaN" });
    }

    // Update status and notes
    if (status) slip.status = status;
    if (notes !== undefined) slip.notes = notes;

    await slip.save();

    res.status(200).json({ success: true, slip });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getEmployeeSalarySlips = async (req, res) => {
  const employeeId = req.user.id; // Comes from authMiddleware

  try {
    const slips = await SalarySlip.find({ employee: employeeId })
      .sort({ year: -1, month: -1 })
      .select("-__v")
      .populate("adminId", "fullName email");

    res.status(200).json({ success: true, slips });
  } catch (error) {
    console.error("Fetch salary slips error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllSalarySlips = async (req, res) => {
  try {
    // Role check
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden: Admin access only" });
    }

    const slips = await SalarySlip.find()
      .sort({ year: -1, month: -1 })
      .populate("employee", "fullName email designation")
      .populate("adminId", "fullName email");

    res.status(200).json({ success: true, count: slips.length, slips });
  } catch (error) {
    console.error("Fetch all salary slips error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
