import bcryptjs from "bcryptjs";


async function hash(password) {
  const rounds = process.env.NODE_ENV === "production" ? 14 : 1;
  const passwordPP = password + process.env.PP

  return await bcryptjs.hash(passwordPP, rounds);
}

async function compare(textPurePassword, hashInPassword) {
    const passwordPP = textPurePassword + process.env.PP

  return await bcryptjs.compare(passwordPP, hashInPassword);
}

const password = {
   hash,
   compare 
  };
export default password;
