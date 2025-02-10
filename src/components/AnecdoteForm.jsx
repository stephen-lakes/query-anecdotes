import { useMutation } from "@tanstack/react-query";
import { addNewAnecdote } from "../requests";

import { useQueryClient } from "@tanstack/react-query";
import { useNotificationDispatch } from "../NotificationContext"


const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const dispatch = useNotificationDispatch()

  const addNewAnecdoteMutation = useMutation({
    mutationFn: addNewAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(["anecdotes"], anecdotes.concat(newAnecdote));
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    
    if (content.length < 5) {
      dispatch({
        type: "SHOW_NOTIFICATION",
        payload: { message: "Too short anecdote, must have length 5 or more", type: "error" },
      });
      setTimeout(() => dispatch({ type: "HIDE_NOTIFICATION" }), 1000);
      return;
    }

    event.target.anecdote.value = "";
    addNewAnecdoteMutation.mutate({ content, votes: 0 });

    dispatch({
      type: "SHOW_NOTIFICATION",
      payload: { message: "Anecdote added successfully!", type: "success" },
    });

    setTimeout(() => dispatch({ type: "HIDE_NOTIFICATION" }), 1000);
  };


  

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
