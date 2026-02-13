/**
 * @swagger
 * tags:
 *   - name: Restaurant (Admin)
 *     description: Restaurant management and Superadmin approval
 *   - name: Restaurant (Public)
 *     description: Browse and view restaurant details
 */

/**
 * @swagger
 * /api/v1/restaurant/register-restaurant:
 *   post:
 *     summary: Register a new restaurant brand profile
 *     tags: [Restaurant (Admin)]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - restaurantName
 *               - description
 *               - category
 *             properties:
 *               restaurantName:
 *                 type: string
 *                 example: "Steve's Jollof Spot"
 *               description:
 *                 type: string
 *                 example: "The best local delicacies in Lagos"
 *               category:
 *                 type: string
 *                 description: JSON string array of categories
 *                 example: '["Local", "Fast Food"]'
 *               logo:
 *                 type: string
 *                 format: binary
 *               banner:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Restaurant created successfully
 */

/**
 * @swagger
 * /api/v1/restaurant/approve-restaurant:
 *   post:
 *     summary: Approve a restaurant (Superadmin only)
 *     tags: [Restaurant (Admin)]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - restaurantId
 *             properties:
 *               restaurantId:
 *                 type: string
 *                 example: "65c1234567890abcdef"
 *     responses:
 *       200:
 *         description: Restaurant approved successfully
 */

/**
 * @swagger
 * /api/v1/restaurant/disapprove-restaurant:
 *   post:
 *     summary: Revoke restaurant approval (Superadmin only)
 *     tags: [Restaurant (Admin)]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - restaurantId
 *             properties:
 *               restaurantId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Approval revoked
 */

/**
 * @swagger
 * /api/v1/restaurant/get-restaurants:
 *   get:
 *     summary: Get all restaurants (Superadmin view)
 *     tags: [Restaurant (Admin)]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all restaurants retrieved
 */

/**
 * @swagger
 * /api/v1/restaurant/delete-restaurant:
 *   delete:
 *     summary: Delete a restaurant (Superadmin only)
 *     tags: [Restaurant (Admin)]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - restaurantId
 *             properties:
 *               restaurantId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Restaurant deleted successfully
 */

/**
 * @swagger
 * /api/v1/restaurant/single-restaurant/{id}:
 *   get:
 *     summary: Get a single restaurant by ID
 *     tags: [Restaurant (Public)]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Restaurant details retrieved
 */

/**
 * @swagger
 * /api/v1/restaurant/get-restaurant-profile:
 *   get:
 *     summary: Get the logged-in owner's restaurant profile
 *     tags: [Restaurant (Admin)]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile data retrieved
 */

/**
 * @swagger
 * /api/v1/restaurant/update-restaurant-profile:
 *   post:
 *     summary: Update existing restaurant profile
 *     tags: [Restaurant (Admin)]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               restaurantName:
 *                 type: string
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *               logo:
 *                 type: string
 *                 format: binary
 *               banner:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Profile updated successfully
 */
