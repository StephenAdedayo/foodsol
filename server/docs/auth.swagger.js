/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication and password management
 */


/**
 * @swagger
 * /api/v1/auth/sign-up:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - phoneNumber
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: johndoe@gmail.com
 *               phoneNumber:
 *                 type: number
 *                 example: 08012345678
 *               password:
 *                 type: string
 *                 example: 1234567 
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error
 */


/**
 * @swagger
 * /api/v1/auth/sign-in:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: johndoe@gmail.com
 *               password:
 *                 type: string
 *                 example: 1234567 
 *     responses:
 *       201:
 *         description: User logged in successfully
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /api/v1/auth/verify-account:
 *   post:
 *     summary: Verify user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - otp
 *             properties:
 *               email:
 *                 type: string
 *                 example: johndoe@gmail.com
 *               otp:
 *                 type: string
 *                 example: 1234 
 *     responses:
 *       201:
 *         description: Verify otp sent successfully
 *       401:
 *         description: Invalid credentials
 */


/**
 * @swagger
 * /api/v1/auth/send-otp:
 *   post:
 *     summary: Send reset password otp
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: johndoe@gmail.com
 *     responses:
 *       201:
 *         description: Otp sent successfully
 */

/**
 * @swagger
 * /api/v1/auth/resend-otp:
 *   post:
 *     summary: Resend reset password otp
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: johndoe@gmail.com
 *     responses:
 *       201:
 *         description: Otp sent successfully
 */


/**
 * @swagger
 * /api/v1/auth/reset-password:
 *   post:
 *     summary: Reset user password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - newPassword
 *               - otp
 *             properties:
 *               email:
 *                 type: string
 *                 example: johndoe@gmail.com
 *               otp:
 *                 type: string
 *                 example: 1234 
 *               newPassword:
 *                 type: string
 *                 example: newPassword123
 *     responses:
 *       200:
 *         description: Password reset successful
 */

