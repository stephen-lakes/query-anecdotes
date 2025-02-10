import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import ErrorPage from "./components/ErrorPage";
import { getAnecdotes, updateAnecdote } from "./requests";
import { useNotificationDispatch } from "./NotificationContext"

const App = () => {
  const queryClient = useQueryClient();
  const dispatch = useNotificationDispatch()

  const {
    isLoading,
    isError,
    data: anecdotes,
    error,
  } = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    retry: 1,
    cacheTime: 0
  });

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      queryClient.invalidateQueries(["anecdotes"]);
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(
        ["anecdotes"],
        anecdotes.map((anecdote) =>
          anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
        )
      );
    },
  });

 const handleVote = (anecdote) => {

    updateAnecdoteMutation.mutate({
      ...anecdote,
      votes: anecdote.votes + 1,
    });

    dispatch({
      type: "SHOW_NOTIFICATION",
      payload: { message: "Note voted successfully!", type: "success" },
    });

    setTimeout(
      () => dispatch({ type: "HIDE_NOTIFICATION" }),
      1000
    );
 };


  if (isLoading) return <div>Loading...</div>;

  if (isError) return <ErrorPage message={error.message} />;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes && anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
