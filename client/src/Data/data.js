
export const SidebarMenu = [
    {
        name: 'Home',
        path: '/',
        icon: "fa-solid fa-house-chimney",
    }, 
    {
        name:'help',
        path:'/help',
        icon:'fa-solid fa-question'
    }
];




export const HeaderMenuUser = [
    {
        name: 'Appointments',
        path: '/appointments',
        icon: "fa-solid fa-calendar-days"
    },

    {
        name: 'Doctor status',
        path: '/docStatus',
        icon: 'fa-solid fa-user-doctor'
    },

    {
        name: 'Providers',
        path: '/apply-doctor',
        icon: 'fa-solid fa-hospital'
    },
];

export const HeaderMenuAdmin = [
    
    {
        name: 'Doctors',
        path: '/admin/doctors',
        icon: 'fa-solid fa-user-doctor'
    },

    {
        name: 'users',
        path: '/admin/users',
        icon: 'fa-solid fa-user'
    },
    {
        name: 'Profile',
        path: '/admin/profile',
        icon:'fa-solid fa-address-card'
    },
    {
        name: 'Feedback',
        path: '/admin/Feedback',
        icon:'fa-sharp fa-solid fa-comments'
    },
];

export const HeaderMenuDoctor = [
    {
        name: 'appointment schedule',
        path: '/doctor/PatientLogs',
        icon: 'fa-solid fa-calendar-days'
    },

    {
        name: 'user history',
        path: '/doctor/user-history',
        icon: ''
    },
    {
        name: 'Profile',
        path: '/doctor/profile',
        icon:'fa-solid fa-address-card'
    },
    {
        name: 'Payment Status',
        path: '/doctor/payment-status',
        icon:'fa-sharp fa-solid fa-indian-rupee-sign'
    }


]

