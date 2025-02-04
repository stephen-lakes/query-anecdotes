import { useMutation } from "@tanstack/react-query";
import { addNewAnecdote } from "../requests";

const AnecdoteForm = () => {
  const addNewAnecdoteMutation = useMutation({
    mutationFn: addNewAnecdote,
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    addNewAnecdoteMutation.mutate({ content, votes: 0 });
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
