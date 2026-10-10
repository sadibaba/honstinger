import dotenv from 'dotenv';
dotenv.config();

/**
 * Simple admin check — credentials from .env
 * Frontend sends: { email, password } in body OR headers
 */
export const adminOnly = (req, res, next) => {
  const email = req.body?.adminEmail || req.headers['x-admin-email'];
  const password = req.body?.adminPassword || req.headers['x-admin-password'];

  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    // Remove credentials from body before passing to controller
    if (req.body) {
      delete req.body.adminEmail;
      delete req.body.adminPassword;
    }
    return next();
  }

  return res.status(403).json({
    success: false,
    message: 'Admin access required. Invalid credentials.',
  });
};