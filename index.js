//async action - api call
//api url - https://jsonplaceholder.typicode.com/todos
//middlewere -redux thunk
//axios api

const { default: axios } = require("axios");
const { createStore, applyMiddleware } = require("redux");
const thunk = require("redux-thunk").default;

const GET_TODOS_REQUEST = "GET_TODOS_REQUEST";
const GET_TODOS_SUCCESS = "GET_TODOS_SUCCESS";
const GET_TODOS_FAILURE = "GET_TODOS_FAILURE";
const API_URL = "https://jsonplaceholder.typicode.com/todos";

//state

const initialState = {
  todos: [],
  isLoading: false,
  error: null,
};

//actions and payload

const getTodosRequest = () => {
  return {
    type: GET_TODOS_REQUEST,
  };
};

const getTodosSuccess = (todos) => {
  return {
    type: GET_TODOS_SUCCESS,
    payload: todos,
  };
};

const getTodosFailure = (error) => {
  return {
    type: GET_TODOS_FAILURE,
    payload: error,
  };
};

//reducer

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TODOS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_TODOS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        todos: action.payload,
      };
    case GET_TODOS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

//async action creator

const fetchData = () => {
  return (dispatch) => {
    dispatch(getTodosRequest());
    axios
      .get(API_URL)
      .then((res) => {
        const todos = res.data;
        const titles = todos.map((todo) => {
            return todo.titles;
        });
        dispatch(getTodosSuccess(todos));
      })
      .catch((error) => {
        const erroMessage = error.message;
        dispatch(getTodosFailure(erroMessage));
      });
  };
};

//store

const store = createStore(reducer, applyMiddleware(thunk));

store.subscribe(() => {
  console.log(store.getState());
});

//dispatch

store.dispatch(fetchData());
