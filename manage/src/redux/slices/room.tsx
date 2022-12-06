import { message } from 'antd';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// apis
import type {
  CreateRoomResponse,
  FindAllRoomResponse,
  UpdateRoomResponse,
} from '../../apis/roomApi';
import roomApi from '../../apis/roomApi';
// models
import type { Room } from '../../models';
// redux
import { RootState } from '../store';
import type { CreateRoomPayload, UpdateRoomPayload } from '../actions/room';
import { GET_ROOMS, CREATE_ROOM, UPDATE_ROOM } from '../actions/room';

export interface RoomState {
  isLoading: boolean;
  error: string | undefined;
  lastAction: 'create' | 'update' | undefined;
  rooms: Room[];
}

const initialState: RoomState = {
  isLoading: false,
  error: undefined,
  lastAction: undefined,
  rooms: [],
};

const slice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
      state.error = undefined;
      state.lastAction = undefined;
    },
    actionSuccess: (state, action: PayloadAction<RoomState['lastAction']>) => {
      state.isLoading = false;
      state.error = undefined;
      state.lastAction = action.payload;
    },
    hasError: (state, action: PayloadAction<RoomState['error']>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    clearAction: (state) => {
      state.lastAction = undefined;
      state.isLoading = false;
      state.error = undefined;
    },
    getRoomsSuccess: (state, action: PayloadAction<FindAllRoomResponse>) => {
      const { data } = action.payload;
      state.rooms = data;
    },
    createRoomSuccess: (state, action: PayloadAction<Room>) => {
      const room = action.payload;
      state.rooms = [...state.rooms, room];
    },
    updateRoomSuccess: (state, action: PayloadAction<Room>) => {
      const { _id, ...rest } = action.payload;
      state.rooms = state.rooms.map((room) => (room._id === _id ? { ...room, ...rest } : room));
    },
  },
});

const { reducer, actions } = slice;
export const { clearAction } = actions;
export const selectRoom = (state: RootState) => state.room;
export default reducer;

// ------------------------ saga ------------------------

function* getRooms() {
  try {
    yield put(actions.startLoading());
    const response: FindAllRoomResponse = yield call(roomApi.findAll);
    const { data } = response;
    yield put(actions.getRoomsSuccess({ data }));
    yield put(actions.actionSuccess());
  } catch (error) {
    if (axios.isAxiosError(error)) {
      yield put(actions.hasError(error.response?.statusText));
      message.error(error.response?.statusText);
    }
  }
}

function* createRoom(action: PayloadAction<CreateRoomPayload>) {
  try {
    yield put(actions.startLoading());
    const response: CreateRoomResponse = yield call(roomApi.create, action.payload);
    const { room, msg } = response;
    yield put(actions.createRoomSuccess(room));
    yield put(actions.actionSuccess('create'));
    message.success({ content: msg, key: 'create' });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      yield put(actions.hasError(error.response?.statusText));
      message.error({ content: error.response?.statusText, key: 'create' });
    }
  }
}

function* updateRoom(action: PayloadAction<UpdateRoomPayload>) {
  try {
    yield put(actions.startLoading());
    const { _id, ...values } = action.payload;
    const response: UpdateRoomResponse = yield call(roomApi.update, { _id }, values);
    const { room, msg } = response;
    yield put(actions.updateRoomSuccess(room));
    yield put(actions.actionSuccess('update'));
    message.success({ content: msg, key: 'update' });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      yield put(actions.hasError(error.response?.statusText));
      message.error({ content: error.response?.statusText, key: 'update' });
    }
  }
}

export function* roomSaga() {
  yield takeEvery(GET_ROOMS, getRooms);

  yield takeLatest(CREATE_ROOM, createRoom);
  yield takeLatest(UPDATE_ROOM, updateRoom);
}
