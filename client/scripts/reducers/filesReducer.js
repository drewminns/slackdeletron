import {
  GET_FILES,
  GET_FILES_ERROR,
  DELETE_FILE_SUCCESS,
  DELETE_FILE_ERROR,
} from '../actions/types';

const initialState = {
  files: [],
  error: {
    present: false,
    message: '',
  },
};

function filterFiles(state, id) {
  const filteredFiles = state.files.filter((item) => item.id !== id);
  return filteredFiles.length ? filteredFiles : [];
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_FILES:
      return {
        ...state,
        files: action.files,
        error: initialState.error,
      };
    case GET_FILES_ERROR:
      return {
        ...state,
        error: {
          present: true,
          message: 'There was an error fetching your files',
        },
      };
    case DELETE_FILE_SUCCESS:
      return {
        ...state,
        files: filterFiles(state, action.payload),
      };
    case DELETE_FILE_ERROR:
      return {
        ...state,
        error: {
          present: true,
          message: 'There was an error deleting your file',
        },
      };
    default:
      return state;
  }
}
