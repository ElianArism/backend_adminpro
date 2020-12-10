const {OAuth2Client} = require('google-auth-library');

// creando un nuevo cliente
const client = new OAuth2Client(process.env.GOOGLE_ID);

const googleVerify = async (token) => {
    // verificar token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_ID, // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];

    // If request specified a G Suite domain:
    // const domain = payload['hd'];
    
    // console.log(payload);

    // retornando datos del payload
    return {name, email, picture} = payload;
    
}

module.exports = {googleVerify}