/**
 * @swagger
 * tags:
 *   - name: Branch
 *     description: Branch management and discovery
 */

/**
 * @swagger
 * /api/v1/branch/create-branch:
 *   post:
 *     summary: Create a new restaurant branch
 *     tags: [Branch]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - branchName
 *               - address
 *               - phoneNumber
 *               - operatingHours
 *             properties:
 *               branchName:
 *                 type: string
 *                 example: "Ikeja GRA Branch"
 *               address:
 *                 type: string
 *                 description: JSON string object. Coordinates must be [longitude, latitude]
 *                 example: '{"street": "12 Allen Avenue", "city": "Ikeja", "state": "Lagos", "location": {"type": "Point", "coordinates": [3.3792, 6.5244]}}'
 *               phoneNumber:
 *                 type: string
 *                 example: "08012345678"
 *               operatingHours:
 *                 type: string
 *                 description: JSON string array of objects
 *                 example: '[{"day": "Monday", "open": "08:00", "close": "22:00"}]'
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Branch created successfully
 */

/**
 * @swagger
 * /api/v1/branch/approve-branch:
 *   post:
 *     summary: Verify a branch (SuperAdmin Only)
 *     tags: [Branch]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               branchId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Branch approved successfully
 */

/**
 * @swagger
 * /api/v1/branch/disapprove-branch:
 *   post:
 *     summary: Revoke branch verification (SuperAdmin Only)
 *     tags: [Branch]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               branchId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Branch disapproval successful
 */

/**
 * @swagger
 * /api/v1/branch/all-branches:
 *   get:
 *     summary: Fetch all branches in the system
 *     tags: [Branch]
 *     responses:
 *       200:
 *         description: All branches fetched
 */

/**
 * @swagger
 * /api/v1/branch/restaurant-branches:
 *   get:
 *     summary: Get all branches for the logged-in restaurant owner
 *     tags: [Branch]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of branches retrieved
 */

/**
 * @swagger
 * /api/v1/branch/delete-branch:
 *   delete:
 *     summary: Delete a specific branch
 *     tags: [Branch]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               branchId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Branch deleted successfully
 */

/**
 * @swagger
 * /api/v1/branch/single-restaurant-branch/{branchId}:
 *   get:
 *     summary: Get a single branch by ID
 *     tags: [Branch]
 *     parameters:
 *       - in: path
 *         name: branchId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Branch data fetched
 */

/**
 * @swagger
 * /api/v1/branch/update-branch/{branchId}:
 *   post:
 *     summary: Update branch details
 *     tags: [Branch]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: branchId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               branchName:
 *                 type: string
 *               address:
 *                 type: string
 *                 description: JSON string object
 *               phoneNumber:
 *                 type: string
 *               operatingHours:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Branch updated successfully
 */
