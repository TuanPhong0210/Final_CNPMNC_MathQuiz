import type { CreateRoomBody, UpdateRoomBody, UpdateRoomParams } from '../../apis/roomApi';

export const GET_ROOMS = 'GET_ROOMS';

export const CREATE_ROOM = 'CREATE_ROOM';
export const UPDATE_ROOM = 'UPDATE_ROOM';

export interface GetRoomsPayload {}
export const getRoomsAction = (payload: GetRoomsPayload) => {
  return {
    type: GET_ROOMS,
    payload,
  };
};

export interface CreateRoomPayload extends CreateRoomBody {}
export const createRoomAction = (payload: CreateRoomPayload) => {
  return {
    type: CREATE_ROOM,
    payload,
  };
};

export type UpdateRoomPayload = UpdateRoomParams & UpdateRoomBody;
export const updateRoomAction = (payload: UpdateRoomPayload) => {
  return {
    type: UPDATE_ROOM,
    payload,
  };
};
