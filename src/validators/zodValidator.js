export const validate = (schema) => {
  return async (req, res, next) => {
    try {
      console.log("log from zod validator", req.file);
      schema.parse(req.body);
      next();
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.errors,
      });
    }
  };
};
