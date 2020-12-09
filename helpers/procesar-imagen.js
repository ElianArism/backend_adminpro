// libreria externa para generar identificadores unicos (id)
const { v4: uuidv4 } = require('uuid');

const procesarImg = (file, tabla) => {
    // obtener extension de la imagen (se cambiara su nombre)
    const nombreImg = file.name.split('.');
    const extension = nombreImg[nombreImg.length - 1];

    // validar extension 
    const extensionesValidas = ['jpg', 'png', 'jpeg', 'gif'];

    if(!extensionesValidas.includes(extension)) {
        return null;
    }

    // crear nombre unico para archivo
    const fileName = `${uuidv4()}.${extension}`;

    // path donde se guarda la imagen
    const path = `./uploads/${tabla}/${fileName}`;

    return {fileName, path};
}

module.exports = {procesarImg}