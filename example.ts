import { PagedHandler, pageIter } from "./mod.ts";

interface Todo {
  id: number;
  title: string;
}

const fetchTodos: PagedHandler<Todo> = async (page: number) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos?_start=${(page - 1) *
      10}&_limit=10`,
  );

  const body: Todo[] = await response.json();

  if (body.length === 0) {
    return {
      data: [],
      nextPage: null,
    };
  }

  return {
    data: body,
    nextPage: page + 1,
  };
};

for await (const todo of pageIter(fetchTodos)) {
  console.log(todo.id, todo.title);
}
