import axiosInstance from './axiosInstance';

// models
import type { ListResponse, StatusResponse, Room } from '../models';

export interface FindAllRoomResponse extends ListResponse<Room> {}

export interface CreateRoomBody extends Omit<Room, '_id'> {}
export interface CreateRoomResponse extends StatusResponse {
  room: Room;
}

export interface UpdateRoomParams extends Pick<Room, '_id'> {}
export interface UpdateRoomBody extends CreateRoomBody {}
export interface UpdateRoomResponse extends CreateRoomResponse {}

const roomApi = {
  // [GET] /rooms
  findAll: (): Promise<FindAllRoomResponse> => {
    const url = `/rooms`;
    return axiosInstance.get(url);
  },

  // [POST] /rooms
  create: (body: CreateRoomBody): Promise<CreateRoomResponse> => {
    const url = `/rooms`;
    return axiosInstance.post(url, body);
  },

  // [PUT] /rooms/:_id
  update: (params: UpdateRoomParams, body: UpdateRoomBody): Promise<UpdateRoomResponse> => {
    const { _id } = params;
    const url = `/rooms/${_id}`;
    return axiosInstance.put(url, body);
  },
};

export default roomApi;
