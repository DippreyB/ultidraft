import bcrypt from 'bcryptjs'

const users = [
    {
        name: "Caine Dipprey",
        email: "dipprey.bc@gmail.com",
        password: bcrypt.hashSync("12345", 10),
        isAdmin: true,
        isCaptain: false,
    },
    {
        name: "Kaylie Dipprey",
        email: "kaylie@example.com",
        password: bcrypt.hashSync("12345", 10),
        isAdmin: true,
        isCaptain: false,
    },
    {
        name: "Viv Scott",
        email: "Viv@example.com",
        password: bcrypt.hashSync("12345", 10),
        isAdmin: false,
        isCaptain: true,
    }
]

export default users