import { RootState } from "..";

export const getSlice = (state: RootState) => state.app;

export const getIsLogOn = (state: RootState) => !!getSlice(state).log.type;
