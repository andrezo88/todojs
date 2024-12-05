const verifyRoles = (allowedRole) => {
    return (req, res, next) => {
        const role = req.user.role
        if (!role) return res.status(401).json("Não autorizado");
        if (role !== allowedRole)
            return res.status(401).json("Não autorizado")
        next()
    }
}

export default verifyRoles;