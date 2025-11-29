import { createContext, useReducer } from "react";

export const Postliststore = createContext({
  postList: [],
  addPost: () => {},
  editPost: () => {},
  deletePost: () => {},
});

const DEFAULT_POST_LIST = [
  {
    id: "1", // ✅ ID added
    title: "Going to Mumbai",
    body: "Hi Friends, I am going to Mumbai for my vacations. Hope to enjoy a lot. Peace out.",
    userId: "user-9",
    date: "25 October, 2025",
  },
  {
    id: "2", // ✅ ID added
    title: "Paas ho bhai",
    body: "4 saal ki masti k baad bhi ho gaye hain paas. Hard to believe.",
    userId: "user-12",
    date: "29 October, 2025",
  },
];

const postlistreducer = (currentpostlist, action) => {
  let newpostlist = currentpostlist;
  if (action.type === "DELETE_POST") {
    newpostlist = currentpostlist.filter(
      (post) => post.id !== action.payload.postId
    );
  } else if (action.type === "ADD_POST") {
    // New post ko aage add karo
    newpostlist = [action.payload, ...currentpostlist];
  }else if (action.type === "EDIT_POST") { // 🎯 New EDIT_POST Action
    newpostlist = currentpostlist.map((post) =>
      post.id === action.payload.id ? action.payload : post // Agar ID match kare toh naye post data se replace kar do
    )}
  return newpostlist;
};

const PostliststoreProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(
    postlistreducer,
    DEFAULT_POST_LIST
  );

  const editPost = (editedPost) => {
    dispatchPostList({
      type: "EDIT_POST",
      payload: editedPost, // Edited post object (id, title, body, date ke saath)
    });
  };

  const addPost = (postTitle, postBody, date) => {
    dispatchPostList({
      type: "ADD_POST",
      payload: {
        id: Date.now().toString(), // ✅ Unique ID as string
        title: postTitle,
        body: postBody,
        date: date,
        userId: "Krishant_User", // Default User ID
      },
    });
  };

  const deletePost = (postId) => {
    dispatchPostList({
      type: "DELETE_POST",
      payload: {
        postId,
      },
    });
  };

  return (
    <Postliststore.Provider value={{ postList, addPost, deletePost,editPost }}>
      {children}
    </Postliststore.Provider>
  );
};

export default PostliststoreProvider;