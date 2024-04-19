const createUser = require("../utils/createUser");
const AppError = require("../utils/appError");
const User = require("../model/userModel");
const catchAsync = require("../utils/catchAsync");

exports.authenticateKey = (time) =>
  catchAsync(async (req, res, next) => {
    let api_key = req.query.api_key;
    let account = await User.findOne({ api_key });
    if (!account) return next(new AppError("You don't have permission", 403));

    let today = new Date().toISOString().split("T")[0];
    let usages = account.usage.findIndex((day) => day.date === today);
    if (usages >= 0) {
      if (account.usage[usages].count >= time) {
        return next(new AppError("Max api call exceeded", 429));
      } else {
        account.usage[usages].count++;
      }
    } else {
      account.usage.push({ date: today, count: 1 });
    }

    await User.findByIdAndUpdate(account._id, account);
    next();
  });

exports.signUser = catchAsync(async (req, res, next) => {
  let { username, email } = req.body;

  const user = createUser(email, username);

  const newUser = await User.create(user);

  res.status(201).json({
    status: "ok",
    apiKey: newUser.api_key,
  });
});
