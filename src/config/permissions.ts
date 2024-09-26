export const ALL_PERMISSIONS = {
    PERMISSIONS: {
        GET_PAGINATE: { method: "GET", apiPath: '/api/v1/permissions', module: "PERMISSIONS" },
        CREATE: { method: "POST", apiPath: '/api/v1/permissions', module: "PERMISSIONS" },
        UPDATE: { method: "PUT", apiPath: '/api/v1/permissions', module: "PERMISSIONS" },
        DELETE: { method: "DELETE", apiPath: '/api/v1/permissions/{id}', module: "PERMISSIONS" },
    },
    ROLES: {
        GET_PAGINATE: { method: "GET", apiPath: '/api/v1/roles', module: "ROLES" },
        CREATE: { method: "POST", apiPath: '/api/v1/roles', module: "ROLES" },
        UPDATE: { method: "PUT", apiPath: '/api/v1/roles', module: "ROLES" },
        DELETE: { method: "DELETE", apiPath: '/api/v1/roles/{id}', module: "ROLES" },
    },
    USERS: {
        GET_PAGINATE: { method: "GET", apiPath: '/api/v1/users', module: "USERS" },
        CREATE: { method: "POST", apiPath: '/api/v1/users', module: "USERS" },
        UPDATE: { method: "PUT", apiPath: '/api/v1/users', module: "USERS" },
        DELETE: { method: "DELETE", apiPath: '/api/v1/users/{id}', module: "USERS" },
    },
    CATEGORIES: {
        GET_PAGINATE: { method: "GET", apiPath: '/api/v1/categories', module: "CATEGORIES" },
        CREATE: { method: "POST", apiPath: '/api/v1/categories', module: "CATEGORIES" },
        UPDATE: { method: "PUT", apiPath: '/api/v1/categories', module: "CATEGORIES" },
        DELETE: { method: "DELETE", apiPath: '/api/v1/categories/{id}', module: "CATEGORIES" },
    },
    FILMS: {
        GET_PAGINATE: { method: "GET", apiPath: '/api/v1/films', module: "FILMS" },
        CREATE: { method: "POST", apiPath: '/api/v1/films', module: "FILMS" },
        UPDATE: { method: "PUT", apiPath: '/api/v1/films', module: "FILMS" },
        DELETE: { method: "DELETE", apiPath: '/api/v1/films/{id}', module: "FILMS" },
    },
    SHOWS: {
        GET_PAGINATE: { method: "GET", apiPath: '/api/v1/shows', module: "SHOWS" },
        CREATE: { method: "POST", apiPath: '/api/v1/shows', module: "SHOWS" },
        UPDATE: { method: "PUT", apiPath: '/api/v1/shows', module: "SHOWS" },
        DELETE: { method: "DELETE", apiPath: '/api/v1/shows/{id}', module: "SHOWS" },
    },
    SEATS: {
        GET_PAGINATE: { method: "GET", apiPath: '/api/v1/seats', module: "SEATS" },
        CREATE: { method: "POST", apiPath: '/api/v1/seats', module: "SEATS" },
        UPDATE: { method: "PUT", apiPath: '/api/v1/seats', module: "SEATS" },
        DELETE: { method: "DELETE", apiPath: '/api/v1/seats/{id}', module: "SEATS" },
    },
    BILLS: {
        GET_PAGINATE: { method: "GET", apiPath: '/api/v1/bills', module: "BILLS" },
        CREATE: { method: "POST", apiPath: '/api/v1/bills', module: "BILLS" },
        UPDATE: { method: "PUT", apiPath: '/api/v1/bills', module: "BILLS" },
        DELETE: { method: "DELETE", apiPath: '/api/v1/bills/{id}', module: "BILLS" },
    },
    TIMES: {
        GET_PAGINATE: { method: "GET", apiPath: '/api/v1/times', module: "TIMES" },
        CREATE: { method: "POST", apiPath: '/api/v1/times', module: "TIMES" },
        UPDATE: { method: "PUT", apiPath: '/api/v1/times', module: "TIMES" },
        DELETE: { method: "DELETE", apiPath: '/api/v1/times/{id}', module: "TIMES" },
    },
    HISTORIES: {
        GET_PAGINATE: { method: "GET", apiPath: '/api/v1/histories', module: "HISTORIES" },
        CREATE: { method: "POST", apiPath: '/api/v1/histories', module: "HISTORIES" },
        UPDATE: { method: "PUT", apiPath: '/api/v1/histories', module: "HISTORIES" },
        DELETE: { method: "DELETE", apiPath: '/api/v1/histories/{id}', module: "HISTORIES" },
    },
    ACCOUNT: {
        CHANGE_PASSWORD: { method: "POST", apiPath: '/api/v1/account/change-password', module: "ACCOUNT" },
        RETRY_PASSWORD: { method: "POST", apiPath: '/api/v1/account/retry-password', module: "ACCOUNT" },
    },
}

export const ALL_MODULES = {
    PERMISSIONS: 'PERMISSIONS',
    ROLES: 'ROLES',
    USERS: 'USERS',
    CATEGORIES: "CATEGORIES",
    FILMS: "FILMS",
    SHOWS: "SHOWS",
    SEATS: "SEATS",
    BILLS: "BILLS",
    TIMES: "TIMES",
    HISTORIES: "HISTORIES",
    ACCOUNT: "ACCOUNT"
}
