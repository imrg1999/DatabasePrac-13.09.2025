import bcrypt from 'bcrypt';


const saltRounds = 10;

const hashing = async(password) => {
    try{
        return await bcrypt.hash(password, saltRounds);
    } catch(error) {
        console.log(error.message);
        throw error;
    }
}