import { createStore, createEvent } from "effector";

export const addStorage = createEvent("createStorage");
export const removeStorage = createEvent("removeStorage");

export default createStore({
  storages: []
})
  .on(addStorage, (state, payload) => {
    console.log(payload);
    return state;
  })
  .on(removeStorage, (state, payload) => {
    console.log(payload);
    return state;
  });
