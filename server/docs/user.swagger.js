/**
 * @swagger
 * tags:
 *   name: User
 *   description:  Get user data and update User profile
 */

/**
 * @swagger
 * /api/v1/user/user-data:
 *   get:
 *     summary: Get user data
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User data fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: User data fetched successfully
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 65d123abc456def789000111
 *                     name:
 *                       type: string
 *                       example: John Doe
 *                     email:
 *                       type: string
 *                       example: johndoe@gmail.com
 *                     phoneNumber:
 *                       type: string
 *                       example: 08012345678
 *       401:
 *         description: Unauthorized
 */


/**
 * @swagger
 * /api/v1/user/update-profile:
 *   post:
 *     summary: Update user profile
 *     tags: [User]
 *     security:
 *       - bearerAuth: []       # 🔹 THIS ADDS TOKEN HEADER
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: johndoe@gmail.com
 *               phoneNumber:
 *                 type: number
 *                 example: 08012345678
 *               name:
 *                 type: string
 *                 example: John doe
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Profile updated
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */


/**
 * @swagger
 * /api/v1/user/add-address:
 *   post:
 *     summary: Add delivery address
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               street:
 *                 type: string
 *               city:
 *                 type: string
 *               lat:
 *                 type: number
 *               lng:
 *                 type: number
 *               label:
 *                 type: string
 *             example:
 *               street: "123 Herbert Macaulay Way"
 *               city: "Yaba"
 *               lat: 6.5244
 *               lng: 3.3792
 *               label: "Work"
 *     responses:
 *       200:
 *         description: Address added successfully
 */
