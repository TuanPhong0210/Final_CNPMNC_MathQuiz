const path = (root: string, sublink: string): string => {
  return `${root}${sublink}`;
};

const ROOT_DASHBOARD = '/';
const ROOT_AUTH = '/auth';
const ROOT_EXTERNAL = '/external';

const ROOT_ACCOUNT = path(ROOT_DASHBOARD, 'accounts');
const ROOT_ACCESS_CONTROL = path(ROOT_DASHBOARD, 'access-control');
const ROOT_RECYCLE_BIN = path(ROOT_DASHBOARD, 'recycle-bin');

export const PATH_DASHBOARD = {
  root: ROOT_DASHBOARD,
  account: {
    root: ROOT_ACCOUNT,
    administrators: path(ROOT_ACCOUNT, '/administrators'),
    teachers: path(ROOT_ACCOUNT, '/teachers'),
    students: path(ROOT_ACCOUNT, '/students'),
    create: (type: String | undefined) => path(ROOT_ACCOUNT, `/${type}/create`),
    edit: (type: string | undefined, _id: string) => path(ROOT_ACCOUNT, `/${type}/edit/${_id}`),
  },
  questions: path(ROOT_DASHBOARD, 'questions'),
  rooms: path(ROOT_DASHBOARD, 'rooms'),
  accessControl: {
    root: ROOT_ACCESS_CONTROL,
    roles: path(ROOT_ACCESS_CONTROL, '/roles'),
    resources: path(ROOT_ACCESS_CONTROL, '/resources'),
    operations: path(ROOT_ACCESS_CONTROL, '/operations'),
  },
  recycleBin: {
    root: ROOT_RECYCLE_BIN,
    operations: path(ROOT_RECYCLE_BIN, '/operations'),
  },
};

export const PATH_AUTH = {
  login: path(ROOT_AUTH, '/login'),
};

export const PATH_EXTERNAL = {
  denied: path(ROOT_EXTERNAL, '/denied'),
};
