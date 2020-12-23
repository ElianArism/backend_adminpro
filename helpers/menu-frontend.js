// este helper retorna el menu del sidebar que podra ser visto por el usuario
// se hace asi para proteger una ruta especifica

const getFrontEndMenu = (role = "USER_ROLE") => {
    const menu = [
        {
          title: 'Dashboard',
          icon: 'mdi mdi-gauge',
          submenu: [
            {
              title: 'Main',
              path: ''
            },
            {
              title: 'Grafical',
              path: 'grafical',
            },
            {
              title: 'Progress',
              path: 'progress'
            },
            {
              title: 'Promises',
              path: 'promises'
            },
            {
              title: 'RxJS',
              path: 'rxjs'
            },
            
          ]
        },
        {
          title: 'maintenance',
          icon: 'mdi mdi-folder-lock-open',
          submenu: [
            {
              title: 'hospitales',
              path: 'hospitales',
            },
            {
              title: 'medicos',
              path: 'medicos'
            },
          ]
        }
    ];
    
    if(role === "ADMIN_ROLE") {
        menu[1].submenu.unshift(   
            {
              title: 'usuarios',
              path: 'usuarios'
            }
        );
    }

    return menu;
}

module.exports = {getFrontEndMenu};