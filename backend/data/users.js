import bcrypt from 'bcryptjs'

const users = [
    {
        firstName: "Megersa",
        middleName: "Biratu",
        lastName: "Muleta",
        phone: "0966916168",
        email: "megibiratu@gmail.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: true,
    },
];

export default users;
