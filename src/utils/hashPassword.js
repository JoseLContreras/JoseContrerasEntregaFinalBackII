import bcrypt from "bcrypt"

// Hasheo de contraseña 

export const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10)); 
}


// Valida contraseña
export const isValidPassword = (userPassword, password) => {
    return bcrypt.compareSync(password, userPassword)
}