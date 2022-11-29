const path = (root, sublink) => {
    return `${root}${sublink}`;
};

const ROOT_AUTHENTICATION = '/auth';

export const PATH_AUTHENTICATION = {
    login: path(ROOT_AUTHENTICATION, '/login'),
}

export const PATH_MAIN = {
    home: '/',
    room: '/examroom',
    score: '/score',
}
