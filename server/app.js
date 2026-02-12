const express = require("express")
const cors = require("cors")
require("dotenv").config()
const morgan = require("morgan")
const connectDB = require("./init/mongodb")
const { errorMiddleware } = require("./middlewares")
const { connectRedis } = require("./init/redis")
const { notFound } = require("./controllers/notFound")
const authRouter = require("./routes/auth")
const connectCloudinary = require("./init/cloudinary")
const userRouter = require("./routes/user")
const swaggerJSDoc = require("swagger-jsdoc")
const swaggerUI = require("swagger-ui-express")

connectDB()
connectRedis()
connectCloudinary()

const app = express()

const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Docs",
      version: "1.0.0",
    },
    servers: [{ url: "http://localhost:5000" }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },

  apis: ["./docs/*.swagger.js"],
});

app.use(express.json({limit : "500mb"}))
app.use(express.urlencoded({limit : "500mb", extended : true}))
app.use(cors())
app.use(morgan("dev"))
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));


app.get("/", (req, res) => res.send("<p>API WORKING</p>"))

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/user", userRouter)

app.use(notFound)
app.use(errorMiddleware)


exports.app = app