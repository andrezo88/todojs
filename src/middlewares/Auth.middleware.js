import jwt from "jsonwebtoken";

const authorization = async (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).send("Unauthorized request");
      }
    const token = req.headers.authorization
    if (!token) {
        throw new Error("Token não encontrado.");
    };

    const [, tokenWithoutBearer] = token.split(" ")
    try {
        jwt.verify(tokenWithoutBearer, process.env.SECRET_JWT);
        const decodedToken = jwt.decode(tokenWithoutBearer)

        req.user = { ...decodedToken }
        console.log(req.user)
        next();

    }
    catch (error) {
        return res.status(401).send("Token inválido.");
    };
};

export default authorization;
